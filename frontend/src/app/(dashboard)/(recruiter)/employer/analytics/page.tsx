"use client";

import React, { useState, useEffect } from "react";
import DashboardShell from "@/components/layout/DashboardShell";
import MotionBarChart from "@/components/shared/MotionBarChart";
import { useRecruiterOverview } from "@/features/recruiter/hooks/useRecruiterOverview";
import { getRecruiterNavItems } from "@/lib/recruiter-nav";
import { Download, CheckCircle2 } from "lucide-react";

export default function RecruiterAnalyticsPage() {
  const { hiringAnalytics, tasks } = useRecruiterOverview();
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (toast) { const t = setTimeout(() => setToast(null), 3000); return () => clearTimeout(t); }
  }, [toast]);

  return (
    <DashboardShell
      brandTitle="JPS"
      brandSubtitle="Employer Dashboard"
      navItems={getRecruiterNavItems("/employer/analytics", tasks.length)}
      searchPlaceholder="Search hiring reports..."
      userAvatarText="JE"
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
          <div>
            <h1 className="text-[20px] font-bold text-slate-900 tracking-tight">Hiring Analytics</h1>
            <p className="text-[13px] text-slate-500 mt-0.5">
              Comprehensive report on application volume, conversion funnel, and sourcing channels
            </p>
          </div>
          <button
            onClick={() => setToast("Downloading PDF Analytics Report...")}
            className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-[12px] font-semibold px-4 py-2 rounded-lg transition shrink-0"
          >
            <Download className="h-4 w-4" /> Download PDF Report
          </button>
        </div>

        {toast && (
          <div className="fixed top-6 right-6 z-50 bg-slate-900 text-white text-[13px] font-semibold px-4 py-3 rounded-lg shadow-xl flex items-center gap-2 animate-in slide-in-from-top-2 fade-in duration-200">
            <CheckCircle2 className="h-4 w-4" /> {toast}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MotionBarChart
            title="Weekly Application Volume"
            subtitle="Last 6 weeks across all active requisitions"
            data={hiringAnalytics.applicantsPerWeek.map((w) => ({
              label: w.week,
              value: w.count,
              color: "#0F172A",
            }))}
            chartHeight={160}
          />

          <MotionBarChart
            title="Channel Sourcing Mix"
            subtitle="Percentage share of candidate sourcing channels"
            data={hiringAnalytics.sourceMix.map((s, i) => ({
              label: s.name,
              value: s.percentage,
              color: ["#34D399", "#60A5FA", "#FBBF24"][i % 3],
            }))}
            unit="%"
            chartHeight={160}
          />
        </div>
      </div>
    </DashboardShell>
  );
}
