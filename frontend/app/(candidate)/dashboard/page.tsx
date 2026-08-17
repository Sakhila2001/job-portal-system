"use client";

import React, { useState } from "react";
import DashboardShell from "@/components/layout/DashboardShell";
import ProfileSummaryCard from "@/components/candidate/ProfileSummaryCard";
import KpiCard from "@/components/shared/KpiCard";
import NotificationList from "@/components/shared/NotificationList";
import CandidateProfileWizard from "@/components/candidate/CandidateProfileWizard";

// ── Dashboard Component Highlights ─────────────────────────────────────────
import InterviewManager from "@/components/candidate/InterviewManager";
import ApplicationCalendar from "@/components/candidate/ApplicationCalendar";
import OneClickApplyModal from "@/components/candidate/OneClickApplyModal";
import SkillGapSuggestions from "@/components/candidate/SkillGapSuggestions";
import FollowUpReminders from "@/components/candidate/FollowUpReminders";
import ProfileVisibilityAnalytics from "@/components/candidate/ProfileVisibilityAnalytics";

import { useCandidateOverview } from "@/hooks/useCandidateOverview";
import { getCandidateNavItems } from "@/lib/candidate-nav";
import {
  MOCK_INTERVIEW_DETAILS,
  MOCK_SKILL_SUGGESTIONS,
  MOCK_FOLLOWUP_REMINDERS,
  MOCK_PROFILE_ANALYTICS,
  MOCK_QUICK_APPLY_JOBS,
  MOCK_RESUME_VERSIONS,
} from "@/lib/mock-data/candidate";
import { QuickApplyJob } from "@/lib/types";
import { Zap, MapPin, Briefcase } from "lucide-react";

export default function CandidateDashboardPage() {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [dismissedReminders, setDismissedReminders] = useState<string[]>([]);
  const [scheduleView, setScheduleView] = useState<"list" | "calendar">("list");
  const [applyJob, setApplyJob] = useState<QuickApplyJob | null>(null);
  const [appliedIds, setAppliedIds] = useState<string[]>([]);

  const {
    profile,
    kpis,
    notifications,
    searchQuery,
    setSearchQuery,
  } = useCandidateOverview();

  // Visible follow-up reminders (not dismissed)
  const visibleReminders = MOCK_FOLLOWUP_REMINDERS.filter(
    (r) => !dismissedReminders.includes(r.applicationId)
  );

  return (
    <>
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
          onEditProfile={() => setIsWizardOpen(true)}
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

        {/* ── One-Click Apply Section ──────────────────────────────────────── */}
        <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-2xs">
          <div className="flex items-center justify-between mb-4 border-b border-stone-100 pb-3">
            <div>
              <h2 className="text-[16px] font-bold text-stone-900 flex items-center gap-2">
                <Zap className="w-4 h-4 text-stone-700" />
                Quick Apply
              </h2>
              <p className="text-[12px] text-stone-500 mt-0.5">
                Top matches — apply in one click using your saved profile & resume
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {MOCK_QUICK_APPLY_JOBS.map((job) => {
              const applied = appliedIds.includes(job.id);
              return (
                <div
                  key={job.id}
                  className="group border border-stone-200 rounded-xl p-4 bg-stone-50/60 hover:bg-white hover:shadow-sm hover:border-stone-300 transition-all duration-200 flex flex-col gap-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-[13px] font-bold text-stone-900 truncate">{job.title}</p>
                      <p className="text-[11px] text-stone-500 font-medium truncate">{job.company}</p>
                    </div>
                    <span className="shrink-0 text-[11px] font-mono font-bold text-stone-500">
                      {job.matchPercentage}%
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-stone-400 font-medium">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 shrink-0" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-3 h-3 shrink-0" />
                      {job.workMode}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {job.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-1.5 py-0.5 bg-stone-200/70 text-stone-600 text-[10px] font-semibold rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between gap-2 pt-1 border-t border-stone-100">
                    <span className="text-[11px] font-mono text-stone-500">{job.salaryText}</span>
                    <button
                      onClick={() => {
                        if (!applied) setApplyJob(job);
                      }}
                      disabled={applied}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all active:scale-95 ${
                        applied
                          ? "bg-stone-100 text-stone-400 cursor-default"
                          : "bg-stone-900 text-white hover:bg-stone-800 shadow-sm"
                      }`}
                    >
                      <Zap className="w-3 h-3" />
                      {applied ? "Applied" : "1-Click Apply"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Content Grid: Balanced Left-Right Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Schedule (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Follow-Up Reminders */}
            {visibleReminders.length > 0 && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <FollowUpReminders
                  reminders={visibleReminders}
                  onDismiss={(appId) =>
                    setDismissedReminders((prev) => [...prev, appId])
                  }
                />
              </div>
            )}

            {/* Interview Schedule — List / Calendar */}
            <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <div>
                  <h2 className="text-[16px] font-bold text-stone-900">
                    My Interview Schedule
                  </h2>
                  <p className="text-[12px] text-stone-500 mt-0.5">
                    Reminders, interviewer details, and links to join meetings
                  </p>
                </div>
                {/* View toggle */}
                <div className="flex bg-stone-100/80 p-0.5 rounded-xl">
                  {(["list", "calendar"] as const).map((v) => (
                    <button
                      key={v}
                      onClick={() => setScheduleView(v)}
                      className={`px-3 py-1.5 rounded-lg text-[11px] font-extrabold uppercase tracking-wider transition-all ${
                        scheduleView === v
                          ? "bg-white text-stone-950 shadow-xs"
                          : "text-stone-500 hover:text-stone-800"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
              {scheduleView === "list" ? (
                <InterviewManager interviews={MOCK_INTERVIEW_DETAILS} />
              ) : (
                <ApplicationCalendar interviews={MOCK_INTERVIEW_DETAILS} />
              )}
            </div>
          </div>

          {/* Right Column: Analytics, Skills (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Profile Visibility Analytics */}
            <ProfileVisibilityAnalytics analytics={MOCK_PROFILE_ANALYTICS} />

            {/* Skill Gap Suggestions */}
            <SkillGapSuggestions suggestions={MOCK_SKILL_SUGGESTIONS} />
          </div>
        </div>
      </DashboardShell>

      {/* Edit Profile Wizard */}
      <CandidateProfileWizard
        isOpen={isWizardOpen}
        initialStep={1}
        onClose={() => setIsWizardOpen(false)}
      />

      {/* One-Click Apply Modal */}
      {applyJob && (
        <OneClickApplyModal
          job={applyJob}
          resumes={MOCK_RESUME_VERSIONS}
          profileName={profile.name}
          profileHeadline={profile.roleHeadline}
          profileSkills={profile.skillsMeta}
          onClose={() => {
            setAppliedIds((prev) => [...prev, applyJob.id]);
            setApplyJob(null);
          }}
        />
      )}
    </>
  );
}
