import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/server/auth";
import { createRecruiterJob, listRecruiterJobs } from "@/lib/server/services/job.service";
import { createJobSchema, paginationSchema } from "@/lib/server/validations/job.validation";
import { formatErrorMessage } from "@/lib/server/error";

export async function GET(request: NextRequest) {
  const { user, errorResponse } = requireAuth(request, ["employer", "recruiter", "admin"]);
  if (errorResponse) return errorResponse;

  try {
    const searchParams = Object.fromEntries(request.nextUrl.searchParams);
    const query = paginationSchema.parse(searchParams);
    const result = await listRecruiterJobs(user!.userId, query);
    return NextResponse.json(result);
  } catch (error) {
    const statusCode = (error as { statusCode?: number }).statusCode || 400;
    const message = formatErrorMessage(error, "Failed to fetch recruiter jobs.");
    return NextResponse.json({ message }, { status: statusCode });
  }
}

export async function POST(request: NextRequest) {
  const { user, errorResponse } = requireAuth(request, ["employer", "recruiter", "admin"]);
  if (errorResponse) return errorResponse;

  try {
    const body = await request.json();
    const data = createJobSchema.parse(body);
    const job = await createRecruiterJob(user!.userId, data);
    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    const statusCode = (error as { statusCode?: number }).statusCode || 400;
    const message = formatErrorMessage(error, "Failed to create job.");
    return NextResponse.json({ message }, { status: statusCode });
  }
}
