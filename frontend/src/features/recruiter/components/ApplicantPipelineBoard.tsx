"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DataTable from "@/components/shared/DataTable";
import StatusBadge from "@/components/shared/StatusBadge";
import { Job, JobApplication, ColumnDef } from "@/lib/types";
import { Eye, Edit2, ChevronDown } from "lucide-react";

// Stage colours for the animated funnel bars
const STAGE_CONFIG = [
  { key: "applied",   label: "Applied",   color: "#60A5FA" }, // blue-400
  { key: "screened",  label: "Screened",  color: "#34D399" }, // emerald-400
  { key: "interview", label: "Interview", color: "#FBBF24" }, // amber-400
  { key: "offer",     label: "Offer",     color: "#A78BFA" }, // violet-400
] as const;

interface ApplicantPipelineBoardProps {
  /** Full list of all applicants across all jobs */
  allApplicants: JobApplication[];
  /** All job postings available for selection */
  jobs: Job[];
  /** Currently selected job ID */
  selectedJobId: string;
  onJobChange: (jobId: string) => void;
  selectedApplicantIds: string[];
  onToggleSelectApplicant: (id: string) => void;
  onBulkAction: (action: string) => void;
  onViewApplicant?: (app: JobApplication) => void;
  isLoading?: boolean;
}

