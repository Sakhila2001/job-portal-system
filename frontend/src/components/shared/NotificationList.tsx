"use client";

import React from "react";
import { AppNotification } from "@/lib/types";
import { Mail, Eye, Bell, CheckCircle } from "lucide-react";

interface NotificationListProps {
  notifications: AppNotification[];
  title?: string;
  className?: string;
}

export default function NotificationList({
  notifications,
  title = "Notifications",
  className = "",
}: NotificationListProps) {
  const getIcon = (type: AppNotification["type"]) => {
    switch (type) {
      case "mail":
        return <Mail className="h-3.5 w-3.5 text-stone-600" />;
      case "view":
        return <Eye className="h-3.5 w-3.5 text-blue-600" />;
      case "alert":
        return <Bell className="h-3.5 w-3.5 text-amber-600" />;
      default:
        return <CheckCircle className="h-3.5 w-3.5 text-emerald-600" />;
    }
  };

  return (
    <div className={`bg-white border border-stone-200 rounded-xl p-4 shadow-2xs space-y-3 ${className}`}>
      {title && (
        <div className="flex items-center justify-between border-b border-stone-100 pb-2">
          <h4 className="text-[13px] font-medium text-stone-900">{title}</h4>
          <span className="text-[10px] font-mono text-stone-400">{notifications.length} total</span>
        </div>
      )}

      <div className="space-y-2">
        {notifications.map((n) => (
          <div
            key={n.id}
            className="flex items-start gap-2.5 p-2 rounded-lg bg-stone-50/70 border border-stone-100 text-[12px] hover:bg-stone-100/60 transition"
          >
            <div className="p-1 rounded bg-white border border-stone-200 shrink-0 mt-0.5">
              {getIcon(n.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-stone-800 font-normal leading-snug">{n.message}</p>
              <p className="text-[10px] text-stone-400 mt-0.5 font-mono">{n.timeAgo}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
