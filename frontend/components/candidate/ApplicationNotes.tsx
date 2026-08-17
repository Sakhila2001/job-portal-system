"use client";

import React, { useState, useEffect } from "react";
import { StickyNote, Save, Calendar, Clock } from "lucide-react";

export interface ApplicationNote {
  applicationId: string;
  recruiterName?: string;
  interviewFeedback?: string;
  followUpDate?: string;
  salaryDiscussion?: string;
  privateNotes?: string;
  lastUpdated: string;
}

interface Props {
  applications: Array<{ id: string; jobTitle: string; companyName: string; status: string }>;
  notes: ApplicationNote[];
}

export default function ApplicationNotes({ applications, notes: initialNotes }: Props) {
  const [selectedAppId, setSelectedAppId] = useState<string>(applications[0]?.id || "");
  const [notes, setNotes] = useState<ApplicationNote[]>(initialNotes);
  const [currentNote, setCurrentNote] = useState<Partial<ApplicationNote>>({});

  useEffect(() => {
    const existing = notes.find((n) => n.applicationId === selectedAppId);
    if (existing) {
      setCurrentNote(existing);
    } else {
      setCurrentNote({ applicationId: selectedAppId });
    }
  }, [selectedAppId, notes]);

  const handleChange = (field: keyof ApplicationNote, value: string) => {
    setCurrentNote((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const updatedNote: ApplicationNote = {
      ...(currentNote as ApplicationNote),
      applicationId: selectedAppId,
      lastUpdated: new Date().toISOString(),
    };

    setNotes((prev) => {
      const exists = prev.some((n) => n.applicationId === selectedAppId);
      if (exists) {
        return prev.map((n) => (n.applicationId === selectedAppId ? updatedNote : n));
      } else {
        return [...prev, updatedNote];
      }
    });
  };

  const selectedApp = applications.find((a) => a.id === selectedAppId);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center gap-2 mb-6">
          <div className="bg-slate-100 p-2 rounded-lg text-slate-700">
            <StickyNote className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-semibold text-slate-900">Application Notes</h2>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Select Application</label>
          <select
            value={selectedAppId}
            onChange={(e) => setSelectedAppId(e.target.value)}
            className="w-full md:w-1/2 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 text-slate-700 bg-white"
          >
            {applications.map((app) => (
              <option key={app.id} value={app.id}>
                {app.jobTitle} at {app.companyName} ({app.status})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="p-6 bg-slate-50">
        {selectedApp ? (
          <div className="max-w-3xl space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Recruiter Name</label>
                <input
                  type="text"
                  value={currentNote.recruiterName || ""}
                  onChange={(e) => handleChange("recruiterName", e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                  placeholder="e.g. Jane Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Expected / Discussed Salary</label>
                <input
                  type="text"
                  value={currentNote.salaryDiscussion || ""}
                  onChange={(e) => handleChange("salaryDiscussion", e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                  placeholder="e.g. $120k base + equity"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Follow-Up Date</label>
              <div className="relative md:w-1/2">
                <Calendar className="w-5 h-5 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="date"
                  value={currentNote.followUpDate || ""}
                  onChange={(e) => handleChange("followUpDate", e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 text-slate-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Interview Feedback</label>
              <textarea
                value={currentNote.interviewFeedback || ""}
                onChange={(e) => handleChange("interviewFeedback", e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 resize-none"
                placeholder="Technical interview went well. Need to brush up on System Design."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Private Notes</label>
              <textarea
                value={currentNote.privateNotes || ""}
                onChange={(e) => handleChange("privateNotes", e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-amber-200 bg-amber-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                placeholder="Red flags about work-life balance from Glassdoor..."
              />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                {currentNote.lastUpdated ? (
                  <>
                    <Clock className="w-4 h-4" />
                    Last updated: {new Date(currentNote.lastUpdated).toLocaleString()}
                  </>
                ) : (
                  "No notes saved yet."
                )}
              </div>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium text-sm shadow-sm"
              >
                <Save className="w-4 h-4" />
                Save Notes
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-slate-500">
            <p>No application selected.</p>
          </div>
        )}
      </div>
    </div>
  );
}
