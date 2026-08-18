import type { Request, Response } from "express";
import type { AuthenticatedRequest } from "../../middlewares/auth.middleware.js";
import { sendError, sendSuccess } from "../../lib/response.js";
import {
  adminPaginationSchema,
  createJobSchema,
  paginationSchema,
  statusUpdateSchema,
  updateJobSchema,
} from "./job.validation.js";
import {
  closeRecruiterJob,
  createRecruiterJob,
  getAdminJob,
  getCandidateJob,
  getRecruiterJob,
  listAdminJobs,
  listCandidateJobs,
  listRecruiterJobs,
  updateAdminJobStatus,
  updateRecruiterJob,
} from "./job.service.js";

export async function createRecruiterJobHandler(req: Request, res: Response) {
  try {
    const data = createJobSchema.parse(req.body);
    const job = await createRecruiterJob(
      (req as AuthenticatedRequest).user.userId,
      data
    );
    sendSuccess(res, "Job created successfully.", job, 201);
  } catch (error) {
    sendError(res, error);
  }
}

export async function listRecruiterJobsHandler(req: Request, res: Response) {
  try {
    const query = paginationSchema.parse(req.query);
    const jobs = await listRecruiterJobs(
      (req as AuthenticatedRequest).user.userId,
      query
    );
    sendSuccess(res, "Recruiter jobs fetched successfully.", jobs);
  } catch (error) {
    sendError(res, error);
  }
}

export async function getRecruiterJobHandler(req: Request, res: Response) {
  try {
    const job = await getRecruiterJob(
      (req as AuthenticatedRequest).user.userId,
      req.params.uuid as string
    );
    sendSuccess(res, "Recruiter job fetched successfully.", job);
  } catch (error) {
    sendError(res, error);
  }
}

export async function updateRecruiterJobHandler(req: Request, res: Response) {
  try {
    const data = updateJobSchema.parse(req.body);
    const job = await updateRecruiterJob(
      (req as AuthenticatedRequest).user.userId,
      req.params.uuid as string,
      data
    );
    sendSuccess(res, "Job updated successfully.", job);
  } catch (error) {
    sendError(res, error);
  }
}

export async function deleteRecruiterJobHandler(req: Request, res: Response) {
  try {
    const job = await closeRecruiterJob(
      (req as AuthenticatedRequest).user.userId,
      req.params.uuid as string
    );
    sendSuccess(res, "Job closed successfully.", job);
  } catch (error) {
    sendError(res, error);
  }
}

export async function listCandidateJobsHandler(req: Request, res: Response) {
  try {
    const query = paginationSchema.parse(req.query);
    const jobs = await listCandidateJobs(query);
    sendSuccess(res, "Published jobs fetched successfully.", jobs);
  } catch (error) {
    sendError(res, error);
  }
}

export async function getCandidateJobHandler(req: Request, res: Response) {
  try {
    const job = await getCandidateJob(req.params.uuid as string);
    sendSuccess(res, "Job fetched successfully.", job);
  } catch (error) {
    sendError(res, error);
  }
}

export async function listAdminJobsHandler(req: Request, res: Response) {
  try {
    const query = adminPaginationSchema.parse(req.query);
    const jobs = await listAdminJobs(query);
    sendSuccess(res, "Admin jobs fetched successfully.", jobs);
  } catch (error) {
    sendError(res, error);
  }
}

export async function getAdminJobHandler(req: Request, res: Response) {
  try {
    const job = await getAdminJob(req.params.uuid as string);
    sendSuccess(res, "Admin job fetched successfully.", job);
  } catch (error) {
    sendError(res, error);
  }
}

export async function updateAdminJobStatusHandler(req: Request, res: Response) {
  try {
    const data = statusUpdateSchema.parse(req.body);
    const job = await updateAdminJobStatus(req.params.uuid as string, data);
    sendSuccess(res, "Job status updated successfully.", job);
  } catch (error) {
    sendError(res, error);
  }
}