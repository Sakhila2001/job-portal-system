import "dotenv/config";
import { seedAdmin, ADMIN_EMAIL, ADMIN_PASSWORD } from "./admin.seeder.js";
import { seedDepartments } from "./department.seeder.js";
import { seedDesignations } from "./designation.seeder.js";
import prisma from "../lib/prisma.js";

async function main() {
  const target = (process.argv[2] || "").toLowerCase().trim();

  if (target === "department" || target === "departments") {
    console.log(`[seed] Running ONLY department seeder...`);
    const departments = await seedDepartments();
    console.log(`[seed] ${departments.length} department(s) ready.`);
    return;
  }

  if (target === "designation" || target === "designations") {
    console.log(`[seed] Running ONLY designation seeder...`);
    const designations = await seedDesignations();
    console.log(`[seed] ${designations.length} designation(s) ready.`);
    return;
  }

  if (target === "admin") {
    console.log(`[seed] Running ONLY admin user seeder (${ADMIN_EMAIL})...`);
    const admin = await seedAdmin();
    console.log(`[seed] Admin ready: ${admin.email} (role: ${admin.role})`);
    console.log(`[seed] Credentials -> email: ${ADMIN_EMAIL}, password: ${ADMIN_PASSWORD}`);
    return;
  }

  console.log(`[seed] Running all seeders...`);
  console.log(`[seed] 1. Seeding admin user (${ADMIN_EMAIL})...`);
  const admin = await seedAdmin();
  console.log(`[seed] Admin ready: ${admin.email} (role: ${admin.role})`);
  console.log(`[seed] Credentials -> email: ${ADMIN_EMAIL}, password: ${ADMIN_PASSWORD}`);

  console.log(`[seed] 2. Seeding departments...`);
  const departments = await seedDepartments();
  console.log(`[seed] ${departments.length} department(s) ready.`);

  console.log(`[seed] 3. Seeding designations...`);
  const designations = await seedDesignations();
  console.log(`[seed] ${designations.length} designation(s) ready.`);
}

main()
  .catch((error) => {
    console.error("[seed] Seeder failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
