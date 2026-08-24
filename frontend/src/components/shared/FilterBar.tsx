"use client";

import React from "react";
import { Search, X, Filter } from "lucide-react";

export interface FilterPill {
  id: string;
  label: string;
  count?: number;
}

export interface SelectFilter {
  id: string;
  label: string;
  options: { label: string; value: string }[];
  value: string;
  onChange: (val: string) => void;
}

interface FilterBarProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  searchPlaceholder?: string;
  pills?: FilterPill[];
  activePillId?: string;
  onPillSelect?: (id: string) => void;
  selectFilters?: SelectFilter[];
  onClearAll?: () => void;
  extraActions?: React.ReactNode;
  className?: string;
}

export default function FilterBar({
  searchQuery = "",
  onSearchChange,
  searchPlaceholder = "Filter records...",
  pills = [],
  activePillId,
  onPillSelect,
  selectFilters = [],
  onClearAll,
  extraActions,
  className = "",
}: FilterBarProps) {
  const hasActiveFilters = searchQuery.trim().length > 0 || (activePillId && activePillId !== "All") || selectFilters.some(sf => sf.value !== "All");

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Left: Search input & Dropdowns */}
        <div className="flex flex-wrap items-center gap-2.5 flex-1 min-w-[240px]">
          {onSearchChange && (
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full bg-white border border-stone-200 rounded-lg pl-8 pr-3 py-1.5 text-[13px] text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-500 transition"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          )}

          {selectFilters.map((sf) => (
            <select
              key={sf.id}
              value={sf.value}
              onChange={(e) => sf.onChange(e.target.value)}
              className="bg-white border border-stone-200 text-stone-700 text-[12px] font-medium rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-500 transition"
            >
              {sf.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ))}

          {onClearAll && hasActiveFilters && (
            <button
              onClick={onClearAll}
              className="text-[12px] font-medium text-stone-500 hover:text-stone-800 hover:underline px-1 py-1"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Right: Extra action buttons */}
        {extraActions && <div className="flex items-center gap-2">{extraActions}</div>}
      </div>

      {/* Filter Pills Row */}
      {pills.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {pills.map((pill) => {
            const isActive = activePillId === pill.id;
            return (
              <button
                key={pill.id}
                onClick={() => onPillSelect && onPillSelect(pill.id)}
                className={`text-[12px] font-medium px-3 py-1 rounded-full border transition ${
                  isActive
                    ? "bg-stone-900 text-white border-stone-900 shadow-2xs"
                    : "bg-white text-stone-600 border-stone-200 hover:border-stone-300 hover:bg-stone-50"
                }`}
              >
                {pill.label}
                {pill.count !== undefined && (
                  <span
                    className={`ml-1.5 text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                      isActive ? "bg-white/20 text-white" : "bg-stone-100 text-stone-500"
                    }`}
                  >
                    {pill.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
