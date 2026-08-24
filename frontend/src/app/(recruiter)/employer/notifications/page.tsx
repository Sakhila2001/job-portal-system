"use client";

import React, { useState } from "react";
import DashboardShell from "@/components/layout/DashboardShell";
import NotificationList from "@/components/shared/NotificationList";
import { useRecruiterOverview } from "@/features/recruiter/hooks/useRecruiterOverview";
import { getRecruiterNavItems } from "@/lib/recruiter-nav";
import { CheckCheck } from "lucide-react";

export default function RecruiterNotificationsPage() {
  const { tasks } = useRecruiterOverview();

  const [notifications, setNotifications] = useState([
    { id: "n1", type: "alert" as const, message: "New application received from Sujata K. for Senior Laravel Developer", timeAgo: "10m ago", read: false },
    { id: "n2", type: "system" as const, message: "Campaign 'Laravel Dev Boost' reached 24,000 Rs budget limit", timeAgo: "2h ago", read: false },
    { id: "n3", type: "mail" as const, message: "Interview confirmed with Roshan G. for QA Engineer", timeAgo: "5h ago", read: false },
    { id: "n4", type: "alert" as const, message: "New application received from Bikash R. for Frontend Developer", timeAgo: "1d ago", read: false },
    { id: "n5", type: "system" as const, message: "Job 'DevOps Engineer' expires in 3 days. Consider renewing.", timeAgo: "1d ago", read: false },
  ]);

  const [allRead, setAllRead] = useState(false);

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setAllRead(true);
  };

  const handleDismiss = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <DashboardShell
      brandTitle="JPS"
      brandSubtitle="Employer Dashboard"
      navItems={getRecruiterNavItems("/employer/notifications", tasks.length)}
      searchPlaceholder="Search notifications..."
      userAvatarText="JE"
    >
      <div className="space-y-6 max-w-3xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
          <div>
            <h1 className="text-[20px] font-bold text-slate-900 tracking-tight">Notifications</h1>
            <p className="text-[13px] text-slate-500 mt-0.5">
              Recent recruiter activity, candidate applications, and system alerts
              {unreadCount > 0 && (
                <span className="ml-2 text-[11px] font-mono font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">
                  {unreadCount} unread
                </span>
              )}
            </p>
          </div>
          <button
            onClick={handleMarkAllRead}
            disabled={allRead || unreadCount === 0}
            className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-[12px] font-semibold px-4 py-2 rounded-lg transition shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <CheckCheck className="h-4 w-4" />
            <span>Mark All Read</span>
          </button>
        </div>

        {notifications.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center shadow-2xs">
            <p className="text-[14px] font-semibold text-slate-400">No notifications</p>
            <p className="text-[12px] text-slate-400 mt-1">You're all caught up!</p>
          </div>
        ) : (
          <div className="space-y-2">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className={`flex items-start justify-between gap-3 bg-white border rounded-xl p-4 shadow-2xs transition ${
                  notif.read ? "border-slate-100 opacity-60" : "border-slate-200"
                }`}
              >
                <div className="flex items-start gap-3 min-w-0">
                  <span className={`mt-1 h-2 w-2 rounded-full shrink-0 ${
                    notif.type === "alert" ? "bg-rose-500" : notif.type === "system" ? "bg-amber-500" : "bg-blue-500"
                  }`} />
                  <div className="min-w-0">
                    <p className={`text-[13px] font-medium ${notif.read ? "text-slate-500" : "text-slate-900"}`}>
                      {notif.message}
                    </p>
                    <p className="text-[11px] font-mono text-slate-400 mt-0.5">{notif.timeAgo}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDismiss(notif.id)}
                  className="p-1 text-slate-300 hover:text-slate-700 transition shrink-0 text-[14px] font-bold"
                  title="Dismiss"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
