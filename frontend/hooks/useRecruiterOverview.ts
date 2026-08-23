"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  MOCK_RECRUITER_KPIS,
  MOCK_PLAN_USAGE,
  MOCK_JOB_APPLICANTS,
  MOCK_HIRING_ANALYTICS,
  MOCK_RECRUITER_CAMPAIGNS,
  MOCK_RECRUITER_INTERVIEWS,
  MOCK_TEAM_MEMBERS,
  MOCK_TASKS_AND_APPROVALS,
  MOCK_MESSAGE_THREADS,
} from "@/lib/mock-data/recruiter";
import { Job, JobApplication, Interview, CampaignPerformance, MessageThread } from "@/lib/types";

/* ─────────────────── API ➜ Frontend Job Transformer ─────────────────── */

function formatDateShort(dateStr: string | null | undefined): string {
  if (!dateStr) return "—";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "—";
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } catch {
    return "—";
  }
}

function computeExpiresInDays(expiresAt: string | null | undefined): number | null {
  if (!expiresAt) return null;
  try {
    const diff = new Date(expiresAt).getTime() - Date.now();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  } catch {
    return null;
  }
}

function mapWorkMode(raw: string | null | undefined): "Remote" | "Hybrid" | "On-site" {
  const wm = (raw || "").toUpperCase();
  if (wm === "REMOTE") return "Remote";
  if (wm === "HYBRID") return "Hybrid";
  return "On-site";
}

