"use client";

import React from "react";
import DataTable from "../shared/DataTable";
import StatusBadge from "../shared/StatusBadge";
import FilterBar from "../shared/FilterBar";
import { JobApplication, ColumnDef, PaginationState } from "@/lib/types";
import { Eye } from "lucide-react";

interface ApplicationPipelineTableProps {
  applications: JobApplication[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  onClearFilters: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onViewApplication?: (app: JobApplication) => void;
  isLoading?: boolean;
}

export default function ApplicationPipelineTable({
  applications,
  totalCount,
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  activeFilter,
  onFilterChange,
  onClearFilters,
  searchQuery,
  onSearchChange,
  onViewApplication,
  isLoading = false,
}: ApplicationPipelineTableProps) {
  const filterPills = [
    { id: "All", label: "All" },
    { id: "Applied", label: "Applied" },
    { id: "Screening", label: "Screening" },
    { id: "Interview", label: "Interview" },
    { id: "Offer", label: "Offer" },
    { id: "Rejected", label: "Rejected" },
  ];

  const columns: ColumnDef<JobApplication>[] = [
    {
      key: "sn",
      header: "S.N",
      width: "50px",
      align: "center",
      render: (row) => <span className="font-mono text-stone-500">{row.sn}</span>,
    },
    {
      key: "jobTitle",
      header: "Role",
      render: (row) => <span className="font-medium text-stone-900">{row.jobTitle}</span>,
    },
    {
      key: "companyName",
      header: "Company",
      render: (row) => <span className="text-stone-700 font-normal">{row.companyName}</span>,
    },
    {
      key: "appliedDate",
      header: "Applied Date",
      render: (row) => <span className="text-stone-500 font-mono text-[12px]">{row.appliedDate}</span>,
    },
    {
      key: "location",
      header: "Location",
      render: (row) => <span className="text-stone-600">{row.location}</span>,
    },
    {
      key: "salaryText",
      header: "Salary",
      render: (row) => <span className="font-mono text-stone-800">{row.salaryText}</span>,
    },
    {
      key: "status",
      header: "Status",
      align: "center",
      render: (row) => {
        const displayStatus = row.statusCustomPill || row.status;
        return <StatusBadge status={displayStatus} />;
      },
    },
    {
      key: "action",
      header: "Action",
      width: "60px",
      align: "center",
      render: (row) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onViewApplication && onViewApplication(row);
          }}
          className="p-1.5 rounded text-stone-400 hover:text-stone-900 hover:bg-stone-100 transition"
          title="View Application Details"
        >
          <Eye className="h-4 w-4" />
        </button>
      ),
    },
  ];

  const paginationState: PaginationState = {
    currentPage,
    totalPages,
    pageSize,
    totalItems: totalCount,
  };

  return (
    <div className="space-y-3">
      {/* Filter Bar */}
      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        searchPlaceholder="Search role, company, location..."
        pills={filterPills}
        activePillId={activeFilter}
        onPillSelect={onFilterChange}
        onClearAll={onClearFilters}
      />

      {/* Applications Data Table */}
      <DataTable
        columns={columns}
        data={applications}
        keyExtractor={(row) => row.id}
        isLoading={isLoading}
        emptyTitle="No Applications Found"
        emptyDescription="You haven't submitted any applications matching this filter."
        emptyActionLabel="Explore Jobs"
        onEmptyAction={() => alert("Redirecting to job board...")}
        pagination={paginationState}
        onPageChange={onPageChange}
        onRowClick={onViewApplication}
      />
    </div>
  );
}
