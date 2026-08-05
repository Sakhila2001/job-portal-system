"use client";

import React from "react";
import DashboardShell from "@/components/layout/DashboardShell";
import KpiCard from "@/components/shared/KpiCard";
import JobPostingsTable from "@/components/recruiter/JobPostingsTable";
import ApplicantPipelineBoard from "@/components/recruiter/ApplicantPipelineBoard";
import CampaignPerformancePanel from "@/components/recruiter/CampaignPerformancePanel";
import TeamPanel from "@/components/recruiter/TeamPanel";
import MotionBarChart from "@/components/shared/MotionBarChart";
import StatusBadge from "@/components/shared/StatusBadge";
import { useRecruiterOverview } from "@/hooks/useRecruiterOverview";
import {
  LayoutGrid,
  Briefcase,
  Users,
  BarChart2,
  Settings,
  Bell,
  CheckSquare,
  Calendar,
  Megaphone,
  Building2,
  Plus,
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
    allApplicants,
    pipelineJobId,
    handlePipelineJobChange,
    selectedApplicantIds,
    toggleApplicantSelection,
    handleBulkApplicantAction,
    hiringAnalytics,
    campaigns,
    interviews,
    teamMembers,
    tasks,
    selectedJob,
    setSelectedJob,
    selectedApplicant,
    setSelectedApplicant,
  } = useRecruiterOverview();

  const navItems = [
    { label: "Dashboard", href: "/employer", icon: LayoutGrid, isActive: true },
    { label: "Job Postings", href: "/employer/jobs", icon: Briefcase, badge: 6 },
    { label: "Applicants", href: "/employer/applicants", icon: Users, badge: 42 },
    { label: "Interviews", href: "/employer/interviews", icon: Calendar },
    { label: "Campaigns", href: "/employer/campaigns", icon: Megaphone },
    { label: "Analytics", href: "/employer/analytics", icon: BarChart2 },
    { label: "Company Profile", href: "/employer/company", icon: Building2 },
    { label: "Notifications", href: "/employer/notifications", icon: Bell },
    { label: "Tasks", href: "/employer/tasks", icon: CheckSquare, badge: tasks.length },
    { label: "Settings", href: "/employer/settings", icon: Settings },
  ];

  // Detail panel content
  const jobDetailContent = selectedJob ? (
    <div className="space-y-4 text-[13px]">
      <div>
        <span className="text-stone-400 text-[11px] uppercase tracking-wider">Role</span>
        <h4 className="font-semibold text-stone-900 text-[16px] mt-0.5">{selectedJob.title}</h4>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <span className="text-stone-400 text-[11px]">Department</span>
          <p className="font-medium text-stone-800 mt-0.5">{selectedJob.department}</p>
        </div>
        <div>
          <span className="text-stone-400 text-[11px]">Work Mode</span>
          <p className="font-medium text-stone-800 mt-0.5">{selectedJob.workMode}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 p-3 bg-stone-50 border border-stone-200 rounded-lg font-mono text-center">
        <div>
          <div className="text-[10px] text-stone-400 uppercase font-sans">Applicants</div>
          <div className="text-[18px] font-bold text-stone-900">{selectedJob.applicantsCount}</div>
        </div>
        <div>
          <div className="text-[10px] text-stone-400 uppercase font-sans">Views</div>
          <div className="text-[18px] font-bold text-stone-900">{selectedJob.viewsCount}</div>
        </div>
      </div>
      <div>
        <span className="text-stone-400 text-[11px]">Status</span>
        <div className="mt-1">
          <StatusBadge status={selectedJob.status} />
        </div>
      </div>
      {(selectedJob.expiresInDays ?? 0) > 0 && (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-[12px]">
          ⏱ Expires in <span className="font-bold">{selectedJob.expiresInDays} days</span>
        </div>
      )}
      <div className="pt-4 border-t border-stone-100 flex gap-2">
        <button
          onClick={() => alert(`Editing job: ${selectedJob.title}`)}
          className="flex-1 bg-stone-900 hover:bg-stone-700 text-white font-medium py-2 rounded-lg transition text-[12px]"
        >
          Edit Job
        </button>
        <button
          onClick={() => { alert(`Closing job: ${selectedJob.title}`); setSelectedJob(null); }}
          className="flex-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-medium py-2 rounded-lg transition text-[12px]"
        >
          Close Posting
        </button>
      </div>
    </div>
  ) : selectedApplicant ? (
    <div className="space-y-4 text-[13px]">
      <div>
        <span className="text-stone-400 text-[11px] uppercase tracking-wider">Candidate</span>
        <h4 className="font-semibold text-stone-900 text-[16px] mt-0.5">{selectedApplicant.candidateName}</h4>
        {selectedApplicant.candidateEmail && (
          <p className="text-blue-600 font-mono text-[12px]">{selectedApplicant.candidateEmail}</p>
        )}
      </div>
      <div className="grid grid-cols-2 gap-3 p-3 bg-stone-50 border border-stone-200 rounded-lg font-mono text-center">
        <div>
          <div className="text-[10px] text-stone-400 uppercase font-sans">Screen Score</div>
          <div className="text-[18px] font-bold text-stone-900">{selectedApplicant.screeningScore ?? "—"}</div>
        </div>
        <div>
          <div className="text-[10px] text-stone-400 uppercase font-sans">Experience</div>
          <div className="text-[18px] font-bold text-stone-900">
            {selectedApplicant.experienceYears ? `${selectedApplicant.experienceYears}y` : "—"}
          </div>
        </div>
      </div>
      <div>
        <span className="text-stone-400 text-[11px]">Current Stage</span>
        <div className="mt-1">
          <StatusBadge status={selectedApplicant.status} />
        </div>
      </div>
      {selectedApplicant.salaryText && (
        <div>
          <span className="text-stone-400 text-[11px]">Expected Salary</span>
          <p className="font-medium text-stone-800 mt-0.5 font-mono">{selectedApplicant.salaryText}</p>
        </div>
      )}
      <div className="pt-4 border-t border-stone-100 flex gap-2">
        <button
          onClick={() => alert(`Moving ${selectedApplicant.candidateName} to next stage`)}
          className="flex-1 bg-stone-900 hover:bg-stone-700 text-white font-medium py-2 rounded-lg transition text-[12px]"
        >
          Move to Next Stage
        </button>
        <button
          onClick={() => { alert(`Rejecting ${selectedApplicant.candidateName}`); setSelectedApplicant(null); }}
          className="flex-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-medium py-2 rounded-lg transition text-[12px]"
        >
          Reject
        </button>
      </div>
    </div>
  ) : null;

  return (
    <DashboardShell
      brandTitle="JPS"
      brandSubtitle="Employer Dashboard"
      navItems={navItems}
      searchPlaceholder="Search jobs, applicants, campaigns"
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      showDateRange
      dateRangeText="Aug 2025"
      showExport
      onExport={() => alert("Exporting Report...")}
      primaryActionLabel="Post New Job"
      onPrimaryAction={() => alert("Open Post Job Wizard")}
      userAvatarText="JE"
      notificationsCount={3}
      detailPanelOpen={!!selectedJob || !!selectedApplicant}
      onCloseDetailPanel={() => { setSelectedJob(null); setSelectedApplicant(null); }}
      detailPanelTitle={selectedJob ? "Job Requisition" : "Candidate Profile"}
      detailPanelContent={jobDetailContent}
    >
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
        <p className="text-[11px] text-stone-400 px-1 font-mono">
          📊 Funnel: {hiringAnalytics.funnelDropoff} · Avg time to first response: {hiringAnalytics.timeToFirstResponse}
        </p>
      </div>

      {/* ── Plan Usage Widget ─────────────────────────────────────────────── */}
      <div className="bg-white border border-stone-200 rounded-xl px-5 py-4 shadow-2xs">
        <div className="flex items-center justify-between mb-2">
          <div className="text-[13px] font-medium text-stone-900">
            Plan: <span className="font-bold">{planUsage.planName}</span>
          </div>
          <span className="text-[11px] font-mono text-stone-500">
            {planUsage.usedSlots}/{planUsage.totalSlots} slots used
          </span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-2 bg-slate-900 rounded-full transition-all duration-700"
            style={{ width: `${(planUsage.usedSlots / planUsage.totalSlots) * 100}%` }}
          />
        </div>
        <p className="text-[11px] text-stone-400 mt-1.5">
          {planUsage.totalSlots - planUsage.usedSlots} slots remaining —{" "}
          <button className="text-slate-900 hover:underline ml-1 font-semibold">Upgrade Plan</button>
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

          {/* ① Quick Actions — moved to top */}
          <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-2xs space-y-3">
            <h4 className="text-[13px] font-medium text-stone-900">Quick Actions</h4>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Post New Job", icon: Plus },
                { label: "Schedule Interview", icon: Calendar },
                { label: "Export Applicants", icon: BarChart2 },
                { label: "Boost Campaign", icon: Megaphone },
              ].map(({ label, icon: Icon }) => (
                <button
                  key={label}
                  onClick={() => alert(`Action: ${label}`)}
                  className="flex items-center gap-2 p-2.5 text-[12px] font-medium text-stone-700 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-lg transition"
                >
                  <Icon className="h-3.5 w-3.5 text-stone-500" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Campaign Performance */}
          <CampaignPerformancePanel campaigns={campaigns} />

          {/* Upcoming Interviews */}
          <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-2xs space-y-3">
            <h4 className="text-[13px] font-medium text-stone-900 border-b border-stone-100 pb-2">
              Upcoming Interviews
            </h4>
            <div className="space-y-2.5">
              {interviews.map((int) => (
                <div key={int.id} className="p-3 rounded-lg border border-stone-200/80 bg-stone-50/40 space-y-1">
                  <div className="font-semibold text-[13px] text-stone-900">{int.candidateName}</div>
                  <div className="text-[11px] text-stone-500">{int.jobTitle} — {int.type}</div>
                  <div className="text-[11px] text-stone-500 font-mono flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{int.dateText}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team Panel */}
          <TeamPanel members={teamMembers} />

          {/* Tasks & Approvals */}
          <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-2xs space-y-3">
            <h4 className="text-[13px] font-medium text-stone-900 border-b border-stone-100 pb-2">
              Tasks & Approvals
            </h4>
            <div className="space-y-2">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-start justify-between gap-2 p-2.5 rounded-lg border border-stone-100 bg-stone-50/50 text-[12px]"
                >
                  <div>
                    <p className="font-medium text-stone-800">{task.label}</p>
                    {task.dueDate && (
                      <p className="text-[10px] text-stone-400 mt-0.5 font-mono">Due: {task.dueDate}</p>
                    )}
                  </div>
                  <span
                    className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${
                      task.completed
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-amber-50 text-amber-700 border-amber-200"
                    }`}
                  >
                    {task.completed ? "Done" : "Open"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
