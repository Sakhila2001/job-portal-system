"use client";
 
import React from "react";
import Link from "next/link";
import { MapPin, Briefcase, DollarSign, Clock, Star, ArrowRight } from "lucide-react";
import { Job } from "@/lib/dummy-data";
import { getCompanyLogo } from "@/lib/icon-utils";

interface JobCardProps {
  job: Job;
  isSelected?: boolean;
  onClick?: () => void;
  layout?: "grid" | "list";
}
 
export default function JobCard({ job, isSelected = false, onClick, layout = "list" }: JobCardProps) {
  const cardStyles = `group bg-white border border-slate-100/80 rounded-2xl p-6 transition-all duration-200 text-left ${
    isSelected
      ? "border-brand-primary/60 ring-4 ring-brand-primary/5 bg-slate-50/50 shadow-sm"
      : "hover:border-brand-primary/20 hover:shadow-[0_15px_35px_-8px_rgba(0,0,0,0.03)] hover:-translate-y-0.5"
  } cursor-pointer`;
 
  const renderContent = () => {
    if (layout === "grid") {
      return (
        <div className="flex flex-col h-full justify-between gap-4">
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 border border-slate-100 shadow-xs shrink-0">
                {getCompanyLogo(job.companyName)}
              </div>
              {job.isHot && (
                <span className="bg-orange-50 text-orange-600 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-orange-100">
                  Hot Job
                </span>
              )}
            </div>
            
            <div>
              <h3 className="font-bold text-slate-900 group-hover:text-brand-primary line-clamp-1">
                {job.title}
              </h3>
              <p className="text-sm text-slate-500 font-medium">{job.companyName}</p>
            </div>
 
            <div className="flex items-center gap-1 text-xs">
              <span className="flex items-center gap-0.5 text-amber-500 font-semibold bg-amber-50 px-1.5 py-0.5 rounded-md">
                <Star className="h-3 w-3 fill-amber-500" />
                {job.rating}
              </span>
              <span className="text-slate-400">({job.reviewsCount} reviews)</span>
            </div>
          </div>
 
          <div className="space-y-2 border-t border-slate-50 pt-3">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Briefcase className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              <span>{job.experience}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              <span className="line-clamp-1">{job.location}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <DollarSign className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              <span>{job.salary}</span>
            </div>
          </div>
 
          <div className="flex flex-wrap gap-1.5 pt-1">
            {job.skills.slice(0, 3).map((skill) => (
              <span
                key={skill}
                className="bg-slate-100 text-slate-600 text-[10px] font-medium px-2 py-1 rounded-md"
              >
                {skill}
              </span>
            ))}
            {job.skills.length > 3 && (
              <span className="text-slate-400 text-[10px] px-1 py-1">+{job.skills.length - 3} more</span>
            )}
          </div>
        </div>
      );
    }
 
    // Default: List layout
    return (
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Company logo icon */}
        <div className="flex-shrink-0">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 border border-slate-100 shadow-xs shrink-0">
            {getCompanyLogo(job.companyName)}
          </div>
        </div>

        {/* Details section */}
        <div className="flex-1 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-bold text-slate-900 text-lg group-hover:text-brand-primary leading-snug">
                {job.title}
              </h3>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm mt-0.5">
                <span className="font-semibold text-slate-700">{job.companyName}</span>
                <span className="text-slate-300">|</span>
                <div className="flex items-center gap-1 text-xs">
                  <span className="flex items-center gap-0.5 text-amber-500 font-semibold bg-amber-50 px-1.5 py-0.5 rounded-md">
                    <Star className="h-3 w-3 fill-amber-500" />
                    {job.rating}
                  </span>
                  <span className="text-slate-400 hover:underline">({job.reviewsCount} reviews)</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-2 shrink-0">
              {job.isHot && (
                <span className="bg-orange-50 text-orange-600 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-orange-100">
                  Hot
                </span>
              )}
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {job.postedTime}
              </span>
            </div>
          </div>

          {/* Job Specifications Grid */}
          <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <Briefcase className="h-3.5 w-3.5 text-slate-400" />
              {job.experience}
            </span>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <DollarSign className="h-3.5 w-3.5 text-slate-400" />
              {job.salary}
            </span>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-slate-400" />
              {job.location}
            </span>
          </div>

          {/* Short description preview */}
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {job.description}
          </p>

          {/* Skill Tag Pills */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
            <div className="flex flex-wrap gap-1.5">
              {job.skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-slate-100 text-slate-600 text-[10px] font-semibold px-2.5 py-1 rounded-md"
                >
                  {skill}
                </span>
              ))}
            </div>
            
            {/* CTA detail link (only visible on hover or if selected) */}
            <span className="text-xs font-bold text-brand-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <span>View details</span>
              <ArrowRight className="h-3 w-3" />
            </span>
          </div>
        </div>
      </div>
    );
  };

  return onClick ? (
    <button type="button" onClick={onClick} className={cardStyles + " w-full"}>
      {renderContent()}
    </button>
  ) : (
    <Link href={`/jobs/${job.id}`} className={cardStyles + " block"}>
      {renderContent()}
    </Link>
  );
}
