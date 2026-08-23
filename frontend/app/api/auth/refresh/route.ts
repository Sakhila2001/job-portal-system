import { NextRequest, NextResponse } from "next/server";
import { rotateRefreshSession, refreshCookieOptions } from "@/lib/server/session";

export async function POST(request: NextRequest) {
  try {
    const refreshTokenCookie = request.cookies.get("refreshToken")?.value;
    if (!refreshTokenCookie) {
      return NextResponse.json({ message: "Session expired. Please log in again." }, { status: 401 });
    }

    const { accessToken, refreshToken } = await rotateRefreshSession(refreshTokenCookie);
    const response = NextResponse.json({ accessToken, refreshToken });
    response.cookies.set("refreshToken", refreshToken, refreshCookieOptions);
    return response;
  } catch {
    const response = NextResponse.json({ message: "Session expired. Please log in again." }, { status: 401 });
    response.cookies.delete("refreshToken");
    return response;
  }
}
