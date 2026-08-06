"use client";

import React from "react";
import DashboardShell from "@/components/layout/DashboardShell";
import { useCandidateOverview } from "@/hooks/useCandidateOverview";
import { Home, FileText, Bookmark, Bell, File, Building2, Star, Settings, Upload, Download, Eye, CheckCircle2, AlertCircle } from "lucide-react";

import { getCandidateNavItems } from "@/lib/candidate-nav";

export default function CandidateResumePage() {
  const { profile } = useCandidateOverview();

  return (
    <DashboardShell
      brandTitle="JPS"
      brandSubtitle="Candidate Dashboard"
      navItems={getCandidateNavItems("/dashboard/resume")}
      searchPlaceholder="Search resume sections..."
      userAvatarText={profile.avatarText}
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
          <div>
            <h1 className="text-[20px] font-bold text-slate-900 tracking-tight">Resume & ATS Score</h1>
            <p className="text-[13px] text-slate-500 mt-0.5">
              Manage your primary resume PDF, portfolio links, and ATS keyword optimization
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => alert("Downloading PDF resume...")}
              className="inline-flex items-center gap-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-[12px] font-medium px-3 py-2 rounded-lg transition"
            >
              <Download className="h-4 w-4" />
              <span>Download PDF</span>
            </button>
            <button
              onClick={() => alert("Upload new PDF resume...")}
              className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-[12px] font-semibold px-3.5 py-2 rounded-lg transition"
            >
              <Upload className="h-4 w-4" />
              <span>Upload New PDF</span>
            </button>
          </div>
        </div>

        {/* ATS Score Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-4 text-center md:text-left space-y-1">
            <div className="text-[12px] text-slate-500 uppercase tracking-wider font-semibold">ATS Compatibility Score</div>
            <div className="text-[36px] font-extrabold text-slate-900 font-mono">88 / 100</div>
            <p className="text-[12px] text-emerald-700 font-medium">Strong match for Backend & Laravel roles</p>
          </div>

          <div className="md:col-span-8 space-y-3 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 text-[13px]">
            <div className="flex items-center gap-2 text-slate-800">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Standard headings & clear contact details detected</span>
            </div>
            <div className="flex items-center gap-2 text-slate-800">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Contains key tech stack terms: <strong>Laravel, PHP, MySQL, REST API</strong></span>
            </div>
            <div className="flex items-center gap-2 text-slate-800">
              <AlertCircle className="h-4 w-4 text-amber-600 shrink-0" />
              <span>Tip: Add 2 project metric results (e.g. "Reduced query response by 35%") to reach 95%+</span>
            </div>
          </div>
        </div>

        {/* Active PDF Document Preview Box */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 flex items-center justify-center font-bold text-[12px] font-mono">
                PDF
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 text-[14px]">Sakhi_Backend_Developer_Resume_2025.pdf</h4>
                <p className="text-[11px] text-slate-500 font-mono">245 KB • Uploaded Aug 1, 2025</p>
              </div>
            </div>

            <button
              onClick={() => alert("Previewing PDF in modal...")}
              className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg transition"
            >
              <Eye className="h-4 w-4 text-slate-500" />
              <span>Preview</span>
            </button>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
