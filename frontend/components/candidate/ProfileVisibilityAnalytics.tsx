"use client";

import React from "react";
import {
  Eye,
  TrendingUp,
  Search,
  Award,
  Users,
  ChevronRight,
} from "lucide-react";

export interface ProfileViewStat {
  week: string;
  views: number;
}

export interface ProfileAnalytics {
  totalViews: number;
  viewsThisWeek: number;
  searchAppearances: number;
  profileStrength: number;
  topSkillsFound: string[];
  recentViewers: Array<{ company: string; role: string; timeAgo: string }>;
  weeklyViews: ProfileViewStat[];
}

interface Props {
  analytics: ProfileAnalytics;
}

export default function ProfileVisibilityAnalytics({ analytics }: Props) {
  const maxViews = Math.max(...analytics.weeklyViews.map((w) => w.views), 10);

  return (
    <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden transition-all duration-200">
      {/* Sleek Minimal Header */}
      <div className="border-b border-slate-100 p-5 bg-slate-50/50">
        <h2 className="text-[15px] font-bold text-slate-900 flex items-center gap-1.5">
          <Eye className="w-4 h-4 text-slate-700" />
          Profile Visibility Analytics
        </h2>
        <p className="text-[12px] text-slate-500 mt-0.5">
          Performance metrics and search discoveries
        </p>
      </div>

      <div className="p-5 space-y-6">
        {/* KPI Cards Grid */}
        <div className="grid grid-cols-3 gap-2.5">
          <div className="p-3 border border-slate-100 rounded-xl bg-slate-50/50 text-center">
            <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">
              Total Views
            </span>
            <span className="text-xl font-extrabold text-slate-900 block mt-1 font-mono">
              {analytics.totalViews}
            </span>
          </div>
          <div className="p-3 border border-slate-100 rounded-xl bg-slate-50/50 text-center">
            <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">
              This Week
            </span>
            <span className="text-xl font-extrabold text-slate-900 block mt-1 font-mono flex items-center justify-center gap-0.5">
              {analytics.viewsThisWeek}
              <span className="text-[9px] text-emerald-600 font-bold font-sans">
                +12%
              </span>
            </span>
          </div>
          <div className="p-3 border border-slate-100 rounded-xl bg-slate-50/50 text-center">
            <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider font-sans">
              Searches
            </span>
            <span className="text-xl font-extrabold text-slate-900 block mt-1 font-mono">
              {analytics.searchAppearances}
            </span>
          </div>
        </div>

        {/* Weekly Chart */}
        <div className="p-4 border border-slate-100 rounded-xl bg-slate-50/30">
          <h3 className="text-[12px] font-bold text-slate-900 mb-3 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-slate-400" />
            Weekly Profile Views
          </h3>
          <div className="h-28 flex items-end gap-3 mt-4 px-2">
            {analytics.weeklyViews.map((stat, i) => {
              const heightPercent = (stat.views / maxViews) * 100;
              return (
                <div
                  key={i}
                  className="flex-1 flex flex-col items-center gap-1.5 group relative"
                >
                  <div
                    className="w-full bg-slate-900 hover:bg-slate-800 rounded-t-md transition-all duration-300 relative shadow-2xs"
                    style={{ height: `${heightPercent}%`, minHeight: "6px" }}
                  >
                    {/* Floating Tooltip */}
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] py-0.5 px-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10 font-bold font-mono">
                      {stat.views} views
                    </div>
                  </div>
                  <span className="text-[9px] text-slate-400 font-bold font-mono tracking-tighter">
                    {stat.week}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Profile Strength */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-[12px]">
            <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              Profile Strength
            </h3>
            <span className="font-extrabold text-slate-900 font-mono">
              {analytics.profileStrength}%
            </span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                analytics.profileStrength >= 80
                  ? "bg-emerald-500"
                  : "bg-amber-500"
              }`}
              style={{ width: `${analytics.profileStrength}%` }}
            />
          </div>
        </div>

        {/* Recent Viewers list */}
        <div className="border border-slate-100 rounded-xl overflow-hidden bg-white">
          <div className="bg-slate-50/50 px-4 py-2.5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-[11px] flex items-center gap-1.5 uppercase tracking-wider">
              <Users className="w-3.5 h-3.5 text-slate-400" />
              Recent Viewers
            </h3>
          </div>
          <div className="divide-y divide-slate-50">
            {analytics.recentViewers.slice(0, 3).map((viewer, i) => (
              <div
                key={i}
                className="p-3 flex items-center gap-3 hover:bg-slate-50 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-[12px] shrink-0 font-mono">
                  {viewer.company.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-900 text-[12px] truncate leading-tight">
                    {viewer.role}
                  </p>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">
                    {viewer.company}
                  </p>
                </div>
                <span className="text-[9px] text-slate-400 font-mono shrink-0">
                  {viewer.timeAgo}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Skills discovered */}
        <div className="space-y-2">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block font-mono">
            Recruiters Discovered You For
          </span>
          <div className="flex flex-wrap gap-1">
            {analytics.topSkillsFound.map((skill, i) => (
              <span
                key={i}
                className="flex items-center gap-1 px-2.5 py-0.5 bg-slate-50 border border-slate-200/50 rounded-md text-[10px] font-bold text-slate-700"
              >
                <Search className="w-2.5 h-2.5 text-slate-400" />
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
