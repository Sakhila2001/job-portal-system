import "dotenv/config";
import { seedAdmin, ADMIN_EMAIL, ADMIN_PASSWORD } from "./admin.seeder";
import { seedDepartments } from "./department.seeder";
import { seedDesignations } from "./designation.seeder";
import { seedJobs } from "./job.seeder";
import prisma from "../lib/prisma";

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

  if (target === "job" || target === "jobs") {
    console.log(`[seed] Running ONLY job seeder...`);
    const jobIds = await seedJobs();
    console.log(`[seed] ${jobIds.length} job(s) seeded.`);
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

  console.log(`[seed] 4. Seeding jobs...`);
  const jobIds = await seedJobs();
  console.log(`[seed] ${jobIds.length} job(s) seeded.`);
}

main()
  .catch((error) => {
    console.error("[seed] Seeder failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
