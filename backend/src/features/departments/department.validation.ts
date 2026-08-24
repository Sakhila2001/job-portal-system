import { z } from "zod";

export const departmentListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  search: z.string().trim().optional(),
});

export const departmentCreateSchema = z.object({
  departmentName: z.string().trim().min(2).max(100),
});

export const departmentUpdateSchema = z.object({
  departmentName: z.string().trim().min(2).max(100).optional(),
});

export type DepartmentListDto = z.infer<typeof departmentListQuerySchema>;
export type DepartmentCreateDto = z.infer<typeof departmentCreateSchema>;
export type DepartmentUpdateDto = z.infer<typeof departmentUpdateSchema>;
