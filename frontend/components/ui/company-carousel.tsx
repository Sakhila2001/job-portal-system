"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Star, ChevronRight, Check } from "lucide-react";

// Company with category details
interface CompanyData {
  name: string;
  category: string;
  rating: number;
  reviews: string;
  desc: string;
  link: string;
}

const companiesList: CompanyData[] = [
  {
    name: "Schneider Electric",
    category: "Manufacturing & Production",
    rating: 4.1,
    reviews: "4.5k+ reviews",
    desc: "Global specialist in energy management and automation solutions.",
    link: "#"
  },
  {
    name: "JPMorgan Chase",
    category: "BFSI",
    rating: 4.2,
    reviews: "12k+ reviews",
    desc: "Leading global financial services firm offering investment and asset banking.",
    link: "#"
  },
  {
    name: "Coforge",
    category: "IT Services",
    rating: 4.0,
    reviews: "3.2k+ reviews",
    desc: "Leading global digital services integrator transforming enterprises.",
    link: "#"
  },
  {
    name: "Infosys",
    category: "Technology",
    rating: 3.8,
    reviews: "18k+ reviews",
    desc: "Next-generation digital consulting, engineering, and cloud services.",
    link: "#"
  },
  {
    name: "Energizer",
    category: "Infrastructure, Transport & Real Estate",
    rating: 4.5,
    reviews: "649 reviews",
    desc: "Sustainable energy solutions and household battery systems maker.",
    link: "#"
  },
  {
    name: "TCS",
    category: "IT Services",
    rating: 3.9,
    reviews: "25k+ reviews",
    desc: "Global consulting and enterprise IT services partner to Fortune 500s.",
    link: "#"
  },
  {
    name: "Google",
    category: "Technology",
    rating: 4.7,
    reviews: "15k+ reviews",
    desc: "Organizing the world's information and building future tech tools.",
    link: "#"
  },
  {
    name: "Pfizer",
    category: "Healthcare & Life Sciences",
    rating: 4.2,
    reviews: "3.1k+ reviews",
    desc: "Biopharmaceutical pioneer developing life-saving vaccines and cures.",
    link: "#"
  },
  {
    name: "Toyota",
    category: "Manufacturing & Production",
    rating: 4.3,
    reviews: "5.6k+ reviews",
    desc: "Pioneering hybrid and electrical automobile manufacturing globally.",
    link: "#"
  },
  {
    name: "Standard Chartered",
    category: "BFSI",
    rating: 4.1,
    reviews: "8k+ reviews",
    desc: "International banking and financial services operating in growth markets.",
    link: "#"
  }
];

const categories = [
  "All",
  "IT Services",
  "Technology",
  "Healthcare & Life Sciences",
  "Manufacturing & Production",
  "Infrastructure, Transport & Real Estate",
  "BFSI"
];

