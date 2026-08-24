"use client";

import React from "react";
import StatusBadge from "@/components/shared/StatusBadge";
import { TeamMember } from "@/lib/types";

interface TeamPanelProps {
  members: TeamMember[];
  className?: string;
}

export default function TeamPanel({ members, className = "" }: TeamPanelProps) {
  return (
    <div className={`bg-white border border-stone-200 rounded-xl p-4 shadow-2xs space-y-3 ${className}`}>
      <h4 className="text-[13px] font-medium text-stone-900 border-b border-stone-100 pb-2">
        Team Members
      </h4>

      <div className="space-y-2">
        {members.map((m) => (
          <div
            key={m.id}
            className="flex items-center justify-between p-2.5 rounded-lg border border-stone-100 bg-stone-50/50 text-[12px]"
          >
            <span className="font-medium text-stone-800">{m.name}</span>
            <StatusBadge status={m.role} />
          </div>
        ))}
      </div>
    </div>
  );
}
