import { NextRequest, NextResponse } from "next/server";
import { listCandidateJobs } from "@/features/jobs/job.service";
import { paginationSchema } from "@/features/jobs/job.validation";

export async function GET(request: NextRequest) {
  try {
    const searchParams = Object.fromEntries(request.nextUrl.searchParams);
    const query = paginationSchema.parse(searchParams);
    const result = await listCandidateJobs(query);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch candidate jobs.";
    return NextResponse.json({ message }, { status: 400 });
  }
}
