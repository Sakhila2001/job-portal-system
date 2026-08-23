import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/server/auth";
import { listAdminJobs } from "@/lib/server/services/job.service";
import { adminPaginationSchema } from "@/lib/server/validations/job.validation";

export async function GET(request: NextRequest) {
  const { errorResponse } = requireAuth(request, ["admin"]);
  if (errorResponse) return errorResponse;

  try {
    const searchParams = Object.fromEntries(request.nextUrl.searchParams);
    const query = adminPaginationSchema.parse(searchParams);
    const result = await listAdminJobs(query);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch admin jobs.";
    return NextResponse.json({ message }, { status: 400 });
  }
}
