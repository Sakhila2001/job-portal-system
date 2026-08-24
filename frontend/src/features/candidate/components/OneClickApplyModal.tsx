"use client";

import React, { useState } from "react";
import {
  X,
  MapPin,
  Briefcase,
  FileText,
  CheckCircle2,
  ChevronDown,
  Zap,
  Building2,
} from "lucide-react";
import { QuickApplyJob, ResumeVersion } from "@/lib/types";

interface Props {
  job: QuickApplyJob | null;
  resumes: ResumeVersion[];
  profileName: string;
  profileHeadline: string;
  profileSkills: string;
  onClose: () => void;
}

export default function OneClickApplyModal({
  job,
  resumes,
  profileName,
  profileHeadline,
  profileSkills,
  onClose,
}: Props) {
  const [selectedResumeId, setSelectedResumeId] = useState<string>(
    resumes.find((r) => r.isDefault)?.id ?? resumes[0]?.id ?? ""
  );
  const [includeCoverLetter, setIncludeCoverLetter] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  if (!job) return null;

  const selectedResume = resumes.find((r) => r.id === selectedResumeId);

  const handleApply = () => {
    setStatus("submitting");
    setTimeout(() => setStatus("success"), 1400);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.35)", backdropFilter: "blur(2px)" }}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-stone-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-stone-100 rounded-xl flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5 text-stone-600" />
            </div>
            <div>
              <h2 className="text-[16px] font-bold text-stone-900 leading-tight">{job.title}</h2>
              <p className="text-[12px] text-stone-500 font-medium mt-0.5">{job.company}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {status === "success" ? (
          <div className="px-6 py-12 text-center space-y-3">
            <div className="w-14 h-14 bg-stone-900 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-[18px] font-bold text-stone-900">Application Sent!</h3>
            <p className="text-[13px] text-stone-500 max-w-xs mx-auto leading-relaxed">
              Your application for <span className="font-semibold text-stone-700">{job.title}</span> at{" "}
              <span className="font-semibold text-stone-700">{job.company}</span> has been submitted using{" "}
              <span className="font-medium">{selectedResume?.label}</span>.
            </p>
            <div className="pt-3">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-stone-900 text-white text-[13px] font-bold rounded-xl hover:bg-stone-800 transition active:scale-95"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div className="px-6 py-5 space-y-5">
            {/* Job quick meta */}
            <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[12px] text-stone-500 font-medium">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                {job.location} - {job.workMode}
              </span>
              <span className="flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                {job.salaryText}
              </span>
            </div>

            {/* Profile snapshot */}
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 space-y-1.5">
              <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Applying as</p>
              <p className="text-[14px] font-bold text-stone-900">{profileName}</p>
              <p className="text-[12px] text-stone-600 font-medium">{profileHeadline}</p>
              <p className="text-[11px] text-stone-400 font-mono leading-relaxed">{profileSkills}</p>
            </div>

            {/* Resume selector */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">Resume</label>
              <div className="relative">
                <select
                  value={selectedResumeId}
                  onChange={(e) => setSelectedResumeId(e.target.value)}
                  className="w-full appearance-none bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-[13px] font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-400 transition pr-9"
                >
                  {resumes.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.label}{r.isDefault ? " (default)" : ""} -- {r.size}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
              </div>
              {selectedResume && (
                <p className="text-[11px] text-stone-400 flex items-center gap-1">
                  <FileText className="w-3 h-3" />
                  {selectedResume.fileName} - Uploaded {selectedResume.uploadedDate}
                </p>
              )}
            </div>

            {/* Cover letter toggle */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                role="switch"
                aria-checked={includeCoverLetter}
                onClick={() => setIncludeCoverLetter((v) => !v)}
                className={`relative w-10 rounded-full transition-colors duration-200 shrink-0 focus:outline-none focus:ring-2 focus:ring-stone-900/20 ${
                  includeCoverLetter ? "bg-stone-900" : "bg-stone-200"
                }`}
                style={{ height: "22px" }}
              >
                <span
                  className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
                    includeCoverLetter ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </button>
              <span className="text-[13px] font-medium text-stone-700">Include cover letter</span>
            </div>

            {includeCoverLetter && (
              <div className="animate-in fade-in slide-in-from-top-1 duration-200">
                <textarea
                  rows={3}
                  placeholder="Add a short note to the recruiter (optional)..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-[13px] text-stone-900 font-medium resize-none focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-400 transition placeholder:text-stone-400"
                />
              </div>
            )}

            {/* Match bar */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-[12px] font-mono text-stone-500">{job.matchPercentage}% profile match</span>
              <div className="h-1.5 w-28 bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full bg-stone-900 rounded-full" style={{ width: `${job.matchPercentage}%` }} />
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={handleApply}
              disabled={status === "submitting"}
              className="w-full flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 disabled:bg-stone-400 text-white font-bold py-3 rounded-xl text-[14px] transition-all active:scale-[0.98] shadow-sm"
            >
              {status === "submitting" ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  Apply Now
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}