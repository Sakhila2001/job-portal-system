"use client";

import React, { useState } from "react";
import DashboardShell from "@/components/layout/DashboardShell";
import CampaignPerformancePanel from "@/components/recruiter/CampaignPerformancePanel";
import MotionBarChart from "@/components/shared/MotionBarChart";
import { getAdminNavItems } from "@/lib/admin-nav";
import { useAdminOverview } from "@/hooks/useAdminOverview";
import { Plus, Pause, Trash2, TrendingUp } from "lucide-react";

const ADMIN_CAMPAIGNS = [
  { id: "ac1", name: "Spring Hiring Push",       spend: 84000, costPerApplicant: 48,  status: "active", channel: "Display Ads",    impressions: "48K", clicks: "1,750" },
  { id: "ac2", name: "Employer Reactivation",     spend: 31500, costPerApplicant: 112, status: "active", channel: "Email",          impressions: "22K", clicks: "810"   },
  { id: "ac3", name: "Q3 Candidate Acquisition",  spend: 56000, costPerApplicant: 67,  status: "paused", channel: "Social Media",   impressions: "63K", clicks: "2,100" },
  { id: "ac4", name: "Enterprise Plan Upsell",    spend: 18000, costPerApplicant: 90,  status: "active", channel: "Email + SMS",    impressions: "9K",  clicks: "400"   },
];

export default function AdminCampaignsPage() {
  const [campaigns] = useState(ADMIN_CAMPAIGNS);

  return (
    <DashboardShell
      brandTitle="JPS" brandSubtitle="Admin Dashboard"
      navItems={getAdminNavItems("/admin/campaigns")}
      searchPlaceholder="Search campaigns..."
      showExport onExport={() => alert("Exporting campaigns...")}
      userAvatarText="SA" alertsCount={3} notificationsCount={3}
    >
      <div className="space-y-5">
        <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
          <div>
            <h1 className="text-[20px] font-bold text-slate-900 tracking-tight">Platform Campaigns</h1>
            <p className="text-[13px] text-slate-500 mt-0.5">Admin-level ad campaigns, email blasts, and sponsored acquisition programs</p>
          </div>
          <button onClick={() => alert("Create new admin campaign")} className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-[12px] font-semibold px-4 py-2 rounded-lg transition">
            <Plus className="h-4 w-4" /> Launch Campaign
          </button>
        </div>

        {/* Spend Overview Chart */}
        <MotionBarChart
          title="Weekly Campaign Impressions"
          subtitle="Total platform ad impressions — all active campaigns"
          data={[
            { label: "W1", value: 42000, color: "#0F172A" },
            { label: "W2", value: 51000, color: "#0F172A" },
            { label: "W3", value: 63000, color: "#0F172A" },
            { label: "W4", value: 58000, color: "#0F172A" },
            { label: "W5", value: 71000, color: "#0F172A" },
            { label: "W6", value: 84000, color: "#0F172A" },
          ]}
          chartHeight={140}
          showValueLabels={false}
        />

        {/* Campaign Table */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100">
            <h3 className="text-[13px] font-semibold text-slate-900">Active Campaigns</h3>
          </div>
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60">
                {["Campaign Name", "Channel", "Spend", "Cost / Applicant", "Impressions", "Clicks", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {campaigns.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/60 transition">
                  <td className="px-4 py-3 font-semibold text-slate-900">{c.name}</td>
                  <td className="px-4 py-3 text-slate-500 text-[12px]">{c.channel}</td>
                  <td className="px-4 py-3 font-mono font-semibold text-slate-900">Rs {c.spend.toLocaleString()}</td>
                  <td className="px-4 py-3 font-mono text-slate-700">Rs {c.costPerApplicant}</td>
                  <td className="px-4 py-3 font-mono text-slate-600">{c.impressions}</td>
                  <td className="px-4 py-3 font-mono text-slate-600">{c.clicks}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${c.status === "active" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-slate-100 text-slate-600 border-slate-200"}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      <button title="Stats" onClick={() => alert(`Stats for ${c.name}`)} className="p-1.5 rounded text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition"><TrendingUp className="h-3.5 w-3.5" /></button>
                      <button title="Pause" onClick={() => alert(`Pause ${c.name}`)} className="p-1.5 rounded text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition"><Pause className="h-3.5 w-3.5" /></button>
                      <button title="Delete" onClick={() => alert(`Delete ${c.name}`)} className="p-1.5 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"><Trash2 className="h-3.5 w-3.5" /></button>
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
