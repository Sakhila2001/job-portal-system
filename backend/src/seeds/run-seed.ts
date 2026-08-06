import "dotenv/config";
import { seedAdmin, ADMIN_EMAIL, ADMIN_PASSWORD } from "./admin.seeder.js";
import prisma from "../lib/prisma.js";

async function main() {
  console.log(`[seed] Seeding admin user (${ADMIN_EMAIL})...`);
  const admin = await seedAdmin();
  console.log(`[seed] Admin ready: ${admin.email} (role: ${admin.role})`);
  console.log(`[seed] Credentials -> email: ${ADMIN_EMAIL}, password: ${ADMIN_PASSWORD}`);
}

main()
  .catch((error) => {
    console.error("[seed] Failed to seed admin:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
