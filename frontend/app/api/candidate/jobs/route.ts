import { NextRequest, NextResponse } from "next/server";
import { listCandidateJobs } from "@/lib/server/services/job.service";
import { paginationSchema } from "@/lib/server/validations/job.validation";

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
