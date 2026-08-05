"use client";

import React from "react";
import DataTable from "../shared/DataTable";
import StatusBadge from "../shared/StatusBadge";
import FilterBar from "../shared/FilterBar";
import { Job, ColumnDef, PaginationState } from "@/lib/types";
import { Eye, Edit2, Plus, Download } from "lucide-react";

interface JobPostingsTableProps {
  jobs: Job[];
  totalJobsCount: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  jobFilter: string;
  onJobFilterChange: (filter: string) => void;
  departmentFilter: string;
  onDepartmentFilterChange: (dept: string) => void;
  sortBy: string;
  onSortByChange: (sort: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onClearFilters: () => void;
  // Selection & Bulk
  selectedJobIds: string[];
  onToggleSelectJob: (id: string) => void;
  onToggleSelectAll: () => void;
  onBulkAction: (action: string) => void;
  onViewJob?: (job: Job) => void;
  onEditJob?: (job: Job) => void;
  onNewJob?: () => void;
  isLoading?: boolean;
}

export default function JobPostingsTable({
  jobs,
  totalJobsCount,
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  jobFilter,
  onJobFilterChange,
  departmentFilter,
  onDepartmentFilterChange,
  sortBy,
  onSortByChange,
  searchQuery,
  onSearchChange,
  onClearFilters,
  selectedJobIds,
  onToggleSelectJob,
  onToggleSelectAll,
  onBulkAction,
  onViewJob,
  onEditJob,
  onNewJob,
  isLoading = false,
}: JobPostingsTableProps) {
  const filterPills = [
    { id: "All", label: "All" },
    { id: "Live", label: "Live" },
    { id: "Draft", label: "Draft" },
    { id: "Expiring", label: "Expiring" },
    { id: "Closed", label: "Closed" },
  ];

  const selectFilters = [
    {
      id: "sort",
      label: "Sort",
      options: [
        { label: "Sort: Newest", value: "Newest" },
        { label: "Sort: Applicants", value: "Applicants" },
        { label: "Sort: Views", value: "Views" },
      ],
      value: sortBy,
      onChange: onSortByChange,
    },
    {
      id: "dept",
      label: "Department",
      options: [
        { label: "Department: All", value: "All" },
        { label: "Engineering", value: "Engineering" },
        { label: "Design", value: "Design" },
        { label: "Product", value: "Product" },
      ],
      value: departmentFilter,
      onChange: onDepartmentFilterChange,
    },
  ];

  const columns: ColumnDef<Job>[] = [
    {
      key: "sn",
      header: "S.N",
      width: "45px",
      align: "center",
      render: (_, index) => <span className="font-mono text-stone-500">{(currentPage - 1) * pageSize + index + 1}</span>,
    },
    {
      key: "title",
      header: "Job Title",
      render: (row) => <span className="font-medium text-stone-900">{row.title}</span>,
    },
    {
      key: "department",
      header: "Department",
      render: (row) => <span className="text-stone-600">{row.department}</span>,
    },
    {
      key: "applicantsCount",
      header: "Applicants",
      align: "center",
      render: (row) => <span className="font-mono text-stone-900 font-semibold">{row.applicantsCount}</span>,
    },
    {
      key: "viewsCount",
      header: "Views",
      align: "center",
      render: (row) => <span className="font-mono text-stone-600">{row.viewsCount}</span>,
    },
    {
      key: "postedDate",
      header: "Posted Date",
      render: (row) => <span className="font-mono text-[12px] text-stone-500">{row.postedDate}</span>,
    },
    {
      key: "expiresInDays",
      header: "Expires",
      render: (row) => (
        <span className="font-mono text-[12px] text-stone-500">
          {row.expiresInDays !== null && row.expiresInDays !== undefined ? `${row.expiresInDays} days` : "—"}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      align: "center",
      render: (row) => <StatusBadge status={row.status} showDot />,
    },
    {
      key: "action",
      header: "Action",
      width: "80px",
      align: "center",
      render: (row) => (
        <div className="flex items-center justify-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewJob && onViewJob(row);
            }}
            className="p-1 rounded text-stone-400 hover:text-stone-900 hover:bg-stone-100 transition"
            title="Inspect Job Posting"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEditJob && onEditJob(row);
            }}
            className="p-1 rounded text-stone-400 hover:text-stone-900 hover:bg-stone-100 transition"
            title="Edit Job Requisition"
          >
            <Edit2 className="h-3.5 w-3.5" />
          </button>
        </div>
      ),
    },
  ];

  const paginationState: PaginationState = {
    currentPage,
    totalPages,
    pageSize,
    totalItems: totalJobsCount,
  };

  const extraActions = (
    <>
      <button
        onClick={() => alert("Exporting job listings CSV...")}
        className="inline-flex items-center gap-1 bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 text-[12px] font-medium px-3 py-1.5 rounded-lg transition"
      >
        <Download className="h-3.5 w-3.5 text-stone-400" />
        <span>Export CSV</span>
      </button>

      {onNewJob && (
        <button
          onClick={onNewJob}
          className="inline-flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-medium px-3.5 py-1.5 rounded-lg transition shadow-2xs"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>+ New Job</span>
        </button>
      )}
    </>
  );

  const bulkNode = (
    <div className="flex items-center gap-1.5">
      <span className="text-stone-400">Bulk:</span>
      <button
        onClick={() => onBulkAction("Close")}
        className="px-2 py-1 bg-stone-800 hover:bg-stone-700 rounded text-[11px] font-medium text-white transition"
      >
        Close
      </button>
      <button
        onClick={() => onBulkAction("Extend")}
        className="px-2 py-1 bg-stone-800 hover:bg-stone-700 rounded text-[11px] font-medium text-white transition"
      >
        Extend
      </button>
      <button
        onClick={() => onBulkAction("Duplicate")}
        className="px-2 py-1 bg-stone-800 hover:bg-stone-700 rounded text-[11px] font-medium text-white transition"
      >
        Duplicate
      </button>
      <button
        onClick={() => onBulkAction("Archive")}
        className="px-2 py-1 bg-rose-900/80 hover:bg-rose-800 rounded text-[11px] font-medium text-rose-200 transition"
      >
        Archive
      </button>
    </div>
  );

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-[14px] font-medium text-stone-900">Job Postings</h3>
      </div>

      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        searchPlaceholder="Search job title or department..."
        pills={filterPills}
        activePillId={jobFilter}
        onPillSelect={onJobFilterChange}
        selectFilters={selectFilters}
        onClearAll={onClearFilters}
        extraActions={extraActions}
      />

      <DataTable
        columns={columns}
        data={jobs}
        keyExtractor={(row) => row.id}
        isLoading={isLoading}
        emptyTitle="No Job Postings Found"
        emptyDescription="Create your first job requisition to start receiving candidate applications."
        emptyActionLabel="+ Post a Job"
        onEmptyAction={onNewJob}
        selectedIds={selectedJobIds}
        onToggleSelectRow={onToggleSelectJob}
        onToggleSelectAll={onToggleSelectAll}
        pagination={paginationState}
        onPageChange={onPageChange}
        onRowClick={onViewJob}
        bulkActionsNode={bulkNode}
      />
    </div>
  );
}
