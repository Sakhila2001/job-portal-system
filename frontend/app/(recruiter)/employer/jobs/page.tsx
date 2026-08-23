"use client";

import React, { useState } from "react";
import DashboardShell from "@/components/layout/DashboardShell";
import JobPostingsTable from "@/components/recruiter/JobPostingsTable";
import { useRecruiterOverview } from "@/hooks/useRecruiterOverview";
import { getRecruiterNavItems } from "@/lib/recruiter-nav";
import { CreateJobModal } from "@/components/recruiter/RecruiterModals";
import { Job } from "@/lib/types";
import { CheckCircle2, Plus } from "lucide-react";

import JobRequisitionDetailPanel from "@/components/recruiter/JobRequisitionDetailPanel";
import { ScheduleInterviewModal } from "@/components/recruiter/RecruiterModals";

export default function RecruiterJobsPage() {
  const {
    jobs,
    isLoadingJobs,
    totalJobsCount,
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
    refetchJobs,
    addInterview,
    selectedJob,
    setSelectedJob,
    tasks,
  } = useRecruiterOverview();

  const [isCreateJobOpen, setIsCreateJobOpen] = useState(false);
  const [jobToEdit, setJobToEdit] = useState<Job | null>(null);
  const [isScheduleInterviewOpen, setIsScheduleInterviewOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  return (
    <DashboardShell
      brandTitle="JPS"
      brandSubtitle="Employer Dashboard"
      navItems={getRecruiterNavItems("/employer/jobs", tasks.length)}
      searchPlaceholder="Search job requisitions..."
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      primaryActionLabel="Post New Job"
      onPrimaryAction={() => setIsCreateJobOpen(true)}
      userAvatarText="JE"
      detailPanelOpen={!!selectedJob}
      onCloseDetailPanel={() => setSelectedJob(null)}
      detailPanelTitle="Job Requisition Details"
      detailPanelContent={
        selectedJob ? (
          <JobRequisitionDetailPanel
            job={selectedJob}
            onEdit={(j) => { setJobToEdit(j); setSelectedJob(null); }}
            onScheduleInterview={() => { setIsScheduleInterviewOpen(true); setSelectedJob(null); }}
            onBoostCampaign={(j) => { setToast(`Launching boost campaign for "${j.title}"`); setSelectedJob(null); }}
            onClosePosting={(j) => { setToast(`Closed posting "${j.title}"`); setSelectedJob(null); }}
          />
        ) : null
      }
    >
      <ScheduleInterviewModal
        isOpen={isScheduleInterviewOpen}
        onClose={() => setIsScheduleInterviewOpen(false)}
        onInterviewScheduled={(inv) => addInterview(inv)}
      />
      <CreateJobModal
        isOpen={isCreateJobOpen}
        onClose={() => setIsCreateJobOpen(false)}
        onJobCreated={(newJob) => addJob(newJob)}
      />
      <CreateJobModal
        isOpen={!!jobToEdit}
        job={jobToEdit}
        onClose={() => setJobToEdit(null)}
        onJobCreated={() => undefined}
        onJobUpdated={async () => {
          const title = jobToEdit?.title || "Job";
          await refetchJobs();
          setToast(`Updated "${title}" successfully`);
          setTimeout(() => setToast(null), 3000);
        }}
      />

      {toast && (
        <div className="fixed right-5 top-5 z-[60] flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-3 text-[12px] font-semibold text-white shadow-lg">
          <CheckCircle2 className="h-4 w-4" /> {toast}
        </div>
      )}

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
          <div>
            <h1 className="text-[20px] font-bold text-slate-900 tracking-tight">Job Postings</h1>
            <p className="text-[13px] text-slate-500 mt-0.5">
              Manage live job requisitions, view metrics, and edit postings
            </p>
          </div>
          <button
            onClick={() => setIsCreateJobOpen(true)}
            className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-[12px] font-semibold px-4 py-2 rounded-lg transition shrink-0"
          >
            <Plus className="h-4 w-4" />
            <span>Post New Job</span>
          </button>
        </div>

        <JobPostingsTable
          jobs={jobs}
          isLoading={isLoadingJobs}
          totalJobsCount={totalJobsCount}
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          jobFilter={jobFilter}
          onJobFilterChange={setJobFilter}
          departmentFilter={departmentFilter}
          onDepartmentFilterChange={setDepartmentFilter}
          sortBy={sortBy}
          onSortByChange={setSortBy}
          onClearFilters={handleClearJobFilters}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedJobIds={selectedJobIds}
          onToggleSelectJob={toggleJobSelection}
          onToggleSelectAll={toggleAllJobsOnPage}
          onBulkAction={handleBulkJobAction}
          onViewJob={setSelectedJob}
          onEditJob={setJobToEdit}
          onNewJob={() => setIsCreateJobOpen(true)}
        />
      </div>
    </DashboardShell>
  );
}
