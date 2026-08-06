"use client";

import React, { useState } from "react";
import DashboardShell from "@/components/layout/DashboardShell";
import { useCandidateOverview } from "@/hooks/useCandidateOverview";
import { Home, FileText, Bookmark, Bell, File, Building2, Star, Settings, Search, MapPin, ExternalLink, UserCheck, Plus } from "lucide-react";

import { getCandidateNavItems } from "@/lib/candidate-nav";

export default function CandidateCompaniesPage() {
  const { profile } = useCandidateOverview();

  const [companies, setCompanies] = useState([
    { id: "comp-1", name: "Yeti Cloud", industry: "Cloud & DevOps", location: "Kathmandu", openJobs: 4, rating: 4.8, isFollowing: true },
    { id: "comp-2", name: "Himal Softworks", industry: "Software Engineering", location: "Lalitpur", openJobs: 6, rating: 4.6, isFollowing: false },
    { id: "comp-3", name: "Bidur Systems", industry: "Enterprise IT", location: "Kathmandu", openJobs: 2, rating: 4.5, isFollowing: true },
    { id: "comp-4", name: "Khanepani Tech", industry: "Fintech & Utility", location: "Pokhara", openJobs: 3, rating: 4.2, isFollowing: false },
  ]);

  const toggleFollow = (id: string) => {
    setCompanies((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isFollowing: !c.isFollowing } : c))
    );
  };

  return (
    <DashboardShell
      brandTitle="JPS"
      brandSubtitle="Candidate Dashboard"
      navItems={getCandidateNavItems("/dashboard/companies")}
      searchPlaceholder="Search companies by name or industry..."
      userAvatarText={profile.avatarText}
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
          <div>
            <h1 className="text-[20px] font-bold text-slate-900 tracking-tight">Explore Companies</h1>
            <p className="text-[13px] text-slate-500 mt-0.5">
              Discover top hiring companies, workplace culture ratings, and open positions
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {companies.map((company) => (
            <div key={company.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4 hover:border-slate-300 transition">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-slate-900 text-white font-bold text-[13px] flex items-center justify-center font-mono">
                    {company.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-[15px]">{company.name}</h3>
                    <p className="text-[12px] text-slate-500">{company.industry}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[12px] font-mono font-semibold text-slate-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-500" />
                  <span>{company.rating}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[12px] text-slate-600 font-mono pt-2 border-t border-slate-100">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-slate-400" />
                  {company.location}
                </span>
                <span className="font-semibold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                  {company.openJobs} open jobs
                </span>
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => toggleFollow(company.id)}
                  className={`inline-flex items-center gap-1.5 text-[12px] font-semibold px-3 py-1.5 rounded-lg border transition ${
                    company.isFollowing
                      ? "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
                      : "bg-slate-900 text-white border-slate-900 hover:bg-slate-800"
                  }`}
                >
                  {company.isFollowing ? (
                    <>
                      <UserCheck className="h-3.5 w-3.5 text-emerald-600" />
                      <span>Following</span>
                    </>
                  ) : (
                    <>
                      <Plus className="h-3.5 w-3.5" />
                      <span>Follow</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => alert(`Viewing open jobs for ${company.name}`)}
                  className="inline-flex items-center gap-1 text-[12px] font-semibold text-slate-700 hover:text-slate-900 hover:underline"
                >
                  <span>View Jobs</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
