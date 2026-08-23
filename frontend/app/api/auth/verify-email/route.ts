import { NextRequest, NextResponse } from "next/server";
import { verifyEmail } from "@/lib/server/services/register.service";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  if (!token) {
    return new Response("Missing verification token.", { status: 400 });
  }

  try {
    const result = await verifyEmail(token);
    const appUrl = process.env.APP_URL || "http://localhost:3000";

    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verified - JobPortal</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
          }
          .card {
            background: white;
            border-radius: 24px;
            padding: 48px;
            max-width: 480px;
            width: 100%;
            text-align: center;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          }
          .icon {
            width: 80px;
            height: 80px;
            background: #dcfce7;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 24px;
          }
          .icon svg {
            width: 40px;
            height: 40px;
            color: #16a34a;
          }
          h1 {
            font-size: 28px;
            font-weight: 800;
            color: #0f172a;
            margin-bottom: 12px;
          }
          p {
            font-size: 16px;
            color: #64748b;
            line-height: 1.6;
            margin-bottom: 32px;
          }
          .btn {
            display: inline-block;
            background: #2563eb;
            color: white;
            text-decoration: none;
            padding: 14px 32px;
            border-radius: 12px;
            font-weight: 600;
            font-size: 16px;
            transition: background 0.2s;
          }
          .btn:hover {
            background: #1d4ed8;
          }
          .footer {
            margin-top: 32px;
            font-size: 14px;
            color: #94a3b8;
          }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="icon">
            <svg fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h1>Email Verified!</h1>
          <p>Your email <strong>${result.email}</strong> has been successfully verified. You can now log in and access your JobPortal account.</p>
          <a href="${appUrl}/?login=true" class="btn">Go to Login</a>
          <div class="footer">
            JobPortal - Your Career Partner
          </div>
        </div>
      </body>
      </html>
    `;

    return new Response(html, {
      status: 200,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Verification failed";
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verification Failed - JobPortal</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
          }
          .card {
            background: white;
            border-radius: 24px;
            padding: 48px;
            max-width: 480px;
            width: 100%;
            text-align: center;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          }
          .icon {
            width: 80px;
            height: 80px;
            background: #fee2e2;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 24px;
          }
          .icon svg {
            width: 40px;
            height: 40px;
            color: #dc2626;
          }
          h1 {
            font-size: 28px;
            font-weight: 800;
            color: #0f172a;
            margin-bottom: 12px;
          }
          p {
            font-size: 16px;
            color: #64748b;
            line-height: 1.6;
            margin-bottom: 32px;
          }
          .btn {
            display: inline-block;
            background: #2563eb;
            color: white;
            text-decoration: none;
            padding: 14px 32px;
            border-radius: 12px;
            font-weight: 600;
            font-size: 16px;
            transition: background 0.2s;
          }
          .btn:hover {
            background: #1d4ed8;
          }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="icon">
            <svg fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>
          <h1>Verification Failed</h1>
          <p>${message}</p>
          <a href="/register" class="btn">Back to Register</a>
        </div>
      </body>
      </html>
    `;

    return new Response(html, {
      status: 400,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }
}
