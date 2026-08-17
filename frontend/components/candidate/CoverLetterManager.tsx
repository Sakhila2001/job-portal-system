"use client";

import React, { useState } from "react";
import { FileEdit, Plus, Copy, Trash2, FileText, Check } from "lucide-react";

export interface CoverLetter {
  id: string;
  jobTitle: string;
  companyName: string;
  createdDate: string;
  content: string;
  applicationId?: string;
}

interface Props {
  coverLetters: CoverLetter[];
}

export default function CoverLetterManager({ coverLetters: initialCoverLetters }: Props) {
  const [coverLetters, setCoverLetters] = useState<CoverLetter[]>(initialCoverLetters);
  const [selectedId, setSelectedId] = useState<string | null>(coverLetters[0]?.id || null);
  const [isCreating, setIsCreating] = useState(false);
  const [copied, setCopied] = useState(false);

  const [newJobTitle, setNewJobTitle] = useState("");
  const [newCompany, setNewCompany] = useState("");
  const [newContent, setNewContent] = useState("");

  const selectedLetter = coverLetters.find((c) => c.id === selectedId);

  const handleCreate = () => {
    if (!newJobTitle || !newCompany || !newContent) return;
    const newLetter: CoverLetter = {
      id: Date.now().toString(),
      jobTitle: newJobTitle,
      companyName: newCompany,
      createdDate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      content: newContent,
    };
    setCoverLetters([newLetter, ...coverLetters]);
    setSelectedId(newLetter.id);
    setIsCreating(false);
    setNewJobTitle("");
    setNewCompany("");
    setNewContent("");
  };

  const handleDelete = (id: string) => {
    const updated = coverLetters.filter((c) => c.id !== id);
    setCoverLetters(updated);
    if (selectedId === id) {
      setSelectedId(updated[0]?.id || null);
    }
  };

  const handleCopy = () => {
    if (selectedLetter) {
      navigator.clipboard.writeText(selectedLetter.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleUpdateContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (selectedId) {
      setCoverLetters((prev) =>
        prev.map((c) => (c.id === selectedId ? { ...c, content: e.target.value } : c))
      );
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden transition-all duration-200">
      {/* Sleek Minimal Header */}
      <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-slate-100 p-1.5 rounded-lg text-slate-700">
            <FileEdit className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-[15px] font-bold text-slate-900 leading-none">Cover Letters</h2>
            <p className="text-[12px] text-slate-500 mt-1">Manage cover letters per job</p>
          </div>
        </div>
        <button
          onClick={() => {
            setIsCreating(true);
            setSelectedId(null);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all text-[11px] font-bold active:scale-95 shadow-2xs"
        >
          <Plus className="w-3.5 h-3.5" />
          Create New
        </button>
      </div>

      <div className="flex flex-col md:flex-row h-[520px] divide-y md:divide-y-0 md:divide-x divide-slate-100">
        {/* Left Panel: Cover Letters List */}
        <div className="w-full md:w-2/5 overflow-y-auto bg-slate-50/50 p-4 space-y-2">
          {coverLetters.length === 0 && !isCreating ? (
            <div className="text-center py-10 text-slate-400">
              <FileText className="w-8 h-8 mx-auto mb-2 text-slate-300" />
              <p className="text-[11px] font-medium">No cover letters saved yet.</p>
            </div>
          ) : (
            coverLetters.map((letter) => {
              const isSelected = selectedId === letter.id && !isCreating;
              return (
                <button
                  key={letter.id}
                  onClick={() => {
                    setSelectedId(letter.id);
                    setIsCreating(false);
                  }}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 ${
                    isSelected
                      ? "bg-white border-slate-300 shadow-xs scale-102"
                      : "bg-white border-slate-100 hover:border-slate-300"
                  }`}
                >
                  <div className="font-bold text-slate-900 text-[13px] leading-tight mb-1">{letter.jobTitle}</div>
                  <div className="text-[11px] text-slate-400 font-semibold mb-2">{letter.companyName}</div>
                  <div className="text-[10px] text-slate-400 font-mono">Date: {letter.createdDate}</div>
                </button>
              );
            })
          )}
        </div>

        {/* Right Panel: Selected content preview / Editor */}
        <div className="w-full md:w-3/5 p-5 overflow-y-auto bg-white flex flex-col">
          {isCreating ? (
            <div className="space-y-4 flex-1">
              <h3 className="text-[13px] font-bold text-slate-950 uppercase tracking-wider">Create Cover Letter</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Job Title</label>
                  <input
                    type="text"
                    value={newJobTitle}
                    onChange={(e) => setNewJobTitle(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-[12px] focus:outline-none focus:border-slate-400 bg-slate-50/50"
                    placeholder="e.g. Frontend Developer"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Company</label>
                  <input
                    type="text"
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-[12px] focus:outline-none focus:border-slate-400 bg-slate-50/50"
                    placeholder="e.g. Acme Corp"
                  />
                </div>
              </div>
              
              <div className="flex-1 flex flex-col">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Letter Content</label>
                <textarea
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  rows={10}
                  className="w-full flex-1 p-3 border border-slate-200 rounded-lg text-[12px] focus:outline-none focus:border-slate-400 bg-slate-50/50 resize-none font-sans leading-relaxed"
                  placeholder="Dear Hiring Manager, ..."
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  onClick={() => setIsCreating(false)}
                  className="px-3.5 py-1.5 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 text-[11px] font-bold transition-all active:scale-95"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreate}
                  className="px-4 py-1.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 text-[11px] font-bold transition-all active:scale-95 disabled:opacity-40"
                  disabled={!newJobTitle || !newCompany || !newContent}
                >
                  Save Letter
                </button>
              </div>
            </div>
          ) : selectedLetter ? (
            <div className="flex flex-col h-full space-y-4">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h3 className="font-bold text-slate-900 text-[14px] leading-tight">{selectedLetter.jobTitle}</h3>
                  <p className="text-[12px] font-medium text-slate-500 mt-1">{selectedLetter.companyName}</p>
                </div>
                
                <div className="flex gap-1.5">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 px-2.5 py-1 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors text-[10px] font-bold active:scale-95"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copied" : "Copy"}</span>
                  </button>
                  <button
                    onClick={() => handleDelete(selectedLetter.id)}
                    className="flex items-center gap-1 px-2.5 py-1 border border-rose-200 text-rose-600 rounded-lg hover:bg-rose-50 transition-colors text-[10px] font-bold active:scale-95"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
              
              <textarea
                value={selectedLetter.content}
                onChange={handleUpdateContent}
                className="flex-1 w-full p-3 border border-slate-100 rounded-xl focus:outline-none focus:border-slate-300 resize-none text-slate-700 text-[12px] leading-relaxed font-sans min-h-[250px] bg-slate-50/20"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-slate-400 text-[12px] font-medium">
              Select or create a cover letter.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
