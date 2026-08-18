import type { Prisma } from "@prisma/client";
import prisma from "../../lib/prisma.js";

export const jobInclude = {
  company: {
    select: {
      id: true,
      displayName: true,
      slug: true,
      websiteUrl: true,
      verificationStatus: true,
    },
  },
  creator: {
    select: {
      id: true,
      userId: true,
      companyId: true,
    },
  },
  designation: {
    select: {
      id: true,
      designationName: true,
    },
  },
  department: {
    select: {
      id: true,
      departmentName: true,
    },
  },
  locations: {
    include: {
      location: true,
    },
  },
  skills: {
    include: {
      skill: true,
    },
  },
  qualifications: {
    include: {
      qualification: true,
    },
  },
  benefits: {
    include: {
      benefit: true,
    },
  },
  tags: {
    include: {
      tag: true,
    },
  },
  media: true,
} as const;

export const adminJobInclude = {
  ...jobInclude,
  creator: {
    select: {
      id: true,
      userId: true,
      companyId: true,
      user: {
        select: {
          id: true,
          email: true,
          role: true,
          status: true,
        },
      },
    },
  },
} as const;

export class JobRepository {
  static async findEmployerAccountByUserId(userId: string) {
    return prisma.employerAccount.findFirst({
      where: { userId },
      orderBy: { joinedAt: "desc" },
    });
  }

  static async findOrCreateDesignation(title: string) {
    const existing = await prisma.designation.findFirst({
      where: { designationName: { equals: title, mode: "insensitive" } },
    });
    if (existing) return existing;
    return prisma.designation.create({ data: { designationName: title } });
  }

  static async findDesignationById(id: string) {
    return prisma.designation.findUnique({ where: { id } });
  }

  static async findOrCreateDepartment(name: string) {
    const existing = await prisma.department.findFirst({
      where: { departmentName: { equals: name, mode: "insensitive" } },
    });
    if (existing) return existing;
    return prisma.department.create({ data: { departmentName: name } });
  }

  static async findOrCreateLocation(cityLocation: string) {
    const existing = await prisma.location.findFirst({
      where: { city: { equals: cityLocation, mode: "insensitive" } },
    });
    if (existing) return existing;
    return prisma.location.create({
      data: { country: "Nepal", city: cityLocation },
    });
  }

  static async syncJobLocations(jobId: string, locationNames: string[]) {
    await prisma.jobLocation.deleteMany({ where: { jobId } });
    if (locationNames.length === 0) return;

    let isPrimary = true;
    for (const locName of locationNames) {
      if (!locName.trim()) continue;
      const location = await this.findOrCreateLocation(locName.trim());
      await prisma.jobLocation.create({
        data: { jobId, locationId: location.id, isPrimary },
      });
      isPrimary = false;
    }
  }

  static async syncJobSkills(
    jobId: string,
    skills: (string | { name: string; importance?: string; isMandatory?: boolean })[]
  ) {
    await prisma.jobSkill.deleteMany({ where: { jobId } });

    for (const item of skills) {
      const skillName = typeof item === "string" ? item.trim() : item.name.trim();
      const importance = typeof item === "object" ? item.importance ?? "nice_to_have" : "nice_to_have";
      const isMandatory = typeof item === "object" ? item.isMandatory ?? false : false;

      if (!skillName) continue;

      const skill = await prisma.skill.upsert({
        where: { skillName },
        update: {},
        create: { skillName },
      });

      await prisma.jobSkill.create({
        data: {
          jobId,
          skillId: skill.id,
          importance,
          isMandatory,
        },
      });
    }
  }

  static async syncJobQualifications(
    jobId: string,
    qualifications: (string | { name: string; level?: string | undefined; isRequired?: boolean | undefined })[]
  ) {
    await prisma.jobQualification.deleteMany({ where: { jobId } });

    for (const item of qualifications) {
      const qualName = typeof item === "string" ? item.trim() : item.name.trim();
      const educationLevel = typeof item === "object" ? item.level ?? "bachelors" : "bachelors";
      const isRequired = typeof item === "object" ? item.isRequired ?? true : true;

      if (!qualName) continue;

      let qual = await prisma.qualification.findFirst({
        where: { qualificationName: { equals: qualName, mode: "insensitive" } },
      });

      if (!qual) {
        qual = await prisma.qualification.create({
          data: { qualificationName: qualName, educationLevel },
        });
      }

      await prisma.jobQualification.create({
        data: {
          jobId,
          qualificationId: qual.id,
          isRequired,
        },
      });
    }
  }

