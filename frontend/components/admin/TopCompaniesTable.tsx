"use client";

import React from "react";
import DataTable from "../shared/DataTable";
import StatusBadge from "../shared/StatusBadge";
import { Company, ColumnDef } from "@/lib/types";

interface TopCompaniesTableProps {
  companies: Company[];
  isLoading?: boolean;
  onSelectCompany?: (company: Company) => void;
}

export default function TopCompaniesTable({
  companies,
  isLoading = false,
  onSelectCompany,
}: TopCompaniesTableProps) {
  const columns: ColumnDef<Company>[] = [
    {
      key: "displayName",
      header: "Company",
      render: (row) => <span className="font-medium text-stone-900">{row.displayName}</span>,
    },
    {
      key: "openJobsCount",
      header: "Open Jobs",
      align: "center",
      render: (row) => <span className="font-mono text-stone-800 font-semibold">{row.openJobsCount}</span>,
    },
    {
      key: "applicantsCount",
      header: "Applicants",
      align: "center",
      render: (row) => <span className="font-mono text-stone-800">{row.applicantsCount.toLocaleString()}</span>,
    },
    {
      key: "rating",
      header: "Rating",
      align: "center",
      render: (row) => <span className="font-mono text-stone-700">{row.rating}</span>,
    },
    {
      key: "plan",
      header: "Plan",
      align: "center",
      render: (row) => <StatusBadge status={row.plan} />,
    },
  ];

  return (
    <div className="space-y-2">
      <div className="px-1">
        <h3 className="text-[14px] font-medium text-stone-900">Top Companies by Activity</h3>
      </div>

      <DataTable
        columns={columns}
        data={companies}
        keyExtractor={(row) => row.id}
        isLoading={isLoading}
        emptyTitle="No Companies Found"
        onRowClick={onSelectCompany}
      />
    </div>
  );
}
