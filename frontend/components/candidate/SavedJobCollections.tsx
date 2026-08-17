"use client";

import React, { useState } from "react";
import { Folder, FolderPlus, MapPin, DollarSign, Clock, Trash2, ExternalLink } from "lucide-react";

export interface SavedJobCollection {
  id: string;
  name: string;
  icon: string;
  color: string;
  jobs: Array<{
    id: string;
    title: string;
    company: string;
    location: string;
    salaryText: string;
    expiresIn?: string;
  }>;
}

interface Props {
  collections: SavedJobCollection[];
}

export default function SavedJobCollections({ collections: initialCollections }: Props) {
  const [collections, setCollections] = useState<SavedJobCollection[]>(initialCollections);
  const [activeCollectionId, setActiveCollectionId] = useState<string>(collections[0]?.id || "");

  const activeCollection = collections.find((c) => c.id === activeCollectionId);

  const handleRemoveJob = (collectionId: string, jobId: string) => {
    setCollections((prev) =>
      prev.map((c) =>
        c.id === collectionId
          ? { ...c, jobs: c.jobs.filter((j) => j.id !== jobId) }
          : c
      )
    );
  };

  // Mock match percentages for saved jobs
  const getMockMatchScore = (title: string) => {
    if (title.toLowerCase().includes("backend") || title.toLowerCase().includes("php")) return 92;
    if (title.toLowerCase().includes("lead") || title.toLowerCase().includes("architect")) return 86;
    return 74;
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-base font-semibold text-slate-900 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-slate-900"></span>
            Saved Collections
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">Organize and sort your bookmarked opportunities</p>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 text-slate-700 rounded-md hover:bg-slate-50 text-xs font-medium">
          <FolderPlus className="w-3.5 h-3.5" />
          New Folder
        </button>
      </div>

      {/* Modern Pill-Style Tabs */}
      <div className="flex flex-wrap gap-2 mb-5 border-b border-slate-100 pb-3">
        {collections.map((collection) => {
          const isActive = activeCollectionId === collection.id;
          return (
            <button
              key={collection.id}
              onClick={() => setActiveCollectionId(collection.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold ${
                isActive
                  ? "bg-slate-900 text-white"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100"
              }`}
            >
              <span className="text-sm">{collection.icon}</span>
              <span>{collection.name}</span>
              <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold ${
                isActive ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
              }`}>
                {collection.jobs.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Collection Jobs Grid */}
      {activeCollection ? (
        <div>
          {activeCollection.jobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeCollection.jobs.map((job) => {
                const matchScore = getMockMatchScore(job.title);
                return (
                  <div
                    key={job.id}
                    className="p-5 border border-slate-100 rounded-xl bg-white flex flex-col h-full relative group"
                  >
                    <div className="flex justify-between items-start mb-3 gap-2">
                      <div>
                        <h3 className="font-semibold text-slate-900 text-sm leading-snug">
                          {job.title}
                        </h3>
                        <p className="text-xs font-medium text-slate-500 mt-0.5">{job.company}</p>
                      </div>
                      
                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                          matchScore >= 90
                            ? "text-emerald-700 bg-emerald-50 border-emerald-100"
                            : matchScore >= 80
                            ? "text-blue-700 bg-blue-50 border-blue-100"
                            : "text-amber-700 bg-amber-50 border-amber-100"
                        }`}>
                          {matchScore}% match
                        </span>
                        
                        <button
                          onClick={() => handleRemoveJob(activeCollection.id, job.id)}
                          className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                          title="Remove bookmark"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1.5 mb-4 flex-grow text-xs font-medium text-slate-500">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-slate-700 font-semibold">{job.salaryText}</span>
                      </div>
                    </div>

                    <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between gap-3">
                      {job.expiresIn ? (
                        <div className="flex items-center gap-1 text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-100/60 px-2 py-1 rounded-md">
                          <Clock className="w-3 h-3 text-amber-500" />
                          <span>Expires in {job.expiresIn}</span>
                        </div>
                      ) : (
                        <span className="text-[10px] text-slate-400 font-mono">Added 3d ago</span>
                      )}

                      <button className="flex items-center justify-center gap-1.5 bg-slate-900 text-white px-3.5 py-1.5 rounded-md text-[11px] font-semibold hover:bg-slate-800 shrink-0">
                        <span>Apply</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-12 text-center text-slate-400">
              <Folder className="w-10 h-10 mx-auto mb-2 text-slate-300" />
              <p className="text-xs font-medium">No jobs saved in this collection yet.</p>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
