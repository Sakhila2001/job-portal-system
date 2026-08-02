import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../../../lib/prisma.js";

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

export async function createUser(data: {
  email: string;
  passwordHash: string;
  role: string;
  mobile?: string;
}): Promise<{ id: string; email: string; role: string; emailVerified: boolean }> {
  return prisma.user.create({
    data,
    select: { id: true, email: true, role: true, emailVerified: true },
  });
}

export async function createUserProfile(data: {
  userId: string;
  firstName: string;
  lastName: string;
}) {
  return prisma.userProfile.create({
    data,
  });
}

export async function createCompany(data: {
  legalName: string;
  displayName: string;
  slug: string;
  hrContactName?: string;
  contactNumber?: string;
}) {
  return prisma.company.create({
    data,
  });
}

export async function createEmployerAccount(data: {
  userId: string;
  companyId: string;
}) {
  return prisma.employerAccount.create({
    data,
  });
}

export function generateTokens(userId: string, role: string) {
  const accessToken = jwt.sign(
    { userId, role },
    process.env.JWT_SECRET || "super-secret-jwt-key",
    { expiresIn: "1h" }
  );

  const refreshToken = jwt.sign(
    { userId, role },
    process.env.JWT_SECRET || "super-secret-jwt-key",
    { expiresIn: "7d" }
  );

  return { accessToken, refreshToken };
}

export function hashPassword(password: string): string {
  return bcrypt.hashSync(password, 10);
}

export function comparePassword(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}
