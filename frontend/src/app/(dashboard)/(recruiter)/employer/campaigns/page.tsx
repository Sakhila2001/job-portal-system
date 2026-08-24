"use client";

import React, { useState } from "react";
import DashboardShell from "@/components/layout/DashboardShell";
import CampaignPerformancePanel from "@/features/recruiter/components/CampaignPerformancePanel";
import { useRecruiterOverview } from "@/features/recruiter/hooks/useRecruiterOverview";
import { getRecruiterNavItems } from "@/lib/recruiter-nav";
import { Plus, Megaphone, X } from "lucide-react";

export default function RecruiterCampaignsPage() {
  const { campaigns, addCampaign, tasks } = useRecruiterOverview();
  const [isLaunchOpen, setIsLaunchOpen] = useState(false);
  const [campaignForm, setCampaignForm] = useState({ name: "", budget: "25000", costPerApplicant: "45" });

  const handleLaunch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!campaignForm.name) return;
    addCampaign({
      id: `camp-${Date.now()}`,
      name: campaignForm.name,
      spend: parseInt(campaignForm.budget) || 20000,
      costPerApplicant: parseInt(campaignForm.costPerApplicant) || 50,
      status: "active",
    });
    setIsLaunchOpen(false);
    setCampaignForm({ name: "", budget: "25000", costPerApplicant: "45" });
  };

  return (
    <DashboardShell
      brandTitle="JPS"
      brandSubtitle="Employer Dashboard"
      navItems={getRecruiterNavItems("/employer/campaigns", tasks.length)}
      searchPlaceholder="Search campaigns..."
      userAvatarText="JE"
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
          <div>
            <h1 className="text-[20px] font-bold text-slate-900 tracking-tight">Promotional Campaigns</h1>
            <p className="text-[13px] text-slate-500 mt-0.5">
              Boost job requisitions across sponsored channels, social networks, and email blasts
            </p>
          </div>
          <button
            onClick={() => setIsLaunchOpen(true)}
            className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-[12px] font-semibold px-4 py-2 rounded-lg transition shrink-0"
          >
            <Plus className="h-4 w-4" />
            <span>Launch New Campaign</span>
          </button>
        </div>

        <CampaignPerformancePanel campaigns={campaigns} />

        {isLaunchOpen && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <div className="bg-white border border-slate-200 rounded-xl max-w-md w-full p-6 shadow-xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Megaphone className="h-5 w-5 text-slate-900" />
                  <h3 className="text-[16px] font-bold text-slate-900">Launch Ad Campaign</h3>
                </div>
                <button onClick={() => setIsLaunchOpen(false)} className="text-slate-400 hover:text-slate-900"><X className="h-5 w-5" /></button>
              </div>

              <form onSubmit={handleLaunch} className="space-y-4 text-[13px]">
                <div className="space-y-1">
                  <label className="text-[12px] font-semibold text-slate-700">Campaign Name</label>
                  <input
                    type="text" required placeholder="e.g. Q3 Tech Talent Rush"
                    value={campaignForm.name} onChange={(e) => setCampaignForm({ ...campaignForm, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[12px] font-semibold text-slate-700">Allocated Budget (NPR)</label>
                  <input
                    type="number" required
                    value={campaignForm.budget} onChange={(e) => setCampaignForm({ ...campaignForm, budget: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-mono font-medium"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                  <button type="button" onClick={() => setIsLaunchOpen(false)} className="px-4 py-2 text-[12px] font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition">Cancel</button>
                  <button type="submit" className="px-4 py-2 text-[12px] font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition">Launch Campaign</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
