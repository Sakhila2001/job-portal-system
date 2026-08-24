import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";

const googleAuthorizationUrl = "https://accounts.google.com/o/oauth2/v2/auth";

export async function GET(request: NextRequest) {
  const clientId = process.env.GOOGLE_CLIENT_ID;

  if (!clientId || !process.env.GOOGLE_CLIENT_SECRET) {
    return NextResponse.json({ message: "Google sign-in is not configured." }, { status: 503 });
  }

  const redirectUri = process.env.GOOGLE_REDIRECT_URI || `${request.nextUrl.origin}/api/auth/google/callback`;
  const state = crypto.randomBytes(32).toString("hex");

  const authorizationUrl = new URL(googleAuthorizationUrl);
  authorizationUrl.search = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email profile",
    state,
    prompt: "select_account",
  }).toString();

  const response = NextResponse.redirect(authorizationUrl.toString());
  response.cookies.set("google_oauth_state", state, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 10 * 60,
  });

  return response;
}
