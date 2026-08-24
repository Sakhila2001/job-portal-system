"use client";

import React from "react";
import { CampaignPerformance } from "@/lib/types";

interface CampaignPerformancePanelProps {
  campaigns: CampaignPerformance[];
  className?: string;
}

export default function CampaignPerformancePanel({
  campaigns,
  className = "",
}: CampaignPerformancePanelProps) {
  return (
    <div className={`bg-white border border-stone-200 rounded-xl p-4 shadow-2xs space-y-3 ${className}`}>
      <h4 className="text-[13px] font-medium text-stone-900 border-b border-stone-100 pb-2">
        Campaign Performance
      </h4>

      <div className="space-y-2.5">
        {campaigns.map((c) => (
          <div
            key={c.id}
            className="p-3 rounded-lg border border-stone-200/80 bg-stone-50/40 space-y-1"
          >
            <div className="flex items-center justify-between text-[12px]">
              <span className="font-semibold text-stone-900">{c.name}</span>
              <span className="text-stone-500 font-mono font-medium">Spent Rs {c.spend.toLocaleString()}</span>
            </div>
            <div className="text-[11px] text-stone-500 font-mono">
              Cost per applicant Rs {c.costPerApplicant.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
