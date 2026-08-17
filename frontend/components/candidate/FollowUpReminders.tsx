"use client";

import React, { useState } from "react";
import { Clock, Send, X, AlertCircle, Calendar } from "lucide-react";

export interface FollowUpReminder {
  applicationId: string;
  jobTitle: string;
  companyName: string;
  appliedDate: string;
  daysSince: number;
  status: string;
  suggestedAction: string;
}

interface Props {
  reminders: FollowUpReminder[];
  onDismiss: (applicationId: string) => void;
}

export default function FollowUpReminders({ reminders, onDismiss }: Props) {
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set());

  const handleDismiss = (id: string) => {
    setDismissedIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    setTimeout(() => {
      onDismiss(id);
    }, 300);
  };

  const visibleReminders = reminders.filter((r) => !dismissedIds.has(r.applicationId));

  return (
    <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6 transition-all duration-200">
      <div className="flex items-center gap-2 mb-5">
        <div className="bg-slate-100 p-2 rounded-xl text-slate-700">
          <Clock className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-[15px] font-bold text-slate-900">Follow-Up Reminders</h2>
          <p className="text-[12px] text-slate-500 mt-0.5">Stale applications that might need attention</p>
        </div>
      </div>

      {visibleReminders.length > 0 ? (
        <div className="space-y-3.5">
          {visibleReminders.map((reminder) => {
            const isUrgent = reminder.daysSince > 60;
            const isWarning = reminder.daysSince > 14 && reminder.daysSince <= 60;

            let badgeColors = "text-blue-700 bg-blue-50/50 border-blue-100";
            let cardColors = "bg-white hover:bg-slate-50/50";
            
            if (isUrgent) {
              badgeColors = "text-rose-700 bg-rose-50/50 border-rose-100";
              cardColors = "bg-rose-50/10 border-l-4 border-l-rose-500";
            } else if (isWarning) {
              badgeColors = "text-amber-700 bg-amber-50/50 border-amber-100";
              cardColors = "bg-amber-50/10 border-l-4 border-l-amber-400";
            }

            return (
              <div
                key={reminder.applicationId}
                className={`flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border border-slate-100 rounded-xl transition-all duration-300 ${cardColors}`}
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-[13px] leading-none">{reminder.jobTitle}</h3>
                    <span className="text-[11px] text-slate-400 font-medium">at {reminder.companyName}</span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${badgeColors} flex items-center gap-1`}>
                      <Calendar className="w-3 h-3" />
                      Applied {reminder.daysSince} days ago
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                      {isUrgent && <AlertCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />}
                      {reminder.suggestedAction}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleDismiss(reminder.applicationId)}
                    className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors border border-transparent hover:border-slate-200"
                    title="Dismiss reminder"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <button className="flex items-center gap-1 bg-slate-900 text-white px-3.5 py-1.5 rounded-lg text-[11px] font-bold hover:bg-slate-800 transition-colors shadow-2xs active:scale-95">
                    <Send className="w-3 h-3" />
                    <span>Send Follow-Up</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-10 px-4 bg-slate-50/50 rounded-xl border border-slate-200/60 border-dashed">
          <div className="bg-emerald-100 text-emerald-600 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckIcon className="w-5 h-5" />
          </div>
          <h3 className="text-slate-900 text-[13px] font-bold">You're all caught up!</h3>
          <p className="text-slate-500 text-[11px] mt-0.5">No follow-up reminders needed at this time.</p>
        </div>
      )}
    </div>
  );
}

function CheckIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
