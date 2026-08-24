"use client";

import React from "react";
import StatusBadge from "@/components/shared/StatusBadge";
import { SkillGap } from "@/lib/types";

interface SkillGapPanelProps {
  skills: SkillGap[];
  className?: string;
}

export default function SkillGapPanel({ skills, className = "" }: SkillGapPanelProps) {
  return (
    <div className={`bg-white border border-stone-200 rounded-xl p-4 shadow-2xs space-y-3 ${className}`}>
      <h4 className="text-[13px] font-medium text-stone-900 border-b border-stone-100 pb-2">
        Skill Gaps for Saved Jobs
      </h4>

      <div className="space-y-2">
        {skills.map((item) => (
          <div
            key={item.skill}
            className="flex items-center justify-between p-2.5 rounded-lg border border-stone-100 bg-stone-50/50 text-[12px]"
          >
            <span className="font-medium text-stone-800">{item.skill}</span>
            <StatusBadge status={item.status} />
          </div>
        ))}
      </div>
    </div>
  );
}
