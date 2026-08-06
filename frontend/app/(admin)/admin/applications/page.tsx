"use client";

import React, { useState } from "react";
import DashboardShell from "@/components/layout/DashboardShell";
import StatusBadge from "@/components/shared/StatusBadge";
import ModerationQueueTable from "@/components/admin/ModerationQueueTable";
import { getAdminNavItems } from "@/lib/admin-nav";
import { useAdminOverview } from "@/hooks/useAdminOverview";

export default function AdminApplicationsPage() {
  const { moderationQueue, searchQuery, setSearchQuery, setSelectedModerationItem, handleAction } = useAdminOverview();

  const APP_MOCK = [
    { id: "a1", candidate: "Sujata K.",  job: "Senior Laravel Dev", company: "JPS Employer", date: "Jul 21", status: "interview",  score: 87 },
    { id: "a2", candidate: "Ramesh B.",  job: "Senior Laravel Dev", company: "JPS Employer", date: "Jul 22", status: "screening",  score: 74 },
    { id: "a3", candidate: "Anita M.",   job: "Senior Laravel Dev", company: "JPS Employer", date: "Jul 25", status: "applied",    score: 68 },
    { id: "a4", candidate: "Bimal T.",   job: "Senior Laravel Dev", company: "JPS Employer", date: "Jul 20", status: "offer",      score: 91 },
    { id: "a5", candidate: "Sabina G.",  job: "Senior Laravel Dev", company: "JPS Employer", date: "Jul 26", status: "rejected",   score: 63 },
    { id: "a6", candidate: "Arjun S.",   job: "DevOps Engineer",    company: "Yeti Cloud",    date: "Jul 29", status: "interview",  score: 82 },
    { id: "a7", candidate: "Pooja R.",   job: "DevOps Engineer",    company: "Yeti Cloud",    date: "Aug 1",  status: "rejected",   score: 59 },
    { id: "a8", candidate: "SpamBot9",   job: "Data Entry Clerk",   company: "QuickHire",     date: "Aug 1",  status: "not selected", score: 11 },
  ];

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = APP_MOCK.filter((a) => {
    if (filter !== "All" && a.status !== filter) return false;
    if (search && !a.candidate.toLowerCase().includes(search.toLowerCase()) && !a.job.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const TABS = ["All", "applied", "screening", "interview", "offer", "rejected", "not selected"];

  return (
    <DashboardShell
      brandTitle="JPS" brandSubtitle="Admin Dashboard"
      navItems={getAdminNavItems("/admin/applications")}
      searchPlaceholder="Search applications..." searchQuery={search} onSearchChange={setSearch}
      showExport onExport={() => alert("Exporting applications...")}
      userAvatarText="SA" alertsCount={3} notificationsCount={3}
    >
      <div className="space-y-5">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
          <h1 className="text-[20px] font-bold text-slate-900 tracking-tight">All Applications</h1>
          <p className="text-[13px] text-slate-500 mt-0.5">Platform-wide application audit — view all candidate submissions, statuses, and scores</p>
        </div>

        {/* Summary strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Total Applications", value: "2,847", color: "text-slate-900" },
            { label: "Active in Pipeline", value: "1,203", color: "text-emerald-700" },
            { label: "Avg Screen Score", value: "74.2", color: "text-blue-700" },
            { label: "Spam / Removed", value: "43", color: "text-rose-700" },
          ].map((s) => (
            <div key={s.label} className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs text-center">
              <div className={`text-[20px] font-bold font-mono ${s.color}`}>{s.value}</div>
              <div className="text-[11px] text-slate-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="flex gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 w-fit flex-wrap">
          {TABS.map((t) => (
            <button key={t} onClick={() => setFilter(t)}
              className={`px-3 py-1 text-[12px] font-medium rounded-md capitalize transition ${filter === t ? "bg-white text-slate-900 shadow-xs border border-slate-200/80" : "text-slate-500 hover:text-slate-800"}`}
            >{t}</button>
          ))}
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60">
                {["Candidate", "Job Title", "Company", "Applied", "Status", "Score", "Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((a) => (
                <tr key={a.id} className="hover:bg-slate-50/60 transition">
                  <td className="px-4 py-3 font-semibold text-slate-900">{a.candidate}</td>
                  <td className="px-4 py-3 text-slate-700 font-medium">{a.job}</td>
                  <td className="px-4 py-3 text-slate-500">{a.company}</td>
                  <td className="px-4 py-3 font-mono text-slate-500 text-[11px]">{a.date}</td>
                  <td className="px-4 py-3"><StatusBadge status={a.status} /></td>
                  <td className="px-4 py-3 font-mono font-semibold text-slate-900">{a.score}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => alert(`View application ${a.id}`)} className="text-[11px] font-medium text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50 px-2 py-1 rounded transition">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardShell>
  );
}
