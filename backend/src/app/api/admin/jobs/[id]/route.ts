import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/middlewares/auth";
import { getAdminJob } from "@/features/jobs/job.service";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { errorResponse } = requireAuth(request, ["admin"]);
  if (errorResponse) return errorResponse;

  try {
    const { id } = await params;
    const job = await getAdminJob(id);
    return NextResponse.json(job);
  } catch (error) {
    const statusCode = (error as { statusCode?: number }).statusCode || 404;
    const message = error instanceof Error ? error.message : "Job not found.";
    return NextResponse.json({ message }, { status: statusCode });
  }
}
