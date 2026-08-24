"use client";

import React, { Suspense, useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import JobCard from "@/features/jobs/components/job-card";
import FilterSidebar from "@/features/jobs/components/filter-sidebar";
import { jobs } from "@/lib/dummy-data";
import {
  Search,
  MapPin,
  Briefcase,
  SlidersHorizontal,
  RefreshCcw,
  X,
} from "lucide-react";

interface FilterState {
  workModes: string[];
  companyTypes: string[];
  departments: string[];
  locations: string[];
  jobTypes: string[];
}

function JobsListContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Read URL search params
  const initialQuery = searchParams.get("q") || "";
  const initialLoc = searchParams.get("loc") || "";
  const initialExp = searchParams.get("exp") || "";

  // Local Search Inputs
  const [searchInput, setSearchInput] = useState(initialQuery);
  const [locationInput, setLocationInput] = useState(initialLoc);
  const [experienceInput, setExperienceInput] = useState(initialExp);

  // Active filters state
  const [filters, setFilters] = useState<FilterState>({
    workModes: [],
    companyTypes: [],
    departments: [],
    locations: [],
    jobTypes: [],
  });

  // Mobile drawer state
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Derived filter options from all jobs
  const availableLocations = useMemo(() => {
    const locSet = new Set<string>();
    jobs.forEach((j) => {
      // Clean up location strings slightly (e.g., extract city name)
      const city = j.location.split("(")[0].trim();
      locSet.add(city);
    });
    return Array.from(locSet);
  }, []);

  const availableDepartments = useMemo(() => {
    const deptSet = new Set<string>();
    jobs.forEach((j) => {
      if (j.department) deptSet.add(j.department);
    });
    return Array.from(deptSet);
  }, []);

  // Filter & Search Logic
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // 1. Text Search matches title, company name, skills, or description
      const keyword = initialQuery.toLowerCase();
      if (keyword) {
        const matchesTitle = job.title.toLowerCase().includes(keyword);
        const matchesCompany = job.companyName.toLowerCase().includes(keyword);
        const matchesSkills = job.skills.some((s) =>
          s.toLowerCase().includes(keyword),
        );
        const matchesDesc = job.description.toLowerCase().includes(keyword);
        if (
          !matchesTitle &&
          !matchesCompany &&
          !matchesSkills &&
          !matchesDesc
        ) {
          return false;
        }
      }

      // 2. Location Input (from hero or top bar)
      const locSearch = initialLoc.toLowerCase();
      if (locSearch && !job.location.toLowerCase().includes(locSearch)) {
        return false;
      }

      // 3. Experience Input
      if (initialExp) {
        if (initialExp === "fresher") {
          // Look for '0 -' or '0 Yrs'
          if (!job.experience.startsWith("0")) return false;
        } else {
          // Numeric check: extract the numbers
          const jobExpMin = parseInt(job.experience.split("-")[0].trim()) || 0;
          const reqExp = parseInt(initialExp) || 0;
          if (jobExpMin > reqExp) return false;
        }
      }

      // 4. Sidebar Checkbox Filters
      if (
        filters.workModes.length > 0 &&
        !filters.workModes.includes(job.workMode)
      ) {
        return false;
      }

      if (
        filters.companyTypes.length > 0 &&
        !filters.companyTypes.includes(job.companyType)
      ) {
        return false;
      }

      if (
        filters.jobTypes.length > 0 &&
        !filters.jobTypes.includes(job.jobType)
      ) {
        return false;
      }

      if (
        filters.departments.length > 0 &&
        !filters.departments.includes(job.department)
      ) {
        return false;
      }

      if (filters.locations.length > 0) {
        const jobCity = job.location.split("(")[0].trim();
        const matchesSelectedLoc = filters.locations.some((loc) =>
          jobCity.includes(loc),
        );
        if (!matchesSelectedLoc) return false;
      }

      return true;
    });
  }, [initialQuery, initialLoc, initialExp, filters]);

  const handleTopSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchInput) params.set("q", searchInput);
    if (locationInput) params.set("loc", locationInput);
    if (experienceInput) params.set("exp", experienceInput);
    router.push(`/jobs?${params.toString()}`);
  };

  const handleReset = () => {
    setSearchInput("");
    setLocationInput("");
    setExperienceInput("");
    setFilters({
      workModes: [],
      companyTypes: [],
      departments: [],
      locations: [],
      jobTypes: [],
    });
    router.push("/jobs");
  };

  return (
    <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Search Action bar (sticky inside viewport body) */}
      <div className="bg-white border border-border shadow-sm rounded-2xl p-4">
        <form
          onSubmit={handleTopSearchSubmit}
          className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center"
        >
          {/* Input keywords */}
          <div className="md:col-span-5 flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm">
            <Search className="h-4 w-4 text-muted-foreground mr-2 shrink-0" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Skills, titles, or recruiters..."
              className="w-full bg-transparent focus:outline-none text-slate-800"
            />
          </div>

          {/* Input location */}
          <div className="md:col-span-3 flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground mr-2 shrink-0" />
            <input
              type="text"
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              placeholder="Location (city, country)..."
              className="w-full bg-transparent focus:outline-none text-slate-800"
            />
          </div>

          {/* Input experience */}
          <div className="md:col-span-2 flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm">
            <Briefcase className="h-4 w-4 text-muted-foreground mr-2 shrink-0" />
            <select
              value={experienceInput}
              onChange={(e) => setExperienceInput(e.target.value)}
              className="w-full bg-transparent focus:outline-none text-slate-800 cursor-pointer"
            >
              <option value="">Experience...</option>
              <option value="fresher">Fresher (0 Yrs)</option>
              <option value="1">1 Year</option>
              <option value="2">2 Years</option>
              <option value="3">3 Years</option>
              <option value="5">5+ Years</option>
            </select>
          </div>

          {/* Search button */}
          <button
            type="submit"
            className="md:col-span-2 w-full bg-brand-primary hover:bg-brand-hover text-white text-sm font-semibold py-2.5 rounded-xl transition-all shadow-sm"
          >
            Filter Jobs
          </button>
        </form>
      </div>

      {/* Mobile Filter Toggle Button */}
      <div className="flex md:hidden items-center justify-between">
        <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
          Showing {filteredJobs.length} jobs
        </p>
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="flex items-center gap-1.5 border border-border bg-white text-slate-700 px-4 py-2 rounded-xl text-sm font-semibold shadow-sm"
        >
          <SlidersHorizontal className="h-4 w-4" />
          <span>Refine Search</span>
        </button>
      </div>

      {/* Desktop Split View Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Sidebar Filter Panel */}
        <div className="hidden md:block md:col-span-4 lg:col-span-3 sticky top-24">
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            onClear={handleReset}
            availableLocations={availableLocations}
            availableDepartments={availableDepartments}
          />
        </div>

        {/* Job Listings Panel */}
        <div className="col-span-12 md:col-span-8 lg:col-span-9 space-y-4">
          {/* Header info */}
          <div className="hidden md:flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
              Available Positions ({filteredJobs.length})
            </h2>
            <div className="text-xs text-muted-foreground">
              Sort by:{" "}
              <span className="font-bold text-slate-700">Relevance</span>
            </div>
          </div>

          {/* Render Job List */}
          {filteredJobs.length > 0 ? (
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} layout="list" />
              ))}
            </div>
          ) : (
            /* Empty state details */
            <div className="bg-white border border-border rounded-3xl p-12 text-center max-w-lg mx-auto space-y-4 shadow-sm">
              <span className="text-4xl">🔍</span>
              <h3 className="text-lg font-bold text-slate-900">
                No jobs match your search
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We couldn&apos;t find any job openings matching your current
                selection. Try broadening your keywords, choosing different
                locations, or resetting your filter sidebar.
              </p>
              <button
                onClick={handleReset}
                className="bg-brand-primary hover:bg-brand-hover text-white text-sm font-semibold px-6 py-2.5 rounded-xl shadow-sm inline-flex items-center gap-1.5"
              >
                <RefreshCcw className="h-4 w-4" />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Sidebar overlay */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 md:hidden">
          <div className="w-80 h-full bg-white p-6 overflow-y-auto relative animate-in slide-in-from-right duration-200">
            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="absolute right-4 top-4 p-2 bg-slate-50 border border-slate-100 rounded-xl text-slate-400"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="pt-6">
              <FilterSidebar
                filters={filters}
                setFilters={setFilters}
                onClear={handleReset}
                availableLocations={availableLocations}
                availableDepartments={availableDepartments}
              />
            </div>

            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="w-full bg-brand-primary text-white text-sm font-semibold py-3 rounded-xl mt-6"
            >
              Apply Refinements
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default function JobsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center bg-slate-50 text-slate-600">
          <div className="flex flex-col items-center gap-2">
            <svg
              className="animate-spin h-8 w-8 text-slate-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            <span className="text-sm font-semibold text-slate-500">
              Loading Job Listings...
            </span>
          </div>
        </div>
      }
    >
      <JobsListContent />
    </Suspense>
  );
}
