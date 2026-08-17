"use client";

import React from "react";
import { Check, X } from "lucide-react";

interface ApplicationTimelineStep {
  stage: "applied" | "screening" | "interview" | "offer" | "hired" | "rejected";
  label: string;
  date?: string;
  note?: string;
  active: boolean;
  completed: boolean;
}

interface Props {
  applicationId: string;
  jobTitle: string;
  companyName: string;
  steps: ApplicationTimelineStep[];
}

export default function ApplicationTimeline({ applicationId, jobTitle, companyName, steps }: Props) {
  const activeStepIndex = steps.findIndex((step) => step.active);
  const activeStep = activeStepIndex !== -1 ? steps[activeStepIndex] : null;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-lg font-bold text-slate-900">{jobTitle}</h2>
          <p className="text-slate-500 text-sm">{companyName}</p>
        </div>
        <div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {activeStep ? activeStep.label : "Status"}
          </span>
        </div>
      </div>

      <div className="relative">
        {/* Connecting line */}
        <div className="absolute top-4 left-4 right-4 h-0.5 bg-slate-200" />
        
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const isRejected = step.stage === "rejected";

            return (
              <div key={index} className="flex flex-col items-center relative z-10 w-1/5">
                {step.completed && !isRejected ? (
                  <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center border-2 border-white ring-4 ring-white">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                ) : step.active && !isRejected ? (
                  <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center border-2 border-slate-900 ring-4 ring-white relative">
                    <div className="h-2 w-2 rounded-full bg-slate-900 animate-pulse" />
                  </div>
                ) : isRejected ? (
                  <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center border-2 border-white ring-4 ring-white">
                    <X className="w-4 h-4 text-red-600" />
                  </div>
                ) : (
                  <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center border-2 border-white ring-4 ring-white" />
                )}

                <div className="mt-3 text-center">
                  <p className={`text-sm font-medium ${step.active || step.completed ? "text-slate-900" : "text-slate-400"} ${isRejected ? "text-red-600" : ""}`}>
                    {step.label}
                  </p>
                  {step.date && <p className="text-xs text-slate-500 mt-1">{step.date}</p>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {activeStep?.note && (
        <div className="mt-8 bg-slate-50 rounded-lg p-4 text-sm text-slate-700 border border-slate-100 relative">
          <div className="absolute -top-2 left-[10%] w-4 h-4 bg-slate-50 border-t border-l border-slate-100 transform rotate-45" />
          <p className="relative z-10">{activeStep.note}</p>
        </div>
      )}
    </div>
  );
}
