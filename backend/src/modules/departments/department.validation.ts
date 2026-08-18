import { z } from "zod";

const listSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  search: z.string().trim().optional(),
});

export const departmentCreateSchema = z.object({
  departmentName: z.string().trim().min(2).max(150),
});

export const departmentUpdateSchema = departmentCreateSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required.",
  });

export const departmentListSchema = listSchema;

export type DepartmentCreateDto = z.infer<typeof departmentCreateSchema>;
export type DepartmentUpdateDto = z.infer<typeof departmentUpdateSchema>;
export type DepartmentListDto = z.infer<typeof departmentListSchema>;
