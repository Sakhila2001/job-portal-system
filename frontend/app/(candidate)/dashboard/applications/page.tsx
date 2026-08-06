"use client";

import React from "react";
import DashboardShell from "@/components/layout/DashboardShell";
import ApplicationPipelineTable from "@/components/candidate/ApplicationPipelineTable";
import ApplicationDetailPanel from "@/components/candidate/ApplicationDetailPanel";
import { useCandidateOverview } from "@/hooks/useCandidateOverview";
import { getCandidateNavItems } from "@/lib/candidate-nav";

export default function CandidateApplicationsPage() {
  const {
    applications,
    totalApplicationsCount,
    currentPage,
    totalPages,
    pageSize,
    setCurrentPage,
    activeFilter,
    handleFilterChange,
    handleClearFilters,
    searchQuery,
    setSearchQuery,
    selectedApplication,
    setSelectedApplication,
    profile,
  } = useCandidateOverview();

  return (
    <DashboardShell
      brandTitle="JPS"
      brandSubtitle="Candidate Dashboard"
      navItems={getCandidateNavItems("/dashboard/applications")}
      searchPlaceholder="Search My Applications..."
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      userAvatarText={profile.avatarText}
      notificationsCount={2}
      showExport
      onExport={() => alert("Exporting applications history to CSV...")}
      detailPanelOpen={!!selectedApplication}
      onCloseDetailPanel={() => setSelectedApplication(null)}
      detailPanelTitle="Application Details"
      detailPanelContent={
        selectedApplication ? (
          <ApplicationDetailPanel application={selectedApplication} onWithdraw={(application) => alert(`Withdrawing application for ${application.jobTitle}`)} />
        ) : null
      }
    >
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
          <div>
            <h1 className="text-[20px] font-bold text-slate-900 tracking-tight">My Applications</h1>
            <p className="text-[13px] text-slate-500 mt-0.5">
              Track and manage all your job applications across recruiters
            </p>
          </div>
          <div className="flex items-center gap-3 font-mono text-[12px]">
            <div className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700">
              Total: <span className="font-bold text-slate-900">{totalApplicationsCount}</span>
            </div>
            <div className="px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800">
              Active: <span className="font-bold">3</span>
            </div>
          </div>
        </div>

        {/* Applications Main Table */}
        <ApplicationPipelineTable
          applications={applications}
          totalCount={totalApplicationsCount}
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onViewApplication={(app) => setSelectedApplication(app)}
        />
      </div>
    </DashboardShell>
  );
}
