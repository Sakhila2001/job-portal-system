"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface MegaMenuColumn {
  title: string;
  items: string[];
}

interface MegaMenuProps {
  menuKey: string;
  href: string;
  columns: MegaMenuColumn[];
  isVisible: boolean;
  onItemClick: (item: string, href: string) => void;
}

/** 
 * Determines the grid layout for the mega menu based on the menu key.
 * Services has a special 3-column fixed layout to fix the Monthly Subscriptions alignment issue.
 */
function getMenuLayout(menuKey: string, columns: MegaMenuColumn[]) {
  if (menuKey === "services") {
    // Services layout: fixed 3-column grid where col1 groups Resume Writing + Monthly Subscriptions,
    // col2 groups Find Jobs + Free Resume Resources, col3 is Get Recruiter's Attention
    return "services";
  }
  return "default";
}

export default function MegaMenu({ menuKey, href, columns, isVisible, onItemClick }: MegaMenuProps) {
  if (!isVisible) return null;

  const layout = getMenuLayout(menuKey, columns);

  return (
    <div
      className={`
        absolute top-[calc(100%+1px)] left-1/2 bg-white border border-slate-100
        shadow-[0_20px_60px_-10px_rgba(0,0,0,0.15)] rounded-2xl overflow-hidden z-50
        transition-all duration-200 ease-out
        animate-in fade-in slide-in-from-top-3
        ${layout === "services" ? "w-[780px] -translate-x-[30%]" : "w-[700px] -translate-x-1/4"}
      `}
    >
      {/* Decorative top accent bar */}
      <div className="h-0.5 w-full bg-gradient-to-r from-brand-primary via-indigo-400 to-brand-secondary" />

      <div className="p-6">
        {layout === "services" ? (
          /* ── SERVICES SPECIAL LAYOUT ── */
          /* 3 even columns; col-1 = Resume Writing + Monthly Subscriptions stacked,
             col-2 = Find Jobs + Free Resume Resources stacked, col-3 = Get Recruiter's Attention */
          <div className="grid grid-cols-3 gap-0">
            {/* Column 1: Resume Writing & Monthly Subscriptions */}
            <div className="pr-6 border-r border-slate-100 space-y-6">
              {/* Resume Writing section */}
              <MenuSection
                title={columns[0].title}
                items={columns[0].items}
                href={href}
                onItemClick={onItemClick}
              />
              {/* Monthly Subscriptions section */}
              <MenuSection
                title={columns[3].title}
                items={columns[3].items}
                href={href}
                onItemClick={onItemClick}
              />
            </div>

            {/* Column 2: Find Jobs & Free Resume Resources */}
            <div className="px-6 border-r border-slate-100 space-y-6">
              {/* Find Jobs section */}
              <MenuSection
                title={columns[1].title}
                items={columns[1].items}
                href={href}
                onItemClick={onItemClick}
              />
              {/* Free Resume Resources section */}
              <MenuSection
                title={columns[4].title}
                items={columns[4].items}
                href={href}
                onItemClick={onItemClick}
              />
            </div>

            {/* Column 3: Get Recruiter's Attention */}
            <div className="pl-6 space-y-6">
              <MenuSection
                title={columns[2].title}
                items={columns[2].items}
                href={href}
                onItemClick={onItemClick}
              />
            </div>
          </div>
        ) : (
          /* ── DEFAULT 3-COLUMN LAYOUT (Jobs / Companies) ── */
          <div className="grid grid-cols-3 gap-0">
            {columns.map((column, idx) => (
              <div
                key={column.title}
                className={`${idx > 0 ? "border-l border-slate-100 pl-6" : ""} ${idx < columns.length - 1 ? "pr-6" : ""}`}
              >
                <MenuSection
                  title={column.title}
                  items={column.items}
                  href={href}
                  onItemClick={onItemClick}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Subtle bottom footer bar */}
      <div className="bg-slate-50 border-t border-slate-100 px-6 py-2.5 flex items-center justify-between">
        <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">JobPortal — Verified Listings Only</span>
        <button
          onClick={() => onItemClick("", href)}
          className="text-[10px] font-bold text-brand-primary hover:underline"
        >
          View all →
        </button>
      </div>
    </div>
  );
}

/* ── Reusable section within a column ── */
interface MenuSectionProps {
  title: string;
  items: string[];
  href: string;
  onItemClick: (item: string, href: string) => void;
}

function MenuSection({ title, items, href, onItemClick }: MenuSectionProps) {
  return (
    <div className="space-y-2.5">
      <h4 className="text-[10px] font-extrabold text-slate-800 uppercase tracking-[0.08em]">
        {title}
      </h4>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item}>
            <button
              onClick={() => onItemClick(item, href)}
              className="group/item text-left text-[13px] text-slate-500 hover:text-brand-primary block w-full py-0.5 font-medium transition-colors"
            >
              <span className="inline-flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover/item:bg-brand-primary transition-colors shrink-0" />
                {item}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
