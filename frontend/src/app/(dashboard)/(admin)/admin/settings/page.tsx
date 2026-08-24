"use client";

import React, { useState } from "react";
import DashboardShell from "@/components/layout/DashboardShell";
import { getAdminNavItems } from "@/lib/admin-nav";
import { Save, Globe, Shield, Mail, Key, Database, Bell } from "lucide-react";

export default function AdminSettingsPage() {
  const [form, setForm] = useState({
    siteName: "Job Portal System (JPS)",
    supportEmail: "support@jps.io",
    maxJobsPerFreePlan: "1",
    autoVerifyCompanies: false,
    requireEmailVerification: true,
    maintenanceMode: false,
    sessionTimeoutMinutes: "60",
    maxUploadSizeMb: "10",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Global system settings saved successfully!");
  };

  return (
    <DashboardShell
      brandTitle="JPS"
      brandSubtitle="Admin Dashboard"
      navItems={getAdminNavItems("/admin/settings")}
      searchPlaceholder="Search settings..."
      userAvatarText="SA"
      alertsCount={3}
      notificationsCount={3}
    >
      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
        <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
          <div>
            <h1 className="text-[20px] font-bold text-slate-900 tracking-tight">System Settings</h1>
            <p className="text-[13px] text-slate-500 mt-0.5">Configure platform defaults, security policies, and global feature flags</p>
          </div>
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-[12px] font-semibold px-4 py-2 rounded-lg transition"
          >
            <Save className="h-4 w-4" /> Save Settings
          </button>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-6">
          {/* General Platform Config */}
          <div className="space-y-4">
            <h3 className="text-[14px] font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Globe className="h-4 w-4 text-slate-500" /> Platform Info & Defaults
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[13px]">
              <div className="space-y-1">
                <label className="text-[12px] font-semibold text-slate-700">Platform Title</label>
                <input
                  type="text"
                  value={form.siteName}
                  onChange={(e) => setForm({ ...form, siteName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-slate-400"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[12px] font-semibold text-slate-700">System Support Email</label>
                <input
                  type="email"
                  value={form.supportEmail}
                  onChange={(e) => setForm({ ...form, supportEmail: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-slate-400"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[12px] font-semibold text-slate-700">Free Tier Job Limit</label>
                <input
                  type="number"
                  value={form.maxJobsPerFreePlan}
                  onChange={(e) => setForm({ ...form, maxJobsPerFreePlan: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-slate-400"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[12px] font-semibold text-slate-700">Max File Upload (MB)</label>
                <input
                  type="number"
                  value={form.maxUploadSizeMb}
                  onChange={(e) => setForm({ ...form, maxUploadSizeMb: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-slate-400"
                />
              </div>
            </div>
          </div>

          {/* Security & Access Policies */}
          <div className="space-y-4 pt-2">
            <h3 className="text-[14px] font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Shield className="h-4 w-4 text-slate-500" /> Security & Access Controls
            </h3>
            <div className="space-y-3 text-[13px]">
              {[
                {
                  key: "requireEmailVerification",
                  label: "Mandatory Candidate Email Verification",
                  desc: "Require email activation link before candidate profile creation",
                },
                {
                  key: "autoVerifyCompanies",
                  label: "Auto-Approve New Company Profiles",
                  desc: "Bypass admin verification queue for new employer registrations",
                },
                {
                  key: "maintenanceMode",
                  label: "Maintenance Mode",
                  desc: "Disable candidate submissions and lock recruiter actions during updates",
                },
              ].map(({ key, label, desc }) => (
                <label key={key} className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-100/60 transition">
                  <div>
                    <div className="font-semibold text-slate-900">{label}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{desc}</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={form[key as keyof typeof form] as boolean}
                    onChange={(e) => setForm({ ...form, [key]: e.target.checked })}
                    className="h-4 w-4 accent-slate-900 rounded cursor-pointer"
                  />
                </label>
              ))}
            </div>
          </div>
        </div>
      </form>
    </DashboardShell>
  );
}
