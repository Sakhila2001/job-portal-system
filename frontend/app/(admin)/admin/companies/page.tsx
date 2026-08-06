"use client";

import React, { useState } from "react";
import DashboardShell from "@/components/layout/DashboardShell";
import StatusBadge from "@/components/shared/StatusBadge";
import { getAdminNavItems } from "@/lib/admin-nav";
import { CheckCircle2, XCircle, Eye, Star, ChevronLeft, ChevronRight } from "lucide-react";

const COMPANIES = [
  { id: "c1", name: "Yeti Cloud",         plan: "enterprise", status: "verified",  jobs: 8,  users: 24, rating: 4.8, since: "Jan 2024" },
  { id: "c2", name: "Himal Softworks",    plan: "pro",        status: "verified",  jobs: 6,  users: 12, rating: 4.6, since: "Mar 2024" },
  { id: "c3", name: "Brightpath Consulting", plan: "basic",   status: "pending",   jobs: 3,  users: 5,  rating: 3.9, since: "Jun 2025" },
  { id: "c4", name: "QuickHire Solutions",plan: "free",       status: "restricted",jobs: 1,  users: 2,  rating: 1.2, since: "Aug 2025" },
  { id: "c5", name: "Nexoria Tech",       plan: "basic",      status: "pending",   jobs: 4,  users: 8,  rating: 4.1, since: "Jul 2025" },
  { id: "c6", name: "Khanepani Tech",     plan: "enterprise", status: "verified",  jobs: 11, users: 30, rating: 4.7, since: "Dec 2023" },
  { id: "c7", name: "Bidur Systems",      plan: "pro",        status: "verified",  jobs: 5,  users: 9,  rating: 4.3, since: "Feb 2024" },
];

const STATUS_TABS = ["All", "verified", "pending", "restricted"];

export default function AdminCompaniesPage() {
  const [tab, setTab] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = COMPANIES.filter((c) => {
    if (tab !== "All" && c.status !== tab) return false;
    if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <DashboardShell
      brandTitle="JPS" brandSubtitle="Admin Dashboard"
      navItems={getAdminNavItems("/admin/companies")}
      searchPlaceholder="Search companies..." searchQuery={search} onSearchChange={setSearch}
      showExport onExport={() => alert("Exporting companies...")}
      userAvatarText="SA" alertsCount={3} notificationsCount={3}
    >
      <div className="space-y-5">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
          <h1 className="text-[20px] font-bold text-slate-900 tracking-tight">Company Management</h1>
          <p className="text-[13px] text-slate-500 mt-0.5">Verify, restrict, and manage all registered employer companies on the platform</p>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Total Companies", value: COMPANIES.length },
            { label: "Verified", value: COMPANIES.filter(c => c.status === "verified").length },
            { label: "Pending Verification", value: COMPANIES.filter(c => c.status === "pending").length },
            { label: "Restricted", value: COMPANIES.filter(c => c.status === "restricted").length },
          ].map((s) => (
            <div key={s.label} className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs text-center">
              <div className="text-[20px] font-bold font-mono text-slate-900">{s.value}</div>
              <div className="text-[11px] text-slate-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="flex gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 w-fit">
          {STATUS_TABS.map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-3 py-1 text-[12px] font-medium rounded-md capitalize transition ${tab === t ? "bg-white text-slate-900 shadow-xs border border-slate-200/80" : "text-slate-500 hover:text-slate-800"}`}
            >{t === "All" ? "All" : t}</button>
          ))}
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60">
                {["Company", "Plan", "Status", "Rating", "Jobs", "Users", "Since", "Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/60 transition">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-lg bg-slate-900 text-white text-[11px] font-bold flex items-center justify-center font-mono">{c.name.slice(0,2).toUpperCase()}</div>
                      <span className="font-semibold text-slate-900">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3"><StatusBadge status={c.plan} /></td>
                  <td className="px-4 py-3"><StatusBadge status={c.status} showDot /></td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1 font-mono font-semibold text-slate-800 text-[12px]">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-500" />{c.rating}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-slate-700">{c.jobs}</td>
                  <td className="px-4 py-3 font-mono text-slate-700">{c.users}</td>
                  <td className="px-4 py-3 text-slate-500 font-mono text-[11px]">{c.since}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <button title="View" onClick={() => alert(`View ${c.name}`)} className="p-1.5 rounded text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition"><Eye className="h-3.5 w-3.5" /></button>
                      {c.status === "pending" && <button title="Verify" onClick={() => alert(`Verify ${c.name}`)} className="p-1.5 rounded text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition"><CheckCircle2 className="h-3.5 w-3.5" /></button>}
                      {c.status !== "restricted" && <button title="Restrict" onClick={() => alert(`Restrict ${c.name}`)} className="p-1.5 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"><XCircle className="h-3.5 w-3.5" /></button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="border-t border-slate-100 px-4 py-3 flex items-center justify-between text-[12px] text-slate-500">
            <span>Showing {filtered.length} of {COMPANIES.length} companies</span>
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
