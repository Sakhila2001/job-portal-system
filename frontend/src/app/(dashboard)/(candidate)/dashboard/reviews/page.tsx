"use client";

import React, { useState } from "react";
import DashboardShell from "@/components/layout/DashboardShell";
import { useCandidateOverview } from "@/features/candidate/hooks/useCandidateOverview";
import { Home, FileText, Bookmark, Bell, File, Building2, Star, Settings, Plus, Edit2, Trash2 } from "lucide-react";

import { getCandidateNavItems } from "@/lib/candidate-nav";

export default function CandidateReviewsPage() {
  const { profile } = useCandidateOverview();

  const [reviews, setReviews] = useState([
    {
      id: "rev-1",
      companyName: "Yeti Cloud",
      jobTitle: "Software Engineer",
      rating: 5,
      summary: "Great engineering culture and work-life balance",
      reviewText: "Management is very open to adopting new tech stacks. Code reviews are constructive and team members are supportive.",
      date: "Jun 2025",
      isApproved: true,
    },
  ]);

  return (
    <DashboardShell
      brandTitle="JPS"
      brandSubtitle="Candidate Dashboard"
      navItems={getCandidateNavItems("/dashboard/reviews")}
      searchPlaceholder="Search my reviews..."
      userAvatarText={profile.avatarText}
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
          <div>
            <h1 className="text-[20px] font-bold text-slate-900 tracking-tight">Reviews Written</h1>
            <p className="text-[13px] text-slate-500 mt-0.5">
              Manage employer reviews you have published on the platform
            </p>
          </div>
          <button
            onClick={() => alert("Write Employer Review Modal")}
            className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-[12px] font-semibold px-3.5 py-2 rounded-lg transition"
          >
            <Plus className="h-4 w-4" />
            <span>Write New Review</span>
          </button>
        </div>

        {reviews.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center space-y-3">
            <Star className="h-10 w-10 text-slate-300 mx-auto" />
            <h3 className="text-[15px] font-semibold text-slate-900">No Reviews Written Yet</h3>
            <p className="text-[13px] text-slate-500 max-w-sm mx-auto">
              Share your employment experience to help other candidates evaluate company culture.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((rev) => (
              <div key={rev.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900 text-[15px]">{rev.companyName}</h3>
                    <p className="text-[12px] text-slate-500">{rev.jobTitle} • {rev.date}</p>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-500" />
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg space-y-1">
                  <h4 className="font-semibold text-[13px] text-slate-900">{rev.summary}</h4>
                  <p className="text-[12px] text-slate-600 leading-relaxed">{rev.reviewText}</p>
                </div>

                <div className="flex items-center justify-between pt-1 text-[12px]">
                  <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-mono text-[11px]">
                    ✓ Approved & Published
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => alert(`Edit review ${rev.id}`)}
                      className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setReviews((prev) => prev.filter((r) => r.id !== rev.id))}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                    >
                      <Trash2 className="h-4 w-4" />
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
