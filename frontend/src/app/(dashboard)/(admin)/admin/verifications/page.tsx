"use client";

import React, { useState } from "react";
import DashboardShell from "@/components/layout/DashboardShell";
import { getAdminNavItems } from "@/lib/admin-nav";
import { CheckCircle2, XCircle, FileText, ExternalLink, ShieldCheck } from "lucide-react";

const INITIAL_VERIFICATIONS = [
  { id: "v1", companyName: "Yeti Cloud Pvt Ltd", taxId: "PAN-9941820", documentType: "Tax Clearance & Reg Certificate", submittedDate: "Aug 2, 2025", website: "yeticloud.io" },
  { id: "v2", companyName: "Brightpath Consulting", taxId: "PAN-8812041", documentType: "Business Operating Licence", submittedDate: "Aug 1, 2025", website: "brightpath.io" },
  { id: "v3", companyName: "Nexoria Tech Inc.", taxId: "PAN-7734190", documentType: "Domain Ownership Verification", submittedDate: "Jul 31, 2025", website: "nexoria.tech" },
  { id: "v4", companyName: "Himal Softworks", taxId: "PAN-6651299", documentType: "Employer Registration Form", submittedDate: "Jul 30, 2025", website: "himalsoft.com" },
];

export default function AdminVerificationsPage() {
  const [verifications, setVerifications] = useState(INITIAL_VERIFICATIONS);

  const approve = (id: string) => {
    setVerifications((prev) => prev.filter((v) => v.id !== id));
    alert("Verification request approved.");
  };

  const reject = (id: string) => {
    setVerifications((prev) => prev.filter((v) => v.id !== id));
    alert("Verification request rejected.");
  };

  return (
    <DashboardShell
      brandTitle="JPS"
      brandSubtitle="Admin Dashboard"
      navItems={getAdminNavItems("/admin/verifications")}
      searchPlaceholder="Search verifications..."
      userAvatarText="SA"
      alertsCount={3}
      notificationsCount={3}
    >
      <div className="space-y-5">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-[20px] font-bold text-slate-900 tracking-tight">Employer & Business Verifications</h1>
              <p className="text-[13px] text-slate-500 mt-0.5">Review submitted tax documents, company registration certificates, and domain ownership proof</p>
            </div>
            <span className="text-[12px] font-semibold bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1 rounded-full">
              {verifications.length} Pending Approval
            </span>
          </div>
        </div>

        {/* Verification Queue List */}
        <div className="space-y-4">
          {verifications.map((item) => (
            <div key={item.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-blue-600" />
                  <h3 className="text-[15px] font-bold text-slate-900">{item.companyName}</h3>
                  <span className="text-[11px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded">ID: {item.taxId}</span>
                </div>
                <div className="text-[12px] text-slate-600 flex flex-wrap items-center gap-4">
                  <span>Document: <strong className="text-slate-800">{item.documentType}</strong></span>
                  <span>Submitted: <strong className="text-slate-800">{item.submittedDate}</strong></span>
                  <span>Website: <a href={`https://${item.website}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline inline-flex items-center gap-0.5">{item.website} <ExternalLink className="h-3 w-3" /></a></span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 shrink-0">
                <button
                  onClick={() => alert(`Viewing document file for ${item.companyName}`)}
                  className="inline-flex items-center gap-1 text-[12px] font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg transition"
                >
                  <FileText className="h-3.5 w-3.5" /> View Proof
                </button>
                <button
                  onClick={() => approve(item.id)}
                  className="inline-flex items-center gap-1 text-[12px] font-semibold text-white bg-emerald-600 hover:bg-emerald-700 px-3 py-2 rounded-lg transition"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" /> Approve
                </button>
                <button
                  onClick={() => reject(item.id)}
                  className="inline-flex items-center gap-1 text-[12px] font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-3 py-2 rounded-lg transition"
                >
                  <XCircle className="h-3.5 w-3.5" /> Reject
                </button>
              </div>
            </div>
          ))}

          {verifications.length === 0 && (
            <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-400 text-[13px]">
              No pending verification requests. All registered companies are up to date!
            </div>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}
