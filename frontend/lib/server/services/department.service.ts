import type { Prisma } from "@prisma/client";
import { withUserName, withUserNames } from "../audit";
import { DepartmentRepository } from "../repositories/department.repository";
import type {
  DepartmentCreateDto,
  DepartmentListDto,
  DepartmentUpdateDto,
} from "../validations/department.validation";

function searchWhere(search?: string) {
  return search
    ? { departmentName: { contains: search, mode: "insensitive" as const } }
    : {};
}

function meta(page: number, limit: number, total: number) {
  return { page, limit, total, totalPages: Math.ceil(total / limit) };
}

async function getDepartmentOrThrow(id: string) {
  const department = await DepartmentRepository.findById(id);
  if (!department) {
    throw Object.assign(new Error("Department not found."), { statusCode: 404 });
  }
  return department;
}

export async function listDepartments(query: DepartmentListDto) {
  const where = searchWhere(query.search);
  const skip = (query.page - 1) * query.limit;

  const [items, total] = await Promise.all([
    DepartmentRepository.findMany(where, skip, query.limit),
    DepartmentRepository.count(where),
  ]);

  return { items: await withUserNames(items), meta: meta(query.page, query.limit, total) };
}

export async function getDepartment(id: string) {
  return withUserName(await getDepartmentOrThrow(id));
}

export async function createDepartment(data: DepartmentCreateDto, userId: string) {
  const department = await DepartmentRepository.create({
    departmentName: data.departmentName,
    createdBy: userId,
    updatedBy: userId,
  });
  return withUserName(department);
}

export async function updateDepartment(id: string, data: DepartmentUpdateDto, userId: string) {
  await getDepartmentOrThrow(id);

  const update: Prisma.DepartmentUpdateInput = {};
  if (data.departmentName !== undefined) update.departmentName = data.departmentName;
  update.updatedBy = userId;

  return withUserName(await DepartmentRepository.update(id, update));
}

export async function deleteDepartment(id: string) {
  const department = await getDepartmentOrThrow(id);
  await DepartmentRepository.remove(id);
  return withUserName(department);
}
