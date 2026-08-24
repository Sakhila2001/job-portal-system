"use client";

import React, { useState } from "react";
import DashboardShell from "@/components/layout/DashboardShell";
import { getAdminNavItems } from "@/lib/admin-nav";
import { CreditCard, Download, CheckCircle2, AlertCircle, XCircle, ChevronLeft, ChevronRight } from "lucide-react";

const BILLING = [
  { id: "b1", company: "Yeti Cloud",        plan: "enterprise", amount: "Rs 49,000", cycle: "Monthly",  status: "paid",    date: "Aug 1, 2025",  invoice: "INV-2025-089" },
  { id: "b2", company: "Himal Softworks",   plan: "pro",        amount: "Rs 12,000", cycle: "Monthly",  status: "paid",    date: "Aug 1, 2025",  invoice: "INV-2025-088" },
  { id: "b3", company: "Khanepani Tech",    plan: "enterprise", amount: "Rs 49,000", cycle: "Monthly",  status: "past_due",date: "Jul 1, 2025",  invoice: "INV-2025-071" },
  { id: "b4", company: "Nexoria Tech",      plan: "basic",      amount: "Rs 3,500",  cycle: "Monthly",  status: "paid",    date: "Aug 1, 2025",  invoice: "INV-2025-090" },
  { id: "b5", company: "Brightpath Consulting",plan:"basic",    amount: "Rs 3,500",  cycle: "Monthly",  status: "pending", date: "Aug 2, 2025",  invoice: "INV-2025-091" },
  { id: "b6", company: "QuickHire Solutions",plan:"free",       amount: "Rs 0",      cycle: "—",        status: "free",    date: "—",            invoice: "—" },
];

const STATUS_COLOR: Record<string,string> = {
  paid: "bg-emerald-50 text-emerald-700 border-emerald-200",
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  past_due: "bg-rose-50 text-rose-700 border-rose-200",
  free: "bg-slate-100 text-slate-600 border-slate-200",
};

export default function AdminBillingPage() {
  const [search, setSearch] = useState("");
  const filtered = BILLING.filter(b => !search || b.company.toLowerCase().includes(search.toLowerCase()));

  const mrr = BILLING.filter(b => b.status === "paid").reduce((s, b) => s + parseInt(b.amount.replace(/[^\d]/g, "") || "0"), 0);
  const pastDue = BILLING.filter(b => b.status === "past_due").length;
  const pending  = BILLING.filter(b => b.status === "pending").length;

  return (
    <DashboardShell
      brandTitle="JPS" brandSubtitle="Admin Dashboard"
      navItems={getAdminNavItems("/admin/billing")}
      searchPlaceholder="Search billing records..." searchQuery={search} onSearchChange={setSearch}
      showExport onExport={() => alert("Exporting billing report...")}
      userAvatarText="SA" alertsCount={3} notificationsCount={3}
    >
      <div className="space-y-5">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
          <h1 className="text-[20px] font-bold text-slate-900 tracking-tight">Billing & Subscriptions</h1>
          <p className="text-[13px] text-slate-500 mt-0.5">Track subscription payments, invoices, and plan upgrades across all employer accounts</p>
        </div>

        {/* MRR Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Collected MRR", value: `Rs ${(mrr/1000).toFixed(0)}K`, icon: CreditCard, color: "text-slate-900" },
            { label: "Past Due", value: pastDue, icon: AlertCircle, color: "text-rose-700" },
            { label: "Pending Payment", value: pending, icon: CheckCircle2, color: "text-amber-700" },
            { label: "Free Plan Accounts", value: BILLING.filter(b => b.status === "free").length, icon: XCircle, color: "text-slate-500" },
          ].map((s) => (
            <div key={s.label} className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs flex items-center gap-3">
              <s.icon className={`h-8 w-8 ${s.color} shrink-0`} />
              <div>
                <div className={`text-[20px] font-bold font-mono ${s.color}`}>{s.value}</div>
                <div className="text-[11px] text-slate-500">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60">
                {["Company", "Plan", "Amount", "Cycle", "Status", "Date", "Invoice", "Action"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(b => (
                <tr key={b.id} className="hover:bg-slate-50/60 transition">
                  <td className="px-4 py-3 font-semibold text-slate-900">{b.company}</td>
                  <td className="px-4 py-3 capitalize text-slate-700 font-medium">{b.plan}</td>
                  <td className="px-4 py-3 font-mono font-semibold text-slate-900">{b.amount}</td>
                  <td className="px-4 py-3 text-slate-500">{b.cycle}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${STATUS_COLOR[b.status]}`}>
                      {b.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-slate-500 text-[11px]">{b.date}</td>
                  <td className="px-4 py-3 font-mono text-[11px] text-slate-500">{b.invoice}</td>
                  <td className="px-4 py-3">
                    {b.invoice !== "—" && (
                      <button onClick={() => alert(`Download ${b.invoice}`)} className="p-1.5 rounded text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition">
                        <Download className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="border-t border-slate-100 px-4 py-3 flex items-center justify-between text-[12px] text-slate-500">
            <span>Showing {filtered.length} of {BILLING.length} records</span>
            <div className="flex gap-1">
              <button className="p-1 rounded hover:bg-slate-100 transition"><ChevronLeft className="h-4 w-4" /></button>
              <button className="px-2.5 py-1 rounded bg-slate-900 text-white font-mono text-[11px]">1</button>
              <button className="p-1 rounded hover:bg-slate-100 transition"><ChevronRight className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
