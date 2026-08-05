"use client";

import { useState, useMemo } from "react";
import {
  MOCK_RECRUITER_KPIS,
  MOCK_PLAN_USAGE,
  MOCK_JOB_POSTINGS,
  MOCK_JOB_APPLICANTS,
  MOCK_HIRING_ANALYTICS,
  MOCK_RECRUITER_CAMPAIGNS,
  MOCK_RECRUITER_INTERVIEWS,
  MOCK_TEAM_MEMBERS,
  MOCK_TASKS_AND_APPROVALS,
} from "@/lib/mock-data/recruiter";
import { Job, JobApplication } from "@/lib/types";

export function useRecruiterOverview() {
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
  /** Which job's applicants are displayed in the pipeline board */
  const [pipelineJobId, setPipelineJobId] = useState<string>(MOCK_JOB_POSTINGS[0]?.id ?? "");

  // Bulk selection for applicant pipeline
  const [selectedApplicantIds, setSelectedApplicantIds] = useState<string[]>([]);

  // ── Slide-over detail panels ────────────────────────────────────────────
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [selectedApplicant, setSelectedApplicant] = useState<JobApplication | null>(null);

  // ── Job Postings filtering + pagination ────────────────────────────────
  const filteredJobs = useMemo(() => {
    return MOCK_JOB_POSTINGS.filter((job) => {
      if (jobFilter !== "All" && job.status.toLowerCase() !== jobFilter.toLowerCase()) return false;
      if (departmentFilter !== "All" && job.department !== departmentFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        if (!job.title.toLowerCase().includes(q) && !job.department.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [jobFilter, departmentFilter, searchQuery]);

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
    allJobs: MOCK_JOB_POSTINGS,
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

    // Applicant pipeline
    allApplicants: MOCK_JOB_APPLICANTS,
    pipelineJobId,
    handlePipelineJobChange,
    selectedApplicantIds,
    toggleApplicantSelection,
    handleBulkApplicantAction,

    // Supporting data
    hiringAnalytics: MOCK_HIRING_ANALYTICS,
    campaigns: MOCK_RECRUITER_CAMPAIGNS,
    interviews: MOCK_RECRUITER_INTERVIEWS,
    teamMembers: MOCK_TEAM_MEMBERS,
    tasks: MOCK_TASKS_AND_APPROVALS,

    // Slide-over detail panels
    selectedJob,
    setSelectedJob,
    selectedApplicant,
    setSelectedApplicant,
  };
}
