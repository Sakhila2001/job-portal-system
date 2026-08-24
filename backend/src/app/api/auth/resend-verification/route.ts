import { NextRequest, NextResponse } from "next/server";
import { resendVerificationEmail } from "@/features/auth/register.service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name } = body as { email: string; name: string };
    await resendVerificationEmail(email, name);
    return NextResponse.json({ message: "Verification email resent." });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to resend verification email";
    return NextResponse.json({ message }, { status: 400 });
  }
}
