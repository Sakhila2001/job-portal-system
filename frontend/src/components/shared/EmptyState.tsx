"use client";

import React from "react";
import { FolderOpen } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ElementType;
  className?: string;
}

export default function EmptyState({
  title = "No data available",
  description = "There are no records matching your request at this time.",
  actionLabel,
  onAction,
  icon: Icon = FolderOpen,
  className = "",
}: EmptyStateProps) {
  return (
    <div className={`py-12 px-4 text-center bg-stone-50/50 rounded-xl border border-dashed border-stone-200 flex flex-col items-center justify-center ${className}`}>
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-stone-100 text-stone-400 mb-3">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-[14px] font-medium text-stone-900">{title}</h3>
      <p className="text-[12px] text-stone-500 max-w-sm mt-1 leading-normal">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-4 inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-medium px-3.5 py-1.5 rounded-lg transition-colors shadow-2xs"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
