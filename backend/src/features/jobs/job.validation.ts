import { z } from "zod";

const jobStatusSchema = z.enum(["PENDING", "PUBLISHED", "SUSPENDED", "REJECTED", "CLOSED", "draft", "published"]);

const skillItemSchema = z.union([
  z.string().trim().min(1).max(300, "Skill name cannot exceed 300 characters"),
  z.object({
    name: z.string().trim().min(1).max(300, "Skill name cannot exceed 300 characters"),
    importance: z.enum(["must_have", "nice_to_have", "bonus"]).optional().default("nice_to_have"),
    isMandatory: z.boolean().optional().default(false),
  }),
]);

const qualificationItemSchema = z.union([
  z.string().trim().min(1).max(500, "Qualification text cannot exceed 500 characters"),
  z.object({
    name: z.string().trim().min(1).max(500, "Qualification text cannot exceed 500 characters"),
    level: z.string().trim().optional(),
    isRequired: z.boolean().optional().default(true),
    isPreferred: z.boolean().optional().default(false),
  }),
]);

const responsibilityItemSchema = z.union([
  z.string().trim().min(1).max(1000, "Responsibility text cannot exceed 1000 characters"),
  z.object({
    responsibility: z.string().trim().min(1).max(1000, "Responsibility text cannot exceed 1000 characters"),
    displayOrder: z.number().int().optional().default(0),
    isKey: z.boolean().optional().default(true),
  }),
]);

const mediaItemSchema = z.union([
  z.string().trim().url("Media attachment must be a valid URL"),
  z.object({
    mediaType: z.string().trim().optional().default("image"),
    mediaUrl: z.string().trim().url("Media attachment must be a valid URL"),
    caption: z.string().trim().optional(),
  }),
]);

export const jobBaseSchema = z.object({
  title: z.string().trim().min(2, "Job title must be at least 2 characters").max(200, "Job title cannot exceed 200 characters"),
  description: z.string().trim().max(50000, "Job description cannot exceed 50,000 characters").optional().default(""),
  designation: z.string().trim().optional(),
  designationId: z.string().trim().uuid().optional(),
  department: z.string().trim().optional(),
  departmentId: z.string().trim().uuid().optional(),
  employmentType: z.string().trim().min(2, "Employment type is required").max(50),
  workMode: z.string().trim().min(2).max(50).optional().default("onsite"),
  seniorityLevel: z.string().trim().min(2).max(50).optional(),
  location: z.string().trim().min(2).max(120).optional(),
  locations: z.array(z.string().trim().min(2).max(120)).optional(),
  minExperienceMonths: z.coerce.number().int().nonnegative().optional(),
  maxExperienceMonths: z.coerce.number().int().nonnegative().optional(),
  salaryMin: z.coerce.number().nonnegative().optional(),
  minSalary: z.coerce.number().nonnegative().optional(),
  salaryMax: z.coerce.number().nonnegative().optional(),
  maxSalary: z.coerce.number().nonnegative().optional(),
  salaryCurrency: z.string().trim().default("NPR"),
  showSalary: z.boolean().optional().default(true),
  status: jobStatusSchema.optional(),
  expiresAt: z.coerce.date().optional(),
  skills: z.array(skillItemSchema).max(50).optional(),
  responsibilities: z.array(responsibilityItemSchema).max(50).optional(),
  qualifications: z.array(qualificationItemSchema).max(50).optional(),
  benefits: z.array(z.string().trim().min(1).max(300, "Benefit item cannot exceed 300 characters")).max(50).optional(),
  tags: z.array(z.string().trim().min(1).max(100, "Tag cannot exceed 100 characters")).max(50).optional(),
  media: z.array(mediaItemSchema).max(20).optional(),
});

export const createJobSchema = jobBaseSchema
  .refine(
    (data) => {
      const min = data.salaryMin ?? data.minSalary;
      const max = data.salaryMax ?? data.maxSalary;
      return min === undefined || max === undefined || min <= max;
    },
    {
      message: "Minimum salary must be less than or equal to maximum salary.",
      path: ["salaryMax"],
    }
  )
  .refine(
    (data) =>
      data.minExperienceMonths === undefined ||
      data.maxExperienceMonths === undefined ||
      data.minExperienceMonths <= data.maxExperienceMonths,
    {
      message: "minExperienceMonths must be less than or equal to maxExperienceMonths.",
      path: ["maxExperienceMonths"],
    }
  );

export const updateJobSchema = jobBaseSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required.",
  })
  .refine(
    (data) => {
      const min = data.salaryMin ?? data.minSalary;
      const max = data.salaryMax ?? data.maxSalary;
      return min === undefined || max === undefined || min <= max;
    },
    {
      message: "Minimum salary must be less than or equal to maximum salary.",
      path: ["salaryMax"],
    }
  )
  .refine(
    (data) =>
      data.minExperienceMonths === undefined ||
      data.maxExperienceMonths === undefined ||
      data.minExperienceMonths <= data.maxExperienceMonths,
    {
      message: "minExperienceMonths must be less than or equal to maxExperienceMonths.",
      path: ["maxExperienceMonths"],
    }
  );

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  status: z.string().trim().optional(),
  search: z.string().trim().optional(),
  location: z.string().trim().optional(),
  employmentType: z.string().trim().optional(),
  workMode: z.string().trim().optional(),
  department: z.string().trim().optional(),
});

export const adminPaginationSchema = paginationSchema.extend({
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const statusUpdateSchema = z.object({
  status: jobStatusSchema,
  reason: z.string().trim().max(500).optional(),
});

export type CreateJobDto = z.infer<typeof createJobSchema>;
export type UpdateJobDto = z.infer<typeof updateJobSchema>;
export type JobQueryDto = z.infer<typeof paginationSchema>;
export type AdminJobQueryDto = z.infer<typeof adminPaginationSchema>;
export type StatusUpdateDto = z.infer<typeof statusUpdateSchema>;
