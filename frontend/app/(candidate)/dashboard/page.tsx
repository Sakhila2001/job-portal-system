"use client";

import React from "react";
import DashboardShell from "@/components/layout/DashboardShell";
import ProfileSummaryCard from "@/components/candidate/ProfileSummaryCard";
import KpiCard from "@/components/shared/KpiCard";
import ApplicationPipelineTable from "@/components/candidate/ApplicationPipelineTable";
import RecommendedJobsPanel from "@/components/candidate/RecommendedJobsPanel";
import SkillGapPanel from "@/components/candidate/SkillGapPanel";
import NotificationList from "@/components/shared/NotificationList";
import StatusBadge from "@/components/shared/StatusBadge";
import { useCandidateOverview } from "@/hooks/useCandidateOverview";
import { Home, FileText, Bookmark, Bell, File, Building2, Star, Settings, Calendar } from "lucide-react";

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

  // Sidebar Nav matching Wireframe 1 exactly
  const navItems = [
    { label: "Home", href: "/dashboard", icon: Home, isActive: true },
    { label: "Applications", href: "/dashboard/applications", icon: FileText },
    { label: "Saved Jobs", href: "/dashboard/saved", icon: Bookmark, badge: 2 },
    { label: "Job Alerts", href: "/dashboard/alerts", icon: Bell },
    { label: "Resume", href: "/dashboard/resume", icon: File },
    { label: "Companies", href: "/dashboard/companies", icon: Building2 },
    { label: "Reviews Written", href: "/dashboard/reviews", icon: Star },
    { label: "Profile Settings", href: "/dashboard/settings", icon: Settings },
  ];

  // Slide-over Detail Panel Content for Candidate Application Inspector
  const detailContent = selectedApplication ? (
    <div className="space-y-4 text-[13px]">
      <div>
        <span className="text-stone-400">Target Role:</span>
        <h4 className="font-semibold text-stone-900 text-[16px] mt-0.5">{selectedApplication.jobTitle}</h4>
      </div>
      <div>
        <span className="text-stone-400">Company:</span>
        <p className="font-medium text-stone-800 text-[14px] mt-0.5">{selectedApplication.companyName}</p>
      </div>
      <div className="grid grid-cols-2 gap-3 p-3 bg-stone-50 border border-stone-200 rounded-lg font-mono">
        <div>
          <div className="text-[10px] text-stone-400 uppercase font-sans">Applied Date</div>
          <div className="text-[13px] font-semibold text-stone-900">{selectedApplication.appliedDate}</div>
        </div>
        <div>
          <div className="text-[10px] text-stone-400 uppercase font-sans">Salary</div>
          <div className="text-[13px] font-semibold text-stone-900">{selectedApplication.salaryText}</div>
        </div>
      </div>
      <div>
        <span className="text-stone-400">Current Application Status:</span>
        <div className="mt-1">
          <StatusBadge status={selectedApplication.statusCustomPill || selectedApplication.status} />
        </div>
      </div>
      <div className="pt-4 border-t border-stone-100 flex gap-2">
        <button
          onClick={() => alert(`Withdrawing application for ${selectedApplication.jobTitle}`)}
          className="flex-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-medium py-2 rounded-lg transition text-[12px]"
        >
          Withdraw Application
        </button>
      </div>
    </div>
  ) : null;

  return (
    <DashboardShell
      brandTitle="JPS"
      brandSubtitle="Candidate Dashboard"
      navItems={navItems}
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
