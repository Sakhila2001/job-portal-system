import { NextRequest, NextResponse } from "next/server";
import { revokeRefreshSession } from "@/features/auth/session.service";

export async function POST(request: NextRequest) {
  const refreshTokenCookie = request.cookies.get("refreshToken")?.value;
  await revokeRefreshSession(refreshTokenCookie);

  const response = new NextResponse(null, { status: 204 });
  response.cookies.delete("refreshToken");
  return response;
}
