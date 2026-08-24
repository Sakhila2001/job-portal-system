"use client";

import React, { useState, useEffect } from "react";
import DashboardShell from "@/components/layout/DashboardShell";
import KpiCard from "@/components/shared/KpiCard";
import JobPostingsTable from "@/features/recruiter/components/JobPostingsTable";
import ApplicantPipelineBoard from "@/features/recruiter/components/ApplicantPipelineBoard";
import CampaignPerformancePanel from "@/features/recruiter/components/CampaignPerformancePanel";
import TeamPanel from "@/features/recruiter/components/TeamPanel";
import MotionBarChart from "@/components/shared/MotionBarChart";
import StatusBadge from "@/components/shared/StatusBadge";
import RecruiterMessages from "@/features/recruiter/components/RecruiterMessages";
import { getRecruiterNavItems } from "@/lib/recruiter-nav";
import { CreateJobModal, ScheduleInterviewModal } from "@/features/recruiter/components/RecruiterModals";
import JobRequisitionDetailPanel from "@/features/recruiter/components/JobRequisitionDetailPanel";
import { useRecruiterOverview } from "@/features/recruiter/hooks/useRecruiterOverview";
import {
  Plus,
  Calendar,
  Megaphone,
  BarChart2,
  Download,
  CheckCircle2,
  Clock,
  Briefcase,
  Users,
} from "lucide-react";

