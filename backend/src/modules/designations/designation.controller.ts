import type { Request, Response } from "express";
import type { AuthenticatedRequest } from "../../middlewares/auth.middleware.js";
import { sendError, sendSuccess } from "../../lib/response.js";
import {
  designationCreateSchema,
  designationListSchema,
  designationUpdateSchema,
} from "./designation.validation.js";
import {
  createDesignation,
  deleteDesignation,
  getDesignation,
  listDesignations,
  updateDesignation,
} from "./designation.service.js";

export async function listDesignationsHandler(req: Request, res: Response) {
  try {
    const query = designationListSchema.parse(req.query);
    const result = await listDesignations(query);
    sendSuccess(res, "Designations fetched successfully.", result);
  } catch (error) {
    sendError(res, error);
  }
}

export async function getDesignationHandler(req: Request, res: Response) {
  try {
    const designation = await getDesignation((req.params.uuid as string));
    sendSuccess(res, "Designation fetched successfully.", designation);
  } catch (error) {
    sendError(res, error);
  }
}

export async function createDesignationHandler(req: Request, res: Response) {
  try {
    const data = designationCreateSchema.parse(req.body);
    const designation = await createDesignation(data, (req as AuthenticatedRequest).user.userId);
    sendSuccess(res, "Designation created successfully.", designation, 201);
  } catch (error) {
    sendError(res, error);
  }
}

export async function updateDesignationHandler(req: Request, res: Response) {
  try {
    const data = designationUpdateSchema.parse(req.body);
    const designation = await updateDesignation((req.params.uuid as string), data, (req as AuthenticatedRequest).user.userId);
    sendSuccess(res, "Designation updated successfully.", designation);
  } catch (error) {
    sendError(res, error);
  }
}

export async function deleteDesignationHandler(req: Request, res: Response) {
  try {
    const designation = await deleteDesignation((req.params.uuid as string));
    sendSuccess(res, "Designation deleted successfully.", designation);
  } catch (error) {
    sendError(res, error);
  }
}
