import crypto from "node:crypto";
import type { Request, Response } from "express";
import { hashPassword } from "../register/register.repository.js";
import prisma from "../../../lib/prisma.js";
import { createRefreshSession, refreshCookieOptions } from "../session/session.service.js";

const googleAuthorizationUrl = "https://accounts.google.com/o/oauth2/v2/auth";
const googleTokenUrl = "https://oauth2.googleapis.com/token";
const googleUserInfoUrl = "https://openidconnect.googleapis.com/v1/userinfo";
const frontendUrl = process.env.APP_URL || "http://localhost:3000";
const redirectUri = process.env.GOOGLE_REDIRECT_URI || "http://localhost:5000/api/auth/google/callback";

function isProduction() {
  return process.env.NODE_ENV === "production";
}

function redirectToLogin(res: Response, status: "success" | "failed") {
  res.redirect(`${frontendUrl}/?googleSignIn=${status}`);
}

export function startGoogleSignIn(_req: Request, res: Response) {
  const clientId = process.env.GOOGLE_CLIENT_ID;

  if (!clientId || !process.env.GOOGLE_CLIENT_SECRET) {
    res.status(503).json({ message: "Google sign-in is not configured." });
    return;
  }

  const state = crypto.randomBytes(32).toString("hex");
  res.cookie("google_oauth_state", state, {
    httpOnly: true,
    sameSite: "lax",
    secure: isProduction(),
    maxAge: 10 * 60 * 1000,
  });

  const authorizationUrl = new URL(googleAuthorizationUrl);
  authorizationUrl.search = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email profile",
    state,
    prompt: "select_account",
  }).toString();

  res.redirect(authorizationUrl.toString());
}

export async function completeGoogleSignIn(req: Request, res: Response) {
  const code = typeof req.query.code === "string" ? req.query.code : null;
  const state = typeof req.query.state === "string" ? req.query.state : null;
  const expectedState = req.cookies.google_oauth_state as string | undefined;
  const hasMatchingState = Boolean(
    state && expectedState && state.length === expectedState.length && crypto.timingSafeEqual(Buffer.from(state), Buffer.from(expectedState)),
  );

  res.clearCookie("google_oauth_state", { httpOnly: true, sameSite: "lax", secure: isProduction() });

  if (!code || !hasMatchingState || !process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    redirectToLogin(res, "failed");
    return;
  }

  try {
    const tokenResponse = await fetch(googleTokenUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID as string,
        client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error("Google token exchange failed.");
    }

    const tokenData = (await tokenResponse.json()) as { access_token?: string };
    if (!tokenData.access_token) {
      throw new Error("Google did not return an access token.");
    }

    const profileResponse = await fetch(googleUserInfoUrl, {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    const profile = (await profileResponse.json()) as {
      email?: string;
      email_verified?: boolean;
      given_name?: string;
      family_name?: string;
      name?: string;
    };

    if (!profileResponse.ok || !profile.email || !profile.email_verified) {
      throw new Error("Google did not provide a verified email address.");
    }

    const email = profile.email;
    let user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      user = await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: true, verificationToken: null, verificationExpires: null, lastLoginAt: new Date() },
      });
    } else {
      const fallbackName = email.split("@")[0] ?? "Google";
      const nameParts = (profile.name || fallbackName).trim().split(/\s+/);
      const firstName = profile.given_name || nameParts[0] || "Google";
      const lastName = profile.family_name || nameParts.slice(1).join(" ");

      user = await prisma.user.create({
        data: {
          email,
          passwordHash: hashPassword(crypto.randomBytes(32).toString("hex")),
          role: "candidate",
          emailVerified: true,
          lastLoginAt: new Date(),
          profile: { create: { firstName, lastName } },
        },
      });
    }

    const refreshToken = await createRefreshSession(user.id, user.role);
    res.cookie("refreshToken", refreshToken, refreshCookieOptions);
    redirectToLogin(res, "success");
  } catch {
    redirectToLogin(res, "failed");
  }
}
