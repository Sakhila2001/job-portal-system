"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Briefcase } from "lucide-react";
import { popularCategories } from "@/lib/dummy-data";
import CustomSelect from "@/components/ui/select";

const experienceOptions = [
  { value: "", label: "Select experience" },
  { value: "fresher", label: "Fresher (0 Yrs)" },
  { value: "1", label: "1 Year" },
  { value: "2", label: "2 Years" },
  { value: "3", label: "3 Years" },
  { value: "5", label: "5+ Years" },
];

export default function Hero() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (location) params.set("loc", location);
    if (experience) params.set("exp", experience);
    router.push(`/jobs?${params.toString()}`);
  };

  const handleCategoryClick = (categoryName: string) => {
    router.push(`/jobs?q=${encodeURIComponent(categoryName)}`);
  };

  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
        {/* Title */}
        <div className="space-y-4 max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Find your <span className="text-slate-900 font-extrabold underline decoration-brand-primary decoration-4 underline-offset-8">dream job</span> now
          </h1>
          <p className="text-base text-slate-500 sm:text-lg max-w-2xl mx-auto">
            5 Lakh+ jobs from top companies around the world. Your next big career move starts here.
          </p>
        </div>

        {/* Search Bar Form */}
        <form
          onSubmit={handleSearch}
          className="mx-auto max-w-4xl bg-white border border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.03)] rounded-xl p-2 flex flex-col md:flex-row items-center gap-2 md:gap-0"
        >
          {/* Keywords search */}
          <div className="flex items-center flex-1 w-full px-4 border-b md:border-b-0 md:border-r border-slate-100 py-2">
            <Search className="h-4.5 w-4.5 text-slate-400 mr-2.5 shrink-0" />
            <input
              type="text"
              placeholder="Enter skills / designations / companies"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
            />
          </div>

          {/* Experience Select */}
          <div className="flex items-center w-full md:w-52 px-4 border-b md:border-b-0 md:border-r border-slate-100 py-2">
            <CustomSelect
              value={experience}
              onChange={setExperience}
              options={experienceOptions}
              placeholder="Select experience"
              icon={<Briefcase className="h-4.5 w-4.5 text-slate-400 shrink-0" />}
            />
          </div>

          {/* Location search */}
          <div className="flex items-center w-full md:w-60 px-4 py-2">
            <MapPin className="h-4.5 w-4.5 text-slate-400 mr-2.5 shrink-0" />
            <input
              type="text"
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
            />
          </div>

          {/* Search Action */}
          <button
            type="submit"
            className="w-full md:w-auto bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 shrink-0 shadow-sm"
          >
            <span>Search</span>
          </button>
        </form>

        {/* Popular Categories */}
        <div className="space-y-3 pt-4">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
            Popular searches
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
            {popularCategories.map((category) => (
              <button
                key={category.name}
                type="button"
                onClick={() => handleCategoryClick(category.name)}
                className="flex items-center gap-1.5 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-100 rounded-lg px-3 py-1.5 text-xs font-medium transition-all shadow-xs"
              >
                <span className="opacity-80">{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
