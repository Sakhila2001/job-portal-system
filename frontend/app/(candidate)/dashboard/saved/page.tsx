"use client";

import React, { useState } from "react";
import DashboardShell from "@/components/layout/DashboardShell";
import StatusBadge from "@/components/shared/StatusBadge";
import { useCandidateOverview } from "@/hooks/useCandidateOverview";
import { getCandidateNavItems } from "@/lib/candidate-nav";
import { Bookmark, Trash2, ExternalLink, MapPin, DollarSign, Clock } from "lucide-react";

export default function CandidateSavedJobsPage() {
  const { profile, recommendedJobs } = useCandidateOverview();

  const [savedList, setSavedList] = useState([
    {
      id: "saved-1",
      title: "Full Stack Engineer (Node.js & React)",
      company: "Yeti Cloud",
      location: "Kathmandu (Hybrid)",
      salary: "Rs 1,10,000 - 1,40,000/mo",
      matchScore: 94,
      savedDate: "2 days ago",
      deadline: "Expiring in 5 days",
    },
    {
      id: "saved-2",
      title: "Senior Backend Developer (PHP / Laravel)",
      company: "Himal Softworks",
      location: "Remote (Nepal)",
      salary: "Rs 90,000 - 1,15,000/mo",
      matchScore: 88,
      savedDate: "1 week ago",
      deadline: "Expiring in 12 days",
    },
  ]);

  const handleRemove = (id: string) => {
    setSavedList((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <DashboardShell
      brandTitle="JPS"
      brandSubtitle="Candidate Dashboard"
      navItems={getCandidateNavItems("/dashboard/saved")}
      searchPlaceholder="Search saved jobs..."
      userAvatarText={profile.avatarText}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
          <div>
            <h1 className="text-[20px] font-bold text-slate-900 tracking-tight">Saved Jobs</h1>
            <p className="text-[13px] text-slate-500 mt-0.5">
              Bookmarks and saved opportunities you are considering for application
            </p>
          </div>
          <span className="text-[12px] font-mono font-semibold bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200">
            {savedList.length} saved
          </span>
        </div>

        {savedList.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center space-y-3">
            <Bookmark className="h-10 w-10 text-slate-300 mx-auto" />
            <h3 className="text-[15px] font-semibold text-slate-900">No Saved Jobs Yet</h3>
            <p className="text-[13px] text-slate-500 max-w-sm mx-auto">
              Save jobs you are interested in while searching to review or apply to them later.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedList.map((job) => (
              <div key={job.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs hover:border-slate-300 transition space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-slate-900 text-[15px] hover:text-blue-600 cursor-pointer transition">
                      {job.title}
                    </h3>
                    <p className="text-[13px] font-medium text-slate-600 mt-0.5">{job.company}</p>
                  </div>
                  <span className="text-[11px] font-mono font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full shrink-0">
                    {job.matchScore}% match
                  </span>
                </div>

                <div className="space-y-1.5 text-[12px] text-slate-600 font-mono">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-slate-400" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-3.5 w-3.5 text-slate-400" />
                    <span>{job.salary}</span>
                  </div>
                  <div className="flex items-center gap-2 text-amber-700">
                    <Clock className="h-3.5 w-3.5 text-amber-500" />
                    <span>{job.deadline}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">Saved {job.savedDate}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleRemove(job.id)}
                      className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                      title="Remove Bookmark"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => alert(`Applying to ${job.title}`)}
                      className="inline-flex items-center gap-1 bg-slate-900 hover:bg-slate-800 text-white text-[12px] font-semibold px-3 py-1.5 rounded-lg transition"
                    >
                      <span>Apply Now</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
