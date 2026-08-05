"use client";

import React from "react";
import Sidebar, { NavItemConfig } from "./Sidebar";
import Topbar from "./Topbar";
import DetailPanel from "../shared/DetailPanel";
import { AppNotification } from "@/lib/types";

interface DashboardShellProps {
  brandTitle: string;
  brandSubtitle: string;
  navItems: NavItemConfig[];
  bottomWidget?: React.ReactNode;
  // Topbar props
  searchPlaceholder?: string;
  searchQuery?: string;
  onSearchChange?: (val: string) => void;
  showDateRange?: boolean;
  dateRangeText?: string;
  showExport?: boolean;
  onExport?: () => void;
  primaryActionLabel?: string;
  onPrimaryAction?: () => void;
  userAvatarText?: string;
  notificationsCount?: number;
  alertsCount?: number;
  notificationsList?: AppNotification[];
  // Slide-over detail panel state
  detailPanelOpen?: boolean;
  onCloseDetailPanel?: () => void;
  detailPanelTitle?: string;
  detailPanelSubtitle?: string;
  detailPanelContent?: React.ReactNode;
  children: React.ReactNode;
}

export default function DashboardShell({
  brandTitle,
  brandSubtitle,
  navItems,
  bottomWidget,
  searchPlaceholder,
  searchQuery,
  onSearchChange,
  showDateRange,
  dateRangeText,
  showExport,
  onExport,
  primaryActionLabel,
  onPrimaryAction,
  userAvatarText,
  notificationsCount,
  alertsCount,
  notificationsList,
  detailPanelOpen = false,
  onCloseDetailPanel = () => {},
  detailPanelTitle = "Details",
  detailPanelSubtitle,
  detailPanelContent,
  children,
}: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-sans">
      <div className="flex flex-1">
        {/* Left Sidebar */}
        <Sidebar
          brandTitle={brandTitle}
          brandSubtitle={brandSubtitle}
          navItems={navItems}
          bottomWidget={bottomWidget}
          className="hidden md:flex"
        />

        {/* Main Content Column */}
        <div className="flex-1 flex flex-col min-w-0">
          <Topbar
            searchPlaceholder={searchPlaceholder}
            searchQuery={searchQuery}
            onSearchChange={onSearchChange}
            showDateRange={showDateRange}
            dateRangeText={dateRangeText}
            showExport={showExport}
            onExport={onExport}
            primaryActionLabel={primaryActionLabel}
            onPrimaryAction={onPrimaryAction}
            userAvatarText={userAvatarText}
            notificationsCount={notificationsCount}
            alertsCount={alertsCount}
            notificationsList={notificationsList}
          />

          <main className="p-6 flex-1 space-y-6 max-w-7xl w-full mx-auto">
            {children}
          </main>
        </div>
      </div>

      {/* Slide-over Detail Panel */}
      <DetailPanel
        isOpen={detailPanelOpen}
        onClose={onCloseDetailPanel}
        title={detailPanelTitle}
        subtitle={detailPanelSubtitle}
      >
        {detailPanelContent}
      </DetailPanel>
    </div>
  );
}
