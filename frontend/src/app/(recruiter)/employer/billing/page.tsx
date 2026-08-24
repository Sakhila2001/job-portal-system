"use client";

import React, { useState, useEffect } from "react";
import DashboardShell from "@/components/layout/DashboardShell";
import { getRecruiterNavItems } from "@/lib/recruiter-nav";
import StatusBadge from "@/components/shared/StatusBadge";
import { CreditCard, Download, CheckCircle2, ShieldCheck, Zap, ArrowUpRight, X } from "lucide-react";

const MOCK_BILLING_PAYMENTS = [
  { id: "pay-1", date: "Aug 1, 2025", plan: "Business Pro", amount: "Rs 12,000", provider: "eSewa", transactionId: "ESEWA-99214081", status: "paid" },
  { id: "pay-2", date: "Jul 1, 2025", plan: "Business Pro", amount: "Rs 12,000", provider: "Khalti", transactionId: "KHLT-88124901", status: "paid" },
  { id: "pay-3", date: "Jun 1, 2025", plan: "Basic Plan",   amount: "Rs 3,500",  provider: "ConnectIPS", transactionId: "CIPS-77123910", status: "paid" },
];

export default function RecruiterBillingPage() {
  const [autoRenew, setAutoRenew] = useState(true);
  const [toast, setToast] = useState<string | null>(null);
  const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);

  useEffect(() => {
    if (toast) { const t = setTimeout(() => setToast(null), 3000); return () => clearTimeout(t); }
  }, [toast]);

  return (
    <DashboardShell
      brandTitle="JPS"
      brandSubtitle="Employer Dashboard"
      navItems={getRecruiterNavItems("/employer/billing")}
      searchPlaceholder="Search invoices..."
      userAvatarText="JE"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
          <div>
            <h1 className="text-[20px] font-bold text-slate-900 tracking-tight">Subscriptions & Billing</h1>
            <p className="text-[13px] text-slate-500 mt-0.5">
              Manage your employer plan tier, auto-renewal settings, and localized payment transactions (`UserSubscription` & `Payment`)
            </p>
          </div>
          <button
            onClick={() => setIsUpgradeOpen(true)}
            className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-[12px] font-semibold px-4 py-2 rounded-lg transition shrink-0"
          >
            <Zap className="h-4 w-4 fill-amber-400 text-amber-400" /> Upgrade Plan
          </button>
        </div>

        {/* Current Active Plan Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider bg-slate-900 text-white px-2.5 py-0.5 rounded">Current Active Plan</span>
                <span className="text-[12px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> Active
                </span>
              </div>
              <h2 className="text-[24px] font-extrabold text-slate-900 mt-1">Business Pro — Rs 12,000 / month</h2>
            </div>
            <div className="text-left sm:text-right">
              <div className="text-[12px] font-semibold text-slate-500">Billing Cycle Ends</div>
              <div className="text-[14px] font-bold font-mono text-slate-900">Aug 31, 2025 (26 days remaining)</div>
            </div>
          </div>

          {/* Plan Limits & Auto Renew */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-1">
              <div className="text-[12px] font-semibold text-slate-500">Job Requisitions</div>
              <div className="text-[18px] font-bold font-mono text-slate-900">6 / 10 Used</div>
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden mt-1">
                <div className="h-full bg-slate-900 w-[60%]" />
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-1">
              <div className="text-[12px] font-semibold text-slate-500">Featured Job Slots</div>
              <div className="text-[18px] font-bold font-mono text-slate-900">2 Active Placements</div>
              <div className="text-[11px] text-slate-500">Boosted on front page index</div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-between">
              <div>
                <div className="text-[13px] font-bold text-slate-900">Auto-Renew Plan</div>
                <div className="text-[11px] text-slate-500">Charge default provider monthly</div>
              </div>
              <button
                onClick={() => setAutoRenew(!autoRenew)}
                className={`w-12 h-6 rounded-full transition-colors relative ${autoRenew ? "bg-slate-900" : "bg-slate-300"}`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow-xs absolute top-0.5 transition-transform ${autoRenew ? "translate-x-6" : "translate-x-0.5"}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Payment History Table */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-[14px] font-bold text-slate-900">Payment Transactions (`Payment` Table)</h3>
              <p className="text-[11px] text-slate-500">History of payments processed via eSewa, Khalti, ConnectIPS, and Cards</p>
            </div>
          </div>
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60">
                {["Transaction ID", "Date", "Plan Tier", "Amount", "Payment Gateway", "Status", "Receipt"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_BILLING_PAYMENTS.map((pay) => (
                <tr key={pay.id} className="hover:bg-slate-50/60 transition">
                  <td className="px-4 py-3 font-mono font-semibold text-slate-900">{pay.transactionId}</td>
                  <td className="px-4 py-3 text-slate-500 font-mono text-[11px]">{pay.date}</td>
                  <td className="px-4 py-3 font-semibold text-slate-800">{pay.plan}</td>
                  <td className="px-4 py-3 font-mono font-bold text-slate-900">{pay.amount}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold bg-slate-100 text-slate-800 px-2 py-0.5 rounded border border-slate-200">
                      <CreditCard className="h-3 w-3" />
                      {pay.provider}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status="paid" showDot />
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setToast(`Downloading receipt ${pay.transactionId}...`)}
                      className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded transition"
                      title="Download PDF Tax Invoice"
                    >
                      <Download className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-slate-900 text-white text-[13px] font-semibold px-4 py-3 rounded-lg shadow-xl flex items-center gap-2 animate-in slide-in-from-top-2 fade-in duration-200">
          <CheckCircle2 className="h-4 w-4" /> {toast}
        </div>
      )}

      {/* Upgrade Plan Modal */}
      {isUpgradeOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50" onClick={() => setIsUpgradeOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} className="bg-white border border-slate-200 rounded-xl max-w-lg w-full p-6 shadow-xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 fill-amber-400 text-amber-400" />
                <h3 className="text-[16px] font-bold text-slate-900">Upgrade Your Plan</h3>
              </div>
              <button onClick={() => setIsUpgradeOpen(false)} className="text-slate-400 hover:text-slate-900"><X className="h-5 w-5" /></button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { name: "Business Pro", price: "Rs 12,000/mo", features: ["30 Active Jobs", "Unlimited Applicants", "Analytics Dashboard"], current: true },
                { name: "Enterprise", price: "Rs 25,000/mo", features: ["Unlimited Jobs", "Priority Support", "API Access", "Custom Branding"], current: false },
              ].map((plan) => (
                <div key={plan.name} className={`p-4 rounded-xl border-2 space-y-3 ${plan.current ? "border-slate-900 bg-slate-50" : "border-slate-200 bg-white hover:border-slate-400"} transition`}>
                  <div>
                    <div className="text-[14px] font-bold text-slate-900">{plan.name}</div>
                    <div className="text-[18px] font-extrabold text-slate-900 font-mono mt-1">{plan.price}</div>
                  </div>
                  <ul className="space-y-1">
                    {plan.features.map((f) => (
                      <li key={f} className="text-[12px] text-slate-600 flex items-center gap-1.5">
                        <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => { setIsUpgradeOpen(false); setToast(plan.current ? "You're already on this plan" : `Upgraded to ${plan.name}!`); }}
                    className={`w-full py-2 text-[12px] font-semibold rounded-lg transition ${plan.current ? "bg-slate-200 text-slate-500 cursor-default" : "bg-slate-900 hover:bg-slate-800 text-white"}`}
                  >
                    {plan.current ? "Current Plan" : "Upgrade Now"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
