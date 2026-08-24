"use client";

import React from "react";
import { AuditLog } from "@/lib/types";
import { UserX, CheckCircle, CreditCard, Shield } from "lucide-react";

interface AuditActivityFeedProps {
  auditLogs: AuditLog[];
  className?: string;
}

export default function AuditActivityFeed({ auditLogs, className = "" }: AuditActivityFeedProps) {
  const getIcon = (action: string) => {
    if (action.includes("suspended")) return <UserX className="h-3.5 w-3.5 text-rose-600" />;
    if (action.includes("approved")) return <CheckCircle className="h-3.5 w-3.5 text-emerald-600" />;
    if (action.includes("plan")) return <CreditCard className="h-3.5 w-3.5 text-blue-600" />;
    return <Shield className="h-3.5 w-3.5 text-stone-600" />;
  };

  return (
    <div className={`bg-white border border-stone-200 rounded-xl p-4 shadow-2xs space-y-3 ${className}`}>
      <div className="flex items-center justify-between border-b border-stone-100 pb-2">
        <h4 className="text-[13px] font-medium text-stone-900">Recent Audit Activity</h4>
        <span className="text-[10px] font-mono text-stone-400">Live</span>
      </div>

      <div className="space-y-2">
        {auditLogs.map((log) => (
          <div
            key={log.id}
            className="flex items-center gap-2.5 p-2 rounded-lg bg-stone-50/50 border border-stone-100 text-[12px]"
          >
            <div className="p-1 rounded bg-white border border-stone-200 shrink-0">
              {getIcon(log.action)}
            </div>
            <div className="flex-1 min-w-0 flex items-center justify-between gap-2">
              <span className="font-mono text-[11px] text-stone-400 shrink-0">{log.time}</span>
              <span className="font-medium text-stone-800 truncate">— {log.actor} {log.action}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
