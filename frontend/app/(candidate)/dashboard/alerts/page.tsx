"use client";

import React, { useState } from "react";
import DashboardShell from "@/components/layout/DashboardShell";
import { useCandidateOverview } from "@/hooks/useCandidateOverview";
import { getCandidateNavItems } from "@/lib/candidate-nav";
import { Briefcase, MapPin, Plus, Trash2 } from "lucide-react";

export default function CandidateJobAlertsPage() {
  const { profile } = useCandidateOverview();

  const [alerts, setAlerts] = useState([
    {
      id: "alert-1",
      keyword: "Backend Developer",
      location: "Kathmandu / Remote",
      frequency: "Daily Digest",
      isActive: true,
      matchesCount: 14,
    },
    {
      id: "alert-2",
      keyword: "Laravel / PHP Engineer",
      location: "Nepal",
      frequency: "Instant",
      isActive: true,
      matchesCount: 8,
    },
  ]);

  const toggleAlert = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isActive: !a.isActive } : a))
    );
  };

  const deleteAlert = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <DashboardShell
      brandTitle="JPS"
      brandSubtitle="Candidate Dashboard"
      navItems={getCandidateNavItems("/dashboard/alerts")}
      searchPlaceholder="Search job alerts..."
      userAvatarText={profile.avatarText}
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
          <div>
            <h1 className="text-[20px] font-bold text-slate-900 tracking-tight">Job Alerts</h1>
            <p className="text-[13px] text-slate-500 mt-0.5">
              Automated email and push notifications whenever new matching jobs are posted
            </p>
          </div>
          <button
            onClick={() => alert("Create new Job Alert Modal")}
            className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-[12px] font-semibold px-3.5 py-2 rounded-lg transition shrink-0"
          >
            <Plus className="h-4 w-4" />
            <span>Create New Alert</span>
          </button>
        </div>

        <div className="space-y-4">
          {alerts.map((item) => (
            <div key={item.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700">
                    <Briefcase className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-[15px]">{item.keyword}</h3>
                    <div className="flex items-center gap-3 text-[12px] text-slate-500 font-mono mt-0.5">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {item.location}
                      </span>
                      <span>•</span>
                      <span>Frequency: {item.frequency}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                <span className="text-[12px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full font-medium">
                  {item.matchesCount} new matches
                </span>

                <button
                  onClick={() => toggleAlert(item.id)}
                  className={`text-[12px] font-semibold px-3 py-1.5 rounded-lg border transition ${
                    item.isActive
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-slate-100 text-slate-500 border-slate-200"
                  }`}
                >
                  {item.isActive ? "Active" : "Paused"}
                </button>

                <button
                  onClick={() => deleteAlert(item.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
