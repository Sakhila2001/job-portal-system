import { NextRequest, NextResponse } from "next/server";
import { registerEmployer } from "@/lib/server/services/register.service";
import { refreshCookieOptions } from "@/lib/server/session";
import { formatErrorMessage } from "@/lib/server/error";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await registerEmployer(body);

    const response = NextResponse.json(result, { status: 201 });
    response.cookies.set("refreshToken", result.refreshToken, refreshCookieOptions);
    return response;
  } catch (error) {
    const message = formatErrorMessage(error, "Employer registration failed.");
    return NextResponse.json({ message }, { status: 400 });
  }
}
