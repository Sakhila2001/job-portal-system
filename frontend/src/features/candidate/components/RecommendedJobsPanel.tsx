"use client";

import React from "react";

interface RecommendedJob {
  id: string;
  title: string;
  company: string;
  location: string;
  salaryText: string;
  matchPercentage: number;
}

interface RecommendedJobsPanelProps {
  jobs: RecommendedJob[];
  className?: string;
  onSelectJob?: (job: RecommendedJob) => void;
}

export default function RecommendedJobsPanel({
  jobs,
  className = "",
  onSelectJob,
}: RecommendedJobsPanelProps) {
  return (
    <div className={`bg-white border border-stone-200 rounded-xl p-4 shadow-2xs space-y-3 ${className}`}>
      <h4 className="text-[13px] font-medium text-stone-900 border-b border-stone-100 pb-2">
        Recommended for You
      </h4>

      <div className="space-y-2.5">
        {jobs.map((job) => (
          <div
            key={job.id}
            onClick={() => onSelectJob && onSelectJob(job)}
            className="p-3 rounded-lg border border-stone-200/80 bg-stone-50/40 hover:bg-stone-50 hover:border-stone-300 cursor-pointer transition space-y-1.5"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <h5 className="text-[13px] font-semibold text-stone-900 leading-tight">
                  {job.title} <span className="font-normal text-stone-500">— {job.company}</span>
                </h5>
                <p className="text-[11px] text-stone-500 mt-0.5">{job.location}</p>
              </div>

              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 border border-stone-200 shrink-0">
                {job.matchPercentage}% match
              </span>
            </div>

            <div className="text-[11px] font-mono text-stone-700">{job.salaryText}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
