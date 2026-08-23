import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/server/auth";
import {
  getDesignation,
  updateDesignation,
  deleteDesignation,
} from "@/lib/server/services/designation.service";
import { designationUpdateSchema } from "@/lib/server/validations/designation.validation";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { errorResponse } = requireAuth(request, ["admin"]);
  if (errorResponse) return errorResponse;

  try {
    const { id } = await params;
    const designation = await getDesignation(id);
    return NextResponse.json(designation);
  } catch (error) {
    const statusCode = (error as { statusCode?: number }).statusCode || 404;
    const message = error instanceof Error ? error.message : "Designation not found.";
    return NextResponse.json({ message }, { status: statusCode });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { user, errorResponse } = requireAuth(request, ["admin"]);
  if (errorResponse) return errorResponse;

  try {
    const { id } = await params;
    const body = await request.json();
    const data = designationUpdateSchema.parse(body);
    const designation = await updateDesignation(id, data, user!.userId);
    return NextResponse.json(designation);
  } catch (error) {
    const statusCode = (error as { statusCode?: number }).statusCode || 400;
    const message = error instanceof Error ? error.message : "Failed to update designation.";
    return NextResponse.json({ message }, { status: statusCode });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { errorResponse } = requireAuth(request, ["admin"]);
  if (errorResponse) return errorResponse;

  try {
    const { id } = await params;
    const designation = await deleteDesignation(id);
    return NextResponse.json(designation);
  } catch (error) {
    const statusCode = (error as { statusCode?: number }).statusCode || 400;
    const message = error instanceof Error ? error.message : "Failed to delete designation.";
    return NextResponse.json({ message }, { status: statusCode });
  }
}
