import type { Request, Response } from "express";
import { z } from "zod";
import { comparePassword, findUserByEmail } from "../register/register.repository.js";
import { createAccessToken, createRefreshSession, refreshCookieOptions, revokeRefreshSession, rotateRefreshSession } from "../session/session.service.js";

const loginSchema = z.object({ email: z.string().email(), password: z.string().min(1) });

export async function loginHandler(req: Request, res: Response) {
  try {
    const { email, password } = loginSchema.parse(req.body);
    const user = await findUserByEmail(email);
    if (!user || !comparePassword(password, user.passwordHash)) throw new Error("Invalid email or password.");
    if (!user.emailVerified) throw new Error("Please verify your email before logging in.");

    const refreshToken = await createRefreshSession(user.id, user.role);
    res.cookie("refreshToken", refreshToken, refreshCookieOptions).status(200).json({
      user: { id: user.id, email: user.email, role: user.role },
      accessToken: createAccessToken(user.id, user.role),
    });
  } catch (error) {
    res.status(401).json({ message: error instanceof Error ? error.message : "Login failed." });
  }
}

export async function refreshHandler(req: Request, res: Response) {
  try {
    const { accessToken, refreshToken } = await rotateRefreshSession(req.cookies.refreshToken as string);
    res.cookie("refreshToken", refreshToken, refreshCookieOptions).status(200).json({ accessToken });
  } catch {
    res.clearCookie("refreshToken", refreshCookieOptions).status(401).json({ message: "Session expired. Please log in again." });
  }
}

export async function logoutHandler(req: Request, res: Response) {
  await revokeRefreshSession(req.cookies.refreshToken as string | undefined);
  res.clearCookie("refreshToken", refreshCookieOptions).status(204).send();
}
