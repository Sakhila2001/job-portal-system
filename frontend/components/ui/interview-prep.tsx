"use client";

import React from "react";
import Link from "next/link";
import { HelpCircle, ChevronRight, ArrowRight, ExternalLink } from "lucide-react";
import { interviewQuestions } from "@/lib/dummy-data";

export default function InterviewPrep() {
  return (
    <div id="prep" className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Prepare for your next interview
          </h2>
          <p className="text-sm text-muted-foreground">
            Learn from the actual interview processes of top tech firms and consultants.
          </p>
        </div>
        <Link
          href="#"
          className="text-sm font-semibold text-brand-primary hover:text-brand-hover flex items-center gap-1 group"
        >
          <span>View all guides</span>
          <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Banner Card */}
        <div className="lg:col-span-4 bg-gradient-to-br from-amber-50 to-orange-100/50 border border-amber-200 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-orange-400/10 blur-xl" />
          
          <div className="space-y-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white border border-amber-200 text-brand-secondary shadow-sm">
              <HelpCircle className="h-6 w-6" />
            </span>
            <h3 className="text-2xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Acing interviews made easier
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Unlock our premium interview kit curated by senior tech leads, recruiters, and successful candidates.
            </p>
          </div>

          <div className="my-6">
            <div className="bg-white border border-amber-200 rounded-2xl p-4 shadow-sm space-y-3">
              <div className="flex items-center gap-2">
                <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-100">
                  New
                </span>
                <span className="text-xs font-semibold text-slate-700">Interview Dashboard v2</span>
              </div>
              <div className="space-y-1">
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-secondary rounded-full" style={{ width: "70%" }} />
                </div>
                <div className="flex justify-between text-[10px] text-slate-500 font-medium">
                  <span>Profile Readiness</span>
                  <span>70%</span>
                </div>
              </div>
            </div>
          </div>

          <button className="w-full text-center text-sm font-semibold text-white bg-brand-secondary hover:bg-orange-600 py-3 rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5 shadow-brand-secondary/15">
            <span>Access Premium Kit</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Grid List of Company Qns */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {interviewQuestions.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-border p-5 rounded-2xl flex items-center justify-between gap-4 transition-all hover-lift hover:border-brand-primary/30"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 border border-slate-100 text-2xl shadow-inner">
                  {item.companyLogo}
                </span>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm leading-tight">
                    {item.companyName}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    {item.title}
                  </p>
                  <span className="inline-block text-[10px] font-semibold text-brand-primary bg-brand-light px-2 py-0.5 rounded-full mt-1.5">
                    {item.questionsCount}
                  </span>
                </div>
              </div>

              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:bg-brand-light hover:text-brand-primary transition-all border border-slate-100"
              >
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
