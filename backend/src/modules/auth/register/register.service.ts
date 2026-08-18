import { z } from "zod";
import crypto from "node:crypto";
import {
  findUserByEmail,
  createUser,
  createUserProfile,
  createCompany,
  createEmployerAccount,
  hashPassword,
} from "./register.repository.js";
import { sendEmail } from "../../../lib/email.js";
import prisma from "../../../lib/prisma.js";
import { createAccessToken, createRefreshSession } from "../session/session.service.js";

const candidateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  mobile: z.string().min(10, "Mobile number must be at least 10 digits"),
});

const employerSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  hrName: z.string().min(1, "HR contact name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  contactNumber: z.string().min(10, "Contact number must be at least 10 digits"),
});

export type CandidateRegisterDto = z.infer<typeof candidateSchema>;
export type EmployerRegisterDto = z.infer<typeof employerSchema>;

function generateVerificationToken() {
  return crypto.randomBytes(32).toString("hex");
}

async function createNotification(userId: string, channel: string, notificationType: string, subject: string | null, payload?: unknown) {
  await prisma.notification.create({
    data: {
      userId,
      channel,
      notificationType,
      subject,
      payload: payload as never,
      status: "queued",
    },
  });
}

async function sendWelcomeEmail(to: string, name: string) {
  const subject = "Welcome to JobPortal!";
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">Welcome, ${name}!</h2>
      <p>Thank you for registering at JobPortal. We're excited to have you on board.</p>
      <p>You can now log in and start exploring job opportunities.</p>
      <p style="color: #64748b; font-size: 12px;">If you did not create this account, please ignore this email.</p>
    </div>
  `;
  await sendEmail({ to, subject, html });
}

export async function sendVerificationEmail(to: string, name: string, token: string) {
  const verificationBaseUrl = process.env.APP_URL || "http://localhost:3000";
  const verificationUrl = `${verificationBaseUrl}/api/auth/verify-email?token=${encodeURIComponent(token)}`;
  const subject = "Verify your email - JobPortal";
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">Verify your email, ${name}!</h2>
      <p>Thank you for registering at JobPortal. Please verify your email address by clicking the button below:</p>
      <div style="margin: 24px 0;">
        <a href="${verificationUrl}" style="background-color: #2563eb; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Verify Email</a>
      </div>
      <p style="color: #64748b; font-size: 12px;">If the button doesn't work, copy and paste this link into your browser:</p>
      <p style="color: #64748b; font-size: 12px; word-break: break-all;">${verificationUrl}</p>
      <p style="color: #64748b; font-size: 12px;">This link will expire in 24 hours. If you did not create this account, please ignore this email.</p>
    </div>
  `;
  await sendEmail({ to, subject, html });
}

export async function resendWelcomeEmail(email: string, role: "candidate" | "employer", name: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, email: true, role: true },
  });

  if (!user) {
    throw new Error("No account found with this email.");
  }

  const subject = role === "employer" ? "Welcome to JobPortal Employer" : "Welcome to JobPortal!";
  await createNotification(user.id, "email", "welcome", subject, { email: user.email, role: user.role });
  await sendWelcomeEmail(user.email, name);
}

export async function resendVerificationEmail(email: string, name: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, email: true, role: true, emailVerified: true },
  });

  if (!user) {
    throw new Error("No account found with this email.");
  }

  if (user.emailVerified) {
    throw new Error("Email is already verified.");
  }

  const token = generateVerificationToken();
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      verificationToken: token,
      verificationExpires: expires,
    },
  });

  await createNotification(user.id, "email", "verification", "Verify your email - JobPortal", { email: user.email });
  await sendVerificationEmail(user.email, name, token);
}

export async function verifyEmail(token: string) {
  const user = await prisma.user.findFirst({
    where: {
      verificationToken: token,
      verificationExpires: { gt: new Date() },
    },
  });

  if (!user) {
    throw new Error("Invalid or expired verification token.");
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      emailVerified: true,
      verificationToken: null,
      verificationExpires: null,
    },
  });

  return { email: user.email, role: user.role };
}

export async function registerCandidate(data: CandidateRegisterDto) {
  const existingUser = await findUserByEmail(data.email);
  if (existingUser) {
    throw new Error("Email already registered");
  }

  const passwordHash = hashPassword(data.password);
  const token = generateVerificationToken();
  const tokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

  const nameParts = data.name.split(" ");
  const firstName = nameParts[0] ?? "";
  const lastName = nameParts.slice(1).join(" ");

  const user = await createUser({
    email: data.email,
    passwordHash,
    role: "candidate",
    mobile: data.mobile,
  });

  await createUserProfile({
    userId: user.id,
    firstName,
    lastName,
  });

  await prisma.user.update({
    where: { id: user.id },
    data: {
      verificationToken: token,
      verificationExpires: tokenExpires,
    },
  });

  await createNotification(user.id, "email", "welcome", "Welcome to JobPortal!", { email: user.email, role: user.role });
  await createNotification(user.id, "email", "verification", "Verify your email - JobPortal", { email: user.email });
  sendVerificationEmail(user.email, firstName, token).catch((err) => console.error("[email] candidate verification failed:", err));
  sendWelcomeEmail(user.email, firstName).catch((err) => console.error("[email] candidate welcome failed:", err));

  const refreshToken = await createRefreshSession(user.id, user.role);

  return {
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      emailVerified: false,
    },
    accessToken: createAccessToken(user.id, user.role),
    refreshToken,
  };
}

export async function registerEmployer(data: EmployerRegisterDto) {
  const existingUser = await findUserByEmail(data.email);
  if (existingUser) {
    throw new Error("Email already registered");
  }

  const passwordHash = hashPassword(data.password);
  const token = generateVerificationToken();
  const tokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

  const slug = data.companyName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const company = await createCompany({
    legalName: data.companyName,
    displayName: data.companyName,
    slug,
    hrContactName: data.hrName,
    contactNumber: data.contactNumber,
  });

  const user = await createUser({
    email: data.email,
    passwordHash,
    role: "employer",
  });

  await createEmployerAccount({
    userId: user.id,
    companyId: company.id,
  });

  await prisma.user.update({
    where: { id: user.id },
    data: {
      verificationToken: token,
      verificationExpires: tokenExpires,
    },
  });

  await createNotification(user.id, "email", "welcome", "Welcome to JobPortal Employer", { email: user.email, role: user.role, companyId: company.id });
  await createNotification(user.id, "email", "verification", "Verify your email - JobPortal", { email: user.email });
  sendVerificationEmail(user.email, data.companyName, token).catch((err) => console.error("[email] employer verification failed:", err));
  sendWelcomeEmail(user.email, data.companyName).catch((err) => console.error("[email] employer welcome failed:", err));

  const refreshToken = await createRefreshSession(user.id, user.role);

  return {
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      companyId: company.id,
      companyName: company.displayName,
      emailVerified: false,
    },
    accessToken: createAccessToken(user.id, user.role),
    refreshToken,
  };
}
