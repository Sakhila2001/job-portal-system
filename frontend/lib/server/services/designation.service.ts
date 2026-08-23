import type { Prisma } from "@prisma/client";
import { withUserName, withUserNames } from "../audit";
import { DesignationRepository } from "../repositories/designation.repository";
import type {
  DesignationCreateDto,
  DesignationListDto,
  DesignationUpdateDto,
} from "../validations/designation.validation";

function searchWhere(search?: string) {
  return search
    ? { designationName: { contains: search, mode: "insensitive" as const } }
    : {};
}

function meta(page: number, limit: number, total: number) {
  return { page, limit, total, totalPages: Math.ceil(total / limit) };
}

async function getDesignationOrThrow(id: string) {
  const designation = await DesignationRepository.findById(id);
  if (!designation) {
    throw Object.assign(new Error("Designation not found."), { statusCode: 404 });
  }
  return designation;
}

export async function listDesignations(query: DesignationListDto) {
  const where = searchWhere(query.search);
  const skip = (query.page - 1) * query.limit;

  const [items, total] = await Promise.all([
    DesignationRepository.findMany(where, skip, query.limit),
    DesignationRepository.count(where),
  ]);

  return { items: await withUserNames(items), meta: meta(query.page, query.limit, total) };
}

export async function getDesignation(id: string) {
  return withUserName(await getDesignationOrThrow(id));
}

export async function createDesignation(data: DesignationCreateDto, userId: string) {
  const designation = await DesignationRepository.create({
    designationName: data.designationName,
    ...(data.roleCategoryId ? { roleCategoryId: data.roleCategoryId } : {}),
    isActive: data.isActive ?? true,
    createdBy: userId,
    updatedBy: userId,
  });
  return withUserName(designation);
}

export async function updateDesignation(id: string, data: DesignationUpdateDto, userId: string) {
  await getDesignationOrThrow(id);

  const update: Prisma.DesignationUpdateInput = {};
  if (data.designationName !== undefined) update.designationName = data.designationName;
  if (data.roleCategoryId !== undefined) update.roleCategoryId = data.roleCategoryId;
  if (data.isActive !== undefined) update.isActive = data.isActive;
  update.updatedBy = userId;

  return withUserName(await DesignationRepository.update(id, update));
}

export async function deleteDesignation(id: string) {
  const designation = await getDesignationOrThrow(id);
  await DesignationRepository.remove(id);
  return withUserName(designation);
}
