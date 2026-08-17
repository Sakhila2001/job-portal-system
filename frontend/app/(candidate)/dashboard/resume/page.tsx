"use client";

import React, { useState } from "react";
import DashboardShell from "@/components/layout/DashboardShell";
import ResumeVersioning from "@/components/candidate/ResumeVersioning";
import CoverLetterManager from "@/components/candidate/CoverLetterManager";
import { useCandidateOverview } from "@/hooks/useCandidateOverview";
import { getCandidateNavItems } from "@/lib/candidate-nav";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { MOCK_RESUME_VERSIONS, MOCK_COVER_LETTERS } from "@/lib/mock-data/candidate";

export default function CandidateResumePage() {
  const { profile } = useCandidateOverview();
  const [resumes, setResumes] = useState(MOCK_RESUME_VERSIONS);

  const handleSetDefault = (id: string) => {
    setResumes((prev) =>
      prev.map((r) => ({ ...r, isDefault: r.id === id }))
    );
  };

  const handleDelete = (id: string) => {
    setResumes((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <DashboardShell
      brandTitle="JPS"
      brandSubtitle="Candidate Dashboard"
      navItems={getCandidateNavItems("/dashboard/resume")}
      searchPlaceholder="Search resume sections..."
      userAvatarText={profile.avatarText}
    >
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
          <div>
            <h1 className="text-[20px] font-bold text-slate-900 tracking-tight">Resume & Cover Letters</h1>
            <p className="text-[13px] text-slate-500 mt-0.5">
              Manage multiple tailored resumes, view ATS keywords alignment, and write custom cover letters
            </p>
          </div>
        </div>

        {/* ATS Score and Compatibility Alert Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-4 text-center md:text-left space-y-1">
            <div className="text-[12px] text-slate-500 uppercase tracking-wider font-semibold">ATS Compatibility Score</div>
            <div className="text-[36px] font-extrabold text-slate-900 font-mono">88 / 100</div>
            <p className="text-[12px] text-emerald-700 font-medium font-semibold">Strong match for Backend & Laravel roles</p>
          </div>

          <div className="md:col-span-8 space-y-3 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 text-[13px]">
            <div className="flex items-center gap-2 text-slate-800">
              <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
              <span>Standard headings & clear contact details detected</span>
            </div>
            <div className="flex items-center gap-2 text-slate-800">
              <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
              <span>Contains key tech stack terms: <strong>Laravel, PHP, MySQL, REST API</strong></span>
            </div>
            <div className="flex items-center gap-2 text-slate-800">
              <AlertCircle className="h-4.5 w-4.5 text-amber-600 shrink-0" />
              <span>Tip: Add 2 project metric results (e.g. "Reduced query response by 35%") to reach 95%+</span>
            </div>
          </div>
        </div>

        {/* Two Column Grid for Resumes and Letters */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Resume Versioning Panel */}
          <div className="lg:col-span-6">
            <ResumeVersioning
              resumes={resumes}
              onSetDefault={handleSetDefault}
              onDelete={handleDelete}
            />
          </div>

          {/* Cover Letter Panel */}
          <div className="lg:col-span-6">
            <CoverLetterManager coverLetters={MOCK_COVER_LETTERS} />
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
