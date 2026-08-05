import React from "react";

export default function AdminLoading() {
  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto animate-pulse">
      <div className="h-8 bg-stone-200 rounded w-1/4" />
      <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-24 bg-stone-200 rounded-xl" />
        ))}
      </div>
      <div className="h-64 bg-stone-200 rounded-xl" />
    </div>
  );
}
