import crypto from "node:crypto";
import jwt from "jsonwebtoken";
import prisma from "../../../lib/prisma.js";

const accessTokenLifetime = "15m";
const refreshTokenLifetime = "7d";
const refreshTokenMaxAge = 7 * 24 * 60 * 60 * 1000;

type TokenPayload = { userId: string; role: string; sessionId?: string; type: "access" | "refresh" };

function jwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not configured.");
  return secret;
}

function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export const refreshCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/api/auth",
  maxAge: refreshTokenMaxAge,
};

export function createAccessToken(userId: string, role: string) {
  return jwt.sign({ userId, role, type: "access" }, jwtSecret(), { expiresIn: accessTokenLifetime });
}

export async function createRefreshSession(userId: string, role: string) {
  const sessionId = crypto.randomUUID();
  const refreshToken = jwt.sign({ userId, role, sessionId, type: "refresh" }, jwtSecret(), { expiresIn: refreshTokenLifetime });
  const expiresAt = new Date(Date.now() + refreshTokenMaxAge);

  await prisma.refreshSession.create({
    data: { id: sessionId, userId, tokenHash: hashToken(refreshToken), expiresAt },
  });

  return refreshToken;
}

export async function rotateRefreshSession(refreshToken: string) {
  const payload = jwt.verify(refreshToken, jwtSecret()) as TokenPayload;
  if (payload.type !== "refresh" || !payload.sessionId) throw new Error("Invalid refresh token.");

  const session = await prisma.refreshSession.findUnique({ where: { id: payload.sessionId }, include: { user: true } });
  if (!session || session.revokedAt || session.expiresAt <= new Date() || session.tokenHash !== hashToken(refreshToken)) {
    throw new Error("Refresh token expired or revoked.");
  }

  await prisma.refreshSession.update({ where: { id: session.id }, data: { revokedAt: new Date() } });
  const nextRefreshToken = await createRefreshSession(session.user.id, session.user.role);

  return { accessToken: createAccessToken(session.user.id, session.user.role), refreshToken: nextRefreshToken };
}

export async function revokeRefreshSession(refreshToken: string | undefined) {
  if (!refreshToken) return;
  try {
    const payload = jwt.verify(refreshToken, jwtSecret()) as TokenPayload;
    if (payload.type === "refresh" && payload.sessionId) {
      await prisma.refreshSession.updateMany({ where: { id: payload.sessionId, tokenHash: hashToken(refreshToken), revokedAt: null }, data: { revokedAt: new Date() } });
    }
  } catch {
    // An invalid or expired cookie must still be cleared by the caller.
  }
}
