import type { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";

export class DepartmentRepository {
  static async findMany(where: Prisma.DepartmentWhereInput, skip: number, take: number) {
    return prisma.department.findMany({
      where,
      orderBy: { departmentName: "asc" },
      skip,
      take,
    });
  }

  static async count(where: Prisma.DepartmentWhereInput) {
    return prisma.department.count({ where });
  }

  static async findById(id: string) {
    return prisma.department.findUnique({ where: { id } });
  }

  static async create(data: Prisma.DepartmentCreateInput) {
    return prisma.department.create({ data });
  }

  static async update(id: string, data: Prisma.DepartmentUpdateInput) {
    return prisma.department.update({ where: { id }, data });
  }

  static async remove(id: string) {
    return prisma.department.delete({ where: { id } });
  }
}
