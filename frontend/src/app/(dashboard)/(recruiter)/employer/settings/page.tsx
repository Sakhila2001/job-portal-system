"use client";

import React, { useState, useEffect } from "react";
import DashboardShell from "@/components/layout/DashboardShell";
import { useRecruiterOverview } from "@/features/recruiter/hooks/useRecruiterOverview";
import { getRecruiterNavItems } from "@/lib/recruiter-nav";
import { Save, Shield, Lock, User, X, CheckCircle2, Eye, EyeOff } from "lucide-react";

export default function RecruiterSettingsPage() {
  const { tasks } = useRecruiterOverview();

  const [form, setForm] = useState({
    firstName: "Tarun",
    lastName: "S.",
    email: "tarun@jps.io",
    role: "Admin",
    emailNotifications: true,
    twoFactor: false,
  });

  const [toast, setToast] = useState(false);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [pwForm, setPwForm] = useState({ current: "", newPw: "", confirm: "" });
  const [showPw, setShowPw] = useState({ current: false, newPw: false, confirm: false });
  const [pwError, setPwError] = useState("");
  const [pwSuccess, setPwSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setToast(true);
  };

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(false), 3000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPwError("");
    if (pwForm.newPw.length < 8) { setPwError("Password must be at least 8 characters."); return; }
    if (pwForm.newPw !== pwForm.confirm) { setPwError("Passwords do not match."); return; }
    setPwSuccess(true);
    setTimeout(() => {
      setIsPasswordOpen(false);
      setPwSuccess(false);
      setPwForm({ current: "", newPw: "", confirm: "" });
    }, 1500);
  };

  return (
    <DashboardShell
      brandTitle="JPS"
      brandSubtitle="Employer Dashboard"
      navItems={getRecruiterNavItems("/employer/settings", tasks.length)}
      searchPlaceholder="Search settings..."
      userAvatarText="JE"
    >
      {/* Success Toast */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-600 text-white text-[13px] font-semibold px-4 py-3 rounded-lg shadow-xl flex items-center gap-2 animate-in slide-in-from-top-2 fade-in duration-200">
          <CheckCircle2 className="h-4 w-4" /> Settings saved successfully
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6 max-w-3xl">
        <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
          <div>
            <h1 className="text-[20px] font-bold text-slate-900 tracking-tight">Account Settings</h1>
            <p className="text-[13px] text-slate-500 mt-0.5">Manage recruiter account info, security, and notification preferences</p>
          </div>
          <button type="submit" className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-[12px] font-semibold px-4 py-2 rounded-lg transition">
            <Save className="h-4 w-4" />
            <span>Save Changes</span>
          </button>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-5">
          <h3 className="text-[14px] font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <User className="h-4 w-4 text-slate-500" /> Personal Info
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[13px]">
            {[["First Name", "firstName"], ["Last Name", "lastName"], ["Email Address", "email"], ["Role", "role"]].map(([label, key]) => (
              <div key={key} className="space-y-1">
                <label className="text-[12px] font-semibold text-slate-700">{label}</label>
                <input
                  type="text"
                  disabled={key === "email" || key === "role"}
                  value={form[key as keyof typeof form] as string}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className={`w-full border rounded-lg px-3 py-2 font-medium focus:outline-none focus:border-slate-400 transition ${key === "email" || key === "role" ? "bg-slate-100 border-slate-200 text-slate-500 font-mono" : "bg-slate-50 border-slate-200 text-slate-900"}`}
                />
              </div>
            ))}
          </div>

          <h3 className="text-[14px] font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3 pt-4">
            <Shield className="h-4 w-4 text-slate-500" /> Security & Notifications
          </h3>
          <div className="space-y-3 text-[13px]">
            {[
              { key: "emailNotifications", label: "Email Notifications", desc: "Receive new applicant alerts and interview reminders" },
              { key: "twoFactor", label: "Two-Factor Authentication", desc: "Require a code from your authenticator app on login" },
            ].map(({ key, label, desc }) => (
              <label key={key} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-100 transition">
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

          <div className="pt-2">
            <button type="button" onClick={() => setIsPasswordOpen(true)} className="inline-flex items-center gap-2 text-[12px] font-semibold text-slate-700 border border-slate-200 bg-slate-50 hover:bg-slate-100 px-3 py-2 rounded-lg transition">
              <Lock className="h-4 w-4 text-slate-500" /> Change Password
            </button>
          </div>
        </div>
      </form>

      {/* Change Password Modal */}
      {isPasswordOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50" onClick={() => setIsPasswordOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} className="bg-white border border-slate-200 rounded-xl max-w-md w-full p-6 shadow-xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-slate-900" />
                <h3 className="text-[16px] font-bold text-slate-900">Change Password</h3>
              </div>
              <button onClick={() => setIsPasswordOpen(false)} className="text-slate-400 hover:text-slate-900"><X className="h-5 w-5" /></button>
            </div>

            {pwSuccess ? (
              <div className="text-center py-8">
                <CheckCircle2 className="h-10 w-10 text-emerald-500 mx-auto mb-3" />
                <p className="text-[14px] font-bold text-slate-900">Password Updated!</p>
              </div>
            ) : (
              <form onSubmit={handlePasswordSubmit} className="space-y-4 text-[13px]">
                {[
                  { key: "current" as const, label: "Current Password" },
                  { key: "newPw" as const, label: "New Password" },
                  { key: "confirm" as const, label: "Confirm New Password" },
                ].map(({ key, label }) => (
                  <div key={key} className="space-y-1">
                    <label className="text-[12px] font-semibold text-slate-700">{label}</label>
                    <div className="relative">
                      <input
                        type={showPw[key] ? "text" : "password"}
                        required value={pwForm[key]}
                        onChange={(e) => setPwForm({ ...pwForm, [key]: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-3 pr-10 py-2.5 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition"
                      />
                      <button type="button" onClick={() => setShowPw({ ...showPw, [key]: !showPw[key] })} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700">
                        {showPw[key] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                ))}
                {pwError && <p className="text-[12px] font-medium text-rose-600">{pwError}</p>}
                <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                  <button type="button" onClick={() => setIsPasswordOpen(false)} className="px-4 py-2 text-[12px] font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition">Cancel</button>
                  <button type="submit" className="px-4 py-2 text-[12px] font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition">Update Password</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
