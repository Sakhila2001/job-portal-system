"use client";

import React, { useState } from "react";
import DashboardShell from "@/components/layout/DashboardShell";
import { getAdminNavItems } from "@/lib/admin-nav";
import { Lock, Shield, Check, Plus, UserCheck } from "lucide-react";

const ROLES = [
  { id: "r1", name: "Super Admin", usersCount: 3, permissions: ["Full System Access", "User Ban/Delete", "Billing Access", "Role Edit"], isSystem: true },
  { id: "r2", name: "Moderator", usersCount: 8, permissions: ["View Queue", "Approve/Reject Jobs", "Flag Spam"], isSystem: false },
  { id: "r3", name: "Support Agent", usersCount: 14, permissions: ["Ticket Reply", "User View", "Reset Password"], isSystem: false },
  { id: "r4", name: "Finance Admin", usersCount: 2, permissions: ["Billing Access", "Invoice Export", "Refunds"], isSystem: false },
];

export default function AdminRolesPage() {
  const [roles] = useState(ROLES);

  return (
    <DashboardShell
      brandTitle="JPS"
      brandSubtitle="Admin Dashboard"
      navItems={getAdminNavItems("/admin/roles")}
      searchPlaceholder="Search roles..."
      userAvatarText="SA"
      alertsCount={3}
      notificationsCount={3}
    >
      <div className="space-y-5">
        <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
          <div>
            <h1 className="text-[20px] font-bold text-slate-900 tracking-tight">Roles & Permissions</h1>
            <p className="text-[13px] text-slate-500 mt-0.5">Granular RBAC access controls, admin role definitions, and capability assignments</p>
          </div>
          <button onClick={() => alert("Create Role")} className="bg-slate-900 hover:bg-slate-800 text-white text-[12px] font-semibold px-4 py-2 rounded-lg transition">
            <Plus className="h-4 w-4 inline mr-1" /> Add Custom Role
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {roles.map((role) => (
            <div key={role.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-slate-700" />
                  <h3 className="text-[15px] font-bold text-slate-900">{role.name}</h3>
                </div>
                <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  {role.usersCount} Assigned Users
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="text-[11px] font-semibold uppercase text-slate-400">Assigned Capabilities</div>
                <div className="flex flex-wrap gap-1.5">
                  {role.permissions.map((p) => (
                    <span key={p} className="text-[11px] bg-slate-50 text-slate-700 border border-slate-200 px-2 py-0.5 rounded flex items-center gap-1">
                      <Check className="h-3 w-3 text-emerald-600" /> {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
