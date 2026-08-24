"use client";

import React, { useState } from "react";
import { Check, X, AlertTriangle, MapPin, Briefcase, DollarSign, Award, Target } from "lucide-react";

interface JobMatchDetail {
  jobId: string;
  jobTitle: string;
  companyName: string;
  overallMatch: number;
  matchedSkills: string[];
  missingSkills: string[];
  salaryMatch: { candidate: number; jobMin: number; jobMax: number; match: boolean };
  locationMatch: boolean;
  experienceMatch: boolean;
  experienceNote: string;
}

interface Props {
  matches: JobMatchDetail[];
}

export default function JobMatchExplainer({ matches }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  
  if (!matches || matches.length === 0) return null;

  const match = matches[activeIndex];

  return (
    <div className="bg-white border border-slate-100 rounded-2xl shadow-md overflow-hidden transition-all duration-200">
      {/* Sleek Submenu Header */}
      <div className="border-b border-slate-100 p-5 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-[15px] font-bold text-slate-900 flex items-center gap-1.5">
            <Target className="w-4 h-4 text-slate-900" />
            Resume Match Analysis
          </h2>
          <p className="text-[12px] text-slate-500 mt-0.5">See how well your profile details match requirements</p>
        </div>
        
        {/* Toggle list */}
        <div className="flex gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {matches.map((m, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={m.jobId}
                onClick={() => setActiveIndex(idx)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                {m.companyName}
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Circular Indicator & Header info */}
          <div className="flex flex-col items-center justify-center lg:w-1/3 border-b lg:border-b-0 lg:border-r border-slate-100 pb-6 lg:pb-0 lg:pr-8 w-full">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 font-mono mb-2">Overall Match Rating</span>
            
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="44" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  fill="none"
                  stroke={match.overallMatch >= 90 ? "#10b981" : match.overallMatch >= 80 ? "#3b82f6" : "#f59e0b"}
                  strokeWidth="8"
                  strokeDasharray={`${(match.overallMatch / 100) * 276} 276`}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-3xl font-extrabold text-slate-900 font-mono">{match.overallMatch}%</span>
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Compatible</span>
              </div>
            </div>

            <div className="text-center mt-5">
              <h3 className="text-[14px] font-bold text-slate-900 leading-tight">{match.jobTitle}</h3>
              <p className="text-[12px] font-medium text-slate-500 mt-1">{match.companyName}</p>
            </div>
          </div>

          {/* Details Breakdown */}
          <div className="lg:w-2/3 space-y-6 w-full text-[12px]">
            {/* Skills match */}
            <div>
              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 font-mono">Skills Match Overview</h4>
              
              <div className="space-y-3">
                {/* Matched skills */}
                <div>
                  <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md mb-2 inline-block">Matched Skills ({match.matchedSkills.length})</span>
                  <div className="flex flex-wrap gap-1.5">
                    {match.matchedSkills.map((s) => (
                      <span key={s} className="px-2.5 py-1 bg-slate-50 text-slate-800 border border-slate-100 rounded-lg font-medium flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Missing skills */}
                {match.missingSkills.length > 0 && (
                  <div>
                    <span className="text-[10px] text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-md mb-2 inline-block">Missing / Requested Skills ({match.missingSkills.length})</span>
                    <div className="flex flex-wrap gap-1.5">
                      {match.missingSkills.map((s) => (
                        <span key={s} className="px-2.5 py-1 bg-red-50/50 text-slate-700 border border-red-100/60 rounded-lg font-medium flex items-center gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-rose-400 shrink-0"></span>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Other Matches Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Experience Match */}
              <div className="p-3.5 rounded-xl bg-slate-50/50 border border-slate-100/60 flex items-start gap-3">
                <div className={`p-1.5 rounded-lg ${match.experienceMatch ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
                  <Briefcase className="w-4 h-4 shrink-0" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">Experience Check</span>
                  <span className="text-slate-500 text-[11px] mt-0.5 block">{match.experienceNote}</span>
                </div>
              </div>

              {/* Location Match */}
              <div className="p-3.5 rounded-xl bg-slate-50/50 border border-slate-100/60 flex items-start gap-3">
                <div className={`p-1.5 rounded-lg ${match.locationMatch ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
                  <MapPin className="w-4 h-4 shrink-0" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">Location Fit</span>
                  <span className="text-slate-500 text-[11px] mt-0.5 block">
                    {match.locationMatch ? "Perfect match for requirements" : "Requires relocation / check specs"}
                  </span>
                </div>
              </div>

              {/* Salary Match */}
              <div className="p-4 rounded-xl bg-slate-50/50 border border-slate-100/60 sm:col-span-2 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded-lg ${match.salaryMatch.match ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
                    <DollarSign className="w-4 h-4 shrink-0" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Salary Range Alignment</span>
                    <span className="text-slate-500 text-[11px] mt-0.5 block font-mono">
                      Your expectation: NPR {match.salaryMatch.candidate.toLocaleString()} · Budget: NPR {match.salaryMatch.jobMin.toLocaleString()} - {match.salaryMatch.jobMax.toLocaleString()}
                    </span>
                  </div>
                </div>
                
                <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-extrabold border ${
                  match.salaryMatch.match
                    ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                    : "bg-amber-50 text-amber-700 border-amber-100"
                }`}>
                  {match.salaryMatch.match ? "In Budget" : "Salary Alert"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
