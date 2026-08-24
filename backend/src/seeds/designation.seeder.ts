import "dotenv/config";
import prisma from "../lib/prisma";
import { ADMIN_EMAIL } from "./admin.seeder";

const DEFAULT_DESIGNATIONS = [
  // Software & Engineering
  "Software Engineer",
  "Senior Software Engineer",
  "Lead Software Engineer",
  "Principal Software Engineer",
  "Frontend Developer",
  "Senior Frontend Developer",
  "Backend Developer",
  "Senior Backend Developer",
  "Full Stack Developer",
  "Senior Full Stack Developer",
  "Mobile App Developer (iOS/Android)",
  "DevOps Engineer",
  "Senior DevOps Engineer",
  "Site Reliability Engineer (SRE)",
  "Cloud Solutions Architect",
  "QA / Test Automation Engineer",
  "Security Engineer",
  "Embedded Systems Engineer",

  // Product & Data
  "Product Manager",
  "Senior Product Manager",
  "Director of Product",
  "UI/UX Designer",
  "Senior Product Designer",
  "Data Analyst",
  "Data Scientist",
  "Data Engineer",
  "Machine Learning / AI Engineer",
  "Business Analyst",

  // Management & Leadership
  "Engineering Manager",
  "Director of Engineering",
  "Chief Technology Officer (CTO)",
  "Chief Executive Officer (CEO)",
  "Chief Operating Officer (COO)",
  "Chief Product Officer (CPO)",
  "Technical Lead",

  // Business & Operations
  "Marketing Specialist",
  "Digital Marketing Manager",
  "SEO Specialist",
  "Content Strategist",
  "Sales Executive",
  "Account Manager",
  "Business Development Manager",
  "Customer Success Manager",
  "Customer Support Specialist",
  "HR Manager",
  "Talent Acquisition Specialist",
  "Financial Analyst",
  "Accountant",
  "Operations Manager",
  "Legal Counsel",
];

export async function seedDesignations() {
  const admin = await prisma.user.findUnique({
    where: { email: ADMIN_EMAIL },
    select: { id: true },
  });

  if (!admin) {
    console.log(
      `[seed] Note: Admin user "${ADMIN_EMAIL}" not found. Seeding designations without creator association.`
    );
  }

  const seededDesignations = [];

  for (const title of DEFAULT_DESIGNATIONS) {
    const existing = await prisma.designation.findFirst({
      where: {
        designationName: {
          equals: title,
          mode: "insensitive",
        },
      },
    });

    if (existing) {
      seededDesignations.push(existing);
      continue;
    }

    const created = await prisma.designation.create({
      data: {
        designationName: title,
        ...(admin ? { createdBy: admin.id, updatedBy: admin.id } : {}),
      },
    });

    seededDesignations.push(created);
  }

  console.log(
    `[seed] Seeded ${seededDesignations.length} designation(s) successfully.`
  );

  return seededDesignations;
}

// Standalone execution support
if (process.argv[1]?.includes("designation.seeder")) {
  console.log("[seed] Running designation seeder...");
  seedDesignations()
    .then((items) => {
      console.log(`[seed] Completed seeding ${items.length} designations.`);
    })
    .catch((error) => {
      console.error("[seed] Designation seeder failed:", error);
      process.exitCode = 1;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
