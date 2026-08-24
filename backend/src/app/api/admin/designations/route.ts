import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/middlewares/auth";
import {
  listDesignations,
  createDesignation,
} from "@/features/designations/designation.service";
import {
  designationListQuerySchema,
  designationCreateSchema,
} from "@/features/designations/designation.validation";

export async function GET(request: NextRequest) {
  const { errorResponse } = requireAuth(request, ["admin", "employer", "recruiter", "candidate"]);
  if (errorResponse) return errorResponse;

  try {
    const searchParams = Object.fromEntries(request.nextUrl.searchParams);
    const query = designationListQuerySchema.parse(searchParams);
    const result = await listDesignations(query);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch designations.";
    return NextResponse.json({ message }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  const { user, errorResponse } = requireAuth(request, ["admin"]);
  if (errorResponse) return errorResponse;

  try {
    const body = await request.json();
    const data = designationCreateSchema.parse(body);
    const designation = await createDesignation(data, user!.userId);
    return NextResponse.json(designation, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create designation.";
    return NextResponse.json({ message }, { status: 400 });
  }
}
