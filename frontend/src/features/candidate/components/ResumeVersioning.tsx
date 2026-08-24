"use client";

import React, { useState } from "react";
import { FileText, Trash2, Upload, Star, X } from "lucide-react";

interface ResumeVersion {
  id: string;
  label: string;
  fileName: string;
  targetRole: string;
  uploadedDate: string;
  isDefault: boolean;
  size: string;
}

interface Props {
  resumes: ResumeVersion[];
  onSetDefault: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function ResumeVersioning({ resumes, onSetDefault, onDelete }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newLabel, setNewLabel] = useState("");
  const [newTarget, setNewTarget] = useState("");

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(false);
    setNewLabel("");
    setNewTarget("");
    alert("Upload simulated successfully!");
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-md relative overflow-hidden transition-all duration-200">
      {/* Sleek Minimal Header */}
      <div className="border-b border-slate-100 p-5 bg-slate-50/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-slate-100 p-1.5 rounded-lg text-slate-700">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-[15px] font-bold text-slate-900 leading-none">Resume Versions</h2>
            <p className="text-[12px] text-slate-500 mt-1">Manage multiple tailored resumes</p>
          </div>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white text-[11px] font-bold rounded-lg hover:bg-slate-800 transition-all active:scale-95 shadow-2xs"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Upload</span>
        </button>
      </div>

      <div className="p-5 space-y-4">
        {resumes.length === 0 ? (
          <div className="text-center text-slate-400 py-10">
            <FileText className="w-10 h-10 mx-auto mb-2 text-slate-300" />
            <p className="text-[12px] font-medium">No resumes uploaded yet.</p>
          </div>
        ) : (
          resumes.map((resume) => (
            <div
              key={resume.id}
              className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-300 ${
                resume.isDefault
                  ? "bg-emerald-50/10 border-emerald-200"
                  : "bg-white border-slate-100 hover:border-slate-300"
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-[13px] font-bold text-slate-900 leading-none">{resume.label}</h3>
                  {resume.isDefault && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-extrabold bg-emerald-50 border border-emerald-200 text-emerald-800 uppercase tracking-wider">
                      <Star className="w-2.5 h-2.5 fill-current" />
                      Default
                    </span>
                  )}
                </div>
                
                <div className="text-[11px] text-slate-500 font-medium flex flex-wrap items-center gap-2">
                  <code className="bg-slate-50 border border-slate-200/50 px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-700">
                    {resume.fileName}
                  </code>
                  <span>•</span>
                  <span>{resume.size}</span>
                </div>
                
                <div className="flex items-center gap-2 text-[10px] font-bold">
                  <span className="bg-blue-50 text-blue-700 border border-blue-100/60 px-2 py-0.5 rounded-md uppercase tracking-wider">
                    Target: {resume.targetRole}
                  </span>
                  <span className="text-slate-400 font-medium font-sans">Uploaded: {resume.uploadedDate}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {!resume.isDefault && (
                  <button
                    onClick={() => onSetDefault(resume.id)}
                    className="px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-slate-900 transition-all active:scale-95 shadow-2xs"
                  >
                    Set Default
                  </button>
                )}
                <button
                  onClick={() => onDelete(resume.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                  title="Delete Resume"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 rounded-2xl backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-100">
            <div className="flex justify-between items-center p-4 border-b border-slate-100">
              <h3 className="font-bold text-[14px] text-slate-900">Upload New Resume</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleUploadSubmit} className="p-4 space-y-3.5">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Resume Label</label>
                <input
                  type="text"
                  required
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                  placeholder="e.g. Frontend Dev Variant"
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-[12px] focus:outline-none focus:border-slate-400"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Target Role</label>
                <input
                  type="text"
                  required
                  value={newTarget}
                  onChange={(e) => setNewTarget(e.target.value)}
                  placeholder="e.g. React Engineer"
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-[12px] focus:outline-none focus:border-slate-400"
                />
              </div>
              <div className="border-2 border-dashed border-slate-200 rounded-lg p-5 flex flex-col items-center justify-center bg-slate-50 cursor-pointer hover:bg-slate-100/50 transition-colors">
                <Upload className="w-6 h-6 text-slate-400 mb-1.5" />
                <p className="text-[12px] font-bold text-slate-600 mb-0.5">Click to select file</p>
                <p className="text-[10px] text-slate-400 font-medium">PDF or DOCX (Max 5MB)</p>
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3.5 py-1.5 text-[11px] font-bold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-all active:scale-95"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-[11px] font-bold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-all active:scale-95 shadow-2xs"
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
