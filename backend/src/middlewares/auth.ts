import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export type AuthUser = {
  userId: string;
  role: string;
};

type TokenPayload = {
  userId: string;
  role: string;
  type: "access" | "refresh";
};

function jwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not configured.");
  return secret;
}

export function verifyAccessToken(token: string): AuthUser {
  const payload = jwt.verify(token, jwtSecret()) as TokenPayload;
  if (payload.type !== "access") throw new Error("Invalid access token.");
  return { userId: payload.userId, role: payload.role };
}

export function getAuthUser(request: NextRequest): AuthUser | null {
  try {
    const authHeader = request.headers.get("authorization");
    let token = authHeader?.startsWith("Bearer ")
      ? authHeader.slice("Bearer ".length).trim()
      : null;

    if (!token) {
      token = request.cookies.get("accessToken")?.value || null;
    }

    if (!token) return null;

    return verifyAccessToken(token);
  } catch {
    return null;
  }
}

export function requireAuth(request: NextRequest, allowedRoles?: string[]) {
  const user = getAuthUser(request);
  if (!user) {
    return {
      user: null,
      errorResponse: NextResponse.json(
        { success: false, message: "Authentication required." },
        { status: 401 }
      ),
    };
  }

  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return {
      user: null,
      errorResponse: NextResponse.json(
        { success: false, message: "Forbidden." },
        { status: 403 }
      ),
    };
  }

  return { user, errorResponse: null };
}
