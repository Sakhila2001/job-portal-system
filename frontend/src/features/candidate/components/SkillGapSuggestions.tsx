"use client";

import React, { useState } from "react";
import { Lightbulb, ExternalLink } from "lucide-react";

interface SkillSuggestion {
  skill: string;
  reason: string;
  priority: "high" | "medium" | "low";
  learnUrl?: string;
}

interface Props {
  suggestions: SkillSuggestion[];
}

export default function SkillGapSuggestions({ suggestions }: Props) {
  const [filter, setFilter] = useState<"all" | "high" | "medium" | "low">("all");

  const filteredSuggestions = suggestions.filter((s) => filter === "all" || s.priority === filter);

  const getPriorityColors = (priority: "high" | "medium" | "low") => {
    switch (priority) {
      case "high":
        return "bg-rose-50 text-rose-700 border-rose-100";
      case "medium":
        return "bg-amber-50 text-amber-700 border-amber-100";
      case "low":
        return "bg-slate-100 text-slate-700 border-slate-200/50";
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-md overflow-hidden transition-all duration-200">
      {/* Sleek Header */}
      <div className="border-b border-slate-100 p-5 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="bg-amber-50 p-1.5 rounded-lg text-amber-500">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-[15px] font-bold text-slate-900 leading-none">Skill Recommendations</h2>
            <p className="text-[12px] text-slate-500 mt-1">Skills needed for saved and applied jobs</p>
          </div>
        </div>
      </div>

      {/* Pill Filter Bar */}
      <div className="p-3 bg-slate-50/30 border-b border-slate-100 flex items-center justify-start overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex gap-1">
          {(["all", "high", "medium", "low"] as const).map((p) => {
            const isActive = filter === p;
            return (
              <button
                key={p}
                onClick={() => setFilter(p)}
                className={`px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider transition-all duration-150 ${
                  isActive
                    ? "bg-slate-900 text-white shadow-2xs"
                    : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                {p}
              </button>
            );
          })}
        </div>
      </div>

      {/* Suggestion List */}
      <div className="p-4 space-y-3">
        {filteredSuggestions.length === 0 ? (
          <p className="text-center text-slate-400 py-6 text-[12px] font-medium">No recommendations found.</p>
        ) : (
          filteredSuggestions.map((suggestion, index) => (
            <div
              key={`${suggestion.skill}-${index}`}
              className="flex items-center justify-between gap-4 p-3 border border-slate-100 rounded-xl bg-white hover:border-slate-300 transition-all duration-300 shadow-2xs"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="text-[13px] font-bold text-slate-900 leading-none">{suggestion.skill}</h3>
                  <span
                    className={`px-2 py-0.5 rounded-md text-[9px] font-extrabold capitalize border ${getPriorityColors(
                      suggestion.priority
                    )}`}
                  >
                    {suggestion.priority}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-medium truncate max-w-xs sm:max-w-sm">{suggestion.reason}</p>
              </div>
              
              {suggestion.learnUrl && (
                <a
                  href={suggestion.learnUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 inline-flex items-center justify-center px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-[10px] font-bold text-slate-700 transition-colors active:scale-95"
                >
                  <span>Learn</span>
                  <ExternalLink className="w-2.5 h-2.5 ml-1 text-slate-400" />
                </a>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
