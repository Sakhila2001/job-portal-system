"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Star, TrendingUp, Check, Award, ShieldAlert, ArrowRight } from "lucide-react";
import { Company, companies } from "@/lib/dummy-data";

interface CompanyComparisonProps {
  primaryCompanyId: string;
}

export default function CompanyComparison({ primaryCompanyId }: CompanyComparisonProps) {
  const primaryCompany = companies.find((c) => c.id === primaryCompanyId) || companies[0];
  
  // Select three other companies for comparison
  const [selectedComparisons, setSelectedComparisons] = useState<Company[]>(
    companies.filter((c) => c.id !== primaryCompanyId).slice(0, 3)
  );

  const comparedList = [primaryCompany, ...selectedComparisons];

  const comparisonMetrics = [
    { label: "Overall Rating", key: "overallRating", isRating: true },
    { label: "Work-Life Balance", key: "workLifeBalance", isRating: true },
    { label: "Job Security & Stability", key: "jobSecurity", isRating: true },
    { label: "Salary & Benefits", key: "salaryBenefits", isRating: true },
    { label: "Career Growth Path", key: "careerGrowth", isRating: true },
    { label: "Work Culture & Peer Environment", key: "workCulture", isRating: true },
    { label: "Recommend to a Friend", key: "recommendToFriend", isPercentage: true },
    { label: "CEO Approval Rate", key: "ceoApproval", isPercentage: true }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Compare {primaryCompany.name} with other companies
        </h2>
        <p className="text-sm text-muted-foreground">
          Compare key workspace statistics side-by-side to make an informed choice.
        </p>
      </div>

      {/* Comparison Grid/Table Container */}
      <div className="bg-white border border-border rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-border">
                {/* Header Top Left */}
                <th className="p-5 text-sm font-semibold text-slate-500 min-w-[200px]">
                  Comparison Parameter
                </th>
                {comparedList.map((comp, idx) => (
                  <th key={comp.id} className="p-5 min-w-[180px] border-l border-slate-100">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-slate-200 text-xl shadow-sm">
                          {comp.logo}
                        </span>
                        <div>
                          <h4 className="font-bold text-slate-800 text-sm">{comp.name}</h4>
                          {idx === 0 && (
                            <span className="bg-brand-primary/10 text-brand-primary text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded">
                              Current Job
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Rating */}
                      <div className="flex items-center gap-1 text-xs">
                        <span className="flex items-center gap-0.5 text-amber-500 font-semibold bg-amber-50 px-1 py-0.5 rounded">
                          <Star className="h-3 w-3 fill-amber-500" />
                          {comp.rating}
                        </span>
                        <span className="text-slate-400 text-[10px]">({comp.reviewsCount} reviews)</span>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            
            <tbody className="divide-y divide-slate-100 text-sm">
              {comparisonMetrics.map((metric) => (
                <tr key={metric.label} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 font-medium text-slate-700">{metric.label}</td>
                  
                  {comparedList.map((comp) => {
                    const value = comp[metric.key as keyof Company] as number;
                    
                    return (
                      <td key={comp.id} className="p-4 border-l border-slate-100">
                        {metric.isRating ? (
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-slate-900">{value as number}</span>
                            <div className="flex h-1.5 w-24 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-brand-primary rounded-full"
                                style={{ width: `${((value as number) / 5) * 100}%` }}
                              />
                            </div>
                          </div>
                        ) : metric.isPercentage ? (
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-950">{value}%</span>
                            <span className="text-xs text-emerald-600 flex items-center gap-0.5">
                              <TrendingUp className="h-3 w-3" />
                            </span>
                          </div>
                        ) : (
                          <span className="text-slate-800">{value}</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
              
              {/* Row for CTA Action */}
              <tr>
                <td className="p-5 font-medium text-slate-500" />
                {comparedList.map((comp) => (
                  <td key={comp.id} className="p-5 border-l border-slate-100 text-center">
                    <Link
                      href={`/jobs?q=${encodeURIComponent(comp.name)}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-brand-primary hover:text-brand-hover"
                    >
                      <span>View Openings</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