  static async syncJobBenefits(jobId: string, benefits: string[]) {
    await prisma.jobBenefit.deleteMany({ where: { jobId } });

    for (const benefitName of benefits) {
      if (!benefitName.trim()) continue;

      let benefit = await prisma.benefit.findFirst({
        where: { benefitName: { equals: benefitName.trim(), mode: "insensitive" } },
      });

      if (!benefit) {
        benefit = await prisma.benefit.create({
          data: { benefitName: benefitName.trim() },
        });
      }

      await prisma.jobBenefit.create({
        data: { jobId, benefitId: benefit.id },
      });
    }
  }

  static async syncJobTags(jobId: string, tags: string[]) {
    await prisma.jobTag.deleteMany({ where: { jobId } });

    for (const tagName of tags) {
      if (!tagName.trim()) continue;

      const tag = await prisma.tag.upsert({
        where: { tagName: tagName.trim() },
        update: {},
        create: { tagName: tagName.trim(), tagType: "job" },
      });

      await prisma.jobTag.create({
        data: { jobId, tagId: tag.id },
      });
    }
  }

  static async syncJobMedia(
    jobId: string,
    mediaItems: (string | { mediaType?: string | undefined; mediaUrl: string; caption?: string | undefined })[]
  ) {
    await prisma.jobMedia.deleteMany({ where: { jobId } });

    for (const item of mediaItems) {
      const mediaUrl = typeof item === "string" ? item.trim() : item.mediaUrl.trim();
      const mediaType = typeof item === "object" ? item.mediaType ?? "image" : "image";
      const caption = typeof item === "object" ? item.caption ?? null : null;

      if (!mediaUrl) continue;

      await prisma.jobMedia.create({
        data: {
          jobId,
          mediaType,
          mediaUrl,
          caption,
        },
      });
    }
  }

  static async createJob(createData: Prisma.JobUncheckedCreateInput) {
    return prisma.job.create({
      data: createData,
    });
  }

  static async findJobById(jobId: string) {
    return prisma.job.findUnique({
      where: { id: jobId },
      include: jobInclude,
    });
  }

  static async findCandidateJobById(jobId: string, publishedStatus: string) {
    return prisma.job.findFirst({
      where: {
        id: jobId,
        status: publishedStatus,
      },
      include: jobInclude,
    });
  }

  static async findAdminJobById(jobId: string) {
    return prisma.job.findUnique({
      where: { id: jobId },
      include: adminJobInclude,
    });
  }

  static async findRecruiterJobs(
    where: Prisma.JobWhereInput,
    skip: number,
    limit: number
  ) {
    return prisma.job.findMany({
      where,
      include: jobInclude,
      orderBy: { id: "desc" },
      skip,
      take: limit,
    });
  }

  static async countJobs(where: Prisma.JobWhereInput) {
    return prisma.job.count({ where });
  }

  static async findCandidateJobs(
    where: Prisma.JobWhereInput,
    skip: number,
    limit: number
  ) {
    return prisma.job.findMany({
      where,
      include: jobInclude,
      orderBy: { publishedAt: "desc" },
      skip,
      take: limit,
    });
  }

  static async findAdminJobs(
    where: Prisma.JobWhereInput,
    skip: number,
    limit: number
  ) {
    return prisma.job.findMany({
      where,
      include: adminJobInclude,
      orderBy: { id: "desc" },
      skip,
      take: limit,
    });
  }

  static async updateJob(jobId: string, updateData: Prisma.JobUpdateInput) {
    return prisma.job.update({
      where: { id: jobId },
      data: updateData,
      include: jobInclude,
    });
  }

  static async updateJobStatus(
    jobId: string,
    status: string,
    publishedAt?: Date | null
  ) {
    const data: Prisma.JobUpdateInput = { status };
    if (publishedAt !== undefined) {
      data.publishedAt = publishedAt;
    }

    return prisma.job.update({
      where: { id: jobId },
      data,
      include: adminJobInclude,
    });
  }
}