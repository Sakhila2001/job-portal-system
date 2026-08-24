"use client";

import { useState, useMemo } from "react";
import {
  MOCK_CANDIDATE_PROFILE,
  MOCK_CANDIDATE_KPIS,
  MOCK_CANDIDATE_APPLICATIONS,
  MOCK_RECOMMENDED_JOBS,
  MOCK_CANDIDATE_INTERVIEWS,
  MOCK_SKILL_GAPS,
  MOCK_CANDIDATE_NOTIFICATIONS,
} from "@/lib/mock-data/candidate";
import { Job, JobApplication } from "@/lib/types";

const JOB_DESCRIPTIONS = [
  "Build and maintain reliable backend services, APIs, and data integrations. Collaborate with product and engineering teams to ship secure, scalable features.",
  "Design end-to-end product features across the application stack, with a focus on performance, maintainability, and a polished user experience.",
  "Develop robust web applications, improve existing services, and contribute to technical decisions across a collaborative engineering team.",
];

const JOB_SKILLS = [
  ["Laravel", "PHP", "MySQL", "REST APIs", "Git"],
  ["React", "Node.js", "TypeScript", "PostgreSQL", "Docker"],
  ["PHP", "Laravel", "Redis", "Docker", "AWS"],
];

function getAppliedJob(application: JobApplication): Job {
  const index = application.sn - 1;
  const workMode = application.location.toLowerCase() === "remote" ? "Remote" : index % 2 === 0 ? "Hybrid" : "On-site";
  const salary = Number(application.salaryText.replace(/[^\d]/g, "")) || 0;

  return {
    id: application.jobId,
    companyId: `company-${application.jobId}`,
    companyName: application.companyName,
    title: application.jobTitle,
    designation: application.jobTitle,
    department: "Engineering",
    employmentType: index % 4 === 3 ? "Contract" : "Full-time",
    workMode,
    seniorityLevel: index % 3 === 0 ? "Senior" : index % 3 === 1 ? "Mid-level" : "Associate",
    location: application.location,
    locations: [application.location],
    minExperienceMonths: index % 3 === 2 ? 12 : 24,
    maxExperienceMonths: index % 3 === 0 ? 60 : 48,
    minSalary: salary ? salary * 12 : null,
    maxSalary: salary ? Math.round(salary * 1.3) * 12 : null,
    salaryCurrency: "NPR",
    salaryText: application.salaryText,
    applicantsCount: 0,
    viewsCount: 0,
    postedDate: application.appliedDate,
    status: "live",
    description: JOB_DESCRIPTIONS[index % JOB_DESCRIPTIONS.length],
    skills: JOB_SKILLS[index % JOB_SKILLS.length],
    qualifications: ["Bachelor's degree in Computer Science or a related field", "Strong problem-solving and communication skills"],
    benefits: ["Health insurance", "Flexible work schedule", "Learning budget"],
    tags: ["engineering", workMode.toLowerCase(), application.jobTitle.toLowerCase().replaceAll(" ", "-")],
  };
}

export function useCandidateOverview() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);

  // Client-side filtering
  const filteredApplications = useMemo(() => {
    return MOCK_CANDIDATE_APPLICATIONS.filter((app) => {
      // Status filter
      if (activeFilter !== "All") {
        const f = activeFilter.toLowerCase();
        if (f === "rejected" && app.status !== "rejected" && app.status !== "not selected") return false;
        if (f !== "rejected" && app.status.toLowerCase() !== f) return false;
      }
      // Search text filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchRole = app.jobTitle.toLowerCase().includes(q);
        const matchCompany = app.companyName.toLowerCase().includes(q);
        const matchLocation = app.location.toLowerCase().includes(q);
        if (!matchRole && !matchCompany && !matchLocation) return false;
      }
      return true;
    });
  }, [activeFilter, searchQuery]);

  // Client-side pagination
  const totalPages = Math.ceil(filteredApplications.length / pageSize) || 1;
  const paginatedApplications = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredApplications.slice(start, start + pageSize);
  }, [filteredApplications, currentPage, pageSize]);

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setActiveFilter("All");
    setSearchQuery("");
    setCurrentPage(1);
  };

  return {
    profile: MOCK_CANDIDATE_PROFILE,
    kpis: MOCK_CANDIDATE_KPIS,
    applications: paginatedApplications.map((application) => ({ ...application, job: getAppliedJob(application) })),
    totalApplicationsCount: filteredApplications.length,
    currentPage,
    totalPages,
    pageSize,
    setCurrentPage,
    activeFilter,
    handleFilterChange,
    handleClearFilters,
    searchQuery,
    setSearchQuery,
    recommendedJobs: MOCK_RECOMMENDED_JOBS,
    upcomingInterviews: MOCK_CANDIDATE_INTERVIEWS,
    skillGaps: MOCK_SKILL_GAPS,
    notifications: MOCK_CANDIDATE_NOTIFICATIONS,
    selectedApplication,
    setSelectedApplication,
  };
}
