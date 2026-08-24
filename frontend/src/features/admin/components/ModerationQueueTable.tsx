"use client";

import React from "react";
import DataTable from "@/components/shared/DataTable";
import StatusBadge from "@/components/shared/StatusBadge";
import { ModerationItem, ColumnDef } from "@/lib/types";
import { Eye } from "lucide-react";

interface ModerationQueueTableProps {
  items: ModerationItem[];
  isLoading?: boolean;
  onViewItem?: (item: ModerationItem) => void;
}

export default function ModerationQueueTable({
  items,
  isLoading = false,
  onViewItem,
}: ModerationQueueTableProps) {
  const columns: ColumnDef<ModerationItem>[] = [
    {
      key: "type",
      header: "Type",
      width: "100px",
      render: (row) => <span className="font-medium text-stone-900">{row.type}</span>,
    },
    {
      key: "item",
      header: "Item",
      render: (row) => <span className="font-normal text-stone-800">{row.item}</span>,
    },
    {
      key: "submittedBy",
      header: "Submitted By",
      render: (row) => (
        <span className={`text-[12px] ${row.submittedBy.includes("@") ? "text-blue-600 underline font-mono" : "text-stone-600 font-mono"}`}>
          {row.submittedBy}
        </span>
      ),
    },
    {
      key: "age",
      header: "Age",
      width: "70px",
      render: (row) => <span className="text-stone-500 font-mono text-[12px]">{row.age}</span>,
    },
    {
      key: "status",
      header: "Status",
      width: "110px",
      render: (row) => <StatusBadge status={row.status} showDot />,
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
            onViewItem && onViewItem(row);
          }}
          className="p-1 rounded text-stone-400 hover:text-stone-900 hover:bg-stone-100 transition"
          title="Inspect Moderation Item"
        >
          <Eye className="h-4 w-4" />
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-[14px] font-medium text-stone-900">Moderation Queue</h3>
        <span className="text-[11px] text-stone-500 font-mono">27 items in queue — showing 5 oldest</span>
      </div>

      <DataTable
        columns={columns}
        data={items}
        keyExtractor={(row) => row.id}
        isLoading={isLoading}
        emptyTitle="Moderation Queue Clean"
        emptyDescription="All submitted reviews, jobs, and user edits have been reviewed."
        onRowClick={onViewItem}
      />
    </div>
  );
}
