import "dotenv/config";
import prisma from "../lib/prisma";

/**
 * Seeds sample published jobs tied to seeded companies/employers.
 * Run with: pnpm tsx src/seeds/run-seed.ts jobs
 *
 * Prerequisites:
 *  - The admin user must already exist (run `pnpm tsx src/seeds/run-seed.ts admin` first).
 *  - An EmployerAccount must be associated to the admin user (created via POST /api/auth/register/employer).
 *
 * The seeder is idempotent — it checks for existing jobs by title + companyId before creating.
 */

const SAMPLE_JOBS = [
  {
    companyDisplayName: "Energizer Solutions",
    title: "Intern/Junior Hiring – Young and Dynamic Folks",
    description:
      "Are you a young and dynamic individual passionate about technology? Energizer is hiring Junior Developers and Interns to join our fast-paced Engineering team. You will be working on modern web architectures using Next.js, React, Node, and Tailwind CSS. We offer hands-on mentorship, exciting project ownership, and a clear path to career growth.",
    employmentType: "Full Time",
    workMode: "HYBRID",
    seniorityLevel: "Junior",
    department: "Software Engineering",
    designation: "Junior Developer",
    minExperienceMonths: 0,
    maxExperienceMonths: 24,
    minSalary: 450000,
    maxSalary: 750000,
    salaryCurrency: "NPR",
    locations: ["Kathmandu"],
    skills: ["React", "Next.js", "Tailwind CSS", "JavaScript", "TypeScript"],
    responsibilities: [
      "Develop and maintain web app features using React and Next.js.",
      "Collaborate with backend engineers to integrate REST APIs.",
      "Participate in code reviews and daily standups.",
      "Write unit and integration tests for new features.",
    ],
    qualifications: [
      { name: "Bachelor in Computer Science or related field", level: "bachelors", isRequired: true },
      { name: "Familiarity with version control (Git)", isRequired: true },
    ],
    benefits: ["Health Insurance", "Flexible Work", "Learning Allowance", "Gym Membership"],
    tags: ["frontend", "react", "nextjs", "internship", "junior"],
    status: "PUBLISHED",
  },
  {
    companyDisplayName: "Energizer Solutions",
    title: "Senior Product Designer",
    description:
      "We are seeking a senior designer to lead our user research, wireframing, and interactive prototyping processes for our global energy dashboards. You should have a portfolio displaying complex analytics systems.",
    employmentType: "Full Time",
    workMode: "REMOTE",
    seniorityLevel: "Senior",
    department: "UI/UX Design",
    designation: "Senior Product Designer",
    minExperienceMonths: 60,
    maxExperienceMonths: 96,
    minSalary: 1200000,
    maxSalary: 1800000,
    salaryCurrency: "NPR",
    locations: ["Remote"],
    skills: ["Figma", "UI Design", "UX Research", "Prototyping", "Design Systems"],
    responsibilities: [
      "Lead UX discovery and user research sessions.",
      "Create wireframes, prototypes, and high-fidelity mockups.",
      "Define and maintain the company design system.",
      "Work closely with engineers to ensure pixel-perfect implementation.",
    ],
    qualifications: [
      { name: "5+ years of product design experience", isRequired: true },
      { name: "Portfolio showcasing analytics or data-heavy products", isRequired: true },
    ],
    benefits: ["Health Insurance", "Home Office Stipend", "Flexible Work"],
    tags: ["design", "ux", "figma", "senior", "remote"],
    status: "PUBLISHED",
  },
  {
    companyDisplayName: "Energizer Solutions",
    title: "Full Stack Engineer (Intern)",
    description:
      "Looking for an enthusiastic intern with experience in Node.js, Next.js, and MongoDB. You will collaborate on core features, fix active client bugs, write end-to-end tests using Playwright, and learn industry standards of Git flow, CI/CD, and serverless hosting.",
    employmentType: "Internship",
    workMode: "REMOTE",
    seniorityLevel: "Intern",
    department: "Software Engineering",
    designation: "Full Stack Intern",
    minExperienceMonths: 0,
    maxExperienceMonths: 12,
    minSalary: 30000,
    maxSalary: 50000,
    salaryCurrency: "NPR",
    locations: ["Kathmandu", "Remote"],
    skills: ["Node.js", "MongoDB", "Express", "Next.js", "GitHub"],
    responsibilities: [
      "Assist in building API endpoints using Node.js and Express.",
      "Write Playwright end-to-end tests for critical user flows.",
      "Participate in sprint planning and retrospectives.",
    ],
    qualifications: [
      { name: "Currently enrolled in or recently graduated from a CS/IT program", isRequired: true },
    ],
    benefits: ["Flexible Work", "Learning Allowance"],
    tags: ["fullstack", "nodejs", "internship", "mongodb"],
    status: "PUBLISHED",
  },
];

async function getOrCreateEmployerAccountId(): Promise<string> {
  // Use the first employer account found, or the admin user's employer account
  const account = await prisma.employerAccount.findFirst({
    orderBy: { joinedAt: "asc" },
  });

  if (account) return account.id;

  throw new Error(
    "No EmployerAccount found. Please register an employer account first via POST /api/auth/register/employer, then run the job seeder."
  );
}

