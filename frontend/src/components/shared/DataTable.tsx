"use client";

import React from "react";
import { ColumnDef, PaginationState } from "@/lib/types";
import Pagination from "./Pagination";
import EmptyState from "./EmptyState";
import { LoaderCircle } from "lucide-react";

interface DataTableProps<T extends Record<string, any>> {
  columns: ColumnDef<T>[];
  data: T[];
  keyExtractor: (row: T) => string;
  isLoading?: boolean;
  loadingLabel?: string;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyActionLabel?: string;
  onEmptyAction?: () => void;
  // Selection
  selectedIds?: string[];
  onToggleSelectRow?: (id: string) => void;
  onToggleSelectAll?: () => void;
  // Row Click / Actions
  onRowClick?: (row: T) => void;
  // Pagination
  pagination?: PaginationState;
  onPageChange?: (page: number) => void;
  // Bulk Action Bar
  bulkActionsNode?: React.ReactNode;
  className?: string;
}

export default function DataTable<T extends Record<string, any>>({
  columns,
  data,
  keyExtractor,
  isLoading = false,
  loadingLabel = "Loading records...",
  emptyTitle = "No records found",
  emptyDescription = "No data matches the selected filters.",
  emptyActionLabel,
  onEmptyAction,
  selectedIds = [],
  onToggleSelectRow,
  onToggleSelectAll,
  onRowClick,
  pagination,
  onPageChange,
  bulkActionsNode,
  className = "",
}: DataTableProps<T>) {
  const isAllSelected =
    data.length > 0 && selectedIds.length > 0 && data.every((row) => selectedIds.includes(keyExtractor(row)));

  return (
    <div className={`bg-white border border-stone-200 rounded-xl shadow-2xs overflow-hidden ${className}`}>
      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[13px] text-stone-700">
          <thead className="bg-stone-50/80 border-b border-stone-200 uppercase text-[10px] font-semibold text-stone-500 tracking-wider">
            <tr>
              {onToggleSelectRow && (
                <th className="px-3 py-3 w-8 text-center">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={() => onToggleSelectAll && onToggleSelectAll()}
                    className="h-3.5 w-3.5 rounded border-stone-300 text-blue-600 focus:ring-blue-500 accent-blue-600 cursor-pointer"
                  />
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={col.key}
                  style={{ width: col.width }}
                  className={`px-3.5 py-3 ${
                    col.align === "center" ? "text-center" : col.align === "right" ? "text-right" : "text-left"
                  }`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-stone-100 font-normal">
            {isLoading ? (
              <tr>
                <td
                  colSpan={columns.length + (onToggleSelectRow ? 1 : 0)}
                  className="h-40 text-center"
                >
                  <div
                    className="flex flex-col items-center justify-center gap-2 text-stone-500"
                    role="status"
                    aria-live="polite"
                  >
                    <LoaderCircle className="h-6 w-6 animate-spin text-blue-600" aria-hidden="true" />
                    <span className="text-[13px] font-medium">{loadingLabel}</span>
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              // Empty State Row
              <tr>
                <td colSpan={columns.length + (onToggleSelectRow ? 1 : 0)} className="p-0">
                  <EmptyState
                    title={emptyTitle}
                    description={emptyDescription}
                    actionLabel={emptyActionLabel}
                    onAction={onEmptyAction}
                  />
                </td>
              </tr>
            ) : (
              // Populated Rows
              data.map((row, idx) => {
                const rowKey = keyExtractor(row);
                const isSelected = selectedIds.includes(rowKey);

                return (
                  <tr
                    key={rowKey}
                    onClick={() => onRowClick && onRowClick(row)}
                    className={`transition-colors ${
                      isSelected ? "bg-blue-50/40 hover:bg-blue-50/70" : "hover:bg-stone-50/80"
                    } ${onRowClick ? "cursor-pointer" : ""}`}
                  >
                    {onToggleSelectRow && (
                      <td
                        className="px-3 py-3.5 text-center"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => onToggleSelectRow(rowKey)}
                          className="h-3.5 w-3.5 rounded border-stone-300 text-blue-600 focus:ring-blue-500 accent-blue-600 cursor-pointer"
                        />
                      </td>
                    )}

                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className={`px-3.5 py-3.5 ${
                          col.align === "center" ? "text-center" : col.align === "right" ? "text-right" : "text-left"
                        }`}
                      >
                        {col.render ? col.render(row, idx) : (row as any)[col.key]}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Bulk Actions Floating Bar */}
      {selectedIds.length > 0 && bulkActionsNode && (
        <div className="bg-stone-900 text-white px-4 py-2.5 flex items-center justify-between text-[12px] border-t border-stone-800 animate-in slide-in-from-bottom-2 duration-150">
          <div className="font-semibold">
            {selectedIds.length} item(s) selected
          </div>
          <div className="flex items-center gap-2">{bulkActionsNode}</div>
        </div>
      )}

      {/* Pagination Footer */}
      {pagination && onPageChange && data.length > 0 && (
        <div className="px-4">
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            pageSize={pagination.pageSize}
            totalItems={pagination.totalItems}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
}
