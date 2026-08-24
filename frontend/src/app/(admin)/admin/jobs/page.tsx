"use client";

import React, { useState } from "react";
import DashboardShell from "@/components/layout/DashboardShell";
import StatusBadge from "@/components/shared/StatusBadge";
import { getAdminNavItems } from "@/lib/admin-nav";
import { Plus, Eye, Pause, Trash2, Search, ChevronLeft, ChevronRight } from "lucide-react";

const MOCK_JOBS = [
  { id: "j1", title: "Senior Laravel Developer", company: "JPS Employer", status: "live",     posted: "Jul 20", expires: 12, apps: 21, views: 340,  plan: "pro" },
  { id: "j2", title: "DevOps Engineer",          company: "Yeti Cloud",    status: "live",     posted: "Jul 28", expires: 5,  apps: 9,  views: 180,  plan: "basic" },
  { id: "j3", title: "QA Engineer",              company: "JPS Employer",  status: "expiring", posted: "Jul 30", expires: 2,  apps: 7,  views: 86,   plan: "pro" },
  { id: "j4", title: "Full Stack Engineer",      company: "Khanepani Tech",status: "live",     posted: "Jul 22", expires: 18, apps: 34, views: 512,  plan: "enterprise" },
  { id: "j5", title: "Product Designer",         company: "Himal Softworks",status:"draft",    posted: "—",      expires: 0,  apps: 0,  views: 0,    plan: "basic" },
  { id: "j6", title: "Data Entry Clerk",         company: "QuickHire",     status: "flagged",  posted: "Aug 1",  expires: 30, apps: 2,  views: 45,   plan: "free" },
  { id: "j7", title: "Senior React Developer",   company: "Nexoria Tech",  status: "pending",  posted: "Aug 2",  expires: 30, apps: 0,  views: 12,   plan: "basic" },
];

const STATUS_TABS = ["All", "live", "pending", "expiring", "draft", "flagged"];

export default function AdminJobsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = MOCK_JOBS.filter((j) => {
    if (activeTab !== "All" && j.status !== activeTab) return false;
    if (search && !j.title.toLowerCase().includes(search.toLowerCase()) && !j.company.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <DashboardShell
      brandTitle="JPS" brandSubtitle="Admin Dashboard"
      navItems={getAdminNavItems("/admin/jobs")}
      searchPlaceholder="Search jobs..." searchQuery={search} onSearchChange={setSearch}
      showExport onExport={() => alert("Exporting jobs list...")}
      userAvatarText="SA" alertsCount={3} notificationsCount={3}
    >
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
          <div>
            <h1 className="text-[20px] font-bold text-slate-900 tracking-tight">Job Listings</h1>
            <p className="text-[13px] text-slate-500 mt-0.5">Moderate, approve, and manage all employer job postings on the platform</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => alert("Export jobs CSV")} className="inline-flex items-center gap-1.5 text-[12px] font-medium border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 px-3 py-2 rounded-lg transition">Export CSV</button>
            <button onClick={() => alert("Add manual job")} className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-[12px] font-semibold px-4 py-2 rounded-lg transition">
              <Plus className="h-4 w-4" /> Add Job
            </button>
          </div>
        </div>

        {/* Tab Filter */}
        <div className="flex gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 w-fit">
          {STATUS_TABS.map((t) => (
            <button key={t} onClick={() => setActiveTab(t)}
              className={`px-3 py-1 text-[12px] font-medium rounded-md capitalize transition ${activeTab === t ? "bg-white text-slate-900 shadow-xs border border-slate-200/80" : "text-slate-500 hover:text-slate-800"}`}
            >{t === "All" ? "All" : t}</button>
          ))}
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60">
                {["Job Title", "Company", "Plan", "Status", "Apps", "Views", "Posted", "Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((j) => (
                <tr key={j.id} className="hover:bg-slate-50/60 transition">
                  <td className="px-4 py-3 font-semibold text-slate-900 max-w-[200px] truncate">{j.title}</td>
                  <td className="px-4 py-3 text-slate-600 font-medium">{j.company}</td>
                  <td className="px-4 py-3"><StatusBadge status={j.plan} /></td>
                  <td className="px-4 py-3"><StatusBadge status={j.status} showDot /></td>
                  <td className="px-4 py-3 font-mono text-slate-700">{j.apps}</td>
                  <td className="px-4 py-3 font-mono text-slate-700">{j.views}</td>
                  <td className="px-4 py-3 text-slate-500 font-mono text-[11px]">{j.posted}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <button title="Review" onClick={() => alert(`Review ${j.title}`)} className="p-1.5 rounded text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition"><Eye className="h-3.5 w-3.5" /></button>
                      <button title="Pause" onClick={() => alert(`Pause ${j.title}`)} className="p-1.5 rounded text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition"><Pause className="h-3.5 w-3.5" /></button>
                      <button title="Remove" onClick={() => alert(`Remove ${j.title}`)} className="p-1.5 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-12 text-center text-[13px] text-slate-400">No jobs match the current filters.</div>
          )}
          <div className="border-t border-slate-100 px-4 py-3 flex items-center justify-between text-[12px] text-slate-500">
            <span>Showing {filtered.length} of {MOCK_JOBS.length} jobs</span>
            <div className="flex gap-1">
              <button className="p-1 rounded hover:bg-slate-100 transition"><ChevronLeft className="h-4 w-4" /></button>
              <button className="px-2.5 py-1 rounded bg-slate-900 text-white font-mono text-[11px]">1</button>
              <button className="p-1 rounded hover:bg-slate-100 transition"><ChevronRight className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
