"use client";

import React, { useState } from "react";
import { Calendar, User, Video, Bell, BellOff, ChevronDown, ChevronUp } from "lucide-react";

interface InterviewDetail {
  id: string;
  applicationId: string;
  companyName: string;
  jobTitle: string;
  round: string;
  date: string;
  time: string;
  meetLink?: string;
  interviewerName?: string;
  interviewerRole?: string;
  prepNotes?: string;
  reminderSet: boolean;
  status: "upcoming" | "completed" | "cancelled";
}

interface Props {
  interviews: InterviewDetail[];
}

export default function InterviewManager({ interviews }: Props) {
  const [activeTab, setActiveTab] = useState<"upcoming" | "completed">("upcoming");
  const [expandedNotes, setExpandedNotes] = useState<Record<string, boolean>>({});
  const [reminderState, setReminderState] = useState<Record<string, boolean>>(
    interviews.reduce((acc, curr) => ({ ...acc, [curr.id]: curr.reminderSet }), {})
  );

  const toggleNotes = (id: string) => {
    setExpandedNotes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleReminder = (id: string) => {
    setReminderState((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredInterviews = interviews.filter(
    (inv) =>
      activeTab === "upcoming"
        ? inv.status === "upcoming"
        : inv.status === "completed" || inv.status === "cancelled"
  );

  return (
    <div className="w-full space-y-4">
      {/* Modern Capsule Tab Bar */}
      <div className="flex bg-slate-100/80 p-1 rounded-xl w-fit">
        {(["upcoming", "completed"] as const).map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-lg text-[11px] font-extrabold uppercase tracking-wider transition-all ${
                isActive
                  ? "bg-white text-slate-950 shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Cards list */}
      <div className="space-y-4">
        {filteredInterviews.length === 0 ? (
          <div className="p-10 text-center text-slate-400 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
            <Calendar className="w-8 h-8 mx-auto mb-2 text-slate-300" />
            <p className="text-[12px] font-medium">No {activeTab} interviews scheduled.</p>
          </div>
        ) : (
          filteredInterviews.map((interview) => {
            const isCompleted = interview.status === "completed" || interview.status === "cancelled";
            return (
              <div
                key={interview.id}
                className={`bg-white border rounded-2xl p-5 hover:border-slate-300 transition-all duration-300 shadow-2xs ${
                  isCompleted ? "opacity-75 border-slate-100" : "border-slate-100"
                }`}
              >
                <div className="flex justify-between items-start mb-3 gap-3">
                  <div>
                    <h3 className="font-bold text-slate-900 text-[14px]">
                      {interview.companyName}
                    </h3>
                    <p className="text-slate-500 text-[12px] font-medium mt-0.5">{interview.jobTitle}</p>
                  </div>
                  
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold tracking-wider bg-slate-100 text-slate-700 border border-slate-200/50 uppercase">
                    {interview.round}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-[11px] font-mono text-slate-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>{interview.date} · {interview.time}</span>
                  </div>
                  {(interview.interviewerName || interview.interviewerRole) && (
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-slate-400 shrink-0" />
                      <span className="truncate">
                        {interview.interviewerName}
                        {interview.interviewerRole && ` (${interview.interviewerRole})`}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <div className="flex gap-2">
                    {interview.meetLink && !isCompleted && (
                      <a
                        href={interview.meetLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-[11px] font-bold hover:bg-slate-800 transition-colors shadow-2xs active:scale-95"
                      >
                        <Video className="w-3.5 h-3.5" />
                        Join Meeting
                      </a>
                    )}
                    {interview.prepNotes && (
                      <button
                        onClick={() => toggleNotes(interview.id)}
                        className="inline-flex items-center justify-center gap-1 px-3 py-1.5 bg-slate-50 border border-slate-200 text-slate-700 rounded-lg text-[11px] font-bold hover:bg-slate-100 transition-all active:scale-95"
                      >
                        <span>Prep Notes</span>
                        {expandedNotes[interview.id] ? (
                          <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                        )}
                      </button>
                    )}
                  </div>
                  
                  {!isCompleted && (
                    <button
                      onClick={() => toggleReminder(interview.id)}
                      className={`p-1.5 rounded-lg border transition-all ${
                        reminderState[interview.id]
                          ? "bg-amber-50 border-amber-100 text-amber-500 shadow-2xs"
                          : "bg-white border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                      }`}
                      title={reminderState[interview.id] ? "Reminder Set" : "Enable Reminder"}
                    >
                      {reminderState[interview.id] ? (
                        <Bell className="w-4 h-4 fill-current" />
                      ) : (
                        <BellOff className="w-4 h-4" />
                      )}
                    </button>
                  )}
                </div>

                {expandedNotes[interview.id] && interview.prepNotes && (
                  <div className="mt-4 p-4 bg-amber-50/50 rounded-xl border border-amber-100/60 text-[12px] text-amber-800 leading-relaxed font-sans whitespace-pre-wrap">
                    <span className="font-bold uppercase tracking-wider block text-[10px] text-amber-600 mb-1">Preparation Guidance:</span>
                    {interview.prepNotes}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
