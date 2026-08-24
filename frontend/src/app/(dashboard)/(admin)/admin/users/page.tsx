"use client";

import React, { useState } from "react";
import DashboardShell from "@/components/layout/DashboardShell";
import StatusBadge from "@/components/shared/StatusBadge";
import { getAdminNavItems } from "@/lib/admin-nav";
import { Search, UserPlus, Download, Shield, Ban, CheckCircle2, Mail, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react";

const MOCK_USERS = [
  { id: "u1", name: "Sujata K.", email: "sujata@email.com", role: "candidate", status: "active", joined: "Jul 20, 2025", lastLogin: "2h ago", apps: 14 },
  { id: "u2", name: "Tarun S.",  email: "tarun@jps.io",    role: "recruiter", status: "active", joined: "Jun 5, 2025",  lastLogin: "1d ago", apps: 0 },
  { id: "u3", name: "Anita M.", email: "anita@email.com",  role: "candidate", status: "active", joined: "Jul 25, 2025", lastLogin: "5h ago", apps: 3 },
  { id: "u4", name: "SpamBot9", email: "spam@bot.io",      role: "candidate", status: "suspended", joined: "Aug 1, 2025", lastLogin: "1d ago", apps: 64 },
  { id: "u5", name: "Ramesh B.", email: "ramesh@email.com", role: "candidate", status: "active", joined: "Jul 22, 2025", lastLogin: "3h ago", apps: 7 },
  { id: "u6", name: "Bikash R.", email: "bikash@jps.io",   role: "recruiter", status: "active", joined: "Jul 1, 2025",  lastLogin: "6h ago", apps: 0 },
  { id: "u7", name: "Pooja R.",  email: "pooja@email.com", role: "candidate", status: "restricted", joined: "Aug 1, 2025", lastLogin: "2d ago", apps: 4 },
  { id: "u8", name: "Bibek L.",  email: "bibek@email.com", role: "candidate", status: "active", joined: "Aug 1, 2025",  lastLogin: "1h ago", apps: 2 },
];

const ROLE_FILTER_OPTS = ["All", "candidate", "recruiter", "admin"];
const STATUS_FILTER_OPTS = ["All", "active", "suspended", "restricted"];

export default function AdminUsersPage() {
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = MOCK_USERS.filter((u) => {
    if (roleFilter !== "All" && u.role !== roleFilter) return false;
    if (statusFilter !== "All" && u.status !== statusFilter) return false;
    if (search && !u.name.toLowerCase().includes(search.toLowerCase()) && !u.email.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <DashboardShell
      brandTitle="JPS"
      brandSubtitle="Admin Dashboard"
      navItems={getAdminNavItems("/admin/users")}
      searchPlaceholder="Search users..."
      searchQuery={search}
      onSearchChange={setSearch}
      showExport
      onExport={() => alert("Exporting user list...")}
      userAvatarText="SA"
      alertsCount={3}
      notificationsCount={3}
    >
      <div className="space-y-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
          <div>
            <h1 className="text-[20px] font-bold text-slate-900 tracking-tight">User Management</h1>
            <p className="text-[13px] text-slate-500 mt-0.5">Manage candidate, recruiter and admin accounts — suspend, restrict, and verify</p>
          </div>
          <button onClick={() => alert("Invite Admin User")} className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-[12px] font-semibold px-4 py-2 rounded-lg transition shrink-0">
            <UserPlus className="h-4 w-4" /> Invite User
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <div className="flex gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
            {ROLE_FILTER_OPTS.map((opt) => (
              <button key={opt} onClick={() => setRoleFilter(opt)}
                className={`px-3 py-1 text-[12px] font-medium rounded-md transition ${roleFilter === opt ? "bg-white text-slate-900 shadow-xs border border-slate-200/80" : "text-slate-500 hover:text-slate-800"}`}
              >{opt === "All" ? "All Roles" : opt.charAt(0).toUpperCase() + opt.slice(1)}</button>
            ))}
          </div>
          <div className="flex gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
            {STATUS_FILTER_OPTS.map((opt) => (
              <button key={opt} onClick={() => setStatusFilter(opt)}
                className={`px-3 py-1 text-[12px] font-medium rounded-md transition ${statusFilter === opt ? "bg-white text-slate-900 shadow-xs border border-slate-200/80" : "text-slate-500 hover:text-slate-800"}`}
              >{opt === "All" ? "All Status" : opt.charAt(0).toUpperCase() + opt.slice(1)}</button>
            ))}
          </div>
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name or email..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-[13px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-400"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60">
                {["Name", "Role", "Status", "Applications", "Joined", "Last Login", "Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/60 transition">
                  <td className="px-4 py-3">
                    <div className="font-semibold text-slate-900">{u.name}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{u.email}</div>
                  </td>
                  <td className="px-4 py-3 capitalize font-medium text-slate-700">{u.role}</td>
                  <td className="px-4 py-3"><StatusBadge status={u.status} /></td>
                  <td className="px-4 py-3 font-mono text-slate-700">{u.apps}</td>
                  <td className="px-4 py-3 text-slate-500 font-mono text-[11px]">{u.joined}</td>
                  <td className="px-4 py-3 text-slate-500 font-mono text-[11px]">{u.lastLogin}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <button title="Send Email" onClick={() => alert(`Email ${u.name}`)} className="p-1.5 rounded text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition"><Mail className="h-3.5 w-3.5" /></button>
                      {u.status === "active"
                        ? <button title="Suspend" onClick={() => alert(`Suspend ${u.name}`)} className="p-1.5 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"><Ban className="h-3.5 w-3.5" /></button>
                        : <button title="Reactivate" onClick={() => alert(`Reactivate ${u.name}`)} className="p-1.5 rounded text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition"><CheckCircle2 className="h-3.5 w-3.5" /></button>
                      }
                      <button title="More" onClick={() => alert(`More for ${u.name}`)} className="p-1.5 rounded text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition"><MoreHorizontal className="h-3.5 w-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-12 text-center text-[13px] text-slate-400">No users match the current filters.</div>
          )}
          <div className="border-t border-slate-100 px-4 py-3 flex items-center justify-between text-[12px] text-slate-500">
            <span>Showing {filtered.length} of {MOCK_USERS.length} users</span>
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
