import type { Prisma } from "@prisma/client";
import { JobRepository } from "./job.repository";
import type {
  AdminJobQueryDto,
  CreateJobDto,
  JobQueryDto,
  StatusUpdateDto,
  UpdateJobDto,
} from "./job.validation";

const PUBLISHED_STATUS = "PUBLISHED";
const RECRUITER_INITIAL_STATUS = "PENDING";
const CLOSED_STATUS = "CLOSED";

function paginationMeta(page: number, limit: number, total: number) {
  return { page, limit, total, totalPages: Math.ceil(total / limit) };
}

function candidateVisibleWhere(): Prisma.JobWhereInput {
  return { status: PUBLISHED_STATUS, deletedAt: null };
}

function searchWhere(search?: string): Prisma.JobWhereInput {
  if (!search) return {};
  return {
    OR: [
      { title: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
      { company: { displayName: { contains: search, mode: "insensitive" } } },
    ],
  };
}

async function getRecruiterAccount(userId: string) {
  const account = await JobRepository.findEmployerAccountByUserId(userId);
  if (!account) {
    throw Object.assign(new Error("Recruiter company account not found."), {
      statusCode: 403,
    });
  }
  return account;
}

function assertTransition(current: string, next: string) {
  const allowed: Record<string, string[]> = {
    PENDING: ["PUBLISHED", "REJECTED"],
    PUBLISHED: ["SUSPENDED", "CLOSED"],
    SUSPENDED: ["PUBLISHED"],
    REJECTED: [],
    CLOSED: [],
    draft: ["PUBLISHED", "PENDING"],
  };
  if (!allowed[current]?.includes(next)) {
    throw Object.assign(
      new Error(`Invalid status transition from ${current} to ${next}.`),
      { statusCode: 422 }
    );
  }
}

export async function createRecruiterJob(userId: string, data: CreateJobDto) {
  const account = await getRecruiterAccount(userId);

  // Designation lookup / creation
  let designationId = data.designationId;
  if (!designationId) {
    const designationTitle = data.designation || data.title;
    const designation = await JobRepository.findOrCreateDesignation(designationTitle);
    designationId = designation.id;
  } else {
    const designation = await JobRepository.findDesignationById(designationId);
    if (!designation) {
      throw Object.assign(new Error("Designation not found."), { statusCode: 404 });
    }
  }

  // Department lookup / creation (optional)
  let departmentId = data.departmentId;
  if (!departmentId && data.department) {
    const dept = await JobRepository.findOrCreateDepartment(data.department);
    departmentId = dept.id;
  }

  // Work mode mapping
  const workModeRaw = (data.workMode || "onsite").toLowerCase();
  const workMode =
    workModeRaw === "remote" ? "REMOTE" : workModeRaw === "hybrid" ? "HYBRID" : "ONSITE";

  // Status mapping
  const statusRaw = (data.status || "draft").toLowerCase();
  const status =
    statusRaw === "published" || statusRaw === "live"
      ? PUBLISHED_STATUS
      : statusRaw === "draft"
      ? "draft"
      : RECRUITER_INITIAL_STATUS;

  const minSalary = data.salaryMin ?? data.minSalary;
  const maxSalary = data.salaryMax ?? data.maxSalary;

  const createData: Prisma.JobUncheckedCreateInput = {
    companyId: account.companyId,
    createdBy: account.id,
    designationId: designationId,
    departmentId: departmentId ?? null,
    title: data.title,
    description: data.description,
    employmentType: data.employmentType,
    workMode,
    seniorityLevel: data.seniorityLevel ?? null,
    minExperienceMonths: data.minExperienceMonths ?? null,
    maxExperienceMonths: data.maxExperienceMonths ?? null,
    minSalary: minSalary ?? null,
    maxSalary: maxSalary ?? null,
    salaryCurrency: data.salaryCurrency ?? "NPR",
    showSalary: data.showSalary ?? true,
    status,
    expiresAt: data.expiresAt ?? null,
    publishedAt: status === PUBLISHED_STATUS ? new Date() : null,
  };

  const job = await JobRepository.createJob(createData);

  // Sync relational data
  const locationList = data.locations ?? (data.location ? [data.location] : []);
  if (locationList.length > 0) {
    await JobRepository.syncJobLocations(job.id, locationList);
  }

  if (data.skills && data.skills.length > 0) {
    await JobRepository.syncJobSkills(job.id, data.skills);
  }

  if (data.responsibilities && data.responsibilities.length > 0) {
    await JobRepository.syncJobResponsibilities(job.id, data.responsibilities);
  }

  if (data.qualifications && data.qualifications.length > 0) {
    await JobRepository.syncJobQualifications(job.id, data.qualifications);
  }

  if (data.benefits && data.benefits.length > 0) {
    await JobRepository.syncJobBenefits(job.id, data.benefits);
  }

  if (data.tags && data.tags.length > 0) {
    await JobRepository.syncJobTags(job.id, data.tags);
  }

  if (data.media && data.media.length > 0) {
    await JobRepository.syncJobMedia(job.id, data.media);
  }

  return JobRepository.findJobById(job.id);
}

export async function listRecruiterJobs(userId: string, query: JobQueryDto) {
  const account = await getRecruiterAccount(userId);
  const where: Prisma.JobWhereInput = {
    createdBy: account.id,
    ...(query.status ? { status: query.status } : {}),
    ...searchWhere(query.search),
  };
  const skip = (query.page - 1) * query.limit;

  const [items, total] = await Promise.all([
    JobRepository.findRecruiterJobs(where, skip, query.limit),
    JobRepository.countJobs(where),
  ]);

  return { items, meta: paginationMeta(query.page, query.limit, total) };
}

export async function getRecruiterJob(userId: string, jobId: string) {
  const account = await getRecruiterAccount(userId);
  const job = await JobRepository.findJobById(jobId);

  if (!job) throw Object.assign(new Error("Job not found."), { statusCode: 404 });
  if (job.createdBy !== account.id) {
    throw Object.assign(new Error("Forbidden."), { statusCode: 403 });
  }

  return job;
}

export async function updateRecruiterJob(
  userId: string,
  jobId: string,
  data: UpdateJobDto
) {
  await getRecruiterJob(userId, jobId);

  const update: Prisma.JobUpdateInput = {};
  if (data.title !== undefined) update.title = data.title;
  if (data.description !== undefined) update.description = data.description;
  if (data.employmentType !== undefined) update.employmentType = data.employmentType;
  if (data.workMode !== undefined) {
    const workMode = data.workMode.toLowerCase();
    update.workMode = workMode === "remote" ? "REMOTE" : workMode === "hybrid" ? "HYBRID" : "ONSITE";
  }
  if (data.seniorityLevel !== undefined) update.seniorityLevel = data.seniorityLevel;
  if (data.minExperienceMonths !== undefined) update.minExperienceMonths = data.minExperienceMonths;
  if (data.maxExperienceMonths !== undefined) update.maxExperienceMonths = data.maxExperienceMonths;

  const minSalary = data.salaryMin ?? data.minSalary;
  const maxSalary = data.salaryMax ?? data.maxSalary;
  if (minSalary !== undefined) update.minSalary = minSalary;
  if (maxSalary !== undefined) update.maxSalary = maxSalary;
  if (data.salaryCurrency !== undefined) update.salaryCurrency = data.salaryCurrency;
  if (data.showSalary !== undefined) update.showSalary = data.showSalary;
  if (data.status !== undefined) {
    const status = data.status.toLowerCase();
    update.status = status === "published" || status === "live" ? PUBLISHED_STATUS : status === "draft" ? "draft" : data.status;
  }
  if (data.expiresAt !== undefined) update.expiresAt = data.expiresAt;

  if (data.designationId) {
    update.designation = { connect: { id: data.designationId } };
  } else if (data.designation || data.title) {
    const designation = await JobRepository.findOrCreateDesignation(
      data.designation || data.title!
    );
    update.designation = { connect: { id: designation.id } };
  }

  if (data.departmentId) {
    update.department = { connect: { id: data.departmentId } };
  } else if (data.department) {
    const dept = await JobRepository.findOrCreateDepartment(data.department);
    update.department = { connect: { id: dept.id } };
  }

  if (Object.keys(update).length > 0) {
    await JobRepository.updateJob(jobId, update);
  }

  const locationList = data.locations ?? (data.location ? [data.location] : undefined);
  if (locationList !== undefined) {
    await JobRepository.syncJobLocations(jobId, locationList);
  }

  if (data.skills !== undefined) {
    await JobRepository.syncJobSkills(jobId, data.skills);
  }

  if (data.responsibilities !== undefined) {
    await JobRepository.syncJobResponsibilities(jobId, data.responsibilities);
  }

  if (data.qualifications !== undefined) {
    await JobRepository.syncJobQualifications(jobId, data.qualifications);
  }

  if (data.benefits !== undefined) {
    await JobRepository.syncJobBenefits(jobId, data.benefits);
  }

  if (data.tags !== undefined) {
    await JobRepository.syncJobTags(jobId, data.tags);
  }

  if (data.media !== undefined) {
    await JobRepository.syncJobMedia(jobId, data.media);
  }

  return JobRepository.findJobById(jobId);
}

export async function closeRecruiterJob(userId: string, jobId: string) {
  await getRecruiterJob(userId, jobId);
  return JobRepository.updateJobStatus(jobId, CLOSED_STATUS);
}

export async function listCandidateJobs(query: JobQueryDto) {
  const where: Prisma.JobWhereInput = {
    ...candidateVisibleWhere(),
    ...(query.employmentType ? { employmentType: query.employmentType } : {}),
    ...(query.workMode
      ? {
          workMode: {
            equals: query.workMode.toUpperCase(),
            mode: "insensitive" as const,
          },
        }
      : {}),
    ...(query.department
      ? {
          department: {
            departmentName: { contains: query.department, mode: "insensitive" },
          },
        }
      : {}),
    ...(query.location
      ? {
          locations: {
            some: {
              location: {
                city: { contains: query.location, mode: "insensitive" },
              },
            },
          },
        }
      : {}),
    ...searchWhere(query.search),
  };
  const skip = (query.page - 1) * query.limit;

  const [items, total] = await Promise.all([
    JobRepository.findCandidateJobs(where, skip, query.limit),
    JobRepository.countJobs(where),
  ]);

  return { items, meta: paginationMeta(query.page, query.limit, total) };
}

export async function getCandidateJob(jobId: string) {
  const job = await JobRepository.findCandidateJobById(jobId, PUBLISHED_STATUS);
  if (!job) throw Object.assign(new Error("Job not found."), { statusCode: 404 });
  return job;
}

export async function listAdminJobs(query: AdminJobQueryDto) {
  const where: Prisma.JobWhereInput = {
    ...(query.status ? { status: query.status } : {}),
    ...searchWhere(query.search),
  };
  const skip = (query.page - 1) * query.limit;

  const [items, total] = await Promise.all([
    JobRepository.findAdminJobs(where, skip, query.limit),
    JobRepository.countJobs(where),
  ]);

  return { items, meta: paginationMeta(query.page, query.limit, total) };
}

export async function getAdminJob(jobId: string) {
  const job = await JobRepository.findAdminJobById(jobId);
  if (!job) throw Object.assign(new Error("Job not found."), { statusCode: 404 });
  return job;
}

export async function updateAdminJobStatus(
  jobId: string,
  data: StatusUpdateDto
) {
  const job = await JobRepository.findAdminJobById(jobId);
  if (!job) throw Object.assign(new Error("Job not found."), { statusCode: 404 });

  assertTransition(job.status, data.status);

  const publishedAt =
    data.status === PUBLISHED_STATUS ? new Date() : job.publishedAt;

  return JobRepository.updateJobStatus(jobId, data.status, publishedAt);
}
