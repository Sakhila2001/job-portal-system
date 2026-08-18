"use client";

import React, { useState } from "react";
import {
  Plus, Calendar, X, ChevronRight, ChevronLeft, CheckCircle2,
  Briefcase, MapPin, GraduationCap, Award, Tag, ImagePlus, DollarSign,
  FileText, Clock, Users, Sparkles
} from "lucide-react";

/* ─────────────────────────── TYPES ─────────────────────────── */

interface CreateJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJobCreated: (newJob: any) => void;
}

interface ScheduleInterviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInterviewScheduled: (interview: any) => void;
}

/* ─────────────────── SHARED FIELD COMPONENTS ────────────────── */

const inputCls = "w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-[13px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 font-medium transition placeholder:text-slate-400";
const selectCls = inputCls;
const labelCls = "text-[11px] font-semibold text-slate-500 uppercase tracking-wider";

function Field({ label, required, children, hint, span }: { label: string; required?: boolean; children: React.ReactNode; hint?: string; span?: number }) {
  return (
    <div className={`space-y-1.5 ${span === 2 ? "sm:col-span-2" : ""} ${span === 3 ? "sm:col-span-3" : ""}`}>
      <label className={labelCls}>
        {label}{required && <span className="text-rose-500 ml-0.5">*</span>}
      </label>
      {children}
      {hint && <p className="text-[10px] text-slate-400 mt-0.5">{hint}</p>}
    </div>
  );
}

function TagInput({ value, onChange, placeholder }: { value: string[]; onChange: (v: string[]) => void; placeholder: string }) {
  const [input, setInput] = useState("");
  const handleKey = (e: React.KeyboardEvent) => {
    if ((e.key === "Enter" || e.key === ",") && input.trim()) {
      e.preventDefault();
      if (!value.includes(input.trim())) {
        onChange([...value, input.trim()]);
      }
      setInput("");
    }
    if (e.key === "Backspace" && !input && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  };
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 flex flex-wrap gap-1.5 items-center min-h-[40px] focus-within:ring-2 focus-within:ring-slate-900/10 focus-within:border-slate-400 transition">
      {value.map((tag, i) => (
        <span key={i} className="inline-flex items-center gap-1 bg-slate-200 text-slate-700 text-[11px] font-semibold px-2 py-0.5 rounded-md">
          {tag}
          <button type="button" onClick={() => onChange(value.filter((_, idx) => idx !== i))} className="text-slate-400 hover:text-slate-700">&times;</button>
        </span>
      ))}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKey}
        placeholder={value.length === 0 ? placeholder : ""}
        className="flex-1 min-w-[100px] bg-transparent border-none outline-none text-[13px] text-slate-900 font-medium placeholder:text-slate-400"
      />
    </div>
  );
}

/* ──────────────────── STEP INDICATOR ──────────────────── */

