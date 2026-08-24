"use client";

import React, { useState } from "react";
import DashboardShell from "@/components/layout/DashboardShell";
import { getAdminNavItems } from "@/lib/admin-nav";
import { Shield, AlertTriangle, Plus, Trash2, ToggleLeft, ToggleRight, Globe, User, Building2 } from "lucide-react";

const RESTRICTIONS = [
  { id: "r1", type: "IP Ban", target: "185.220.101.4", reason: "Bot activity — 64 apps in 12 minutes", createdBy: "Auto-detect", date: "Aug 1, 2025", active: true },
  { id: "r2", type: "Domain Block", target: "spam-resumes.io", reason: "Fake candidate profiles from this domain", createdBy: "Admin SA", date: "Jul 28, 2025", active: true },
  { id: "r3", type: "User Suspension", target: "user_44812", reason: "Bulk application spam, suspected automation", createdBy: "Admin SA", date: "Aug 1, 2025", active: true },
  { id: "r4", type: "Company Restrict", target: "QuickHire Solutions", reason: "Posting fraudulent job listings with wire transfer requests", createdBy: "Admin SA", date: "Aug 1, 2025", active: true },
  { id: "r5", type: "IP Ban", target: "192.168.44.9", reason: "Rate-limit breach — review scraping attempt", createdBy: "Auto-detect", date: "Jul 30, 2025", active: false },
  { id: "r6", type: "Domain Block", target: "temp-mail.org", reason: "Fake signups using temporary email service", createdBy: "Admin SA", date: "Jul 20, 2025", active: true },
];

const TYPE_ICON: Record<string, React.FC<{ className?: string }>> = {
  "IP Ban": Globe,
  "Domain Block": Globe,
  "User Suspension": User,
  "Company Restrict": Building2,
};

export default function AdminRestrictionsPage() {
  const [restrictions, setRestrictions] = useState(RESTRICTIONS);
  const [search, setSearch] = useState("");

  const toggle = (id: string) => setRestrictions(prev => prev.map(r => r.id === id ? { ...r, active: !r.active } : r));
  const remove = (id: string) => setRestrictions(prev => prev.filter(r => r.id !== id));

  const filtered = restrictions.filter(r =>
    !search || r.target.toLowerCase().includes(search.toLowerCase()) || r.reason.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardShell
      brandTitle="JPS" brandSubtitle="Admin Dashboard"
      navItems={getAdminNavItems("/admin/restrictions")}
      searchPlaceholder="Search restrictions..." searchQuery={search} onSearchChange={setSearch}
      userAvatarText="SA" alertsCount={3} notificationsCount={3}
    >
      <div className="space-y-5">
        <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
          <div>
            <h1 className="text-[20px] font-bold text-slate-900 tracking-tight">Restrictions & Bans</h1>
            <p className="text-[13px] text-slate-500 mt-0.5">Manage IP bans, domain blocks, user suspensions and company restrictions</p>
          </div>
          <button onClick={() => alert("Add restriction rule")} className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-[12px] font-semibold px-4 py-2 rounded-lg transition">
            <Plus className="h-4 w-4" /> Add Restriction
          </button>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "IP Bans", value: restrictions.filter(r => r.type === "IP Ban").length, color: "text-rose-700" },
            { label: "Domain Blocks", value: restrictions.filter(r => r.type === "Domain Block").length, color: "text-amber-700" },
            { label: "User Suspensions", value: restrictions.filter(r => r.type === "User Suspension").length, color: "text-slate-900" },
            { label: "Company Restricts", value: restrictions.filter(r => r.type === "Company Restrict").length, color: "text-slate-900" },
          ].map(s => (
            <div key={s.label} className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs text-center">
              <div className={`text-[20px] font-bold font-mono ${s.color}`}>{s.value}</div>
              <div className="text-[11px] text-slate-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map(r => {
            const Icon = TYPE_ICON[r.type] ?? Shield;
            return (
              <div key={r.id} className={`bg-white border rounded-xl p-4 shadow-2xs flex items-start gap-4 ${!r.active ? "opacity-60" : "border-slate-200"}`}>
                <div className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 ${r.active ? "bg-rose-100" : "bg-slate-100"}`}>
                  <Icon className={`h-4 w-4 ${r.active ? "text-rose-600" : "text-slate-400"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[12px] font-semibold text-slate-900">{r.type}</span>
                    <span className="font-mono text-[11px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">{r.target}</span>
                    {!r.active && <span className="text-[10px] font-semibold text-slate-400 border border-slate-200 px-1.5 py-0.5 rounded">INACTIVE</span>}
                  </div>
                  <p className="text-[12px] text-slate-500 mt-0.5 truncate">{r.reason}</p>
                  <p className="text-[10px] font-mono text-slate-400 mt-0.5">By {r.createdBy} · {r.date}</p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button title={r.active ? "Disable" : "Enable"} onClick={() => toggle(r.id)} className="p-1.5 rounded text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition">
                    {r.active ? <ToggleRight className="h-4 w-4 text-emerald-600" /> : <ToggleLeft className="h-4 w-4" />}
                  </button>
                  <button title="Delete" onClick={() => remove(r.id)} className="p-1.5 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardShell>
  );
}
