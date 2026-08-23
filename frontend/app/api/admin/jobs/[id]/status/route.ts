import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/server/auth";
import { updateAdminJobStatus } from "@/lib/server/services/job.service";
import { statusUpdateSchema } from "@/lib/server/validations/job.validation";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { errorResponse } = requireAuth(request, ["admin"]);
  if (errorResponse) return errorResponse;

  try {
    const { id } = await params;
    const body = await request.json();
    const data = statusUpdateSchema.parse(body);
    const updatedJob = await updateAdminJobStatus(id, data);
    return NextResponse.json(updatedJob);
  } catch (error) {
    const statusCode = (error as { statusCode?: number }).statusCode || 400;
    const message = error instanceof Error ? error.message : "Failed to update status.";
    return NextResponse.json({ message }, { status: statusCode });
  }
}
