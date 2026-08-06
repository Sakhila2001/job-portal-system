"use client";

import React from "react";
import DashboardShell from "@/components/layout/DashboardShell";
import ProfileSummaryCard from "@/components/candidate/ProfileSummaryCard";
import KpiCard from "@/components/shared/KpiCard";
import ApplicationPipelineTable from "@/components/candidate/ApplicationPipelineTable";
import ApplicationDetailPanel from "@/components/candidate/ApplicationDetailPanel";
import RecommendedJobsPanel from "@/components/candidate/RecommendedJobsPanel";
import SkillGapPanel from "@/components/candidate/SkillGapPanel";
import NotificationList from "@/components/shared/NotificationList";
import { useCandidateOverview } from "@/hooks/useCandidateOverview";
import { getCandidateNavItems } from "@/lib/candidate-nav";
import { Calendar } from "lucide-react";

export default function CandidateDashboardPage() {
  const {
    profile,
    kpis,
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
    recommendedJobs,
    upcomingInterviews,
    skillGaps,
    notifications,
    selectedApplication,
    setSelectedApplication,
  } = useCandidateOverview();

  const detailContent = selectedApplication ? (
    <ApplicationDetailPanel application={selectedApplication} onWithdraw={(application) => alert(`Withdrawing application for ${application.jobTitle}`)} />
  ) : null;

  return (
    <DashboardShell
      brandTitle="JPS"
      brandSubtitle="Candidate Dashboard"
      navItems={getCandidateNavItems("/dashboard")}
      searchPlaceholder="Search Jobs, Companies, Skills"
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      userAvatarText={profile.avatarText}
      notificationsCount={2}
      notificationsList={notifications}
      detailPanelOpen={!!selectedApplication}
      onCloseDetailPanel={() => setSelectedApplication(null)}
      detailPanelTitle="Application Status"
      detailPanelContent={detailContent}
    >
      {/* Profile Header Summary Card */}
      <ProfileSummaryCard
        name={profile.name}
        roleHeadline={profile.roleHeadline}
        skillsMeta={profile.skillsMeta}
        isOpenToWork={profile.isOpenToWork}
        completenessPercent={profile.completenessPercent}
        completionHint={profile.completionHint}
        avatarText={profile.avatarText}
        onEditProfile={() => alert("Edit Profile Modal")}
        onToggleOpenToWork={() => alert("Open to Work state toggled")}
      />

      {/* 4 KPI Cards Grid */}
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

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left/Center Column: Applications Table */}
        <div className="lg:col-span-8 space-y-4">
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

        {/* Right Side Panel */}
        <div className="lg:col-span-4 space-y-5">
          {/* Recommended Jobs */}
          <RecommendedJobsPanel
            jobs={recommendedJobs}
            onSelectJob={(j) => alert(`Selected job: ${j.title}`)}
          />

          {/* Upcoming Interviews */}
          <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-2xs space-y-3">
            <h4 className="text-[13px] font-medium text-stone-900 border-b border-stone-100 pb-2">
              Upcoming Interviews
            </h4>
            <div className="space-y-2.5">
              {upcomingInterviews.map((int) => (
                <div key={int.id} className="p-3 rounded-lg border border-stone-200/80 bg-stone-50/40 space-y-1">
                  <div className="font-semibold text-[13px] text-stone-900">
                    {int.companyName} <span className="font-normal text-stone-500">— {int.type}</span>
                  </div>
                  <div className="text-[11px] text-stone-600 flex items-center gap-1 font-mono">
                    <Calendar className="h-3.5 w-3.5 text-stone-400" />
                    <span>{int.dateText}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skill Gaps */}
          <SkillGapPanel skills={skillGaps} />

          {/* Notifications Feed */}
          <NotificationList notifications={notifications} title="Notifications" />
        </div>
      </div>
    </DashboardShell>
  );
}
