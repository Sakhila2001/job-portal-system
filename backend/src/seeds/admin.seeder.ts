import "dotenv/config";
import bcrypt from "bcryptjs";
import prisma from "../lib/prisma";

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

// Standalone execution support
if (process.argv[1]?.includes("admin.seeder")) {
  console.log(`[seed] Running admin seeder (${ADMIN_EMAIL})...`);
  seedAdmin()
    .then((admin) => {
      console.log(`[seed] Admin ready: ${admin.email} (role: ${admin.role})`);
      console.log(`[seed] Credentials -> email: ${ADMIN_EMAIL}, password: ${ADMIN_PASSWORD}`);
    })
    .catch((error) => {
      console.error("[seed] Admin seeder failed:", error);
      process.exitCode = 1;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

export { seedAdmin, ADMIN_EMAIL, ADMIN_PASSWORD };