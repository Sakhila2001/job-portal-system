"use client";

import React, { useState } from "react";
import DashboardShell from "@/components/layout/DashboardShell";
import ApplicantPipelineBoard from "@/features/recruiter/components/ApplicantPipelineBoard";
import StatusBadge from "@/components/shared/StatusBadge";
import { useRecruiterOverview } from "@/features/recruiter/hooks/useRecruiterOverview";
import { getRecruiterNavItems } from "@/lib/recruiter-nav";
import { ScheduleInterviewModal } from "@/features/recruiter/components/RecruiterModals";
import { ChevronDown } from "lucide-react";

const STAGES = ["Applied", "Screening", "Interview", "Offer", "Hired", "Rejected"] as const;

export default function RecruiterApplicantsPage() {
  const {
    allApplicants,
    allJobs,
    pipelineJobId,
    handlePipelineJobChange,
    selectedApplicantIds,
    toggleApplicantSelection,
    handleBulkApplicantAction,
    selectedApplicant,
    setSelectedApplicant,
    addInterview,
    tasks,
  } = useRecruiterOverview();

  const [stageDropdownOpen, setStageDropdownOpen] = useState(false);
  const [movedToast, setMovedToast] = useState<string | null>(null);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  const handleMoveStage = (stage: string) => {
    setStageDropdownOpen(false);
    setMovedToast(`${selectedApplicant?.candidateName} moved to "${stage}"`);
    setTimeout(() => { setMovedToast(null); }, 2500);
    setSelectedApplicant(null);
  };

  return (
    <DashboardShell
      brandTitle="JPS"
      brandSubtitle="Employer Dashboard"
      navItems={getRecruiterNavItems("/employer/applicants", tasks.length)}
      searchPlaceholder="Search candidates..."
      userAvatarText="JE"
      detailPanelOpen={!!selectedApplicant}
      onCloseDetailPanel={() => { setSelectedApplicant(null); setStageDropdownOpen(false); }}
      detailPanelTitle="Candidate Profile"
      detailPanelContent={
        selectedApplicant ? (
          <div className="space-y-4 text-[13px]">
            <div>
              <span className="text-slate-400 text-[11px] uppercase tracking-wider font-semibold">Candidate</span>
              <h4 className="font-semibold text-slate-900 text-[16px] mt-0.5">{selectedApplicant.candidateName}</h4>
              <p className="text-blue-600 font-mono text-[12px]">{selectedApplicant.candidateEmail}</p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg grid grid-cols-2 gap-3 text-center font-mono">
              <div>
                <div className="text-[10px] text-slate-400 font-sans uppercase">Screen Score</div>
                <div className="text-[18px] font-bold text-slate-900">{selectedApplicant.screeningScore ?? "—"}</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-sans uppercase">Experience</div>
                <div className="text-[18px] font-bold text-slate-900">{selectedApplicant.experienceYears}y</div>
              </div>
            </div>
            <div>
              <span className="text-slate-400 text-[11px]">Current Stage</span>
              <div className="mt-1">
                <StatusBadge status={selectedApplicant.status} />
              </div>
            </div>

            {/* Stage Mover */}
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <div className="relative">
                <button
                  onClick={() => setStageDropdownOpen(!stageDropdownOpen)}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2.5 rounded-lg transition text-[12px] flex items-center justify-center gap-2"
                >
                  Move to Stage <ChevronDown className="h-3.5 w-3.5" />
                </button>
                {stageDropdownOpen && (
                  <div className="absolute bottom-full mb-1 left-0 right-0 bg-white border border-slate-200 rounded-lg shadow-lg z-10 py-1 animate-in fade-in slide-in-from-bottom-2 duration-150">
                    {STAGES.map((stage) => (
                      <button
                        key={stage}
                        onClick={() => handleMoveStage(stage)}
                        className="w-full text-left px-3 py-2 text-[12px] font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition"
                      >
                        {stage}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => setIsScheduleOpen(true)}
                className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 font-semibold py-2 rounded-lg transition text-[12px]"
              >
                Schedule Interview
              </button>
            </div>
          </div>
        ) : null
      }
    >
      <ScheduleInterviewModal
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
        onInterviewScheduled={(interview) => addInterview(interview)}
      />

      {/* Toast */}
      {movedToast && (
        <div className="fixed top-6 right-6 z-50 bg-slate-900 text-white text-[13px] font-semibold px-4 py-3 rounded-lg shadow-xl animate-in slide-in-from-top-2 fade-in duration-200">
          ✓ {movedToast}
        </div>
      )}

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
          <div>
            <h1 className="text-[20px] font-bold text-slate-900 tracking-tight">Applicant Pipeline</h1>
            <p className="text-[13px] text-slate-500 mt-0.5">
              Review candidates, track screening scores, and manage hiring pipeline stages
            </p>
          </div>
        </div>

        <ApplicantPipelineBoard
          allApplicants={allApplicants}
          jobs={allJobs}
          selectedJobId={pipelineJobId}
          onJobChange={handlePipelineJobChange}
          selectedApplicantIds={selectedApplicantIds}
          onToggleSelectApplicant={toggleApplicantSelection}
          onBulkAction={handleBulkApplicantAction}
          onViewApplicant={(app) => setSelectedApplicant(app)}
        />
      </div>
    </DashboardShell>
  );
}
