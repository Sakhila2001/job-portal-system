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
import { JobApplication } from "@/lib/types";

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
    applications: paginatedApplications,
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
