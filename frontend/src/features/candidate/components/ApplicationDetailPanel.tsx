"use client";

import React, { useState, useEffect } from "react";
import StatusBadge from "@/components/shared/StatusBadge";
import { JobApplication } from "@/lib/types";
import {
  Award, Clock, DollarSign, FileText, GraduationCap, MapPin, Sparkles,
  StickyNote, Save, Calendar
} from "lucide-react";
import ApplicationTimeline from "./ApplicationTimeline";
import { MOCK_APPLICATION_TIMELINES, MOCK_APPLICATION_NOTES } from "@/lib/mock-data/candidate";

interface ApplicationDetailPanelProps {
  application: JobApplication;
  onWithdraw: (application: JobApplication) => void;
}

export default function ApplicationDetailPanel({ application, onWithdraw }: ApplicationDetailPanelProps) {
  const job = application.job;
  const experience = job?.minExperienceMonths
    ? `${Math.floor(job.minExperienceMonths / 12)}${job.maxExperienceMonths ? `–${Math.floor(job.maxExperienceMonths / 12)}` : "+"} years`
    : "Any experience";

  // Application Timeline steps from mock data
  const timelineSteps = MOCK_APPLICATION_TIMELINES[application.id] || [
    { stage: "applied", label: "Applied", date: application.appliedDate, completed: true, active: true },
    { stage: "screening", label: "Screening", completed: false, active: false },
    { stage: "interview", label: "Interview", completed: false, active: false },
    { stage: "offer", label: "Offer", completed: false, active: false },
    { stage: "hired", label: "Hired", completed: false, active: false },
  ];

  // Notes state for this specific application
  const [noteForm, setNoteForm] = useState({
    recruiterName: "",
    salaryDiscussion: "",
    followUpDate: "",
    interviewFeedback: "",
    privateNotes: "",
    lastUpdated: "",
  });

  useEffect(() => {
    const existing = MOCK_APPLICATION_NOTES.find((n) => n.applicationId === application.id);
    if (existing) {
      setNoteForm({
        recruiterName: existing.recruiterName || "",
        salaryDiscussion: existing.salaryDiscussion || "",
        followUpDate: existing.followUpDate || "",
        interviewFeedback: existing.interviewFeedback || "",
        privateNotes: existing.privateNotes || "",
        lastUpdated: existing.lastUpdated || "",
      });
    } else {
      setNoteForm({
        recruiterName: "",
        salaryDiscussion: "",
        followUpDate: "",
        interviewFeedback: "",
        privateNotes: "",
        lastUpdated: "",
      });
    }
  }, [application.id]);

  const handleSaveNotes = () => {
    // Simulate updating mock data or show feedback
    setNoteForm(prev => ({
      ...prev,
      lastUpdated: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    }));
    alert("Private application notes saved successfully!");
  };

  return (
    <div className="space-y-6 text-[13px] pb-10">
      {/* ── SECTION 1: Application Timeline Stepper ── */}
      <section className="bg-slate-50 border border-slate-200 rounded-xl p-4">
        <h5 className="text-[12px] font-bold text-slate-900 uppercase tracking-wider mb-3">
          Application Progress
        </h5>
        <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <ApplicationTimeline
            applicationId={application.id}
            jobTitle={application.jobTitle}
            companyName={application.companyName}
            steps={timelineSteps}
          />
        </div>
      </section>

      {/* ── SECTION 2: General Job Information ── */}
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

      {/* ── SECTION 3: Private Notes Editor (ApplicationNotes) ── */}
      <section className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <StickyNote className="w-4 h-4 text-slate-700" />
          <h5 className="text-[12px] font-bold text-slate-900 uppercase tracking-wider">
            Private Application Notes
          </h5>
        </div>
        
        <div className="space-y-3">
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Recruiter Name</label>
            <input
              type="text"
              value={noteForm.recruiterName}
              onChange={(e) => setNoteForm({ ...noteForm, recruiterName: e.target.value })}
              className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-[12px]"
              placeholder="e.g. Maya Gurung"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Discussed Salary / Package</label>
            <input
              type="text"
              value={noteForm.salaryDiscussion}
              onChange={(e) => setNoteForm({ ...noteForm, salaryDiscussion: e.target.value })}
              className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-[12px]"
              placeholder="e.g. Rs 90k, negotiation open"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Follow-Up Date</label>
            <div className="relative">
              <Calendar className="w-4 h-4 absolute left-2.5 top-2 text-slate-400" />
              <input
                type="date"
                value={noteForm.followUpDate}
                onChange={(e) => setNoteForm({ ...noteForm, followUpDate: e.target.value })}
                className="w-full bg-white border border-slate-200 rounded-lg pl-8 pr-2.5 py-1.5 text-[12px] text-slate-700"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Interview Feedback</label>
            <textarea
              rows={2}
              value={noteForm.interviewFeedback}
              onChange={(e) => setNoteForm({ ...noteForm, interviewFeedback: e.target.value })}
              className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-[12px] resize-none"
              placeholder="Questions asked, next steps..."
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Private Notes</label>
            <textarea
              rows={3}
              value={noteForm.privateNotes}
              onChange={(e) => setNoteForm({ ...noteForm, privateNotes: e.target.value })}
              className="w-full bg-amber-50 border border-amber-200 rounded-lg px-2.5 py-1.5 text-[12px] text-slate-800 resize-none"
              placeholder="Culture notes, concerns, follow-up checklist..."
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-[10px] text-slate-400">
              {noteForm.lastUpdated ? `Saved: ${noteForm.lastUpdated}` : "No notes saved yet."}
            </span>
            <button
              onClick={handleSaveNotes}
              className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-semibold px-3 py-1.5 rounded-lg transition"
            >
              <Save className="w-3.5 h-3.5" />
              Save Notes
            </button>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: Job Description & Details ── */}
      <section className="border-t border-slate-100 pt-4 space-y-1.5">
        <h5 className="text-[12px] font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
          <FileText className="h-3.5 w-3.5 text-slate-400" /> Job description
        </h5>
        <p className="text-slate-600 leading-relaxed whitespace-pre-line bg-slate-50 border border-slate-200 rounded-xl p-3.5">
          {job?.description ?? "Job description is not available."}
        </p>
      </section>

      <section className="border-t border-slate-100 pt-4 space-y-2">
        <h5 className="text-[12px] font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-slate-400" /> Required skills
        </h5>
        <div className="space-y-2">
          {job?.skills?.map((skill) => (
            <div key={skill} className="w-full text-[12px] font-medium bg-slate-50 text-slate-800 border border-slate-200 px-3 py-2 rounded-lg">
              {skill}
            </div>
          ))}
        </div>
      </section>

      <div className="space-y-4 border-t border-slate-100 pt-4">
        <section className="space-y-2">
          <h5 className="text-[11px] font-bold text-slate-500 uppercase flex items-center gap-1">
            <GraduationCap className="h-3.5 w-3.5" /> Qualifications
          </h5>
          <div className="space-y-2">
            {job?.qualifications?.map((qualification) => (
              <div key={qualification} className="w-full text-[12px] leading-relaxed text-slate-700 bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg">
                {qualification}
              </div>
            ))}
          </div>
        </section>
        
        <section className="space-y-2">
          <h5 className="text-[11px] font-bold text-slate-500 uppercase flex items-center gap-1">
            <Award className="h-3.5 w-3.5" /> Benefits
          </h5>
          <div className="space-y-2">
            {job?.benefits?.map((benefit) => (
              <div key={benefit} className="w-full text-[12px] text-slate-700 bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg">
                {benefit}
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="border-t border-slate-100 pt-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-slate-500 flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> Applied {application.appliedDate}
          </span>
          <StatusBadge status={application.statusCustomPill || application.status} />
        </div>
        <button onClick={() => onWithdraw(application)} className="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-medium py-2 rounded-lg transition text-[12px]">
          Withdraw Application
        </button>
      </div>
    </div>
  );
}