const STEPS = [
  { key: "basics", label: "Basic Info", icon: Briefcase },
  { key: "details", label: "Job Details", icon: FileText },
  { key: "compensation", label: "Compensation", icon: DollarSign },
  { key: "requirements", label: "Requirements", icon: GraduationCap },
  { key: "extras", label: "Benefits & Tags", icon: Award },
  { key: "review", label: "Review & Publish", icon: CheckCircle2 },
] as const;

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-1 overflow-x-auto pb-1">
      {STEPS.map((step, i) => {
        const Icon = step.icon;
        const isActive = i === current;
        const isDone = i < current;
        return (
          <React.Fragment key={step.key}>
            {i > 0 && <div className={`hidden sm:block w-6 h-px ${isDone ? "bg-slate-900" : "bg-slate-200"}`} />}
            <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md whitespace-nowrap text-[11px] font-semibold transition-colors ${
              isActive ? "bg-slate-900 text-white" : isDone ? "bg-slate-100 text-slate-700" : "text-slate-400"
            }`}>
              {isDone ? <CheckCircle2 className="h-3 w-3" /> : <Icon className="h-3 w-3" />}
              <span className="hidden sm:inline">{step.label}</span>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}

/* ────────────────── CREATE JOB MODAL (FULL SCHEMA) ────────────────── */

export function CreateJobModal({ isOpen, onClose, onJobCreated }: CreateJobModalProps) {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  // Step 1: Basics
  const [title, setTitle] = useState("");
  const [designation, setDesignation] = useState("Senior Software Engineer");
  const [department, setDepartment] = useState("Engineering");
  const [employmentType, setEmploymentType] = useState("full_time");
  const [workMode, setWorkMode] = useState("remote");
  const [seniorityLevel, setSeniorityLevel] = useState("senior");

  // Step 2: Details
  const [description, setDescription] = useState("");
  const [minExpMonths, setMinExpMonths] = useState("24");
  const [maxExpMonths, setMaxExpMonths] = useState("72");
  const [locations, setLocations] = useState<string[]>(["Kathmandu, Nepal"]);
  const [expiresAt, setExpiresAt] = useState("");
  const [status, setStatus] = useState("draft");

  // Step 3: Compensation
  const [minSalary, setMinSalary] = useState("800000");
  const [maxSalary, setMaxSalary] = useState("1800000");
  const [salaryCurrency, setSalaryCurrency] = useState("NPR");
  const [showSalary, setShowSalary] = useState(true);

  // Step 4: Requirements
  const [skills, setSkills] = useState<{ name: string; importance: string; isMandatory: boolean }[]>([
    { name: "React", importance: "must_have", isMandatory: true },
    { name: "Node.js", importance: "must_have", isMandatory: true },
    { name: "TypeScript", importance: "nice_to_have", isMandatory: false },
  ]);
  const [newSkill, setNewSkill] = useState("");
  const [qualifications, setQualifications] = useState<{ name: string; level: string; isRequired: boolean }[]>([
    { name: "Bachelor's in Computer Science", level: "bachelors", isRequired: true },
  ]);
  const [newQualification, setNewQualification] = useState("");

  // Step 5: Benefits, Tags, Media
  const [benefits, setBenefits] = useState<string[]>(["Health Insurance", "Remote Work", "Flexible Hours"]);
  const [tags, setTags] = useState<string[]>(["startup", "tech", "growth"]);
  const [mediaUrls, setMediaUrls] = useState<string[]>([]);
  const [newMediaUrl, setNewMediaUrl] = useState("");

  if (!isOpen) return null;

  const addSkill = () => {
    if (newSkill.trim() && !skills.find(s => s.name === newSkill.trim())) {
      setSkills([...skills, { name: newSkill.trim(), importance: "nice_to_have", isMandatory: false }]);
      setNewSkill("");
    }
  };

  const addQualification = () => {
    if (newQualification.trim()) {
      setQualifications([...qualifications, { name: newQualification.trim(), level: "bachelors", isRequired: false }]);
      setNewQualification("");
    }
  };

  const addMedia = () => {
    if (newMediaUrl.trim()) {
      setMediaUrls([...mediaUrls, newMediaUrl.trim()]);
      setNewMediaUrl("");
    }
  };

  const canAdvance = () => {
    if (step === 0) return !!title.trim();
    return true;
  };

  const handlePublish = () => {
    // API-compliant backend payload
    const payload = {
      title,
      designation,
      department,
      employmentType,
      workMode,
      seniorityLevel,
      description: description || "Exciting opportunity to build scalable products.",
      minExperienceMonths: parseInt(minExpMonths) || 0,
      maxExperienceMonths: parseInt(maxExpMonths) || 0,
      salaryMin: parseInt(minSalary) || 0,
      salaryMax: parseInt(maxSalary) || 0,
      salaryCurrency,
      showSalary,
      location: locations[0] || "Kathmandu, Nepal",
      locations,
      expiresAt: expiresAt ? new Date(expiresAt).toISOString() : undefined,
      status: status === "published" ? "published" : "draft",
      skills,
      qualifications,
      benefits,
      tags,
      media: mediaUrls.map((url) => ({ mediaType: "image", mediaUrl: url })),
    };

    const newJob = {
      id: `job-${Date.now()}`,
      companyId: "comp-1",
      companyName: "JPS Employer Corp",
      title,
      designation,
      department,
      employmentType,
      workMode: workMode === "remote" ? "Remote" : workMode === "hybrid" ? "Hybrid" : "On-site",
      seniorityLevel,
      location: locations[0] || "Kathmandu, Nepal",
      minExperienceMonths: parseInt(minExpMonths) || 0,
      maxExperienceMonths: parseInt(maxExpMonths) || 0,
      minSalary: parseInt(minSalary) || 0,
      maxSalary: parseInt(maxSalary) || 0,
      salaryCurrency,
      showSalary,
      salaryText: `${salaryCurrency} ${(parseInt(minSalary) / 100000).toFixed(1)}L – ${(parseInt(maxSalary) / 100000).toFixed(1)}L / year`,
      applicantsCount: 0,
      viewsCount: 0,
      postedDate: "Just now",
      expiresInDays: expiresAt ? Math.ceil((new Date(expiresAt).getTime() - Date.now()) / 86400000) : 30,
      status: status === "published" ? ("live" as const) : ("draft" as const),
      description: description || "Exciting opportunity to build scalable products.",
      skills: skills.map((s) => s.name),
      qualifications: qualifications.map((q) => q.name),
      benefits,
      tags,
      locations,
      media: mediaUrls,
      payload, // Included for API submission reference
    };

    setSubmitted(true);
    setTimeout(() => {
      onJobCreated(newJob);
      handleReset();
      onClose();
    }, 1200);
  };

  const handleReset = () => {
    setStep(0);
    setSubmitted(false);
    setTitle(""); setDescription(""); setMinExpMonths("24"); setMaxExpMonths("72");
    setLocations(["Kathmandu, Nepal"]); setExpiresAt(""); setStatus("draft");
    setMinSalary("800000"); setMaxSalary("1800000"); setSalaryCurrency("NPR");
    setSkills([{ name: "React", importance: "must_have", isMandatory: true }, { name: "Node.js", importance: "must_have", isMandatory: true }]);
    setQualifications([{ name: "Bachelor's in Computer Science", level: "bachelors", isRequired: true }]);
    setBenefits(["Health Insurance", "Remote Work", "Flexible Hours"]);
    setTags(["startup", "tech"]); setMediaUrls([]);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="bg-white border border-slate-200 rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-slate-900 flex items-center justify-center">
              <Plus className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="text-[15px] font-bold text-slate-900">Post New Job Requisition</h3>
              <p className="text-[11px] text-slate-400 font-medium">Complete all steps to publish your listing</p>
            </div>
          </div>
          <button onClick={() => { handleReset(); onClose(); }} className="p-1.5 bg-slate-50 border border-slate-100 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="px-6 py-3 border-b border-slate-50 shrink-0">
          <StepIndicator current={step} />
        </div>

        {/* Success State */}
        {submitted ? (
          <div className="flex-1 flex flex-col items-center justify-center py-16 px-6">
            <div className="h-16 w-16 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-4 animate-in zoom-in duration-300">
              <CheckCircle2 className="h-8 w-8 text-emerald-600" />
            </div>
            <h4 className="text-[18px] font-bold text-slate-900">Job Posted Successfully!</h4>
            <p className="text-[13px] text-slate-500 mt-1 text-center max-w-sm">
              <strong>{title}</strong> has been {status === "published" ? "published and is now live" : "saved as draft"} on your job board.
            </p>
          </div>
        ) : (
          <>
            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto px-6 py-5">

              {/* STEP 0: Basics */}
              {step === 0 && (
                <div className="space-y-5">
                  <div className="flex items-center gap-2 mb-1">
                    <Briefcase className="h-4 w-4 text-slate-400" />
                    <h4 className="text-[14px] font-bold text-slate-900">Basic Information</h4>
                  </div>

                  <Field label="Job Title" required>
                    <input type="text" placeholder="e.g. Senior Full Stack Engineer" value={title} onChange={(e) => setTitle(e.target.value)} className={inputCls} />
                  </Field>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Designation" required hint="Maps to the designations lookup table">
                      <select value={designation} onChange={(e) => setDesignation(e.target.value)} className={selectCls}>
                        <option value="Software Engineer">Software Engineer</option>
                        <option value="Senior Software Engineer">Senior Software Engineer</option>
                        <option value="Lead Engineer">Lead Engineer</option>
                        <option value="Frontend Developer">Frontend Developer</option>
                        <option value="Backend Developer">Backend Developer</option>
                        <option value="Full Stack Developer">Full Stack Developer</option>
                        <option value="DevOps Engineer">DevOps Engineer</option>
                        <option value="QA Engineer">QA Engineer</option>
                        <option value="Product Manager">Product Manager</option>
                        <option value="UI/UX Designer">UI/UX Designer</option>
                        <option value="Data Analyst">Data Analyst</option>
                        <option value="Marketing Specialist">Marketing Specialist</option>
                        <option value="HR Manager">HR Manager</option>
                        <option value="Business Analyst">Business Analyst</option>
                      </select>
                    </Field>

                    <Field label="Department" hint="Links to departments reference table">
                      <select value={department} onChange={(e) => setDepartment(e.target.value)} className={selectCls}>
                        <option value="Engineering">Engineering</option>
                        <option value="Product">Product</option>
                        <option value="Design">Design</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Sales">Sales</option>
                        <option value="Human Resources">Human Resources</option>
                        <option value="Finance">Finance</option>
                        <option value="Operations">Operations</option>
                        <option value="Customer Support">Customer Support</option>
                        <option value="Legal">Legal</option>
                      </select>
                    </Field>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Field label="Employment Type" required>
                      <select value={employmentType} onChange={(e) => setEmploymentType(e.target.value)} className={selectCls}>
                        <option value="full_time">Full-time</option>
                        <option value="part_time">Part-time</option>
                        <option value="contract">Contract</option>
                        <option value="internship">Internship</option>
                        <option value="freelance">Freelance</option>
                        <option value="temporary">Temporary</option>
                      </select>
                    </Field>

                    <Field label="Work Mode" required>
                      <select value={workMode} onChange={(e) => setWorkMode(e.target.value)} className={selectCls}>
                        <option value="remote">Remote</option>
                        <option value="hybrid">Hybrid</option>
                        <option value="on_site">On-site</option>
                      </select>
                    </Field>

                    <Field label="Seniority Level">
                      <select value={seniorityLevel} onChange={(e) => setSeniorityLevel(e.target.value)} className={selectCls}>
                        <option value="intern">Intern</option>
                        <option value="entry">Entry Level</option>
                        <option value="junior">Junior</option>
                        <option value="mid">Mid Level</option>
                        <option value="senior">Senior</option>
                        <option value="lead">Lead / Staff</option>
                        <option value="principal">Principal</option>
                        <option value="director">Director</option>
                        <option value="vp">VP</option>
                        <option value="c_level">C-Level</option>
                      </select>
                    </Field>
                  </div>
                </div>
              )}

              {/* STEP 1: Details */}
              {step === 1 && (
                <div className="space-y-5">
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="h-4 w-4 text-slate-400" />
                    <h4 className="text-[14px] font-bold text-slate-900">Job Details</h4>
                  </div>

                  <Field label="Job Description" required span={2} hint="Describe key responsibilities, day-to-day expectations, and growth opportunities">
                    <textarea
                      rows={6} value={description} onChange={(e) => setDescription(e.target.value)}
                      placeholder="Write a compelling job description that attracts top talent...

• What will the candidate work on?
• What are the key responsibilities?
• What does success look like in this role?
• What team will they join?"
                      className={`${inputCls} resize-none`}
                    />
                  </Field>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Min Experience (months)" hint="Minimum experience required (e.g. 24 = 2 years)">
                      <input type="number" min="0" value={minExpMonths} onChange={(e) => setMinExpMonths(e.target.value)} className={`${inputCls} font-mono`} />
                    </Field>
                    <Field label="Max Experience (months)" hint="Maximum experience cap (e.g. 72 = 6 years)">
                      <input type="number" min="0" value={maxExpMonths} onChange={(e) => setMaxExpMonths(e.target.value)} className={`${inputCls} font-mono`} />
                    </Field>
                  </div>

                  <Field label="Job Locations" hint="Add one or more locations where this role is based. Press Enter to add.">
                    <TagInput value={locations} onChange={setLocations} placeholder="e.g. Kathmandu, Nepal (press Enter)" />
                  </Field>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Expiry Date" hint="When this listing should automatically close">
                      <input type="date" value={expiresAt} onChange={(e) => setExpiresAt(e.target.value)} className={inputCls} />
                    </Field>
                    <Field label="Initial Status">
                      <select value={status} onChange={(e) => setStatus(e.target.value)} className={selectCls}>
                        <option value="draft">Draft — Save for later</option>
                        <option value="published">Published — Go live immediately</option>
                      </select>
                    </Field>
                  </div>
                </div>
              )}

              {/* STEP 2: Compensation */}
              {step === 2 && (
                <div className="space-y-5">
                  <div className="flex items-center gap-2 mb-1">
                    <DollarSign className="h-4 w-4 text-slate-400" />
                    <h4 className="text-[14px] font-bold text-slate-900">Compensation & Salary</h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Field label="Currency">
                      <select value={salaryCurrency} onChange={(e) => setSalaryCurrency(e.target.value)} className={selectCls}>
                        <option value="NPR">NPR (Nepalese Rupee)</option>
                        <option value="USD">USD (US Dollar)</option>
                        <option value="INR">INR (Indian Rupee)</option>
                        <option value="GBP">GBP (British Pound)</option>
                        <option value="EUR">EUR (Euro)</option>
                        <option value="AUD">AUD (Australian Dollar)</option>
                      </select>
                    </Field>
                    <Field label="Minimum Annual Salary" required>
                      <input type="number" min="0" step="10000" value={minSalary} onChange={(e) => setMinSalary(e.target.value)} className={`${inputCls} font-mono`} />
                    </Field>
                    <Field label="Maximum Annual Salary" required>
                      <input type="number" min="0" step="10000" value={maxSalary} onChange={(e) => setMaxSalary(e.target.value)} className={`${inputCls} font-mono`} />
                    </Field>
                  </div>

                  {/* Salary Preview */}
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                    <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold mb-2">Salary Preview</div>
                    <div className="text-[20px] font-bold text-slate-900 font-mono">
                      {salaryCurrency} {parseInt(minSalary || "0").toLocaleString()} – {parseInt(maxSalary || "0").toLocaleString()}
                      <span className="text-[12px] text-slate-400 font-sans ml-1">/ year</span>
                    </div>
                    <div className="text-[12px] text-slate-500 mt-1 font-medium">
                      Monthly: {salaryCurrency} {Math.round((parseInt(minSalary || "0")) / 12).toLocaleString()} – {Math.round((parseInt(maxSalary || "0")) / 12).toLocaleString()}
                    </div>
                  </div>

                  <label className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition">
                    <input type="checkbox" checked={showSalary} onChange={(e) => setShowSalary(e.target.checked)} className="h-4 w-4 accent-slate-900 rounded" />
                    <div>
                      <div className="text-[13px] font-semibold text-slate-900">Display salary on listing</div>
                      <div className="text-[11px] text-slate-400">Jobs with visible salaries get 3x more applicants</div>
                    </div>
                  </label>
                </div>
              )}

              {/* STEP 3: Requirements */}
              {step === 3 && (
                <div className="space-y-6">
                  {/* Skills */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-slate-400" />
                      <h4 className="text-[14px] font-bold text-slate-900">Required Skills</h4>
                    </div>
                    <p className="text-[11px] text-slate-400 -mt-2">Add skills with importance levels. Maps to <code className="bg-slate-100 px-1 rounded text-[10px]">JobSkill</code> table.</p>

                    <div className="space-y-2">
                      {skills.map((skill, i) => (
                        <div key={i} className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
                          <span className="text-[13px] font-semibold text-slate-900 flex-1">{skill.name}</span>
                          <select
                            value={skill.importance}
                            onChange={(e) => {
                              const updated = [...skills];
                              updated[i] = { ...updated[i], importance: e.target.value };
                              setSkills(updated);
                            }}
                            className="text-[11px] bg-white border border-slate-200 rounded-md px-2 py-1 font-medium text-slate-700"
                          >
                            <option value="must_have">Must Have</option>
                            <option value="nice_to_have">Nice to Have</option>
                            <option value="bonus">Bonus</option>
                          </select>
                          <label className="flex items-center gap-1.5 text-[11px] font-medium text-slate-600">
                            <input
                              type="checkbox" checked={skill.isMandatory}
                              onChange={(e) => {
                                const updated = [...skills];
                                updated[i] = { ...updated[i], isMandatory: e.target.checked };
                                setSkills(updated);
                              }}
                              className="h-3.5 w-3.5 accent-slate-900 rounded"
                            />
                            Mandatory
                          </label>
                          <button type="button" onClick={() => setSkills(skills.filter((_, idx) => idx !== i))} className="text-slate-300 hover:text-rose-500 text-[14px] font-bold">&times;</button>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input type="text" placeholder="Add a skill..." value={newSkill} onChange={(e) => setNewSkill(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addSkill(); } }}
                        className={`${inputCls} flex-1`} />
                      <button type="button" onClick={addSkill} className="px-3 py-2 text-[12px] font-semibold bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition">Add</button>
                    </div>
                  </div>

                  {/* Qualifications */}
                  <div className="space-y-3 border-t border-slate-100 pt-5">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-slate-400" />
                      <h4 className="text-[14px] font-bold text-slate-900">Education & Qualifications</h4>
                    </div>
                    <p className="text-[11px] text-slate-400 -mt-2">Maps to <code className="bg-slate-100 px-1 rounded text-[10px]">JobQualification</code> with qualification + specialization.</p>

                    <div className="space-y-2">
                      {qualifications.map((q, i) => (
                        <div key={i} className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
                          <span className="text-[13px] font-semibold text-slate-900 flex-1">{q.name}</span>
                          <select
                            value={q.level}
                            onChange={(e) => {
                              const updated = [...qualifications];
                              updated[i] = { ...updated[i], level: e.target.value };
                              setQualifications(updated);
                            }}
                            className="text-[11px] bg-white border border-slate-200 rounded-md px-2 py-1 font-medium text-slate-700"
                          >
                            <option value="high_school">High School</option>
                            <option value="diploma">Diploma</option>
                            <option value="bachelors">Bachelor&apos;s</option>
                            <option value="masters">Master&apos;s</option>
                            <option value="phd">PhD</option>
                          </select>
                          <label className="flex items-center gap-1.5 text-[11px] font-medium text-slate-600">
                            <input
                              type="checkbox" checked={q.isRequired}
                              onChange={(e) => {
                                const updated = [...qualifications];
                                updated[i] = { ...updated[i], isRequired: e.target.checked };
                                setQualifications(updated);
                              }}
                              className="h-3.5 w-3.5 accent-slate-900 rounded"
                            />
                            Required
                          </label>
                          <button type="button" onClick={() => setQualifications(qualifications.filter((_, idx) => idx !== i))} className="text-slate-300 hover:text-rose-500 text-[14px] font-bold">&times;</button>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input type="text" placeholder="Add a qualification..." value={newQualification} onChange={(e) => setNewQualification(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addQualification(); } }}
                        className={`${inputCls} flex-1`} />
                      <button type="button" onClick={addQualification} className="px-3 py-2 text-[12px] font-semibold bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition">Add</button>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Benefits, Tags, Media */}
              {step === 4 && (
                <div className="space-y-6">
                  {/* Benefits */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-slate-400" />
                      <h4 className="text-[14px] font-bold text-slate-900">Job Benefits</h4>
                    </div>
                    <p className="text-[11px] text-slate-400 -mt-2">Maps to <code className="bg-slate-100 px-1 rounded text-[10px]">JobBenefit</code> via benefits lookup table.</p>
                    <TagInput value={benefits} onChange={setBenefits} placeholder="e.g. Health Insurance, Stock Options (press Enter)" />
                    <div className="flex flex-wrap gap-1.5">
                      {["Gym Membership", "Paid Parental Leave", "Stock Options", "Learning Budget", "Annual Bonus", "Meal Allowance", "Travel Allowance", "Work From Home Equipment"].filter(b => !benefits.includes(b)).map(sug => (
                        <button key={sug} type="button" onClick={() => setBenefits([...benefits, sug])}
                          className="text-[10px] font-medium text-slate-500 bg-white border border-dashed border-slate-300 hover:border-slate-400 hover:text-slate-700 px-2 py-1 rounded-md transition">
                          + {sug}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="space-y-3 border-t border-slate-100 pt-5">
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-slate-400" />
                      <h4 className="text-[14px] font-bold text-slate-900">Tags & Keywords</h4>
                    </div>
                    <p className="text-[11px] text-slate-400 -mt-2">Maps to <code className="bg-slate-100 px-1 rounded text-[10px]">JobTag</code>. Improve discoverability in search.</p>
                    <TagInput value={tags} onChange={setTags} placeholder="e.g. react, agile, saas (press Enter)" />
                  </div>

                  {/* Media */}
                  <div className="space-y-3 border-t border-slate-100 pt-5">
                    <div className="flex items-center gap-2">
                      <ImagePlus className="h-4 w-4 text-slate-400" />
                      <h4 className="text-[14px] font-bold text-slate-900">Media Attachments</h4>
                    </div>
                    <p className="text-[11px] text-slate-400 -mt-2">Maps to <code className="bg-slate-100 px-1 rounded text-[10px]">JobMedia</code>. Add images or video URLs about the role.</p>
                    {mediaUrls.length > 0 && (
                      <div className="space-y-1.5">
                        {mediaUrls.map((url, i) => (
                          <div key={i} className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
                            <span className="text-[12px] font-mono text-blue-600 truncate flex-1">{url}</span>
                            <button type="button" onClick={() => setMediaUrls(mediaUrls.filter((_, idx) => idx !== i))} className="text-slate-300 hover:text-rose-500 text-[14px] font-bold">&times;</button>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="flex gap-2">
                      <input type="url" placeholder="https://example.com/office-photo.jpg" value={newMediaUrl} onChange={(e) => setNewMediaUrl(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addMedia(); } }}
                        className={`${inputCls} flex-1`} />
                      <button type="button" onClick={addMedia} className="px-3 py-2 text-[12px] font-semibold bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition">Add</button>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: Review */}
              {step === 5 && (
                <div className="space-y-5">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <h4 className="text-[14px] font-bold text-slate-900">Review Job Posting</h4>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
                    {/* Title Row */}
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Job Title</div>
                      <div className="text-[16px] font-bold text-slate-900 mt-0.5">{title || "Untitled"}</div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        ["Designation", designation],
                        ["Department", department],
                        ["Employment", employmentType.replace("_", "-")],
                        ["Work Mode", workMode.replace("_", " ")],
                        ["Seniority", seniorityLevel.replace("_", " ")],
                        ["Experience", `${minExpMonths}–${maxExpMonths} months`],
                        ["Salary", `${salaryCurrency} ${parseInt(minSalary || "0").toLocaleString()} – ${parseInt(maxSalary || "0").toLocaleString()}`],
                        ["Status", status === "published" ? "🟢 Published" : "📝 Draft"],
                      ].map(([label, value]) => (
                        <div key={label}>
                          <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">{label}</div>
                          <div className="text-[12px] font-semibold text-slate-700 mt-0.5 capitalize">{value}</div>
                        </div>
                      ))}
                    </div>

                    {/* Locations */}
                    {locations.length > 0 && (
                      <div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Locations</div>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {locations.map((loc, i) => (
                            <span key={i} className="inline-flex items-center gap-1 text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-md">
                              <MapPin className="h-3 w-3" /> {loc}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Skills */}
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Skills ({skills.length})</div>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {skills.map((s, i) => (
                          <span key={i} className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${
                            s.isMandatory ? "bg-slate-900 text-white border-slate-900" : "bg-slate-100 text-slate-700 border-slate-200"
                          }`}>
                            {s.name}{s.isMandatory ? " ★" : ""}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Qualifications */}
                    {qualifications.length > 0 && (
                      <div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Qualifications</div>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {qualifications.map((q, i) => (
                            <span key={i} className="text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-md">
                              {q.name}{q.isRequired ? " (Required)" : ""}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Benefits & Tags */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Benefits ({benefits.length})</div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {benefits.map((b, i) => (
                            <span key={i} className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded-md">{b}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Tags ({tags.length})</div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {tags.map((t, i) => (
                            <span key={i} className="text-[10px] font-semibold bg-violet-50 text-violet-700 border border-violet-200 px-1.5 py-0.5 rounded-md">#{t}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Description preview */}
                    {description && (
                      <div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Description Preview</div>
                        <p className="text-[12px] text-slate-600 mt-1 whitespace-pre-line line-clamp-4">{description}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Footer Nav */}
            <div className="border-t border-slate-100 px-6 py-4 flex items-center justify-between shrink-0">
              <button
                type="button"
                disabled={step === 0}
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-[12px] font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-3.5 w-3.5" /> Previous
              </button>

              <div className="text-[11px] font-mono text-slate-400">
                Step {step + 1} of {STEPS.length}
              </div>

              {step < STEPS.length - 1 ? (
                <button
                  type="button"
                  disabled={!canAdvance()}
                  onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-[12px] font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Next <ChevronRight className="h-3.5 w-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handlePublish}
                  className="inline-flex items-center gap-1.5 px-5 py-2 text-[12px] font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition shadow-xs"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" /> {status === "published" ? "Publish Job" : "Save as Draft"}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ──────────────── SCHEDULE INTERVIEW MODAL ──────────────── */

export function ScheduleInterviewModal({ isOpen, onClose, onInterviewScheduled }: ScheduleInterviewModalProps) {
  const [form, setForm] = useState({
    candidateName: "",
    jobTitle: "",
    type: "Technical Round",
    scheduledDate: "",
    scheduledTime: "14:00",
    durationMinutes: "60",
    meetLink: "",
    panelists: "",
    notes: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dateText = form.scheduledDate
      ? `${new Date(form.scheduledDate).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })} at ${form.scheduledTime}`
      : "TBD";
    onInterviewScheduled({
      id: `int-${Date.now()}`,
      companyName: "JPS Employer Corp",
      candidateName: form.candidateName,
      jobTitle: form.jobTitle,
      type: form.type,
      dateText,
      scheduledAt: form.scheduledDate ? `${form.scheduledDate}T${form.scheduledTime}` : null,
      durationMinutes: parseInt(form.durationMinutes) || 60,
      locationOrUrl: form.meetLink,
      meetLink: form.meetLink,
      panelCount: form.panelists ? form.panelists.split(",").length : 1,
    });
    onClose();
    setForm({
      candidateName: "", jobTitle: "", type: "Technical Round",
      scheduledDate: "", scheduledTime: "14:00", durationMinutes: "60",
      meetLink: "", panelists: "", notes: "",
    });
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="bg-white border border-slate-200 rounded-xl max-w-lg w-full p-6 shadow-xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-slate-900 flex items-center justify-center">
              <Calendar className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="text-[15px] font-bold text-slate-900">Schedule Candidate Interview</h3>
              <p className="text-[11px] text-slate-400 font-medium">Maps to Interview + InterviewPanelist tables</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 bg-slate-50 border border-slate-100 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition">
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-[13px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Candidate Name" required>
              <input type="text" required placeholder="e.g. Sujata Karki" value={form.candidateName} onChange={(e) => setForm({ ...form, candidateName: e.target.value })} className={inputCls} />
            </Field>
            <Field label="Target Requisition" required>
              <input type="text" required placeholder="e.g. Senior Laravel Developer" value={form.jobTitle} onChange={(e) => setForm({ ...form, jobTitle: e.target.value })} className={inputCls} />
            </Field>
          </div>

          <Field label="Interview Type / Round">
            <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className={selectCls}>
              <option value="Phone Screen">Phone Screen</option>
              <option value="Technical Round">Technical Round</option>
              <option value="System Design">System Design</option>
              <option value="Coding Challenge">Coding Challenge</option>
              <option value="HR Screening">HR Screening</option>
              <option value="Culture Fit">Culture Fit</option>
              <option value="Final Round">Final Round</option>
              <option value="Panel Interview">Panel Interview</option>
            </select>
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Field label="Date" required>
              <input type="date" required value={form.scheduledDate} onChange={(e) => setForm({ ...form, scheduledDate: e.target.value })} className={inputCls} />
            </Field>
            <Field label="Time" required>
              <input type="time" required value={form.scheduledTime} onChange={(e) => setForm({ ...form, scheduledTime: e.target.value })} className={inputCls} />
            </Field>
            <Field label="Duration (min)" hint="Maps to durationMinutes">
              <input type="number" min="15" step="15" value={form.durationMinutes} onChange={(e) => setForm({ ...form, durationMinutes: e.target.value })} className={`${inputCls} font-mono`} />
            </Field>
          </div>

          <Field label="Meeting URL" hint="Google Meet, Zoom, or Teams link (meetingUrl field)">
            <input type="url" placeholder="https://meet.google.com/..." value={form.meetLink} onChange={(e) => setForm({ ...form, meetLink: e.target.value })}
              className={`${inputCls} font-mono text-[12px]`} />
          </Field>

          <Field label="Panel Members" hint="Comma-separated. Creates InterviewPanelist records.">
            <input type="text" placeholder="e.g. Tarun S., Bikash R." value={form.panelists} onChange={(e) => setForm({ ...form, panelists: e.target.value })} className={inputCls} />
          </Field>

          <Field label="Notes (optional)">
            <textarea rows={2} placeholder="Any prep instructions or candidate notes..." value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className={`${inputCls} resize-none`} />
          </Field>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <button type="button" onClick={onClose} className="px-4 py-2 text-[12px] font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition">Cancel</button>
            <button type="submit" className="px-4 py-2 text-[12px] font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition">Confirm & Schedule</button>
          </div>
        </form>
      </div>
    </div>
  );
}