export default function ApplicantPipelineBoard({
  allApplicants,
  jobs,
  selectedJobId,
  onJobChange,
  selectedApplicantIds,
  onToggleSelectApplicant,
  onBulkAction,
  onViewApplicant,
  isLoading = false,
}: ApplicantPipelineBoardProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Filter applicants to the selected job
  const applicants = useMemo(
    () => allApplicants.filter((a) => a.jobId === selectedJobId),
    [allApplicants, selectedJobId]
  );

  // Compute stage counts dynamically
  const stageCounts = useMemo(() => {
    const counts = { applied: 0, screened: 0, interview: 0, offer: 0 };
    applicants.forEach((a) => {
      const s = a.status.toLowerCase();
      if (s === "applied") counts.applied++;
      else if (s === "screening") counts.screened++;
      else if (s === "interview") counts.interview++;
      else if (s === "offer") counts.offer++;
    });
    return counts;
  }, [applicants]);

  const funnelSummary = useMemo(() => {
    const hired = applicants.filter((a) => a.status === "hired").length;
    const rejected = applicants.filter((a) => a.status === "rejected").length;
    const scored = applicants.filter((a) => a.screeningScore != null);
    const avg = scored.length
      ? Math.round(scored.reduce((s, a) => s + (a.screeningScore ?? 0), 0) / scored.length)
      : 0;
    const offers = applicants.filter((a) => a.status === "offer").length;
    const rate = offers ? `${Math.round((hired / offers) * 100)}%` : "—";
    return { hired, rejected, avgScreenScore: avg, offerAcceptRate: rate };
  }, [applicants]);

  const selectedJob = jobs.find((j) => j.id === selectedJobId);
  const maxStage = Math.max(stageCounts.applied, stageCounts.screened, stageCounts.interview, stageCounts.offer, 1);

  const columns: ColumnDef<JobApplication>[] = [
    {
      key: "candidateName",
      header: "Candidate",
      render: (row) => (
        <div>
          <div className="font-medium text-stone-900">{row.candidateName}</div>
          {row.candidateEmail && (
            <div className="text-[10px] text-stone-400 font-mono">{row.candidateEmail}</div>
          )}
        </div>
      ),
    },
    {
      key: "experienceYears",
      header: "Experience",
      render: (row) => (
        <span className="font-mono text-stone-700">
          {row.experienceYears ? `${row.experienceYears} yrs` : "—"}
        </span>
      ),
    },
    {
      key: "screeningScore",
      header: "Screen Score",
      align: "center",
      render: (row) => (
        <span className="font-mono font-semibold text-stone-900">{row.screeningScore ?? "—"}</span>
      ),
    },
    {
      key: "stage",
      header: "Stage",
      align: "center",
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: "action",
      header: "Action",
      align: "right",
      render: (row) => (
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); onViewApplicant?.(row); }}
            className="p-1 rounded text-stone-400 hover:text-stone-900 hover:bg-stone-100 transition"
            title="View Candidate Profile"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); alert(`Editing stage for ${row.candidateName}`); }}
            className="p-1 rounded text-stone-400 hover:text-stone-900 hover:bg-stone-100 transition"
            title="Edit Stage"
          >
            <Edit2 className="h-3.5 w-3.5" />
          </button>
          {row.statusCustomPill && (
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-300 px-2 py-0.5 rounded-full ml-1">
              {row.statusCustomPill}
            </span>
          )}
        </div>
      ),
    },
  ];

  const bulkNode = (
    <div className="flex items-center gap-1.5 text-[11px] flex-wrap">
      <span className="text-stone-400">Bulk:</span>
      {["Move Stage", "Send Assessment", "Schedule Interview", "Reject"].map((action) => (
        <button
          key={action}
          onClick={() => onBulkAction(action)}
          className={`px-2 py-1 rounded font-medium transition ${
            action === "Reject"
              ? "bg-rose-900/80 hover:bg-rose-800 text-rose-200"
              : "bg-stone-800 hover:bg-stone-700 text-white"
          }`}
        >
          {action}
        </button>
      ))}
    </div>
  );

  return (
    <div className="space-y-4 bg-white border border-stone-200 rounded-xl p-5 shadow-2xs">
      {/* Header with job selector dropdown */}
      <div className="flex items-center justify-between border-b border-stone-100 pb-3">
        <h3 className="text-[14px] font-medium text-stone-900 shrink-0">Applicants —</h3>

        {/* Custom Job Selector */}
        <div className="relative ml-2">
          <button
            onClick={() => setDropdownOpen((o) => !o)}
            className="flex items-center gap-1.5 font-semibold text-[14px] text-stone-900 hover:text-blue-600 transition group"
          >
            <span className="max-w-[220px] truncate">
              {selectedJob?.title ?? "Select Job"}
            </span>
            <ChevronDown
              className={`h-3.5 w-3.5 text-stone-400 group-hover:text-blue-500 transition-transform duration-200 ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -4, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.97 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute right-0 top-full mt-1.5 z-30 min-w-[240px] bg-white border border-stone-200 rounded-xl shadow-xl overflow-hidden"
              >
                {jobs
                  .filter((j) => j.status !== "draft")
                  .map((job) => (
                    <li key={job.id}>
                      <button
                        onClick={() => {
                          onJobChange(job.id);
                          setDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-[13px] flex items-center justify-between gap-3 transition ${
                          job.id === selectedJobId
                            ? "bg-blue-50 text-blue-700 font-semibold"
                            : "text-stone-700 hover:bg-stone-50"
                        }`}
                      >
                        <span className="truncate">{job.title}</span>
                        <span className="text-[11px] font-mono text-stone-400 shrink-0">
                          {job.applicantsCount} applicants
                        </span>
                      </button>
                    </li>
                  ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Animated Stage Funnel Bars */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedJobId}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22 }}
          className="grid grid-cols-4 gap-3"
        >
          {STAGE_CONFIG.map((stage, idx) => {
            const count = stageCounts[stage.key];
            const barPct = (count / maxStage) * 100;
            return (
              <div key={stage.key} className="flex flex-col gap-1.5">
                {/* Label + count */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-stone-500 uppercase tracking-wider font-medium">
                    {stage.label}
                  </span>
                  <span className="text-[13px] font-semibold font-mono text-stone-900">{count}</span>
                </div>
                {/* Animated bar track */}
                <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: stage.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${barPct}%` }}
                    transition={{
                      delay: idx * 0.06,
                      duration: 0.6,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  />
                </div>
              </div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Applicant Data Table */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`table-${selectedJobId}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <DataTable
            columns={columns}
            data={applicants}
            keyExtractor={(row) => row.id}
            isLoading={isLoading}
            emptyTitle="No Applicants Yet"
            emptyDescription="No candidates have applied to this posting yet."
            selectedIds={selectedApplicantIds}
            onToggleSelectRow={onToggleSelectApplicant}
            onRowClick={onViewApplicant}
            bulkActionsNode={bulkNode}
          />
        </motion.div>
      </AnimatePresence>

      {/* Bottom Funnel Summary */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`funnel-${selectedJobId}`}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, delay: 0.05 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-stone-100"
        >
          {[
            { label: "Hired", value: funnelSummary.hired },
            { label: "Rejected", value: funnelSummary.rejected },
            { label: "Avg Score", value: funnelSummary.avgScreenScore },
            { label: "Offer Accept", value: funnelSummary.offerAcceptRate },
          ].map((item) => (
            <div key={item.label} className="p-2.5 bg-stone-50/70 border border-stone-100 rounded-lg text-center">
              <div className="text-[10px] text-stone-500 font-medium">{item.label}</div>
              <div className="text-[16px] font-semibold text-stone-900 font-mono">{item.value}</div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
