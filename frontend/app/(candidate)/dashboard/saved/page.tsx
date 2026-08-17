"use client";

import React, { useState } from "react";
import DashboardShell from "@/components/layout/DashboardShell";
import SavedJobCollections from "@/components/candidate/SavedJobCollections";
import JobMatchExplainer from "@/components/candidate/JobMatchExplainer";
import { useCandidateOverview } from "@/hooks/useCandidateOverview";
import { getCandidateNavItems } from "@/lib/candidate-nav";
import { MOCK_SAVED_COLLECTIONS, MOCK_JOB_MATCHES } from "@/lib/mock-data/candidate";

export default function CandidateSavedJobsPage() {
  const { profile } = useCandidateOverview();
  const [showExplainer, setShowExplainer] = useState(true);

  return (
    <DashboardShell
      brandTitle="JPS"
      brandSubtitle="Candidate Dashboard"
      navItems={getCandidateNavItems("/dashboard/saved")}
      searchPlaceholder="Search saved jobs..."
      userAvatarText={profile.avatarText}
    >
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
          <div>
            <h1 className="text-[20px] font-bold text-slate-900 tracking-tight">My Saved Jobs & Folders</h1>
            <p className="text-[13px] text-slate-500 mt-0.5">
              Organize saved positions into custom folders and review job-to-resume compatibility
            </p>
          </div>
          <button
            onClick={() => setShowExplainer(!showExplainer)}
            className="text-[12px] font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-lg border border-slate-200 transition"
          >
            {showExplainer ? "Hide Match Analysis" : "Show Match Analysis"}
          </button>
        </div>

        {/* Folder collections */}
        <SavedJobCollections collections={MOCK_SAVED_COLLECTIONS} />

        {/* Match explainer details */}
        {showExplainer && (
          <div className="animate-in fade-in slide-in-from-bottom-3 duration-300">
            <div className="mb-4">
              <h3 className="text-[14px] font-bold text-slate-900">Resume Compatibility Analysis</h3>
              <p className="text-[12px] text-slate-500">Detailed breakdown of skills match, experience match, and salary compatibility.</p>
            </div>
            <JobMatchExplainer matches={MOCK_JOB_MATCHES} />
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
