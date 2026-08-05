"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { 
  Laptop, 
  Paintbrush, 
  Zap, 
  Layers, 
  BarChart3, 
  Users, 
  ChevronRight, 
  ArrowRight
} from "lucide-react";

export default function RoleExplorer() {
  const router = useRouter();

  const rolesData = [
    { title: "Full Stack Developer", jobsCount: "25.4K+ Jobs", icon: Laptop },
    { title: "Front End Developer",  jobsCount: "14.2K+ Jobs", icon: Paintbrush },
    { title: "Tech Lead",            jobsCount: "5.8K+ Jobs",  icon: Zap },
    { title: "Technical Architect",  jobsCount: "1.2K+ Jobs",  icon: Layers },
    { title: "Business Analyst",     jobsCount: "9.5K+ Jobs",  icon: BarChart3 },
    { title: "Functional Consultant",jobsCount: "3.4K+ Jobs",  icon: Users }
  ];

  const handleRoleSelect = (roleTitle: string) => {
    router.push(`/jobs?q=${encodeURIComponent(roleTitle)}`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      {/* Left Promo Card — flat, clean, no gradients or glows */}
      <div className="lg:col-span-4 bg-slate-50 rounded-xl p-7 flex flex-col justify-between border border-slate-100">

        <div className="space-y-3">
          {/* Simple label — no bold badge */}
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            AI-Powered Matching
          </p>
          <h3 className="text-xl font-bold tracking-tight leading-snug text-slate-900">
            Discover jobs across popular roles
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            Select a career path that matches your tech stack, and let our recommendation engine find matching roles.
          </p>
        </div>

        {/* Simplified AI Matcher Graphic */}
        <div className="my-6">
          <div className="w-full bg-white border border-slate-100 rounded-lg p-4 space-y-4 shadow-xs">
            
            {/* Status row */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-50">
              <div className="flex items-center gap-2">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">AI Matcher</span>
              </div>
              <span className="text-[10px] text-slate-600 font-semibold">
                94% match
              </span>
            </div>

            {/* Profile row */}
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-md bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
                JS
              </div>
              <div className="flex-1 min-w-0 space-y-1.5">
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-900 rounded-full" style={{ width: "94%" }} />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                  <span>Profile match</span>
                  <span>94%</span>
                </div>
              </div>
            </div>

            {/* Skill tags */}
            <div className="flex flex-wrap gap-1.5">
              {["Next.js", "TypeScript", "Tailwind"].map((tag) => (
                <span key={tag} className="bg-slate-50 border border-slate-100 text-[9px] text-slate-500 font-medium px-2 py-0.5 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => router.push("/jobs")}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-1.5 group/btn shadow-xs"
        >
          <span>Explore All Roles</span>
          <ArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Right Grid of Roles — unified neutral icon wrappers */}
      <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {rolesData.map((role) => {
          const IconComponent = role.icon;
          return (
            <button
              key={role.title}
              onClick={() => handleRoleSelect(role.title)}
              className="group bg-white border border-slate-100 p-5 rounded-lg text-left flex flex-col justify-between transition-all hover:border-slate-300 hover:shadow-xs"
            >
              <div className="space-y-4 w-full">
                {/* Icon — unified neutral wrapper for all roles */}
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 border border-slate-100 text-slate-600 group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all">
                    <IconComponent className="h-4 w-4" strokeWidth={1.75} />
                  </span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-slate-50 text-slate-400 group-hover:bg-slate-100 transition-all">
                    <ChevronRight className="h-3.5 w-3.5" />
                  </span>
                </div>
                
                <div>
                  <h4 className="font-semibold text-slate-800 text-sm group-hover:text-slate-900 transition-colors leading-snug">
                    {role.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5 font-medium">{role.jobsCount}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
