import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/server/auth";
import {
  listDepartments,
  createDepartment,
} from "@/lib/server/services/department.service";
import {
  departmentListQuerySchema,
  departmentCreateSchema,
} from "@/lib/server/validations/department.validation";

export async function GET(request: NextRequest) {
  const { errorResponse } = requireAuth(request, ["admin", "employer", "recruiter", "candidate"]);
  if (errorResponse) return errorResponse;

  try {
    const searchParams = Object.fromEntries(request.nextUrl.searchParams);
    const query = departmentListQuerySchema.parse(searchParams);
    const result = await listDepartments(query);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch departments.";
    return NextResponse.json({ message }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  const { user, errorResponse } = requireAuth(request, ["admin"]);
  if (errorResponse) return errorResponse;

  try {
    const body = await request.json();
    const data = departmentCreateSchema.parse(body);
    const department = await createDepartment(data, user!.userId);
    return NextResponse.json(department, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create department.";
    return NextResponse.json({ message }, { status: 400 });
  }
}
