import { z } from "zod";

const listSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  search: z.string().trim().optional(),
});

export const designationCreateSchema = z.object({
  designationName: z.string().trim().min(2).max(150),
  roleCategoryId: z.string().trim().uuid().optional(),
  isActive: z.boolean().optional().default(true),
});

export const designationUpdateSchema = designationCreateSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required.",
  });

export const designationListSchema = listSchema;

export type DesignationCreateDto = z.infer<typeof designationCreateSchema>;
export type DesignationUpdateDto = z.infer<typeof designationUpdateSchema>;
export type DesignationListDto = z.infer<typeof designationListSchema>;