async function getOrCreateCompanyId(displayName: string, employerAccountId: string): Promise<string> {
  const existing = await prisma.company.findFirst({
    where: { displayName: { equals: displayName, mode: "insensitive" } },
  });
  if (existing) return existing.id;

  const slug = displayName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  const company = await prisma.company.create({
    data: {
      legalName: displayName,
      displayName,
      slug: `${slug}-${Date.now()}`,
      companyType: "Corporate",
    },
  });

  // Associate the employer account with this company
  await prisma.employerAccount.update({
    where: { id: employerAccountId },
    data: { companyId: company.id },
  });

  return company.id;
}

export async function seedJobs() {
  console.log("[seed:jobs] Starting job seeder...");

  const employerAccountId = await getOrCreateEmployerAccountId();
  console.log(`[seed:jobs] Using employer account: ${employerAccountId}`);

  const seeded: string[] = [];

  for (const jobData of SAMPLE_JOBS) {
    const companyId = await getOrCreateCompanyId(jobData.companyDisplayName, employerAccountId);

    // Check idempotency
    const existing = await prisma.job.findFirst({
      where: {
        title: { equals: jobData.title, mode: "insensitive" },
        companyId,
      },
    });

    if (existing) {
      console.log(`[seed:jobs]  Skipping (exists): "${jobData.title}"`);
      continue;
    }

    // Designation
    let designation = await prisma.designation.findFirst({
      where: { designationName: { equals: jobData.designation, mode: "insensitive" } },
    });
    if (!designation) {
      designation = await prisma.designation.create({ data: { designationName: jobData.designation } });
    }

    // Department
    let departmentId: string | null = null;
    if (jobData.department) {
      let dept = await prisma.department.findFirst({
        where: { departmentName: { equals: jobData.department, mode: "insensitive" } },
      });
      if (!dept) {
        dept = await prisma.department.create({ data: { departmentName: jobData.department } });
      }
      departmentId = dept.id;
    }

    const job = await prisma.job.create({
      data: {
        companyId,
        createdBy: employerAccountId,
        designationId: designation.id,
        departmentId,
        title: jobData.title,
        description: jobData.description,
        employmentType: jobData.employmentType,
        workMode: jobData.workMode as "REMOTE" | "HYBRID" | "ONSITE",
        seniorityLevel: jobData.seniorityLevel,
        minExperienceMonths: jobData.minExperienceMonths,
        maxExperienceMonths: jobData.maxExperienceMonths,
        minSalary: jobData.minSalary,
        maxSalary: jobData.maxSalary,
        salaryCurrency: jobData.salaryCurrency,
        showSalary: true,
        status: jobData.status,
        publishedAt: new Date(),
      },
    });

    // Locations
    for (let i = 0; i < jobData.locations.length; i++) {
      const city = jobData.locations[i];
      let loc = await prisma.location.findFirst({ where: { city: { equals: city, mode: "insensitive" } } });
      if (!loc) {
        loc = await prisma.location.create({ data: { country: "Nepal", city } });
      }
      await prisma.jobLocation.create({
        data: { jobId: job.id, locationId: loc.id, isPrimary: i === 0 },
      });
    }

    // Skills
    for (const skillName of jobData.skills) {
      const skill = await prisma.skill.upsert({
        where: { skillName },
        update: {},
        create: { skillName },
      });
      await prisma.jobSkill.create({
        data: { jobId: job.id, skillId: skill.id, importance: "nice_to_have", isMandatory: false },
      });
    }

    // Responsibilities
    for (let i = 0; i < jobData.responsibilities.length; i++) {
      await prisma.jobResponsibility.create({
        data: { jobId: job.id, responsibility: jobData.responsibilities[i], displayOrder: i, isKey: true },
      });
    }

    // Qualifications
    for (const q of jobData.qualifications) {
      let qual = await prisma.qualification.findFirst({
        where: { qualificationName: { equals: q.name, mode: "insensitive" } },
      });
      if (!qual) {
        qual = await prisma.qualification.create({ data: { qualificationName: q.name, educationLevel: q.level ?? "bachelors" } });
      }
      await prisma.jobQualification.create({
        data: { jobId: job.id, qualificationId: qual.id, isRequired: q.isRequired ?? true, isPreferred: false },
      });
    }

    // Benefits
    for (const benefitName of jobData.benefits) {
      let benefit = await prisma.benefit.findFirst({
        where: { benefitName: { equals: benefitName, mode: "insensitive" } },
      });
      if (!benefit) {
        benefit = await prisma.benefit.create({ data: { benefitName } });
      }
      await prisma.jobBenefit.create({
        data: { jobId: job.id, benefitId: benefit.id },
      });
    }

    // Tags
    for (const tagName of jobData.tags) {
      const tag = await prisma.tag.upsert({
        where: { tagName },
        update: {},
        create: { tagName, tagType: "job" },
      });
      await prisma.jobTag.create({
        data: { jobId: job.id, tagId: tag.id },
      });
    }

    console.log(`[seed:jobs]  Created: "${job.title}" (${job.id})`);
    seeded.push(job.id);
  }

  console.log(`[seed:jobs] Done. ${seeded.length} job(s) created.`);
  return seeded;
}
