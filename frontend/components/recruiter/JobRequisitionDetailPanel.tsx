"use client";

import React from "react";
import StatusBadge from "@/components/shared/StatusBadge";
import { Job } from "@/lib/types";
import {
  Briefcase, MapPin, DollarSign, Clock, Users, Eye, Sparkles,
  GraduationCap, Award, Tag, Edit3, Calendar, Megaphone, Power, FileText, ListChecks
} from "lucide-react";

interface JobRequisitionDetailPanelProps {
  job: Job;
  onEdit?: (job: Job) => void;
  onScheduleInterview?: (job: Job) => void;
  onBoostCampaign?: (job: Job) => void;
  onClosePosting?: (job: Job) => void;
}

export default function JobRequisitionDetailPanel({
  job,
  onEdit,
  onScheduleInterview,
  onBoostCampaign,
  onClosePosting,
}: JobRequisitionDetailPanelProps) {
  const minExp = job.minExperienceMonths ? `${(job.minExperienceMonths / 12).toFixed(0)}y` : null;
  const maxExp = job.maxExperienceMonths ? `${(job.maxExperienceMonths / 12).toFixed(0)}y` : null;
  const expText = minExp && maxExp ? `${minExp} – ${maxExp}` : minExp ? `${minExp}+` : "Any experience";

  return (
    <div className="space-y-5 text-[13px]">
      {/* ── Title & Header ── */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
            {typeof job.department === "object" && job.department !== null
              ? (job.department as any).departmentName || (job.department as any).name || "—"
              : String(job.department || "—")}
          </span>
          {job.seniorityLevel && (
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded capitalize">
              {job.seniorityLevel}
            </span>
          )}
        </div>
        <h3 className="font-bold text-slate-900 text-[18px] mt-1.5 leading-snug">{job.title}</h3>
        <p className="text-[12px] text-slate-500 font-medium mt-0.5">
          {typeof job.designation === "object" && job.designation !== null
            ? (job.designation as any).designationName || (job.designation as any).name || job.title
            : String(job.designation || job.title)} • {job.employmentType}
        </p>
      </div>

      {/* ── Status Bar ── */}
      <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold text-slate-500">Status:</span>
          <StatusBadge status={job.status} showDot />
        </div>
        {(job.expiresInDays ?? 0) > 0 && (
          <div className="text-[11px] font-semibold text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md flex items-center gap-1">
            <Clock className="h-3 w-3 text-slate-400" />
            <span>Expires in {job.expiresInDays}d</span>
          </div>
        )}
      </div>

      {/* ── Metrics Grid ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
        <div className="p-3 bg-white border border-slate-200 rounded-xl">
          <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider flex items-center justify-center gap-1">
            <Users className="h-3 w-3 text-slate-400" /> Applicants
          </div>
          <div className="text-[18px] font-bold text-slate-900 font-mono mt-0.5">{job.applicantsCount}</div>
        </div>
        <div className="p-3 bg-white border border-slate-200 rounded-xl">
          <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider flex items-center justify-center gap-1">
            <Eye className="h-3 w-3 text-slate-400" /> Views
          </div>
          <div className="text-[18px] font-bold text-slate-900 font-mono mt-0.5">{job.viewsCount}</div>
        </div>
        <div className="p-3 bg-white border border-slate-200 rounded-xl">
          <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Experience</div>
          <div className="text-[13px] font-bold text-slate-900 font-mono mt-1">{expText}</div>
        </div>
        <div className="p-3 bg-white border border-slate-200 rounded-xl">
          <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Work Mode</div>
          <div className="text-[13px] font-bold text-slate-900 mt-1">{job.workMode}</div>
        </div>
      </div>

      {/* ── Compensation & Location Card ── */}
      <div className="p-4 bg-slate-900 text-white rounded-xl space-y-2">
        <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider flex items-center gap-1">
          <DollarSign className="h-3.5 w-3.5 text-slate-400" /> Compensation & Salary Range
        </div>
        <div className="text-[18px] font-bold font-mono">
          {job.salaryText || `${job.salaryCurrency || "NPR"} ${(job.minSalary || 800000).toLocaleString()} – ${(job.maxSalary || 1800000).toLocaleString()} / yr`}
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-slate-300 pt-1 border-t border-white/10">
          <MapPin className="h-3.5 w-3.5 text-slate-400" />
          <span>{job.locations?.join(", ") || job.location}</span>
        </div>
      </div>

      {/* ── Job Description ── */}
      <div className="space-y-1.5 border-t border-slate-100 pt-4">
        <h4 className="text-[12px] font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
          <FileText className="h-3.5 w-3.5 text-slate-400" /> Job Description
        </h4>
        <p className="text-[12px] text-slate-600 leading-relaxed whitespace-pre-line bg-slate-50 border border-slate-200 rounded-xl p-3.5">
          {job.description || "No full description provided. Click Edit Job to write key responsibilities and growth opportunities."}
        </p>
      </div>

      {/* ── Key Responsibilities ── */}
      {job.responsibilities && job.responsibilities.length > 0 && (
        <div className="space-y-1.5 border-t border-slate-100 pt-4">
          <h4 className="text-[12px] font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <ListChecks className="h-3.5 w-3.5 text-slate-400" /> Key Responsibilities
          </h4>
          <ul className="list-disc list-inside space-y-1 text-[12px] text-slate-700 font-medium bg-slate-50 border border-slate-200 rounded-xl p-3.5">
            {job.responsibilities.map((resp, i) => (
              <li key={i}>{typeof resp === "object" ? (resp as any).responsibility : resp}</li>
            ))}
          </ul>
        </div>
      )}

      {/* ── Required Skills ── */}
      <div className="space-y-1.5 border-t border-slate-100 pt-4">
        <h4 className="text-[12px] font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-slate-400" /> Required Skills
        </h4>
        <ul className="list-disc list-inside space-y-1 text-[12px] text-slate-700 font-medium bg-slate-50 border border-slate-200 rounded-xl p-3.5">
          {job.skills && job.skills.length > 0 ? (
            job.skills.map((skill, i) => (
              <li key={i}>{typeof skill === "object" ? (skill as any).name || (skill as any).skillName : skill}</li>
            ))
          ) : (
            ["React", "Node.js", "TypeScript", "PostgreSQL", "Tailwind CSS"].map((skill, i) => (
              <li key={i}>{skill}</li>
            ))
          )}
        </ul>
      </div>

      {/* ── Qualifications & Benefits Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-slate-100 pt-4">
        {/* Education & Qualifications */}
        <div className="space-y-1.5">
          <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <GraduationCap className="h-3.5 w-3.5 text-slate-400" /> Qualifications
          </h4>
          <ul className="list-disc list-inside space-y-1 text-[12px] text-slate-700 font-medium bg-slate-50 border border-slate-200 rounded-xl p-3">
            {job.qualifications && job.qualifications.length > 0 ? (
              job.qualifications.map((q, i) => (
                <li key={i}>{typeof q === "object" ? (q as any).name || (q as any).qualificationName : q}</li>
              ))
            ) : (
              <li>Bachelor&apos;s in Computer Science</li>
            )}
          </ul>
        </div>

        {/* Benefits */}
        <div className="space-y-1.5">
          <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <Award className="h-3.5 w-3.5 text-slate-400" /> Benefits
          </h4>
          <ul className="list-disc list-inside space-y-1 text-[12px] text-slate-700 font-medium bg-slate-50 border border-slate-200 rounded-xl p-3">
            {job.benefits && job.benefits.length > 0 ? (
              job.benefits.map((b, i) => (
                <li key={i}>{typeof b === "object" ? (b as any).name || (b as any).benefitName : b}</li>
              ))
            ) : (
              ["Health Cover", "Remote Work", "Dashain Bonus"].map((b, i) => (
                <li key={i}>{b}</li>
              ))
            )}
          </ul>
        </div>
      </div>

      {/* ── Tags ── */}
      {job.tags && job.tags.length > 0 && (
        <div className="space-y-1 border-t border-slate-100 pt-3">
          <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <Tag className="h-3.5 w-3.5 text-slate-400" /> Search Tags
          </h4>
          <div className="flex flex-wrap gap-1">
            {job.tags.map((t, i) => (
              <span key={i} className="text-[10px] font-mono font-semibold text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md">
                #{t}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ── Actions Toolbar ── */}
      <div className="pt-4 border-t border-slate-100 space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onEdit?.(job)}
            className="flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2.5 rounded-lg transition text-[12px] shadow-2xs"
          >
            <Edit3 className="h-3.5 w-3.5" /> Edit Listing
          </button>
          <button
            onClick={() => onScheduleInterview?.(job)}
            className="flex items-center justify-center gap-1.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-semibold py-2.5 rounded-lg transition text-[12px] shadow-2xs"
          >
            <Calendar className="h-3.5 w-3.5 text-slate-500" /> Schedule Interview
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onBoostCampaign?.(job)}
            className="flex items-center justify-center gap-1.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-semibold py-2.5 rounded-lg transition text-[12px] shadow-2xs"
          >
            <Megaphone className="h-3.5 w-3.5 text-slate-500" /> Boost Campaign
          </button>
          <button
            onClick={() => onClosePosting?.(job)}
            className="flex items-center justify-center gap-1.5 bg-white hover:bg-slate-50 text-slate-700 hover:text-rose-600 border border-slate-200 font-semibold py-2.5 rounded-lg transition text-[12px] shadow-2xs"
          >
            <Power className="h-3.5 w-3.5 text-slate-400" /> Close Posting
          </button>
        </div>
      </div>
    </div>
  );
}
