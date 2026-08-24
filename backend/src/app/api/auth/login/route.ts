import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { findUserByEmail, comparePassword } from "@/features/auth/register.repository";
import { createAccessToken, createRefreshSession, refreshCookieOptions } from "@/features/auth/session.service";
import { formatErrorMessage } from "@/lib/error";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = loginSchema.parse(body);

    const user = await findUserByEmail(email);
    if (!user || !comparePassword(password, user.passwordHash)) {
      return NextResponse.json({ message: "Invalid email or password." }, { status: 401 });
    }

    if (!user.emailVerified) {
      return NextResponse.json({ message: "Please verify your email before logging in." }, { status: 401 });
    }

    const refreshToken = await createRefreshSession(user.id, user.role);
    const accessToken = createAccessToken(user.id, user.role);

    const response = NextResponse.json({
      user: { id: user.id, email: user.email, role: user.role },
      accessToken,
      refreshToken,
    });

    response.cookies.set("refreshToken", refreshToken, refreshCookieOptions);
    return response;
  } catch (error) {
    const message = formatErrorMessage(error, "Login failed.");
    return NextResponse.json({ message }, { status: 401 });
  }
}
