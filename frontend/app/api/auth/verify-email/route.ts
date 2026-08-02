import { NextRequest } from "next/server";

const backendBaseUrl = process.env.BACKEND_URL || "http://localhost:5000";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  if (!token) {
    return new Response("Missing verification token.", { status: 400 });
  }

  const verificationResponse = await fetch(
    `${backendBaseUrl}/api/auth/verify-email?token=${encodeURIComponent(token)}`,
    { cache: "no-store" },
  );

  return new Response(await verificationResponse.text(), {
    status: verificationResponse.status,
    headers: {
      "Content-Type": verificationResponse.headers.get("content-type") || "text/html; charset=utf-8",
    },
  });
}
