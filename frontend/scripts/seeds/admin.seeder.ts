import bcrypt from "bcryptjs";
import prisma from "../../lib/server/prisma";

const ADMIN_EMAIL = "admin@jps.com";
const ADMIN_PASSWORD = "adminJPS12345";

async function seedAdmin() {
  const existing = await prisma.user.findUnique({
    where: { email: ADMIN_EMAIL },
  });

  if (existing) {
    console.log(`[seed] Admin user "${ADMIN_EMAIL}" already exists. Skipping.`);
    return existing;
  }

  const passwordHash = bcrypt.hashSync(ADMIN_PASSWORD, 10);

  const admin = await prisma.user.create({
    data: {
      email: ADMIN_EMAIL,
      passwordHash,
      role: "admin",
      status: "active",
      emailVerified: true,
    },
    select: { id: true, email: true, role: true },
  });

  console.log(`[seed] Admin user created: ${admin.email} (role: ${admin.role})`);
  return admin;
}

export { seedAdmin, ADMIN_EMAIL, ADMIN_PASSWORD };
