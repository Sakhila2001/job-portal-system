"use client";

import React, { useState } from "react";
import DashboardShell from "@/components/layout/DashboardShell";
import { getAdminNavItems } from "@/lib/admin-nav";
import { Folder, Edit, Trash2, Plus, Globe, Check } from "lucide-react";

const ARTICLES = [
  { id: "c1", title: "Top 10 Resume Tips for Tech Professionals", category: "Career Advice", author: "Editorial Team", status: "published", date: "Jul 15, 2025" },
  { id: "c2", title: "How Employers Pick Laravel Candidates in 2025", category: "Recruitment Trends", author: "Tarun S.", status: "published", date: "Jul 28, 2025" },
  { id: "c3", title: "Platform Terms & Privacy Policy Update", category: "System Announcement", author: "Legal Team", status: "draft", date: "Aug 1, 2025" },
];

export default function AdminCmsPage() {
  const [articles] = useState(ARTICLES);

  return (
    <DashboardShell
      brandTitle="JPS"
      brandSubtitle="Admin Dashboard"
      navItems={getAdminNavItems("/admin/cms")}
      searchPlaceholder="Search articles & CMS..."
      userAvatarText="SA"
      alertsCount={3}
      notificationsCount={3}
    >
      <div className="space-y-5">
        <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
          <div>
            <h1 className="text-[20px] font-bold text-slate-900 tracking-tight">Content & CMS Management</h1>
            <p className="text-[13px] text-slate-500 mt-0.5">Manage blog posts, career guides, FAQ articles, and legal documents</p>
          </div>
          <button onClick={() => alert("Create Content")} className="bg-slate-900 hover:bg-slate-800 text-white text-[12px] font-semibold px-4 py-2 rounded-lg transition">
            <Plus className="h-4 w-4 inline mr-1" /> New Article
          </button>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60">
                {["Title", "Category", "Author", "Status", "Date", "Actions"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {articles.map(a => (
                <tr key={a.id} className="hover:bg-slate-50/60 transition">
                  <td className="px-4 py-3 font-bold text-slate-900">{a.title}</td>
                  <td className="px-4 py-3 text-slate-600">{a.category}</td>
                  <td className="px-4 py-3 text-slate-500">{a.author}</td>
                  <td className="px-4 py-3 capitalize font-semibold text-[11px]">{a.status}</td>
                  <td className="px-4 py-3 font-mono text-[11px] text-slate-500">{a.date}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => alert(`Edit ${a.title}`)} className="text-slate-400 hover:text-slate-900"><Edit className="h-3.5 w-3.5" /></button>
                      <button onClick={() => alert(`Delete ${a.title}`)} className="text-slate-400 hover:text-rose-600"><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>
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
