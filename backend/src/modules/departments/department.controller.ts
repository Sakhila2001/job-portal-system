import type { Request, Response } from "express";
import type { AuthenticatedRequest } from "../../middlewares/auth.middleware.js";
import { sendError, sendSuccess } from "../../lib/response.js";
import {
  departmentCreateSchema,
  departmentListSchema,
  departmentUpdateSchema,
} from "./department.validation.js";
import {
  createDepartment,
  deleteDepartment,
  getDepartment,
  listDepartments,
  updateDepartment,
} from "./department.service.js";

export async function listDepartmentsHandler(req: Request, res: Response) {
  try {
    const query = departmentListSchema.parse(req.query);
    const result = await listDepartments(query);
    sendSuccess(res, "Departments fetched successfully.", result);
  } catch (error) {
    sendError(res, error);
  }
}

export async function getDepartmentHandler(req: Request, res: Response) {
  try {
    const department = await getDepartment((req.params.uuid as string));
    sendSuccess(res, "Department fetched successfully.", department);
  } catch (error) {
    sendError(res, error);
  }
}

export async function createDepartmentHandler(req: Request, res: Response) {
  try {
    const data = departmentCreateSchema.parse(req.body);
    const department = await createDepartment(data, (req as AuthenticatedRequest).user.userId);
    sendSuccess(res, "Department created successfully.", department, 201);
  } catch (error) {
    sendError(res, error);
  }
}

export async function updateDepartmentHandler(req: Request, res: Response) {
  try {
    const data = departmentUpdateSchema.parse(req.body);
    const department = await updateDepartment((req.params.uuid as string), data, (req as AuthenticatedRequest).user.userId);
    sendSuccess(res, "Department updated successfully.", department);
  } catch (error) {
    sendError(res, error);
  }
}

export async function deleteDepartmentHandler(req: Request, res: Response) {
  try {
    const department = await deleteDepartment((req.params.uuid as string));
    sendSuccess(res, "Department deleted successfully.", department);
  } catch (error) {
    sendError(res, error);
  }
}
