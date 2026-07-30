"use client";

import React from "react";
import Link from "next/link";
import { Star, ChevronRight } from "lucide-react";
import { featuredCompanies } from "@/lib/dummy-data";

export default function CompanyCarousel() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Featured companies actively hiring
          </h2>
          <p className="text-sm text-muted-foreground">
            Explore direct career opportunities at top enterprises and fast-growing startups.
          </p>
        </div>
        <Link
          href="/jobs"
          className="text-sm font-semibold text-brand-primary hover:text-brand-hover flex items-center gap-1 group"
        >
          <span>View all companies</span>
          <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Grid of companies */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {featuredCompanies.map((company) => (
          <div
            key={company.name}
            className="bg-white border border-border p-5 rounded-2xl flex flex-col justify-between gap-4 text-center transition-all hover-lift hover:border-brand-primary/30"
          >
            <div className="space-y-3">
              {/* Logo / Badge */}
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 border border-slate-100 text-3xl shadow-inner">
                {company.logo}
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-sm leading-snug line-clamp-1">
                  {company.name}
                </h3>
                {/* Rating */}
                <div className="flex items-center justify-center gap-1 text-[11px] text-slate-500 mt-1">
                  <span className="flex items-center gap-0.5 text-amber-500 font-semibold bg-amber-50 px-1 py-0.5 rounded">
                    <Star className="h-2.5 w-2.5 fill-amber-500" />
                    {company.rating}
                  </span>
                  <span>({company.reviews})</span>
                </div>
              </div>

              <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed">
                {company.desc}
              </p>
            </div>

            {/* Link button */}
            <Link
              href={`/jobs?q=${encodeURIComponent(company.name)}`}
              className="w-full text-center text-xs font-semibold bg-brand-light text-brand-primary hover:bg-brand-primary hover:text-white py-2 rounded-xl transition-all"
            >
              View jobs
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
