"use client";

import React from "react";
import DashboardShell from "@/components/layout/DashboardShell";
import MotionBarChart from "@/components/shared/MotionBarChart";
import { getAdminNavItems } from "@/lib/admin-nav";
import { Download, TrendingUp, Users, Briefcase, FileText } from "lucide-react";

export default function AdminReportsPage() {
  return (
    <DashboardShell
      brandTitle="JPS"
      brandSubtitle="Admin Dashboard"
      navItems={getAdminNavItems("/admin/reports")}
      searchPlaceholder="Search analytics..."
      showExport
      onExport={() => alert("Downloading master platform analytics PDF...")}
      userAvatarText="SA"
      alertsCount={3}
      notificationsCount={3}
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
          <div>
            <h1 className="text-[20px] font-bold text-slate-900 tracking-tight">Reports & Analytics</h1>
            <p className="text-[13px] text-slate-500 mt-0.5">High-level growth trends, candidate funnel conversion rates, and revenue analytics</p>
          </div>
          <button onClick={() => alert("Generating custom report...")} className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-[12px] font-semibold px-4 py-2 rounded-lg transition shrink-0">
            <Download className="h-4 w-4" /> Download PDF Report
          </button>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <MotionBarChart
            title="Candidate vs Employer Growth"
            subtitle="Monthly new user registrations"
            data={[
              { label: "Jan", value: 1200, color: "#0F172A" },
              { label: "Feb", value: 1850, color: "#0F172A" },
              { label: "Mar", value: 2400, color: "#0F172A" },
              { label: "Apr", value: 3100, color: "#0F172A" },
              { label: "May", value: 3900, color: "#0F172A" },
              { label: "Jun", value: 4800, color: "#0F172A" },
            ]}
            chartHeight={160}
          />
          <MotionBarChart
            title="Monthly Recurring Revenue (MRR)"
            subtitle="Subscription growth in NRs (in Thousands)"
            data={[
              { label: "Jan", value: 180, color: "#0F172A" },
              { label: "Feb", value: 240, color: "#0F172A" },
              { label: "Mar", value: 290, color: "#0F172A" },
              { label: "Apr", value: 340, color: "#0F172A" },
              { label: "May", value: 380, color: "#0F172A" },
              { label: "Jun", value: 412, color: "#0F172A" },
            ]}
            chartHeight={160}
          />
        </div>
      </div>
    </DashboardShell>
  );
}
