"use client";

import React from "react";
import { Filter, X, RefreshCw } from "lucide-react";

interface FilterState {
  workModes: string[];
  companyTypes: string[];
  departments: string[];
  locations: string[];
  jobTypes: string[];
}

interface FilterSidebarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  onClear: () => void;
  availableLocations: string[];
  availableDepartments: string[];
}

export default function FilterSidebar({
  filters,
  setFilters,
  onClear,
  availableLocations,
  availableDepartments
}: FilterSidebarProps) {
  
  const handleCheckboxChange = (
    category: keyof FilterState,
    value: string,
    checked: boolean
  ) => {
    setFilters((prev) => {
      const currentList = prev[category] as string[];
      const newList = checked
        ? [...currentList, value]
        : currentList.filter((item) => item !== value);
      
      return {
        ...prev,
        [category]: newList
      };
    });
  };

  const workModeOptions = ["Work from office", "Hybrid", "Remote"];
  const companyTypeOptions = ["MNC", "Startup", "Corporate", "Indian MNC"];
  const jobTypeOptions = ["Full Time", "Internship", "Contract"];

  return (
    <aside className="w-full bg-white border border-border rounded-3xl p-6 space-y-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-brand-primary" />
          <h3 className="font-bold text-slate-800 text-sm">Filters</h3>
        </div>
        <button
          onClick={onClear}
          className="text-xs font-semibold text-brand-primary hover:text-brand-hover flex items-center gap-1 transition-all"
        >
          <RefreshCw className="h-3 w-3" />
          <span>Reset all</span>
        </button>
      </div>

      {/* Filter Section: Work Mode */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Work Mode</h4>
        <div className="space-y-2">
          {workModeOptions.map((mode) => (
            <label key={mode} className="flex items-center gap-2.5 text-sm text-slate-600 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={filters.workModes.includes(mode)}
                onChange={(e) => handleCheckboxChange("workModes", mode, e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-brand-primary focus:ring-brand-primary/20 accent-brand-primary cursor-pointer"
              />
              <span>{mode}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Filter Section: Department */}
      <div className="space-y-3 border-t border-slate-50 pt-5">
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Department</h4>
        <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
          {availableDepartments.map((dept) => (
            <label key={dept} className="flex items-center gap-2.5 text-sm text-slate-600 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={filters.departments.includes(dept)}
                onChange={(e) => handleCheckboxChange("departments", dept, e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-brand-primary focus:ring-brand-primary/20 accent-brand-primary cursor-pointer"
              />
              <span className="line-clamp-1">{dept}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Filter Section: Job Type */}
      <div className="space-y-3 border-t border-slate-50 pt-5">
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Job Type</h4>
        <div className="space-y-2">
          {jobTypeOptions.map((type) => (
            <label key={type} className="flex items-center gap-2.5 text-sm text-slate-600 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={filters.jobTypes.includes(type)}
                onChange={(e) => handleCheckboxChange("jobTypes", type, e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-brand-primary focus:ring-brand-primary/20 accent-brand-primary cursor-pointer"
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Filter Section: Company Type */}
      <div className="space-y-3 border-t border-slate-50 pt-5">
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Company Type</h4>
        <div className="space-y-2">
          {companyTypeOptions.map((type) => (
            <label key={type} className="flex items-center gap-2.5 text-sm text-slate-600 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={filters.companyTypes.includes(type)}
                onChange={(e) => handleCheckboxChange("companyTypes", type, e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-brand-primary focus:ring-brand-primary/20 accent-brand-primary cursor-pointer"
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Filter Section: Locations */}
      <div className="space-y-3 border-t border-slate-50 pt-5">
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Location</h4>
        <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
          {availableLocations.map((loc) => (
            <label key={loc} className="flex items-center gap-2.5 text-sm text-slate-600 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={filters.locations.includes(loc)}
                onChange={(e) => handleCheckboxChange("locations", loc, e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-brand-primary focus:ring-brand-primary/20 accent-brand-primary cursor-pointer"
              />
              <span className="line-clamp-1">{loc}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
