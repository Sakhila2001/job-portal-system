import React from "react";

export default function RecruiterDashboardLoading() {
  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto animate-pulse">
      <div className="h-8 bg-stone-200 rounded w-1/4" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 bg-stone-200 rounded-xl" />
        ))}
      </div>
      <div className="h-10 bg-stone-200 rounded-xl w-full" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-4">
          <div className="h-64 bg-stone-200 rounded-xl" />
          <div className="h-64 bg-stone-200 rounded-xl" />
        </div>
        <div className="lg:col-span-4 space-y-4">
          <div className="h-40 bg-stone-200 rounded-xl" />
          <div className="h-40 bg-stone-200 rounded-xl" />
          <div className="h-40 bg-stone-200 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
