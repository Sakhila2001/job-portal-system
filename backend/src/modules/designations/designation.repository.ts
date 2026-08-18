import type { Prisma } from "@prisma/client";
import prisma from "../../lib/prisma.js";

export class DesignationRepository {
  static async findMany(where: Prisma.DesignationWhereInput, skip: number, take: number) {
    return prisma.designation.findMany({
      where,
      orderBy: { designationName: "asc" },
      skip,
      take,
    });
  }

  static async count(where: Prisma.DesignationWhereInput) {
    return prisma.designation.count({ where });
  }

  static async findById(id: string) {
    return prisma.designation.findUnique({ where: { id } });
  }

  static async create(data: Prisma.DesignationCreateInput) {
    return prisma.designation.create({ data });
  }

  static async update(id: string, data: Prisma.DesignationUpdateInput) {
    return prisma.designation.update({ where: { id }, data });
  }

  static async remove(id: string) {
    return prisma.designation.delete({ where: { id } });
  }
}
