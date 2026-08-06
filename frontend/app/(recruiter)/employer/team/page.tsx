"use client";

import React, { useState, useEffect } from "react";
import DashboardShell from "@/components/layout/DashboardShell";
import { getRecruiterNavItems } from "@/lib/recruiter-nav";
import StatusBadge from "@/components/shared/StatusBadge";
import { UserPlus, Shield, Mail, Trash2, CheckCircle2, Clock, UserCheck, Search } from "lucide-react";

interface TeamMemberItem {
  id: string;
  name: string;
  email: string;
  role: "admin" | "recruiter" | "interviewer";
  status: "joined" | "invited";
  invitedAt: string;
  joinedAt?: string;
  avatarText: string;
  assignedInterviewsCount: number;
}

const MOCK_TEAM_MEMBERS: TeamMemberItem[] = [
  { id: "tm-1", name: "Tarun S.",    email: "tarun@jps.io",     role: "admin",       status: "joined",  invitedAt: "Jun 1, 2025",  joinedAt: "Jun 1, 2025",  avatarText: "TS", assignedInterviewsCount: 14 },
  { id: "tm-2", name: "Bikash R.",   email: "bikash@jps.io",    role: "recruiter",   status: "joined",  invitedAt: "Jul 10, 2025", joinedAt: "Jul 11, 2025", avatarText: "BR", assignedInterviewsCount: 8 },
  { id: "tm-3", name: "Sita Sharma", email: "sita@jps.io",      role: "interviewer", status: "joined",  invitedAt: "Jul 20, 2025", joinedAt: "Jul 21, 2025", avatarText: "SS", assignedInterviewsCount: 19 },
  { id: "tm-4", name: "Prakash K.",  email: "prakash@jps.io",   role: "interviewer", status: "invited", invitedAt: "Aug 3, 2025",  avatarText: "PK", assignedInterviewsCount: 0 },
];

export default function RecruiterTeamPage() {
  const [members, setMembers] = useState<TeamMemberItem[]>(MOCK_TEAM_MEMBERS);
  const [search, setSearch] = useState("");
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [inviteForm, setInviteForm] = useState({ name: "", email: "", role: "recruiter" as const });

  const filteredMembers = members.filter(
    (m) =>
      !search ||
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteForm.email) return;
    const newMember: TeamMemberItem = {
      id: `tm-${Date.now()}`,
      name: inviteForm.name || inviteForm.email.split("@")[0],
      email: inviteForm.email,
      role: inviteForm.role,
      status: "invited",
      invitedAt: "Just now",
      avatarText: (inviteForm.name || inviteForm.email).slice(0, 2).toUpperCase(),
      assignedInterviewsCount: 0,
    };
    setMembers([newMember, ...members]);
    setIsInviteOpen(false);
    setInviteForm({ name: "", email: "", role: "recruiter" });
    setToast(`Invitation sent to ${inviteForm.email}`);
  };

  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (toast) { const t = setTimeout(() => setToast(null), 3000); return () => clearTimeout(t); }
  }, [toast]);

  const handleRemove = (id: string, name: string) => {
    setMembers(members.filter((m) => m.id !== id));
    setToast(`${name} removed from team`);
  };

  return (
    <DashboardShell
      brandTitle="JPS"
      brandSubtitle="Employer Dashboard"
      navItems={getRecruiterNavItems("/employer/team")}
      searchPlaceholder="Search team members..."
      searchQuery={search}
      onSearchChange={setSearch}
      userAvatarText="JE"
    >
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-slate-900 text-white text-[13px] font-semibold px-4 py-3 rounded-lg shadow-xl flex items-center gap-2 animate-in slide-in-from-top-2 fade-in duration-200">
          <CheckCircle2 className="h-4 w-4" /> {toast}
        </div>
      )}
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
          <div>
            <h1 className="text-[20px] font-bold text-slate-900 tracking-tight">Team Members & Panelists</h1>
            <p className="text-[13px] text-slate-500 mt-0.5">
              Manage employer account access, recruiter permissions, and assigned interview panelists (`EmployerAccount` & `InterviewPanelist`)
            </p>
          </div>
          <button
            onClick={() => setIsInviteOpen(true)}
            className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-[12px] font-semibold px-4 py-2 rounded-lg transition shrink-0"
          >
            <UserPlus className="h-4 w-4" /> Invite Team Member
          </button>
        </div>

        {/* Member KPI Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Total Team Members", value: members.length, color: "text-slate-900" },
            { label: "Active Recruiters", value: members.filter((m) => m.role === "recruiter").length, color: "text-emerald-700" },
            { label: "Interview Panelists", value: members.filter((m) => m.role === "interviewer").length, color: "text-blue-700" },
            { label: "Pending Invitations", value: members.filter((m) => m.status === "invited").length, color: "text-amber-700" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs text-center">
              <div className={`text-[20px] font-bold font-mono ${stat.color}`}>{stat.value}</div>
              <div className="text-[11px] text-slate-500 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Team Table */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60">
                {["Member", "Account Role", "Status", "Invited", "Interviews Assigned", "Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredMembers.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50/60 transition">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-slate-900 text-white font-bold text-[12px] flex items-center justify-center font-mono">
                        {m.avatarText}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">{m.name}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{m.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                      m.role === "admin"
                        ? "bg-purple-50 text-purple-700 border-purple-200"
                        : m.role === "recruiter"
                        ? "bg-blue-50 text-blue-700 border-blue-200"
                        : "bg-slate-100 text-slate-700 border-slate-200"
                    }`}>
                      <Shield className="h-3 w-3" />
                      {m.role.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={m.status === "joined" ? "active" : "pending"} showDot />
                  </td>
                  <td className="px-4 py-3 font-mono text-slate-500 text-[11px]">{m.invitedAt}</td>
                  <td className="px-4 py-3 font-mono font-semibold text-slate-900">{m.assignedInterviewsCount} interviews</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setToast(`Invite resent to ${m.email}`)}
                        className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded transition"
                        title="Resend Invite"
                      >
                        <Mail className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleRemove(m.id, m.name)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition"
                        title="Remove Access"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Invite Modal */}
        {isInviteOpen && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <div className="bg-white border border-slate-200 rounded-xl max-w-md w-full p-6 shadow-xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-[16px] font-bold text-slate-900">Invite Employer Team Member</h3>
                <button onClick={() => setIsInviteOpen(false)} className="text-slate-400 hover:text-slate-900 text-lg">×</button>
              </div>
              <form onSubmit={handleInviteSubmit} className="space-y-4 text-[13px]">
                <div className="space-y-1">
                  <label className="text-[12px] font-semibold text-slate-700">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Giri"
                    value={inviteForm.name}
                    onChange={(e) => setInviteForm({ ...inviteForm, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-slate-400"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[12px] font-semibold text-slate-700">Work Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="colleague@company.com"
                    value={inviteForm.email}
                    onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-slate-400"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[12px] font-semibold text-slate-700">Assigned Role</label>
                  <select
                    value={inviteForm.role}
                    onChange={(e) => setInviteForm({ ...inviteForm, role: e.target.value as any })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-slate-400"
                  >
                    <option value="recruiter">Recruiter (Post jobs, screen & message applicants)</option>
                    <option value="interviewer">Interviewer (Conduct assigned technical rounds)</option>
                    <option value="admin">Employer Admin (Full hiring & billing management)</option>
                  </select>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsInviteOpen(false)}
                    className="px-4 py-2 text-[12px] font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-[12px] font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition"
                  >
                    Send Invitation Email
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