export default function RecruiterDashboardPage() {
  const {
    kpis,
    planUsage,
    jobs,
    allJobs,
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
    allApplicants,
    pipelineJobId,
    handlePipelineJobChange,
    selectedApplicantIds,
    toggleApplicantSelection,
    handleBulkApplicantAction,
    hiringAnalytics,
    campaigns,
    interviews,
    addInterview,
    teamMembers,
    tasks,
    selectedJob,
    setSelectedJob,
    selectedApplicant,
    setSelectedApplicant,
    messageThreads,
    setMessageThreads,
    totalUnreadMessages,
  } = useRecruiterOverview();

  // Modals state
  const [isCreateJobOpen, setIsCreateJobOpen] = useState(false);
  const [isScheduleInterviewOpen, setIsScheduleInterviewOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  // Detail panel content
  const jobDetailContent = selectedJob ? (
    <JobRequisitionDetailPanel
      job={selectedJob}
      onEdit={(j) => { setToast(`Editing "${j.title}"`); setSelectedJob(null); }}
      onScheduleInterview={() => { setIsScheduleInterviewOpen(true); setSelectedJob(null); }}
      onBoostCampaign={(j) => { setToast(`Launching boost campaign for "${j.title}"`); setSelectedJob(null); }}
      onClosePosting={(j) => { setToast(`Closed posting "${j.title}"`); setSelectedJob(null); }}
    />
  ) : selectedApplicant ? (
    <div className="space-y-4 text-[13px]">
      <div>
        <span className="text-slate-400 text-[11px] uppercase tracking-wider font-semibold">Candidate</span>
        <h4 className="font-semibold text-slate-900 text-[16px] mt-0.5">{selectedApplicant.candidateName}</h4>
        {selectedApplicant.candidateEmail && (
          <p className="text-blue-600 font-mono text-[12px]">{selectedApplicant.candidateEmail}</p>
        )}
      </div>
      <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg font-mono text-center">
        <div>
          <div className="text-[10px] text-slate-400 uppercase font-sans">Screen Score</div>
          <div className="text-[18px] font-bold text-slate-900">{selectedApplicant.screeningScore ?? "—"}</div>
        </div>
        <div>
          <div className="text-[10px] text-slate-400 uppercase font-sans">Experience</div>
          <div className="text-[18px] font-bold text-slate-900">
            {selectedApplicant.experienceYears ? `${selectedApplicant.experienceYears}y` : "—"}
          </div>
        </div>
      </div>
      <div>
        <span className="text-slate-400 text-[11px]">Current Stage</span>
        <div className="mt-1">
          <StatusBadge status={selectedApplicant.status} showDot />
        </div>
      </div>
      {selectedApplicant.salaryText && (
        <div>
          <span className="text-slate-400 text-[11px]">Expected Salary</span>
          <p className="font-medium text-slate-800 mt-0.5 font-mono">{selectedApplicant.salaryText}</p>
        </div>
      )}
      <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
        <button
          onClick={() => { setIsScheduleInterviewOpen(true); setSelectedApplicant(null); }}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2 rounded-lg transition text-[12px] flex items-center justify-center gap-1.5"
        >
          <Calendar className="h-4 w-4" /> Schedule Technical Interview
        </button>
        <div className="flex gap-2">
          <button
            onClick={() => { setToast(`${selectedApplicant.candidateName} advanced to next stage`); setSelectedApplicant(null); }}
            className="flex-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-semibold py-2 rounded-lg transition text-[12px]"
          >
            Advance Stage
          </button>
          <button
            onClick={() => { setToast(`${selectedApplicant.candidateName} marked as rejected`); setSelectedApplicant(null); }}
            className="flex-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-semibold py-2 rounded-lg transition text-[12px]"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <DashboardShell
      brandTitle="JPS"
      brandSubtitle="Employer Dashboard"
      navItems={getRecruiterNavItems("/employer", tasks.length, totalUnreadMessages)}
      searchPlaceholder="Search jobs, applicants, campaigns"
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      showDateRange
      dateRangeText="Aug 2025"
      showExport
      onExport={() => setToast("Downloading recruiter analytics report...")}
      primaryActionLabel="Post New Job"
      onPrimaryAction={() => setIsCreateJobOpen(true)}
      userAvatarText="JE"
      notificationsCount={3}
      detailPanelOpen={!!selectedJob || !!selectedApplicant}
      onCloseDetailPanel={() => { setSelectedJob(null); setSelectedApplicant(null); }}
      detailPanelTitle={selectedJob ? "Job Requisition" : "Candidate Profile"}
      detailPanelContent={jobDetailContent}
    >
      {/* ── Toast ──────────────────────────────────────────────────────── */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-slate-900 text-white text-[13px] font-semibold px-4 py-3 rounded-lg shadow-xl flex items-center gap-2 animate-in slide-in-from-top-2 fade-in duration-200">
          <CheckCircle2 className="h-4 w-4" /> {toast}
        </div>
      )}

      {/* ── Modals ──────────────────────────────────────────────────────── */}
      <CreateJobModal
        isOpen={isCreateJobOpen}
        onClose={() => setIsCreateJobOpen(false)}
        onJobCreated={(job) => addJob(job)}
      />

      <ScheduleInterviewModal
        isOpen={isScheduleInterviewOpen}
        onClose={() => setIsScheduleInterviewOpen(false)}
        onInterviewScheduled={(interview) => addInterview(interview)}
      />

      {/* ── 4 KPI Cards ──────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {kpis.map((kpi, idx) => (
          <KpiCard
            key={kpi.title}
            title={kpi.title}
            value={kpi.value}
            trendDelta={kpi.trendDelta}
            trendDirection={kpi.trendDirection}
            index={idx}
          />
        ))}
      </div>

      {/* ── Hiring Analytics — Framer Motion Charts Row ──────────────────── */}
      <div className="space-y-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Applicants per Week Bar Chart */}
          <MotionBarChart
            title="Applicants / Week"
            subtitle="Last 6 weeks — all postings"
            data={hiringAnalytics.applicantsPerWeek.map((w) => ({
              label: w.week,
              value: w.count,
              color: "#0F172A",
            }))}
            chartHeight={120}
            showValueLabels
          />

          {/* Source Mix Bar Chart */}
          <MotionBarChart
            title="Source Mix"
            subtitle="How candidates found you"
            data={hiringAnalytics.sourceMix.map((s, i) => ({
              label: s.name,
              value: s.percentage,
              color: ["#34D399", "#60A5FA", "#FBBF24"][i % 3],
            }))}
            unit="%"
            chartHeight={120}
            showValueLabels
          />
        </div>
        {/* Hiring funnel annotation line */}
        <p className="text-[11px] text-slate-400 px-1 font-mono">
          📊 Funnel: {hiringAnalytics.funnelDropoff} · Avg time to first response: {hiringAnalytics.timeToFirstResponse}
        </p>
      </div>

      {/* ── Plan Usage Widget ─────────────────────────────────────────────── */}
      <div className="bg-white border border-slate-200 rounded-xl px-5 py-4 shadow-2xs">
        <div className="flex items-center justify-between mb-2">
          <div className="text-[13px] font-medium text-slate-900">
            Plan: <span className="font-bold">{planUsage.planName}</span>
          </div>
          <span className="text-[11px] font-mono text-slate-500">
            {allJobs.length}/{planUsage.totalSlots} slots used
          </span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-2 bg-slate-900 rounded-full transition-all duration-700"
            style={{ width: `${Math.min((allJobs.length / planUsage.totalSlots) * 100, 100)}%` }}
          />
        </div>
        <p className="text-[11px] text-slate-400 mt-1.5 flex items-center justify-between">
          <span>{Math.max(planUsage.totalSlots - allJobs.length, 0)} slots remaining</span>
          <a href="/employer/billing" className="text-slate-900 hover:underline font-semibold">Manage / Upgrade Plan →</a>
        </p>
      </div>

      {/* ── Main 2-column Layout ─────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* ── Left / Main Column ─────────────────────────────────────── */}
        <div className="lg:col-span-8 space-y-6">
          {/* Job Postings Table */}
          <JobPostingsTable
            jobs={jobs}
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
            onNewJob={() => setIsCreateJobOpen(true)}
          />

          {/* Applicant Pipeline Board — dynamic per selected job */}
          <ApplicantPipelineBoard
            allApplicants={allApplicants}
            jobs={allJobs}
            selectedJobId={pipelineJobId}
            onJobChange={handlePipelineJobChange}
            selectedApplicantIds={selectedApplicantIds}
            onToggleSelectApplicant={toggleApplicantSelection}
            onBulkAction={handleBulkApplicantAction}
            onViewApplicant={(app) => setSelectedApplicant(app)}
          />
        </div>

        {/* ── Right Column ───────────────────────────────────────────── */}
        <div className="lg:col-span-4 space-y-5">

          {/* ① Quick Actions */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3">
            <h4 className="text-[13px] font-bold text-slate-900">Quick Actions</h4>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setIsCreateJobOpen(true)}
                className="flex items-center gap-2 p-2.5 text-[12px] font-semibold text-slate-800 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition"
              >
                <Plus className="h-3.5 w-3.5 text-slate-900" />
                Post New Job
              </button>
              <button
                onClick={() => setIsScheduleInterviewOpen(true)}
                className="flex items-center gap-2 p-2.5 text-[12px] font-semibold text-slate-800 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition"
              >
                <Calendar className="h-3.5 w-3.5 text-slate-900" />
                Schedule Round
              </button>
              <button
                onClick={() => setToast("Exporting applicant CSV data...")}
                className="flex items-center gap-2 p-2.5 text-[12px] font-semibold text-slate-800 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition"
              >
                <Download className="h-3.5 w-3.5 text-slate-900" />
                Export CSV
              </button>
              <a
                href="/employer/campaigns"
                className="flex items-center gap-2 p-2.5 text-[12px] font-semibold text-slate-800 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition"
              >
                <Megaphone className="h-3.5 w-3.5 text-slate-900" />
                Boost Campaign
              </a>
            </div>
          </div>

          {/* Campaign Performance */}
          <CampaignPerformancePanel campaigns={campaigns} />

          {/* Upcoming Interviews */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h4 className="text-[13px] font-bold text-slate-900">Upcoming Interviews</h4>
              <button onClick={() => setIsScheduleInterviewOpen(true)} className="text-[11px] font-semibold text-blue-600 hover:underline">
                + Schedule
              </button>
            </div>
            <div className="space-y-2.5">
              {interviews.map((int) => (
                <div key={int.id} className="p-3 rounded-lg border border-slate-200/80 bg-slate-50/50 space-y-1">
                  <div className="font-semibold text-[13px] text-slate-900">{int.candidateName}</div>
                  <div className="text-[11px] text-slate-500">{int.jobTitle} — {int.type}</div>
                  <div className="text-[11px] text-slate-500 font-mono flex items-center justify-between">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{int.dateText}</span>
                    {int.meetLink && (
                      <a href={int.meetLink} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline font-sans font-semibold">Join Call</a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team Panel */}
          <TeamPanel members={teamMembers} />

          {/* Messages Inbox */}
          <RecruiterMessages
            threads={messageThreads}
            onThreadsChange={setMessageThreads}
          />
        </div>
      </div>
    </DashboardShell>
  );
}
