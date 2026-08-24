"use client";

import { useState, useMemo } from "react";
import {
  MOCK_ADMIN_KPIS,
  MOCK_SIGNUPS_VS_POSTINGS,
  MOCK_MODERATION_QUEUE,
  MOCK_TOP_COMPANIES,
  MOCK_PLAN_BREAKDOWN,
  MOCK_ADMIN_CAMPAIGNS,
  MOCK_AUDIT_LOGS,
  MOCK_SYSTEM_HEALTH,
  MOCK_PENDING_VERIFICATIONS,
  MOCK_HIRING_FUNNEL,
} from "@/lib/mock-data/admin";
import { ModerationItem, Company } from "@/lib/types";

export function useAdminOverview() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedModerationItem, setSelectedModerationItem] = useState<ModerationItem | null>(null);
  const [selectedCompanyItem, setSelectedCompanyItem] = useState<Company | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Client-side filtering for Moderation Queue
  const filteredModerationQueue = useMemo(() => {
    if (!searchQuery.trim()) return MOCK_MODERATION_QUEUE;
    const q = searchQuery.toLowerCase();
    return MOCK_MODERATION_QUEUE.filter(
      (m) =>
        m.item.toLowerCase().includes(q) ||
        m.submittedBy.toLowerCase().includes(q) ||
        m.type.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Client-side filtering for Top Companies
  const filteredTopCompanies = useMemo(() => {
    if (!searchQuery.trim()) return MOCK_TOP_COMPANIES;
    const q = searchQuery.toLowerCase();
    return MOCK_TOP_COMPANIES.filter(
      (c) => c.displayName.toLowerCase().includes(q) || c.legalName.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const handleAction = (actionName: string) => {
    alert(`Admin action triggered: ${actionName}`);
  };

  return {
    kpis: MOCK_ADMIN_KPIS,
    chartData: MOCK_SIGNUPS_VS_POSTINGS,
    moderationQueue: filteredModerationQueue,
    topCompanies: filteredTopCompanies,
    planBreakdown: MOCK_PLAN_BREAKDOWN,
    campaigns: MOCK_ADMIN_CAMPAIGNS,
    auditLogs: MOCK_AUDIT_LOGS,
    systemHealth: MOCK_SYSTEM_HEALTH,
    pendingVerifications: MOCK_PENDING_VERIFICATIONS,
    hiringFunnel: MOCK_HIRING_FUNNEL,
    searchQuery,
    setSearchQuery,
    selectedModerationItem,
    setSelectedModerationItem,
    selectedCompanyItem,
    setSelectedCompanyItem,
    isLoading,
    setIsLoading,
    handleAction,
  };
}
