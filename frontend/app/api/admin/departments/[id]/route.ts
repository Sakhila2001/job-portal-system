import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/server/auth";
import {
  getDepartment,
  updateDepartment,
  deleteDepartment,
} from "@/lib/server/services/department.service";
import { departmentUpdateSchema } from "@/lib/server/validations/department.validation";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { errorResponse } = requireAuth(request, ["admin"]);
  if (errorResponse) return errorResponse;

  try {
    const { id } = await params;
    const department = await getDepartment(id);
    return NextResponse.json(department);
  } catch (error) {
    const statusCode = (error as { statusCode?: number }).statusCode || 404;
    const message = error instanceof Error ? error.message : "Department not found.";
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
    const data = departmentUpdateSchema.parse(body);
    const department = await updateDepartment(id, data, user!.userId);
    return NextResponse.json(department);
  } catch (error) {
    const statusCode = (error as { statusCode?: number }).statusCode || 400;
    const message = error instanceof Error ? error.message : "Failed to update department.";
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
    const department = await deleteDepartment(id);
    return NextResponse.json(department);
  } catch (error) {
    const statusCode = (error as { statusCode?: number }).statusCode || 400;
    const message = error instanceof Error ? error.message : "Failed to delete department.";
    return NextResponse.json({ message }, { status: statusCode });
  }
}
