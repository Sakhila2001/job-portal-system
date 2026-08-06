"use client";

import React, { useState } from "react";
import DashboardShell from "@/components/layout/DashboardShell";
import { useRecruiterOverview } from "@/hooks/useRecruiterOverview";
import { getRecruiterNavItems } from "@/lib/recruiter-nav";
import { ScheduleInterviewModal } from "@/components/recruiter/RecruiterModals";
import { Plus, Video, Clock } from "lucide-react";

export default function RecruiterInterviewsPage() {
  const { interviews, addInterview, tasks } = useRecruiterOverview();
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  return (
    <DashboardShell
      brandTitle="JPS"
      brandSubtitle="Employer Dashboard"
      navItems={getRecruiterNavItems("/employer/interviews", tasks.length)}
      searchPlaceholder="Search interview schedule..."
      userAvatarText="JE"
    >
      <ScheduleInterviewModal
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
        onInterviewScheduled={(interview) => addInterview(interview)}
      />

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
          <div>
            <h1 className="text-[20px] font-bold text-slate-900 tracking-tight">Interview Schedule</h1>
            <p className="text-[13px] text-slate-500 mt-0.5">
              Scheduled technical rounds, HR screenings, and scorecard reviews
            </p>
          </div>
          <button
            onClick={() => setIsScheduleOpen(true)}
            className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-[12px] font-semibold px-4 py-2 rounded-lg transition shrink-0"
          >
            <Plus className="h-4 w-4" />
            <span>Schedule Interview</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {interviews.map((item) => (
            <div key={item.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-slate-900 text-[15px]">{item.candidateName}</h3>
                  <p className="text-[12px] text-slate-500">{item.jobTitle}</p>
                </div>
                <span className="text-[11px] font-mono font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
                  {item.type}
                </span>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg space-y-1.5 font-mono text-[12px]">
                <div className="flex items-center gap-2 text-slate-700">
                  <Clock className="h-3.5 w-3.5 text-slate-400" />
                  <span>{item.dateText}</span>
                </div>
                <div className="flex items-center gap-2 text-blue-600 truncate">
                  <Video className="h-3.5 w-3.5 text-blue-500" />
                  <span className="truncate">{item.meetLink || item.locationOrUrl}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                {item.meetLink ? (
                  <a
                    href={item.meetLink} target="_blank" rel="noreferrer"
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white text-[12px] font-semibold py-2 rounded-lg transition text-center inline-block"
                  >
                    Join Call
                  </a>
                ) : (
                  <button
                    onClick={() => window.open("https://meet.google.com", "_blank")}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white text-[12px] font-semibold py-2 rounded-lg transition"
                  >
                    Join Call
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
