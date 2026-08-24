"use client";

import React from "react";
import { getStatusConfig } from "@/lib/status-colors";

interface StatusBadgeProps {
  status: string;
  className?: string;
  showDot?: boolean;
}

export default function StatusBadge({ status, className = "", showDot = false }: StatusBadgeProps) {
  const config = getStatusConfig(status);

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-semibold rounded-full border transition-colors ${config.bgClass} ${config.textClass} ${config.borderClass} ${className}`}
    >
      {showDot && config.dotClass && (
        <span className={`h-1.5 w-1.5 rounded-full ${config.dotClass}`} />
      )}
      <span>{config.label}</span>
    </span>
  );
}
