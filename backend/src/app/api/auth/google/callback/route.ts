import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/features/auth/register.repository";
import { createRefreshSession, refreshCookieOptions } from "@/features/auth/session.service";

const googleTokenUrl = "https://oauth2.googleapis.com/token";
const googleUserInfoUrl = "https://openidconnect.googleapis.com/v1/userinfo";

function redirectToLogin(origin: string, status: "success" | "failed") {
  const frontendUrl = process.env.APP_URL || origin;
  return NextResponse.redirect(`${frontendUrl}/?googleSignIn=${status}`);
}

export async function GET(request: NextRequest) {
  const origin = request.nextUrl.origin;
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const expectedState = request.cookies.get("google_oauth_state")?.value;

  const hasMatchingState = Boolean(
    state && expectedState && state.length === expectedState.length && crypto.timingSafeEqual(Buffer.from(state), Buffer.from(expectedState))
  );

  const redirectUri = process.env.GOOGLE_REDIRECT_URI || `${origin}/api/auth/google/callback`;

  if (!code || !hasMatchingState || !process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    const response = redirectToLogin(origin, "failed");
    response.cookies.delete("google_oauth_state");
    return response;
  }

  try {
    const tokenResponse = await fetch(googleTokenUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
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
    const response = redirectToLogin(origin, "success");
    response.cookies.delete("google_oauth_state");
    response.cookies.set("refreshToken", refreshToken, refreshCookieOptions);

    return response;
  } catch {
    const response = redirectToLogin(origin, "failed");
    response.cookies.delete("google_oauth_state");
    return response;
  }
}
