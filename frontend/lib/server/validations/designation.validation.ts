import { z } from "zod";

export const designationListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  search: z.string().trim().optional(),
});

export const designationCreateSchema = z.object({
  designationName: z.string().trim().min(2).max(100),
  roleCategoryId: z.string().trim().uuid().optional(),
  isActive: z.boolean().optional().default(true),
});

export const designationUpdateSchema = z.object({
  designationName: z.string().trim().min(2).max(100).optional(),
  roleCategoryId: z.string().trim().uuid().nullable().optional(),
  isActive: z.boolean().optional(),
});

export type DesignationListDto = z.infer<typeof designationListQuerySchema>;
export type DesignationCreateDto = z.infer<typeof designationCreateSchema>;
export type DesignationUpdateDto = z.infer<typeof designationUpdateSchema>;
