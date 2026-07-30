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
  ArrowRight, 
  Sparkles,
  CheckCircle2
} from "lucide-react";

export default function RoleExplorer() {
  const router = useRouter();

  const rolesData = [
    {
      title: "Full Stack Developer",
      jobsCount: "25.4K+ Jobs",
      icon: Laptop,
      color: "bg-blue-50 text-blue-600 border-blue-100",
      accent: "blue"
    },
    {
      title: "Front End Developer",
      jobsCount: "14.2K+ Jobs",
      icon: Paintbrush,
      color: "bg-purple-50 text-purple-600 border-purple-100",
      accent: "purple"
    },
    {
      title: "Tech Lead",
      jobsCount: "5.8K+ Jobs",
      icon: Zap,
      color: "bg-amber-50 text-amber-600 border-amber-100",
      accent: "amber"
    },
    {
      title: "Technical Architect",
      jobsCount: "1.2K+ Jobs",
      icon: Layers,
      color: "bg-rose-50 text-rose-600 border-rose-100",
      accent: "rose"
    },
    {
      title: "Business Analyst",
      jobsCount: "9.5K+ Jobs",
      icon: BarChart3,
      color: "bg-emerald-50 text-emerald-600 border-emerald-100",
      accent: "emerald"
    },
    {
      title: "Functional Consultant",
      jobsCount: "3.4K+ Jobs",
      icon: Users,
      color: "bg-indigo-50 text-indigo-600 border-indigo-100",
      accent: "indigo"
    }
  ];

  const handleRoleSelect = (roleTitle: string) => {
    router.push(`/jobs?q=${encodeURIComponent(roleTitle)}`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      {/* Left Promo Card: Redesigned with premium dark theme and AI Matcher graphic */}
      <div className="lg:col-span-4 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-white rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden shadow-xl border border-slate-800">
        {/* Glowing visual indicators */}
        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-purple-500/10 blur-2xl" />

        <div className="space-y-4 relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-blue-500/10 text-blue-300 text-xs font-bold px-3 py-1 rounded-full border border-blue-500/25">
            <Sparkles className="h-3.5 w-3.5" />
            <span>AI Match Enabled</span>
          </div>
          
          <h3 className="text-2xl font-extrabold tracking-tight leading-snug">
            Discover jobs across popular roles
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Select a career path that matches your tech stack, and let our recommendation engine find matching roles.
          </p>
        </div>

        {/* REDESIGNED AI PROFILE MATCHING GRAPHIC */}
        <div className="my-8 relative flex justify-center items-center z-10">
          <div className="w-full max-w-[240px] bg-slate-850/50 border border-slate-700/60 rounded-2xl p-4 space-y-3.5 shadow-2xl backdrop-blur-md">
            
            {/* Visual Radar Indicator */}
            <div className="flex items-center justify-between border-b border-slate-750 pb-2">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] font-bold text-slate-300 tracking-wide uppercase">AI Matcher</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">
                94% Match
              </span>
            </div>

            {/* Profile Avatar and Progress bar */}
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="h-7 w-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs border border-blue-500/30">
                  JS
                </div>
                <div className="flex-1 min-w-0">
                  <div className="h-2 w-20 bg-slate-700 rounded-full" />
                  <div className="h-1.5 w-14 bg-slate-700 rounded-full mt-1.5" />
                </div>
              </div>
              
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" style={{ width: "94%" }} />
              </div>
            </div>

            {/* Float tags */}
            <div className="flex flex-wrap gap-1">
              <span className="bg-slate-800 border border-slate-750 text-[9px] text-slate-300 px-2 py-0.5 rounded-md">Next.js</span>
              <span className="bg-slate-800 border border-slate-750 text-[9px] text-slate-300 px-2 py-0.5 rounded-md">TypeScript</span>
              <span className="bg-slate-800 border border-slate-750 text-[9px] text-slate-300 px-2 py-0.5 rounded-md">Tailwind</span>
            </div>
            
          </div>
        </div>

        {/* Explore All Roles Button */}
        <button
          onClick={() => router.push("/jobs")}
          className="w-full bg-brand-primary hover:bg-brand-hover text-white text-xs font-bold py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-1.5 group/btn"
        >
          <span>Explore All Roles</span>
          <ArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Right Grid of Roles: Redesigned with custom colored circular icon badges */}
      <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {rolesData.map((role) => {
          const IconComponent = role.icon;
          return (
            <button
              key={role.title}
              onClick={() => handleRoleSelect(role.title)}
              className="group bg-white border border-border p-6 rounded-2xl text-left flex flex-col justify-between gap-6 transition-all hover-lift hover:border-brand-primary/20"
            >
              <div className="space-y-4">
                {/* Icon Container with subtle colored borders */}
                <span className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${role.color} shadow-sm group-hover:scale-105 transition-transform`}>
                  <IconComponent className="h-5 w-5" />
                </span>
                
                <div>
                  <h4 className="font-extrabold text-slate-800 text-sm group-hover:text-brand-primary transition-colors leading-tight">
                    {role.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1 font-medium">{role.jobsCount}</p>
                </div>
              </div>
              
              {/* Arrow link trigger at bottom */}
              <div className="flex items-center justify-end border-t border-slate-50 pt-3 mt-auto">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-50 text-slate-400 group-hover:bg-brand-light group-hover:text-brand-primary transition-all">
                  <ChevronRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
