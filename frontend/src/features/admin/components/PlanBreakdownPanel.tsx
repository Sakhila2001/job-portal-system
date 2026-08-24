"use client";

import React from "react";

interface PlanItem {
  name: string;
  count: number;
}

interface PlanBreakdownPanelProps {
  plans: PlanItem[];
  className?: string;
}

export default function PlanBreakdownPanel({ plans, className = "" }: PlanBreakdownPanelProps) {
  return (
    <div className={`bg-white border border-stone-200 rounded-xl p-4 shadow-2xs space-y-3 ${className}`}>
      <h4 className="text-[13px] font-medium text-stone-900 border-b border-stone-100 pb-2">
        Plan Breakdown
      </h4>

      <div className="space-y-2">
        {plans.map((p) => (
          <div
            key={p.name}
            className="flex items-center justify-between p-2.5 rounded-lg border border-stone-100 bg-stone-50/50 text-[12px]"
          >
            <span className="font-medium text-stone-700">{p.name}</span>
            <span className="font-mono font-semibold text-stone-900">{p.count.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
