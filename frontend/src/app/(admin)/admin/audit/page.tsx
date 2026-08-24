"use client";

import React, { useState } from "react";
import DashboardShell from "@/components/layout/DashboardShell";
import AuditActivityFeed from "@/features/admin/components/AuditActivityFeed";
import { getAdminNavItems } from "@/lib/admin-nav";
import { MOCK_AUDIT_LOGS } from "@/lib/mock-data/admin";
import { Search, Download, Filter } from "lucide-react";

export default function AdminAuditLogPage() {
  const [logs] = useState(MOCK_AUDIT_LOGS);
  const [search, setSearch] = useState("");
  const [actorFilter, setActorFilter] = useState("All");

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      !search ||
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.actor.toLowerCase().includes(search.toLowerCase()) ||
      log.entityType.toLowerCase().includes(search.toLowerCase()) ||
      log.entityId.toLowerCase().includes(search.toLowerCase());
    const matchesActor =
      actorFilter === "All" ||
      (actorFilter === "System" && log.actor.startsWith("System")) ||
      (actorFilter === "Admin" && !log.actor.startsWith("System"));
    return matchesSearch && matchesActor;
  });

  return (
    <DashboardShell
      brandTitle="JPS"
      brandSubtitle="Admin Dashboard"
      navItems={getAdminNavItems("/admin/audit")}
      searchPlaceholder="Search audit logs..."
      searchQuery={search}
      onSearchChange={setSearch}
      showExport
      onExport={() => alert("Exporting security audit trail...")}
      userAvatarText="SA"
      alertsCount={3}
      notificationsCount={3}
    >
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
          <div>
            <h1 className="text-[20px] font-bold text-slate-900 tracking-tight">System Audit Log</h1>
            <p className="text-[13px] text-slate-500 mt-0.5">Immutable audit trail of all security events, role changes, and system modifications</p>
          </div>
          <button
            onClick={() => alert("Exporting JSON log archive...")}
            className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-[12px] font-semibold px-4 py-2 rounded-lg transition shrink-0"
          >
            <Download className="h-4 w-4" /> Export Log Archive
          </button>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
            {["All", "Admin", "System"].map((opt) => (
              <button
                key={opt}
                onClick={() => setActorFilter(opt)}
                className={`px-3 py-1 text-[12px] font-medium rounded-md transition ${
                  actorFilter === opt
                    ? "bg-white text-slate-900 shadow-xs border border-slate-200/80"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {opt} Actors
              </button>
            ))}
          </div>

          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter by action, actor, or target..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-[13px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-400"
            />
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
          <AuditActivityFeed auditLogs={filteredLogs} />
        </div>
      </div>
    </DashboardShell>
  );
}
