"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, Bell, Download, Plus, Calendar, Mail, LogOut } from "lucide-react";
import NotificationList from "../shared/NotificationList";
import { AppNotification } from "@/lib/types";
import { useAuth } from "@/features/auth/context";

interface TopbarProps {
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
  roleTitle?: string;
}

export default function Topbar({
  searchPlaceholder = "Search...",
  searchQuery = "",
  onSearchChange,
  showDateRange = false,
  dateRangeText = "Last 30 days",
  showExport = false,
  onExport,
  primaryActionLabel,
  onPrimaryAction,
  userAvatarText = "SA",
  notificationsCount = 2,
  notificationsList = [],
  roleTitle = "Dashboard",
}: TopbarProps) {
  const [showNotificationsPopover, setShowNotificationsPopover] = useState(false);
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = useCallback(async () => {
    await logout();
    router.push("/");
  }, [logout, router]);

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between gap-4 sticky top-0 z-30 shadow-2xs">
      {/* Search input matching website header */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-1.5 text-[13px] text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition font-medium"
        />
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2.5">
        {/* Date range picker button */}
        {showDateRange && (
          <button className="hidden sm:inline-flex items-center gap-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-[12px] font-medium px-3 py-1.5 rounded-lg transition">
            <Calendar className="h-3.5 w-3.5 text-slate-400" />
            <span>{dateRangeText}</span>
          </button>
        )}

        {/* Export button */}
        {showExport && (
          <button
            onClick={onExport}
            className="hidden sm:inline-flex items-center gap-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-[12px] font-medium px-3 py-1.5 rounded-lg transition"
          >
            <Download className="h-3.5 w-3.5 text-slate-400" />
            <span>Export</span>
          </button>
        )}

        {/* Primary Action Button — solid slate-900 matching landing page CTAs */}
        {primaryActionLabel && onPrimaryAction && (
          <button
            onClick={onPrimaryAction}
            className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-[12px] font-semibold px-3.5 py-1.5 rounded-lg transition shadow-xs"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>{primaryActionLabel}</span>
          </button>
        )}

        {/* Mail Icon */}
        <button className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition border border-slate-200/60 hidden md:block">
          <Mail className="h-4 w-4" />
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotificationsPopover(!showNotificationsPopover)}
            className="relative p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition border border-slate-200"
          >
            <Bell className="h-4 w-4" />
            {notificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-slate-900 text-[9px] font-bold text-white font-mono">
                {notificationsCount}
              </span>
            )}
          </button>

          {/* Notifications Popover */}
          {showNotificationsPopover && (
            <div className="absolute right-0 mt-2 w-80 z-50 animate-in fade-in zoom-in-95 duration-150">
              <NotificationList
                notifications={
                  notificationsList.length > 0
                    ? notificationsList
                    : [
                        { id: "1", type: "alert", message: "2 new alerts pending review", timeAgo: "10m ago" },
                        { id: "2", type: "system", message: "System backup completed", timeAgo: "1h ago" },
                      ]
                }
              />
            </div>
          )}
        </div>

        {/* User Avatar + Logout */}
        <div className="flex items-center gap-2 border-l border-slate-200 pl-2.5">
          <div className="h-8 w-8 rounded-full bg-slate-900 text-white text-[12px] font-semibold flex items-center justify-center shadow-xs font-mono">
            {userAvatarText}
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-[12px] font-semibold px-2.5 py-1.5 rounded-lg transition border border-slate-200"
            title="Logout"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
