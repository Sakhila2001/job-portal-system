"use client";

import React from "react";
import Link from "next/link";
import { HelpCircle, ChevronRight, ArrowRight, Globe, ShoppingBag, Cpu, BarChart2, Package, Compass } from "lucide-react";
import { interviewQuestions } from "@/lib/dummy-data";

// Map company names to neutral Lucide icons so we eliminate colorful emojis
const companyIconMap: Record<string, React.ElementType> = {
  TCS: Globe,
  Flipkart: ShoppingBag,
  Cognizant: Cpu,
  Wipro: BarChart2,
  Amazon: Package,
  Accenture: Compass,
};

export default function InterviewPrep() {
  return (
    <div id="prep" className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Prepare for your next interview
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Learn from the actual interview processes of top tech firms and consultants.
          </p>
        </div>
        <Link
          href="#"
          className="text-sm font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 group shrink-0"
        >
          <span>View all guides</span>
          <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Banner Card — flat neutral */}
        <div className="lg:col-span-4 bg-slate-50 border border-slate-100 rounded-xl p-7 flex flex-col justify-between">
          
          <div className="space-y-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-600 shadow-xs">
              <HelpCircle className="h-5 w-5" strokeWidth={1.75} />
            </span>
            <h3 className="text-xl font-bold tracking-tight text-slate-900 leading-tight">
              Acing interviews made easier
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Unlock our premium interview kit curated by senior tech leads, recruiters, and successful candidates.
            </p>
          </div>

          <div className="my-6">
            <div className="bg-white border border-slate-100 rounded-lg p-4 shadow-xs space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Interview Dashboard</span>
                <span className="text-[10px] font-bold text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded">v2</span>
              </div>
              <div className="space-y-1.5">
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-900 rounded-full" style={{ width: "70%" }} />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                  <span>Profile Readiness</span>
                  <span>70%</span>
                </div>
              </div>
            </div>
          </div>

          <button className="w-full text-center text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 py-2.5 rounded-lg shadow-xs transition-all flex items-center justify-center gap-1.5">
            <span>Access Premium Kit</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Grid List of Company Questions */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {interviewQuestions.map((item) => {
            const IconComponent = companyIconMap[item.companyName] ?? Globe;
            return (
              <div
                key={item.id}
                className="bg-white border border-slate-100 p-4 rounded-lg flex items-center justify-between gap-3 transition-all hover:border-slate-200 hover:shadow-xs group"
              >
                <div className="flex items-center gap-3">
                  {/* Neutral SVG icon wrapper — no colorful emojis */}
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 border border-slate-100 text-slate-500 shrink-0 group-hover:bg-slate-100 transition-colors">
                    <IconComponent className="h-4.5 w-4.5" strokeWidth={1.75} />
                  </span>
                  <div>
                    <h4 className="font-semibold text-slate-800 text-sm leading-tight">
                      {item.companyName}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {item.title}
                    </p>
                    <span className="inline-block text-[10px] font-medium text-slate-400 mt-0.5">
                      {item.questionsCount}
                    </span>
                  </div>
                </div>

                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-50 text-slate-400 group-hover:bg-slate-100 transition-colors border border-slate-100 shrink-0">
                  <ChevronRight className="h-3.5 w-3.5" />
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
