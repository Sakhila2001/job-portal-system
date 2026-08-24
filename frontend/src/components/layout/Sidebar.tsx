"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

export interface NavItemConfig {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: number | string;
  isActive?: boolean;
}

interface SidebarProps {
  brandTitle: string;
  brandSubtitle: string;
  navItems: NavItemConfig[];
  bottomWidget?: React.ReactNode;
  className?: string;
}

export default function Sidebar({
  brandTitle,
  brandSubtitle,
  navItems,
  bottomWidget,
  className = "",
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className={`w-64 shrink-0 bg-white border-r border-slate-200/80 min-h-screen flex flex-col justify-between p-4 ${className}`}>
      <div className="space-y-5">
        {/* Clean Light Brand Header */}
        <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
          <div className="h-9 w-9 rounded-lg bg-slate-900 text-white font-bold text-[13px] flex items-center justify-center font-mono shrink-0 shadow-2xs">
            {brandTitle.slice(0, 3)}
          </div>
          <div className="min-w-0">
            <div className="text-[13px] font-bold text-slate-900 truncate tracking-tight">{brandTitle}</div>
            <div className="text-[11px] text-slate-500 font-medium truncate">{brandSubtitle}</div>
          </div>
        </div>

        {/* Navigation Items List */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = item.isActive !== undefined ? item.isActive : pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`relative flex items-center justify-between px-3 py-2.5 rounded-lg text-[13px] transition-all ${
                  active
                    ? "bg-slate-100/90 text-slate-900 font-semibold border border-slate-200/70"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon className={`h-4 w-4 shrink-0 ${active ? "text-slate-900" : "text-slate-400"}`} />
                  <span className="truncate">{item.label}</span>
                </div>

                {item.badge !== undefined && (
                  <span
                    className={`text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded-full border shrink-0 ${
                      active
                        ? "bg-slate-200 text-slate-900 border-slate-300/80"
                        : "bg-slate-100 text-slate-600 border-slate-200"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}

                {active && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute left-0 top-2 bottom-2 w-1 bg-slate-900 rounded-r"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Custom Widget */}
      {bottomWidget && <div className="pt-4 border-t border-slate-100">{bottomWidget}</div>}
    </aside>
  );
}
