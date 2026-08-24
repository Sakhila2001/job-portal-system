"use client";

import React from "react";
import { Edit3, CheckCircle2 } from "lucide-react";

interface ProfileSummaryCardProps {
  name: string;
  roleHeadline: string;
  skillsMeta: string;
  isOpenToWork: boolean;
  completenessPercent: number;
  completionHint: string;
  avatarText?: string;
  onEditProfile?: () => void;
  onToggleOpenToWork?: () => void;
  className?: string;
}

export default function ProfileSummaryCard({
  name,
  roleHeadline,
  skillsMeta,
  isOpenToWork,
  completenessPercent,
  completionHint,
  avatarText = "SK",
  onEditProfile,
  onToggleOpenToWork,
  className = "",
}: ProfileSummaryCardProps) {
  return (
    <div className={`bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Profile Info */}
        <div className="flex items-center gap-3.5">
          <div className="h-12 w-12 rounded-full bg-slate-900 text-white font-bold text-[14px] flex items-center justify-center font-mono shrink-0 shadow-xs">
            {avatarText}
          </div>
          <div>
            <h2 className="text-[18px] font-semibold text-slate-900 tracking-tight leading-tight">
              {name} <span className="text-slate-400 font-normal">— {roleHeadline}</span>
            </h2>
            <p className="text-[12px] text-slate-500 mt-0.5">{skillsMeta}</p>
          </div>
        </div>

        {/* Profile Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onToggleOpenToWork}
            className={`inline-flex items-center gap-1.5 text-[12px] font-medium px-3 py-1.5 rounded-lg border transition ${
              isOpenToWork
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
            }`}
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>{isOpenToWork ? "Open to Work" : "Not Looking"}</span>
          </button>

          <button
            onClick={onEditProfile}
            className="inline-flex items-center gap-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-[12px] font-medium px-3 py-1.5 rounded-lg transition"
          >
            <Edit3 className="h-3.5 w-3.5 text-slate-400" />
            <span>Edit Profile</span>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1.5 pt-1">
        <div className="flex items-center justify-between text-[12px]">
          <span className="text-slate-500 font-normal">{completionHint}</span>
          <span className="font-semibold text-slate-900 font-mono">Profile {completenessPercent}% complete</span>
        </div>

        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-slate-900 transition-all duration-500 rounded-full"
            style={{ width: `${completenessPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