// Helper to render high-quality SVGs for each company logo
function CompanyLogo({ name }: { name: string }) {
  if (name === "Schneider Electric") {
    return (
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 border border-emerald-100/60 shadow-sm shrink-0">
        <svg className="h-6 w-6 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      </div>
    );
  }
  if (name === "JPMorgan Chase") {
    return (
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white border border-slate-950 shadow-sm shrink-0">
        <svg className="h-6 w-6 text-indigo-400" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
      </div>
    );
  }
  if (name === "Coforge") {
    return (
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 border border-rose-100/60 shadow-sm shrink-0">
        <svg className="h-6 w-6 text-rose-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m8 3 4 8 5-5M4 15h16M8 21l8-8" />
        </svg>
      </div>
    );
  }
  if (name === "Infosys") {
    return (
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white border border-blue-700 shadow-sm shrink-0">
        <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="m5 12 7-7 7 7M5 19l7-7 7 7" />
        </svg>
      </div>
    );
  }
  if (name === "Energizer") {
    return (
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 border border-amber-100/60 shadow-sm shrink-0">
        <svg className="h-6 w-6 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      </div>
    );
  }
  if (name === "TCS") {
    return (
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 border border-sky-100/60 shadow-sm shrink-0">
        <svg className="h-6 w-6 text-sky-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10zM2 12h20" />
        </svg>
      </div>
    );
  }
  if (name === "Google") {
    return (
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 border border-red-100/60 shadow-sm shrink-0">
        <svg className="h-6 w-6 text-red-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.184 4.114-3.415 0-6.19-2.775-6.19-6.19 0-3.414 2.775-6.189 6.19-6.189 1.492 0 2.856.541 3.926 1.43l3.02-3.02C18.847 1.832 15.753.86 12.24.86c-6.16 0-11.14 4.98-11.14 11.14 0 6.161 4.98 11.14 11.14 11.14 5.928 0 10.875-4.27 10.875-10.875 0-.712-.086-1.396-.23-2.072H12.24z" />
        </svg>
      </div>
    );
  }
  if (name === "Pfizer") {
    return (
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 border border-indigo-100/60 shadow-sm shrink-0">
        <svg className="h-6 w-6 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.5 16.5c-1.5 1.26-2.5 3.19-2.5 5.5h20c0-2.31-1-4.24-2.5-5.5" />
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
        </svg>
      </div>
    );
  }
  if (name === "Toyota") {
    return (
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 border border-slate-200 shadow-sm shrink-0">
        <svg className="h-6 w-6 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="12" rx="10" ry="5" />
          <ellipse cx="12" cy="12" rx="4" ry="10" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </div>
    );
  }
  // Standard Chartered & Fallback
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white border border-emerald-700 shadow-sm shrink-0">
      <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3h18v18H3zM21 9H3M21 15H3M12 3v18" />
      </svg>
    </div>
  );
}

export default function CompanyCarousel() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter list based on category
  const filteredCompanies = useMemo(() => {
    if (selectedCategory === "All") return companiesList;
    return companiesList.filter((comp) => comp.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="space-y-8">
      {/* Title block */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Featured companies actively hiring
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Explore direct career opportunities at top enterprises and fast-growing startups.
          </p>
        </div>
        <Link
          href="/jobs"
          className="text-sm font-semibold text-brand-primary hover:text-brand-hover flex items-center gap-1 group shrink-0"
        >
          <span>View all companies</span>
          <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Category selector row */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 md:mx-0 md:px-0">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-4.5 py-2 text-xs font-semibold border transition-all shrink-0 cursor-pointer ${
                isActive
                  ? "bg-slate-100 text-brand-primary border-slate-200 shadow-xs"
                  : "bg-white text-slate-500 border-slate-100 hover:text-slate-800 hover:border-slate-200"
              }`}
            >
              {cat}
            </button>
          );
        })}
        <span className="text-[11px] font-bold text-slate-400 pl-1 shrink-0">+4 more</span>
      </div>

      {/* Grid of companies */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {filteredCompanies.map((company) => (
          <div
            key={company.name}
            className="bg-white border border-slate-100/90 p-5 rounded-2xl flex flex-col justify-between gap-4 text-center transition-all hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.03)] hover:border-brand-primary/25 hover:-translate-y-0.5"
          >
            <div className="space-y-3.5">
              {/* Logo / Badge */}
              <div className="mx-auto flex justify-center">
                <CompanyLogo name={company.name} />
              </div>

              <div>
                <h3 className="font-bold text-slate-800 text-sm leading-snug line-clamp-1 group-hover:text-brand-primary">
                  {company.name}
                </h3>
                {/* Rating */}
                <div className="flex items-center justify-center gap-1.5 mt-1 text-[11px] text-slate-400">
                  <span className="flex items-center gap-0.5 text-amber-500 font-bold bg-amber-50 px-1.5 py-0.5 rounded border border-amber-100/50">
                    <Star className="h-2.5 w-2.5 fill-amber-500" />
                    {company.rating}
                  </span>
                  <span className="font-semibold">{company.reviews}</span>
                </div>
              </div>

              <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed">
                {company.desc}
              </p>
            </div>

            {/* Link button */}
            <Link
              href={`/jobs?q=${encodeURIComponent(company.name)}`}
              className="w-full text-center text-xs font-bold bg-slate-50 text-brand-primary hover:bg-brand-primary hover:text-white py-2.5 rounded-xl transition-all"
            >
              View jobs
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
