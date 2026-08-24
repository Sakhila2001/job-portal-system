"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
  className = "",
}: PaginationProps) {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={`flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-stone-500 py-3 border-t border-stone-100 ${className}`}>
      <div>
        Showing <span className="font-semibold text-stone-900 font-mono">{startItem}</span>-
        <span className="font-semibold text-stone-900 font-mono">{endItem}</span> of{" "}
        <span className="font-semibold text-stone-900 font-mono">{totalItems}</span> items
      </div>

      <div className="flex items-center gap-1">
        <button
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="p-1.5 rounded-md border border-stone-200 bg-white hover:bg-stone-50 text-stone-600 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`min-w-[28px] h-7 px-2 text-[12px] font-medium rounded-md border transition font-mono ${
              currentPage === p
                ? "bg-blue-600 text-white border-blue-600 shadow-2xs"
                : "bg-white text-stone-700 border-stone-200 hover:bg-stone-50"
            }`}
          >
            {p}
          </button>
        ))}

        <button
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="p-1.5 rounded-md border border-stone-200 bg-white hover:bg-stone-50 text-stone-600 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
