"use client";

import React, { useState } from "react";
import DashboardShell from "@/components/layout/DashboardShell";
import StatusBadge from "@/components/shared/StatusBadge";
import { getAdminNavItems } from "@/lib/admin-nav";
import { Ticket, MessageSquare, Clock, User, CheckCircle2 } from "lucide-react";

const TICKETS = [
  { id: "T-1092", user: "Tarun S. (Recruiter)", subject: "Unable to publish job posting under Pro plan", category: "Billing & Plans", priority: "high", status: "open", date: "2h ago" },
  { id: "T-1091", user: "Sujata K. (Candidate)", subject: "Resume parse error on DOCX upload", category: "Technical Issue", priority: "medium", status: "in progress", date: "5h ago" },
  { id: "T-1090", user: "Anita M. (Candidate)", subject: "Request to delete candidate account data", category: "GDPR / Privacy", priority: "urgent", status: "open", date: "1d ago" },
  { id: "T-1089", user: "Bikash R. (Recruiter)", subject: "Applicant export CSV missing salary expectations", category: "Feature Request", priority: "low", status: "resolved", date: "2d ago" },
];

export default function AdminTicketsPage() {
  const [tickets] = useState(TICKETS);
  const [filter, setFilter] = useState("All");

  const filtered = tickets.filter(t => filter === "All" || t.status === filter);

  return (
    <DashboardShell
      brandTitle="JPS"
      brandSubtitle="Admin Dashboard"
      navItems={getAdminNavItems("/admin/tickets")}
      searchPlaceholder="Search support tickets..."
      userAvatarText="SA"
      alertsCount={3}
      notificationsCount={3}
    >
      <div className="space-y-5">
        <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
          <div>
            <h1 className="text-[20px] font-bold text-slate-900 tracking-tight">Support Tickets</h1>
            <p className="text-[13px] text-slate-500 mt-0.5">Helpdesk and customer support issues raised by candidates and employers</p>
          </div>
          <button onClick={() => alert("New Support Ticket")} className="bg-slate-900 hover:bg-slate-800 text-white text-[12px] font-semibold px-4 py-2 rounded-lg transition">
            + Create Ticket
          </button>
        </div>

        <div className="flex gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 w-fit">
          {["All", "open", "in progress", "resolved"].map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-3 py-1 text-[12px] font-medium rounded-md capitalize transition ${
                filter === t ? "bg-white text-slate-900 shadow-xs border border-slate-200/80" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60">
                {["Ticket ID", "User", "Subject", "Category", "Priority", "Status", "Date", "Action"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(t => (
                <tr key={t.id} className="hover:bg-slate-50/60 transition">
                  <td className="px-4 py-3 font-mono font-bold text-slate-900">{t.id}</td>
                  <td className="px-4 py-3 font-medium text-slate-800">{t.user}</td>
                  <td className="px-4 py-3 text-slate-900 font-medium max-w-[260px] truncate">{t.subject}</td>
                  <td className="px-4 py-3 text-slate-500">{t.category}</td>
                  <td className="px-4 py-3"><StatusBadge status={t.priority} /></td>
                  <td className="px-4 py-3"><StatusBadge status={t.status} showDot /></td>
                  <td className="px-4 py-3 font-mono text-[11px] text-slate-500">{t.date}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => alert(`Reply to ticket ${t.id}`)} className="text-[12px] font-semibold text-blue-600 hover:underline">Reply</button>
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
