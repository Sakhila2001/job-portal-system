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
  let svgContent = null;
  if (name === "Schneider Electric") {
    svgContent = (
      <svg className="h-5 w-5 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    );
  } else if (name === "JPMorgan Chase") {
    svgContent = (
      <svg className="h-5 w-5 text-slate-600" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    );
  } else if (name === "Coforge") {
    svgContent = (
      <svg className="h-5 w-5 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="m8 3 4 8 5-5M4 15h16M8 21l8-8" />
      </svg>
    );
  } else if (name === "Infosys") {
    svgContent = (
      <svg className="h-5 w-5 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m5 12 7-7 7 7M5 19l7-7 7 7" />
      </svg>
    );
  } else if (name === "Energizer") {
    svgContent = (
      <svg className="h-5 w-5 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    );
  } else if (name === "TCS") {
    svgContent = (
      <svg className="h-5 w-5 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10zM2 12h20" />
      </svg>
    );
  } else if (name === "Google") {
    svgContent = (
      <svg className="h-5 w-5 text-slate-600" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.184 4.114-3.415 0-6.19-2.775-6.19-6.19 0-3.414 2.775-6.189 6.19-6.189 1.492 0 2.856.541 3.926 1.43l3.02-3.02C18.847 1.832 15.753.86 12.24.86c-6.16 0-11.14 4.98-11.14 11.14 0 6.161 4.98 11.14 11.14 11.14 5.928 0 10.875-4.27 10.875-10.875 0-.712-.086-1.396-.23-2.072H12.24z" />
      </svg>
    );
  } else if (name === "Pfizer") {
    svgContent = (
      <svg className="h-5 w-5 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2.5 3.19-2.5 5.5h20c0-2.31-1-4.24-2.5-5.5" />
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
      </svg>
    );
  } else if (name === "Toyota") {
    svgContent = (
      <svg className="h-5 w-5 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="12" rx="10" ry="5" />
        <ellipse cx="12" cy="12" rx="4" ry="10" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  } else {
    // Standard Chartered & Fallback
    svgContent = (
      <svg className="h-5 w-5 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3h18v18H3zM21 9H3M21 15H3M12 3v18" />
      </svg>
    );
  }

  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-50 border border-slate-100 shadow-xs shrink-0">
      {svgContent}
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
    <div className="space-y-6">
      {/* Title block */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Featured companies actively hiring
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Explore direct career opportunities at top enterprises and fast-growing startups.
          </p>
        </div>
        <Link
          href="/jobs"
          className="text-sm font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 group shrink-0"
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
              className={`rounded-lg px-4.5 py-2 text-xs font-semibold border transition-all shrink-0 cursor-pointer ${
                isActive
                  ? "bg-slate-900 text-white border-slate-900 shadow-xs"
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {filteredCompanies.map((company) => (
          <div
            key={company.name}
            className="bg-white border border-slate-100/90 p-5 rounded-lg flex flex-col justify-between gap-4 text-center transition-all hover:border-slate-300 hover:shadow-xs"
          >
            <div className="space-y-3">
              {/* Logo */}
              <div className="mx-auto flex justify-center">
                <CompanyLogo name={company.name} />
              </div>

              <div>
                <h3 className="font-semibold text-slate-800 text-sm leading-snug line-clamp-1">
                  {company.name}
                </h3>
                {/* Rating */}
                <div className="flex items-center justify-center gap-1.5 mt-1 text-xs text-slate-400">
                  <span className="flex items-center gap-0.5 text-slate-700 font-medium">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400 mr-0.5" />
                    {company.rating}
                  </span>
                  <span>•</span>
                  <span>{company.reviews}</span>
                </div>
              </div>

              <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed">
                {company.desc}
              </p>
            </div>

            {/* Link button */}
            <Link
              href={`/jobs?q=${encodeURIComponent(company.name)}`}
              className="w-full text-center text-xs font-semibold bg-slate-50 text-slate-700 hover:bg-slate-900 hover:text-white py-2 rounded-lg transition-all"
            >
              View jobs
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
