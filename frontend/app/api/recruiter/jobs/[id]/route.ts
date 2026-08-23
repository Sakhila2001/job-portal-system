import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/server/auth";
import { closeRecruiterJob, getRecruiterJob, updateRecruiterJob } from "@/lib/server/services/job.service";
import { updateJobSchema } from "@/lib/server/validations/job.validation";
import { formatErrorMessage } from "@/lib/server/error";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { user, errorResponse } = requireAuth(request, ["employer", "recruiter", "admin"]);
  if (errorResponse) return errorResponse;

  try {
    const { id } = await params;
    const job = await getRecruiterJob(user!.userId, id);
    return NextResponse.json(job);
  } catch (error) {
    const statusCode = (error as { statusCode?: number }).statusCode || 404;
    const message = formatErrorMessage(error, "Job not found.");
    return NextResponse.json({ message }, { status: statusCode });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { user, errorResponse } = requireAuth(request, ["employer", "recruiter", "admin"]);
  if (errorResponse) return errorResponse;

  try {
    const { id } = await params;
    const body = await request.json();
    const data = updateJobSchema.parse(body);
    const updatedJob = await updateRecruiterJob(user!.userId, id, data);
    return NextResponse.json(updatedJob);
  } catch (error) {
    const statusCode = (error as { statusCode?: number }).statusCode || 400;
    const message = formatErrorMessage(error, "Failed to update job.");
    return NextResponse.json({ message }, { status: statusCode });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { user, errorResponse } = requireAuth(request, ["employer", "recruiter", "admin"]);
  if (errorResponse) return errorResponse;

  try {
    const { id } = await params;
    const closedJob = await closeRecruiterJob(user!.userId, id);
    return NextResponse.json(closedJob);
  } catch (error) {
    const statusCode = (error as { statusCode?: number }).statusCode || 400;
    const message = formatErrorMessage(error, "Failed to close job.");
    return NextResponse.json({ message }, { status: statusCode });
  }
}
