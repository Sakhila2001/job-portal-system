"use client";

import React from "react";
import StatusBadge from "@/components/shared/StatusBadge";
import { JobApplication } from "@/lib/types";
import { Award, Clock, DollarSign, FileText, GraduationCap, MapPin, Sparkles } from "lucide-react";

interface ApplicationDetailPanelProps {
  application: JobApplication;
  onWithdraw: (application: JobApplication) => void;
}

export default function ApplicationDetailPanel({ application, onWithdraw }: ApplicationDetailPanelProps) {
  const job = application.job;
  const experience = job?.minExperienceMonths
    ? `${Math.floor(job.minExperienceMonths / 12)}${job.maxExperienceMonths ? `–${Math.floor(job.maxExperienceMonths / 12)}` : "+"} years`
    : "Any experience";

  return (
    <div className="space-y-5 text-[13px]">
      <div>
        <div className="flex flex-wrap gap-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">{job?.department ?? "Engineering"}</span>
          {job?.seniorityLevel && <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">{job.seniorityLevel}</span>}
        </div>
        <h4 className="font-bold text-slate-900 text-[18px] mt-2">{application.jobTitle}</h4>
        <p className="text-slate-600 font-medium">{application.companyName}</p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl"><div className="text-[10px] text-slate-400 uppercase">Employment type</div><div className="font-semibold text-slate-900 mt-1">{job?.employmentType ?? "Full-time"}</div></div>
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl"><div className="text-[10px] text-slate-400 uppercase">Experience</div><div className="font-semibold text-slate-900 mt-1">{experience}</div></div>
      </div>

      <div className="p-4 bg-slate-900 text-white rounded-xl space-y-2">
        <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider flex items-center gap-1"><DollarSign className="h-3.5 w-3.5" /> Compensation & location</div>
        <div className="text-[17px] font-bold font-mono">{application.salaryText}</div>
        <div className="flex items-center gap-1.5 text-[11px] text-slate-300 pt-1 border-t border-white/10"><MapPin className="h-3.5 w-3.5" /> {job?.workMode ?? "On-site"} · {job?.locations?.join(", ") ?? application.location}</div>
      </div>

      <section className="border-t border-slate-100 pt-4 space-y-1.5"><h5 className="text-[12px] font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5"><FileText className="h-3.5 w-3.5 text-slate-400" /> Job description</h5><p className="text-slate-600 leading-relaxed whitespace-pre-line bg-slate-50 border border-slate-200 rounded-xl p-3.5">{job?.description ?? "Job description is not available."}</p></section>

      <section className="border-t border-slate-100 pt-4 space-y-2"><h5 className="text-[12px] font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5"><Sparkles className="h-3.5 w-3.5 text-slate-400" /> Required skills</h5><div className="space-y-2">{job?.skills?.map((skill) => <div key={skill} className="w-full text-[12px] font-medium bg-slate-50 text-slate-800 border border-slate-200 px-3 py-2 rounded-lg">{skill}</div>)}</div></section>

      <div className="space-y-4 border-t border-slate-100 pt-4">
        <section className="space-y-2"><h5 className="text-[11px] font-bold text-slate-500 uppercase flex items-center gap-1"><GraduationCap className="h-3.5 w-3.5" /> Qualifications</h5><div className="space-y-2">{job?.qualifications?.map((qualification) => <div key={qualification} className="w-full text-[12px] leading-relaxed text-slate-700 bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg">{qualification}</div>)}</div></section>
        <section className="space-y-2"><h5 className="text-[11px] font-bold text-slate-500 uppercase flex items-center gap-1"><Award className="h-3.5 w-3.5" /> Benefits</h5><div className="space-y-2">{job?.benefits?.map((benefit) => <div key={benefit} className="w-full text-[12px] text-slate-700 bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg">{benefit}</div>)}</div></section>
      </div>

      <div className="border-t border-slate-100 pt-4 space-y-3"><div className="flex items-center justify-between"><span className="text-[11px] text-slate-500 flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> Applied {application.appliedDate}</span><StatusBadge status={application.statusCustomPill || application.status} /></div><button onClick={() => onWithdraw(application)} className="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-medium py-2 rounded-lg transition text-[12px]">Withdraw Application</button></div>
    </div>
  );
}
