import prisma from "../../../lib/prisma.js";
import { sendVerificationEmail } from "../register/register.service.js";

export async function verifyEmail(token: string) {
  const user = await prisma.user.findFirst({
    where: {
      verificationToken: token,
      verificationExpires: { gt: new Date() },
    },
    select: { id: true, email: true, role: true },
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

  const token = global.crypto.randomUUID ? global.crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      verificationToken: token,
      verificationExpires: expires,
    },
  });

  await sendVerificationEmail(user.email, name, token);
}
