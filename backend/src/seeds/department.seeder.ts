import "dotenv/config";
import prisma from "../lib/prisma";
import { ADMIN_EMAIL } from "./admin.seeder";

const DEFAULT_DEPARTMENTS = [
  // Tech & Product
  "Engineering",
  "Product & Design",
  "Data & Analytics",
  "Quality Assurance",
  "DevOps & Infrastructure",
  "IT & Systems Administration",
  "Cybersecurity",
  "Research & Development",

  // Business & Growth
  "Marketing & Growth",
  "Sales & Business Development",
  "Customer Support",
  "Customer Success",
  "Public Relations & Communications",
  "Business Analysis",

  // Operations & Finance
  "Finance & Accounting",
  "Operations & Supply Chain",
  "Procurement & Purchasing",
  "Logistics & Warehousing",
  "Facilities & Administration",
  "Project & Program Management",

  // People & Legal
  "Human Resources",
  "Legal & Compliance",
  "Training & Development",
  "Recruitment & Talent Acquisition",

  // Industry-specific
  "Healthcare & Medical",
  "Education & Training",
  "Manufacturing & Production",
  "Construction & Engineering Services",
  "Hospitality & Tourism",
  "Retail & Merchandising",
  "Banking & Financial Services",
  "Media & Entertainment",
  "Agriculture & Environment",
  "Non-Profit & Social Work",
];

export async function seedDepartments() {
  const admin = await prisma.user.findUnique({
    where: { email: ADMIN_EMAIL },
    select: { id: true },
  });

  if (!admin) {
    console.log(
      `[seed] Note: Admin user "${ADMIN_EMAIL}" not found. Seeding departments without creator association.`
    );
  }

  const seededDepartments = [];

  for (const name of DEFAULT_DEPARTMENTS) {
    const existing = await prisma.department.findFirst({
      where: {
        departmentName: {
          equals: name,
          mode: "insensitive",
        },
      },
    });

    if (existing) {
      seededDepartments.push(existing);
      continue;
    }

    const created = await prisma.department.create({
      data: {
        departmentName: name,
        ...(admin ? { createdBy: admin.id, updatedBy: admin.id } : {}),
      },
    });

    seededDepartments.push(created);
  }

  console.log(
    `[seed] Seeded ${seededDepartments.length} department(s) successfully.`
  );

  return seededDepartments;
}

// Standalone execution support
if (process.argv[1]?.includes("department.seeder")) {
  console.log("[seed] Running department seeder...");
  seedDepartments()
    .then((deps) => {
      console.log(`[seed] Completed seeding ${deps.length} departments.`);
    })
    .catch((error) => {
      console.error("[seed] Department seeder failed:", error);
      process.exitCode = 1;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
