import { NextRequest, NextResponse } from "next/server";
import { getCandidateJob } from "@/features/jobs/job.service";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const job = await getCandidateJob(id);
    return NextResponse.json(job);
  } catch (error) {
    const statusCode = (error as { statusCode?: number }).statusCode || 404;
    const message = error instanceof Error ? error.message : "Job not found.";
    return NextResponse.json({ message }, { status: statusCode });
  }
}
