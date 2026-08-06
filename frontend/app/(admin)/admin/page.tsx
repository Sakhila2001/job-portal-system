"use client";

import React from "react";
import DashboardShell from "@/components/layout/DashboardShell";
import KpiCard from "@/components/shared/KpiCard";
import ChartCard from "@/components/shared/ChartCard";
import ModerationQueueTable from "@/components/admin/ModerationQueueTable";
import TopCompaniesTable from "@/components/admin/TopCompaniesTable";
import PlanBreakdownPanel from "@/components/admin/PlanBreakdownPanel";
import AuditActivityFeed from "@/components/admin/AuditActivityFeed";
import CampaignPerformancePanel from "@/components/recruiter/CampaignPerformancePanel";
import StatusBadge from "@/components/shared/StatusBadge";
import { useAdminOverview } from "@/hooks/useAdminOverview";
import {
  LayoutGrid,
  Users,
  Briefcase,
  FileText,
  Building2,
  Megaphone,
  CreditCard,
  Shield,
  Settings,
  CheckCircle2,
  Ticket,
  BarChart2,
  Folder,
  Lock,
} from "lucide-react";

export default function AdminOverviewPage() {
  const {
    kpis,
    chartData,
    moderationQueue,
    topCompanies,
    planBreakdown,
    campaigns,
    auditLogs,
    systemHealth,
    pendingVerifications,
    hiringFunnel,
    searchQuery,
    setSearchQuery,
    selectedModerationItem,
    setSelectedModerationItem,
    selectedCompanyItem,
    setSelectedCompanyItem,
    isLoading,
    handleAction,
  } = useAdminOverview();

  // Sidebar Nav matching Wireframe 3 exactly
  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutGrid, isActive: true },
    { label: "Users", href: "/admin/users", icon: Users },
    { label: "Jobs", href: "/admin/jobs", icon: Briefcase },
    { label: "Applications", href: "/admin/applications", icon: FileText },
    { label: "Companies", href: "/admin/companies", icon: Building2 },
    { label: "Campaigns", href: "/admin/campaigns", icon: Megaphone },
    { label: "Billing", href: "/admin/billing", icon: CreditCard, badge: 27 },
    { label: "Restrictions", href: "/admin/restrictions", icon: Shield },
    { label: "Audit Log", href: "/admin/audit", icon: FileText },
    { label: "Settings", href: "/admin/settings", icon: Settings, badge: 12 },
    {
      label: "Verifications",
      href: "/admin/verifications",
      icon: CheckCircle2,
      badge: 9,
    },
    { label: "Support Tickets", href: "/admin/tickets", icon: Ticket },
    { label: "Reports & Analytics", href: "/admin/reports", icon: BarChart2 },
    { label: "Content & CMS", href: "/admin/cms", icon: Folder },
    { label: "Roles & Permissions", href: "/admin/roles", icon: Lock },
  ];

  // Slide-over Detail Panel Content
  const detailContent = selectedModerationItem ? (
    <div className="space-y-4 text-[13px]">
      <div>
        <span className="text-stone-400">Item Type:</span>{" "}
        <span className="font-semibold text-stone-900">
          {selectedModerationItem.type}
        </span>
      </div>
      <div>
        <span className="text-stone-400">Target Item:</span>{" "}
        <p className="font-medium text-stone-900 mt-0.5">
          {selectedModerationItem.item}
        </p>
      </div>
      <div>
        <span className="text-stone-400">Submitted By:</span>{" "}
        <p className="font-mono text-blue-600 mt-0.5">
          {selectedModerationItem.submittedBy}
        </p>
      </div>
      <div>
        <span className="text-stone-400">Moderation Status:</span>
        <div className="mt-1">
          <StatusBadge status={selectedModerationItem.status} showDot />
        </div>
      </div>
      {selectedModerationItem.details && (
        <div className="p-3 rounded-lg bg-stone-50 border border-stone-200/80 text-stone-700 leading-relaxed">
          {selectedModerationItem.details}
        </div>
      )}
      <div className="pt-4 border-t border-stone-100 flex gap-2">
        <button
          onClick={() => {
            alert(`Approved moderation item ${selectedModerationItem.id}`);
            setSelectedModerationItem(null);
          }}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition text-[12px]"
        >
          Approve Item
        </button>
        <button
          onClick={() => {
            alert(`Rejected moderation item ${selectedModerationItem.id}`);
            setSelectedModerationItem(null);
          }}
          className="flex-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-medium py-2 rounded-lg transition text-[12px]"
        >
          Reject / Delete
        </button>
      </div>
    </div>
  ) : selectedCompanyItem ? (
    <div className="space-y-4 text-[13px]">
      <div>
        <span className="text-stone-400">Company Name:</span>{" "}
        <h4 className="font-semibold text-stone-900 text-[15px] mt-0.5">
          {selectedCompanyItem.legalName}
        </h4>
      </div>
      <div className="grid grid-cols-2 gap-3 p-3 bg-stone-50 border border-stone-200 rounded-lg text-center font-mono">
        <div>
          <div className="text-[10px] text-stone-400 uppercase">Open Jobs</div>
          <div className="text-[16px] font-bold text-stone-900">
            {selectedCompanyItem.openJobsCount}
          </div>
        </div>
        <div>
          <div className="text-[10px] text-stone-400 uppercase">Applicants</div>
          <div className="text-[16px] font-bold text-stone-900">
            {selectedCompanyItem.applicantsCount}
          </div>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <DashboardShell
      brandTitle="JPS"
      brandSubtitle="Admin Dashboard"
      navItems={navItems}
      searchPlaceholder="Search users, companies, jobs"
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      showDateRange
      dateRangeText="Last 30 days"
      showExport
      onExport={() => handleAction("Export Report")}
      primaryActionLabel="New Job"
      onPrimaryAction={() => handleAction("New Job")}
      userAvatarText="SA"
      notificationsCount={2}
      alertsCount={3}
      detailPanelOpen={!!selectedModerationItem || !!selectedCompanyItem}
      onCloseDetailPanel={() => {
        setSelectedModerationItem(null);
        setSelectedCompanyItem(null);
      }}
      detailPanelTitle={
        selectedModerationItem ? "Moderation Inspector" : "Company Profile"
      }
      detailPanelContent={detailContent}
    >
      {/* 6 Top KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {kpis.map((kpi, idx) => (
          <KpiCard
            key={kpi.title}
            title={kpi.title}
            value={kpi.value}
            trendDelta={kpi.trendDelta}
            trendDirection={kpi.trendDirection}
            subtitle={kpi.subtitle}
            index={idx}
          />
        ))}
      </div>

      {/* Main Grid: Left Column + Right Context Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Column */}
        <div className="lg:col-span-8 space-y-6">
          {/* Signups vs Job Postings Chart */}
          <ChartCard
            title="Signups vs Job Postings — Last 6 Weeks"
            data={chartData}
            xAxisKey="week"
            bars={[
              { key: "signups", name: "Signups", color: "#60A5FA" },
              { key: "postings", name: "Job Postings", color: "#4ADE80" },
            ]}
          />

          {/* Moderation Queue Table */}
          <ModerationQueueTable
            items={moderationQueue}
            isLoading={isLoading}
            onViewItem={(item) => setSelectedModerationItem(item)}
          />

          {/* Top Companies Table */}
          <TopCompaniesTable
            companies={topCompanies}
            isLoading={isLoading}
            onSelectCompany={(comp) => setSelectedCompanyItem(comp)}
          />

          {/* Quick Actions Row */}
          <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-2xs space-y-3">
            <h4 className="text-[13px] font-medium text-stone-900">
              Quick Actions
            </h4>
            <div className="flex flex-wrap items-center gap-2">
              {[
                "Approve Jobs",
                "Suspend User",
                "Verify Employer",
                "Send Broadcast",
                "Export Report",
                "Run Spam Scan",
              ].map((act) => (
                <button
                  key={act}
                  onClick={() => handleAction(act)}
                  className="bg-white hover:bg-stone-50 text-stone-700 text-[12px] font-medium px-3 py-1.5 rounded-lg border border-stone-200 transition shadow-2xs"
                >
                  ✓ {act}
                </button>
              ))}
            </div>
          </div>

          {/* Hiring Funnel (Last 30 Days) Row */}
          <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-2xs space-y-3">
            <h4 className="text-[13px] font-medium text-stone-900">
              Hiring Funnel (Last 30 Days)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-mono">
              {hiringFunnel.map((step) => (
                <div
                  key={step.stage}
                  className={`p-3 rounded-lg border text-center ${
                    step.isHighlighted
                      ? "bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold"
                      : "bg-stone-50 border-stone-200 text-stone-800"
                  }`}
                >
                  <div className="text-[10px] text-stone-500 font-sans uppercase">
                    {step.stage}
                  </div>
                  <div className="text-[16px] font-bold mt-0.5">
                    {step.count.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Context Panel */}
        <div className="lg:col-span-4 space-y-6">
          <PlanBreakdownPanel plans={planBreakdown} />
          <CampaignPerformancePanel campaigns={campaigns} />
          <AuditActivityFeed auditLogs={auditLogs} />

          {/* System Health Panel */}
          <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-2xs space-y-3">
            <h4 className="text-[13px] font-medium text-stone-900 border-b border-stone-100 pb-2">
              System Health
            </h4>
            <div className="space-y-2 text-[12px]">
              {systemHealth.map((sh) => (
                <div
                  key={sh.metric}
                  className="flex items-center justify-between p-2 rounded bg-stone-50 border border-stone-100 font-mono"
                >
                  <span className="text-stone-600 font-sans">{sh.metric}</span>
                  <span className="font-semibold text-stone-900">
                    {sh.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Verifications Panel */}
          <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-2xs space-y-3">
            <h4 className="text-[13px] font-medium text-stone-900 border-b border-stone-100 pb-2">
              Pending Verifications
            </h4>
            <div className="space-y-2 text-[12px]">
              {pendingVerifications.map((pv) => (
                <div
                  key={pv.label}
                  className="flex items-center justify-between p-2 rounded bg-stone-50 border border-stone-100"
                >
                  <span className="text-stone-700">{pv.label}</span>
                  <span className="font-mono font-semibold text-stone-900 bg-white px-2 py-0.5 rounded border border-stone-200">
                    {pv.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