function mapStatus(raw: string | null | undefined): "live" | "draft" | "expiring" | "closed" {
  const s = (raw || "").toUpperCase();
  if (s === "PUBLISHED") return "live";
  if (s === "CLOSED") return "closed";
  if (s === "DRAFT") return "draft";
  if (s === "SUSPENDED") return "closed";
  return "draft";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function transformApiJobToJob(apiJob: any): Job {
  // Extract nested department name
  const department =
    typeof apiJob.department === "object" && apiJob.department !== null
      ? apiJob.department.departmentName || apiJob.department.name || ""
      : typeof apiJob.department === "string"
      ? apiJob.department
      : "";

  // Extract nested designation name
  const designation =
    typeof apiJob.designation === "object" && apiJob.designation !== null
      ? apiJob.designation.designationName || apiJob.designation.name || ""
      : typeof apiJob.designation === "string"
      ? apiJob.designation
      : "";

  // Extract company name
  const companyName =
    typeof apiJob.company === "object" && apiJob.company !== null
      ? apiJob.company.displayName || apiJob.company.name || ""
      : apiJob.companyName || "";

  const companyId =
    typeof apiJob.company === "object" && apiJob.company !== null
      ? apiJob.company.id || apiJob.companyId || ""
      : apiJob.companyId || "";

  // Extract locations
  const locations: string[] = Array.isArray(apiJob.locations)
    ? apiJob.locations.map((loc: any) =>
        typeof loc === "object" && loc !== null
          ? loc.location?.city || loc.city || String(loc)
          : String(loc)
      )
    : [];

  // Extract required and preferred skills separately so editing preserves both.
  const skillItems = Array.isArray(apiJob.skills) ? apiJob.skills : [];
  const skillName = (skill: any) =>
    typeof skill === "object" && skill !== null
      ? skill.skill?.skillName || skill.name || skill.skillName || String(skill)
      : String(skill);
  const skills: string[] = skillItems
    .filter((skill: any) => skill?.isMandatory !== false)
    .map(skillName);
  const preferredSkills: string[] = skillItems
    .filter((skill: any) => skill?.isMandatory === false)
    .map(skillName);

  // Extract responsibilities
  const responsibilities: string[] = Array.isArray(apiJob.responsibilities)
    ? apiJob.responsibilities.map((r: any) =>
        typeof r === "object" && r !== null
          ? r.responsibility || String(r)
          : String(r)
      )
    : [];

  // Extract qualifications
  const qualifications: string[] = Array.isArray(apiJob.qualifications)
    ? apiJob.qualifications.map((q: any) =>
        typeof q === "object" && q !== null
          ? q.qualification?.qualificationName || q.name || q.qualificationName || String(q)
          : String(q)
      )
    : [];

  // Extract benefits
  const benefits: string[] = Array.isArray(apiJob.benefits)
    ? apiJob.benefits.map((b: any) =>
        typeof b === "object" && b !== null
          ? b.benefit?.benefitName || b.name || b.benefitName || String(b)
          : String(b)
      )
    : [];

  // Extract tags
  const tags: string[] = Array.isArray(apiJob.tags)
    ? apiJob.tags.map((t: any) =>
        typeof t === "object" && t !== null
          ? t.tag?.tagName || t.name || t.tagName || String(t)
          : String(t)
      )
    : [];

  // Extract media
  const media: string[] = Array.isArray(apiJob.media)
    ? apiJob.media.map((m: any) =>
        typeof m === "object" && m !== null ? m.mediaUrl || String(m) : String(m)
      )
    : [];

  // Compute expires status override
  const expiresInDays = computeExpiresInDays(apiJob.expiresAt);
  let status = mapStatus(apiJob.status);
  if (status === "live" && expiresInDays !== null && expiresInDays <= 5) {
    status = "expiring";
  }

  // Salary text
  const minSalary = apiJob.minSalary ?? apiJob.salaryMin ?? null;
  const maxSalary = apiJob.maxSalary ?? apiJob.salaryMax ?? null;
  const currency = apiJob.salaryCurrency || "NPR";
  let salaryText = "";
  if (minSalary != null && maxSalary != null) {
    salaryText = `${currency} ${(minSalary / 100000).toFixed(1)}L – ${(maxSalary / 100000).toFixed(1)}L / year`;
  } else if (minSalary != null) {
    salaryText = `${currency} ${(minSalary / 100000).toFixed(1)}L+ / year`;
  } else if (maxSalary != null) {
    salaryText = `Up to ${currency} ${(maxSalary / 100000).toFixed(1)}L / year`;
  }

  // Posted date
  const postedDate = apiJob.publishedAt
    ? formatDateShort(apiJob.publishedAt)
    : apiJob.createdAt
    ? formatDateShort(apiJob.createdAt)
    : "—";

  return {
    id: apiJob.id,
    companyId,
    companyName,
    title: apiJob.title || "Untitled Job",
    designation,
    department,
    employmentType: apiJob.employmentType || "Full-time",
    workMode: mapWorkMode(apiJob.workMode),
    seniorityLevel: apiJob.seniorityLevel || undefined,
    location: locations[0] || apiJob.location || "",
    minExperienceMonths: apiJob.minExperienceMonths ?? null,
    maxExperienceMonths: apiJob.maxExperienceMonths ?? null,
    minSalary,
    maxSalary,
    salaryCurrency: currency,
    showSalary: apiJob.showSalary ?? true,
    salaryText,
    applicantsCount: apiJob._count?.applications ?? apiJob.applicantsCount ?? 0,
    viewsCount: apiJob._count?.views ?? apiJob.viewsCount ?? 0,
    postedDate,
    expiresInDays,
    expiresAt: apiJob.expiresAt || null,
    status,
    description: apiJob.description || "",
    skills,
    preferredSkills,
    responsibilities,
    qualifications,
    benefits,
    tags,
    locations,
    media,
  };
}

/* ─────────────────── MAIN HOOK ─────────────────── */

export function useRecruiterOverview() {
  const { tokens } = useAuth();

  // Dynamic state arrays
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [isLoadingJobs, setIsLoadingJobs] = useState(true);
  const [allApplicants, setAllApplicants] = useState<JobApplication[]>(MOCK_JOB_APPLICANTS);
  const [interviews, setInterviews] = useState<Interview[]>(MOCK_RECRUITER_INTERVIEWS);
  const [campaigns, setCampaigns] = useState<CampaignPerformance[]>(MOCK_RECRUITER_CAMPAIGNS);
  const [messageThreads, setMessageThreads] = useState<MessageThread[]>(MOCK_MESSAGE_THREADS);

  // ── Fetch real jobs from API ────────────────────────────────────────────
  const fetchJobs = useCallback(async () => {
    setIsLoadingJobs(true);
    try {
      const headers: Record<string, string> = {};
      if (tokens.accessToken) {
        headers["Authorization"] = `Bearer ${tokens.accessToken}`;
      }

      const res = await fetch("/api/recruiter/jobs?page=1&limit=100", {
        headers,
        credentials: "include",
      });

      if (!res.ok) {
        console.error("[useRecruiterOverview] Failed to fetch jobs:", res.status);
        setIsLoadingJobs(false);
        return;
      }

      const data = await res.json();
      const items = Array.isArray(data.items) ? data.items : Array.isArray(data) ? data : [];
      const transformed = items.map(transformApiJobToJob);
      setAllJobs(transformed);
    } catch (err) {
      console.error("[useRecruiterOverview] Error fetching jobs:", err);
    } finally {
      setIsLoadingJobs(false);
    }
  }, [tokens.accessToken]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  // ── Job Postings table state ────────────────────────────────────────────
  const [jobFilter, setJobFilter] = useState<string>("All");
  const [departmentFilter, setDepartmentFilter] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("Newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  // Bulk selection for job postings table
  const [selectedJobIds, setSelectedJobIds] = useState<string[]>([]);

  // ── Applicant Pipeline state ────────────────────────────────────────────
  const [pipelineJobId, setPipelineJobId] = useState<string>("");
  const [selectedApplicantIds, setSelectedApplicantIds] = useState<string[]>([]);

  // Update pipelineJobId when allJobs loads
  useEffect(() => {
    if (allJobs.length > 0 && !pipelineJobId) {
      setPipelineJobId(allJobs[0].id);
    }
  }, [allJobs, pipelineJobId]);

  // ── Slide-over detail panels ────────────────────────────────────────────
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [selectedApplicant, setSelectedApplicant] = useState<JobApplication | null>(null);

  // ── Unique departments derived from real fetched jobs ────────────────────
  const uniqueDepartments = useMemo(() => {
    const deptSet = new Set<string>();
    allJobs.forEach((job) => {
      if (job.department) deptSet.add(job.department);
    });
    return Array.from(deptSet).sort();
  }, [allJobs]);

  // ── Add Handlers ────────────────────────────────────────────────────────
  const addJob = (newJob: any) => {
    // Transform the API response into a frontend Job & prepend to the list
    const formattedJob = transformApiJobToJob(newJob);
    setAllJobs((prev) => [formattedJob, ...prev]);
  };

  const addInterview = (newInterview: Interview) => {
    setInterviews((prev) => [newInterview, ...prev]);
  };

  const addCampaign = (newCampaign: CampaignPerformance) => {
    setCampaigns((prev) => [newCampaign, ...prev]);
  };

  // ── Job Postings filtering + pagination ────────────────────────────────
  const filteredJobs = useMemo(() => {
    return allJobs.filter((job) => {
      if (jobFilter !== "All" && job.status.toLowerCase() !== jobFilter.toLowerCase()) return false;
      if (departmentFilter !== "All" && job.department !== departmentFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        if (
          !job.title.toLowerCase().includes(q) &&
          !job.department.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [allJobs, jobFilter, departmentFilter, searchQuery]);

  const totalPages = Math.ceil(filteredJobs.length / pageSize) || 1;
  const paginatedJobs = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredJobs.slice(start, start + pageSize);
  }, [filteredJobs, currentPage, pageSize]);

  // ── Selection helpers ───────────────────────────────────────────────────
  const toggleJobSelection = (id: string) => {
    setSelectedJobIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleAllJobsOnPage = () => {
    const pageIds = paginatedJobs.map((j) => j.id);
    const allSelected = pageIds.every((id) => selectedJobIds.includes(id));
    if (allSelected) {
      setSelectedJobIds((prev) => prev.filter((id) => !pageIds.includes(id)));
    } else {
      setSelectedJobIds((prev) => Array.from(new Set([...prev, ...pageIds])));
    }
  };

  const toggleApplicantSelection = (id: string) => {
    setSelectedApplicantIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // ── Filter / clear handlers ─────────────────────────────────────────────
  const handleClearJobFilters = () => {
    setJobFilter("All");
    setDepartmentFilter("All");
    setSortBy("Newest");
    setSearchQuery("");
    setCurrentPage(1);
  };

  // ── Bulk action handlers ────────────────────────────────────────────────
  const handleBulkJobAction = (action: string) => {
    alert(`Bulk ${action} applied to ${selectedJobIds.length} job(s)`);
    setSelectedJobIds([]);
  };

  const handleBulkApplicantAction = (action: string) => {
    alert(`Bulk ${action} applied to ${selectedApplicantIds.length} applicant(s)`);
    setSelectedApplicantIds([]);
  };

  // Reset applicant checkboxes when switching job in pipeline
  const handlePipelineJobChange = (jobId: string) => {
    setPipelineJobId(jobId);
    setSelectedApplicantIds([]);
  };

  return {
    // KPIs & plan
    kpis: MOCK_RECRUITER_KPIS,
    planUsage: MOCK_PLAN_USAGE,

    // Job postings
    jobs: paginatedJobs,
    allJobs,
    isLoadingJobs,
    totalJobsCount: filteredJobs.length,
    currentPage,
    totalPages,
    pageSize,
    setCurrentPage,
    jobFilter,
    setJobFilter,
    departmentFilter,
    setDepartmentFilter,
    sortBy,
    setSortBy,
    searchQuery,
    setSearchQuery,
    handleClearJobFilters,
    selectedJobIds,
    toggleJobSelection,
    toggleAllJobsOnPage,
    handleBulkJobAction,
    addJob,
    refetchJobs: fetchJobs,
    uniqueDepartments,

    // Applicant pipeline
    allApplicants,
    pipelineJobId,
    handlePipelineJobChange,
    selectedApplicantIds,
    toggleApplicantSelection,
    handleBulkApplicantAction,

    // Supporting data
    hiringAnalytics: MOCK_HIRING_ANALYTICS,
    campaigns,
    addCampaign,
    interviews,
    addInterview,
    teamMembers: MOCK_TEAM_MEMBERS,
    tasks: MOCK_TASKS_AND_APPROVALS,

    // Messages inbox
    messageThreads,
    setMessageThreads,
    totalUnreadMessages: messageThreads.reduce((s, t) => s + t.unreadCount, 0),

    // Slide-over detail panels
    selectedJob,
    setSelectedJob,
    selectedApplicant,
    setSelectedApplicant,
  };
}
