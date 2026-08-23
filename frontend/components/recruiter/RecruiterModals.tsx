"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Job } from "@/lib/types";
import {
  Plus,
  Calendar,
  X,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Briefcase,
  MapPin,
  GraduationCap,
  Award,
  Tag,
  ImagePlus,
  DollarSign,
  FileText,
  Clock,
  Users,
  Sparkles,
  ListChecks,
} from "lucide-react";

function cleanErrorMessage(rawMessage: string): string {
  if (!rawMessage) return "Failed to process request.";
  if (typeof rawMessage === "string" && rawMessage.trim().startsWith("[") && rawMessage.trim().endsWith("]")) {
    try {
      const parsed = JSON.parse(rawMessage) as Array<{ path?: Array<string | number>; message?: string }>;
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed
          .map((p) => {
            const fieldName = p.path ? p.path.filter((x) => typeof x === "string").pop() : "";
            const prefix = fieldName ? `${String(fieldName)}: ` : "";
            return `${prefix}${p.message || "Invalid input"}`;
          })
          .filter(Boolean)
          .join(". ");
      }
    } catch {
      // Fallback
    }
  }
  return rawMessage;
}

/* ─────────────────────────── TYPES ─────────────────────────── */

interface CreateJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJobCreated: (newJob: unknown) => void;
  job?: Job | null;
  onJobUpdated?: (updatedJob: unknown) => void;
}

interface ScheduleInterviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInterviewScheduled: (interview: any) => void;
}

/* ─────────────────── SHARED FIELD COMPONENTS ────────────────── */

const inputCls =
  "w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-[13px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 font-medium transition placeholder:text-slate-400";
const selectCls = inputCls;
const labelCls =
  "text-[11px] font-semibold text-slate-500 uppercase tracking-wider";

function Field({
  label,
  required,
  children,
  hint,
  span,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  hint?: string;
  span?: number;
}) {
  return (
    <div
      className={`space-y-1.5 ${span === 2 ? "sm:col-span-2" : ""} ${span === 3 ? "sm:col-span-3" : ""}`}
    >
      <label className={labelCls}>
        {label}
        {required && <span className="text-rose-500 ml-0.5">*</span>}
      </label>
      {children}
      {hint && <p className="text-[10px] text-slate-400 mt-0.5">{hint}</p>}
    </div>
  );
}

function TagInput({
  value,
  onChange,
  placeholder,
}: {
  value: string[];
  onChange: (v: string[]) => void;
  placeholder: string;
}) {
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
        <span
          key={i}
          className="inline-flex items-center gap-1 bg-slate-200 text-slate-700 text-[11px] font-semibold px-2 py-0.5 rounded-md"
        >
          {tag}
          <button
            type="button"
            onClick={() => onChange(value.filter((_, idx) => idx !== i))}
            className="text-slate-400 hover:text-slate-700"
          >
            &times;
          </button>
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
            {i > 0 && (
              <div
                className={`hidden sm:block w-6 h-px ${isDone ? "bg-slate-900" : "bg-slate-200"}`}
              />
            )}
            <div
              className={`flex items-center gap-1.5 px-2 py-1 rounded-md whitespace-nowrap text-[11px] font-semibold transition-colors ${
                isActive
                  ? "bg-slate-900 text-white"
                  : isDone
                    ? "bg-slate-100 text-slate-700"
                    : "text-slate-400"
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="h-3 w-3" />
              ) : (
                <Icon className="h-3 w-3" />
              )}
              <span className="hidden sm:inline">{step.label}</span>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}

/* ────────────────── CREATE JOB MODAL (FULL SCHEMA) ────────────────── */

export function CreateJobModal({
  isOpen,
  onClose,
  onJobCreated,
  job = null,
  onJobUpdated,
}: CreateJobModalProps) {
  const { tokens } = useAuth();
  const isEditing = Boolean(job);
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Database lookups
  const [dbDepartments, setDbDepartments] = useState<
    { id: string; name: string }[]
  >([]);
  const [dbDesignations, setDbDesignations] = useState<
    { id: string; name: string }[]
  >([]);

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

  // Step 4: Requirements & Responsibilities
  const [responsibilities, setResponsibilities] = useState<string[]>([
    "Design, develop, and maintain high-performance features and microservices",
    "Collaborate closely with cross-functional product, UX, and QA teams",
    "Participate in code reviews, write unit tests, and optimize performance",
  ]);
  const [newResponsibility, setNewResponsibility] = useState("");

  const [requiredSkills, setRequiredSkills] = useState<string[]>([
    "React",
    "Node.js",
    "TypeScript",
  ]);
  const [newRequiredSkill, setNewRequiredSkill] = useState("");

  const [preferredSkills, setPreferredSkills] = useState<string[]>([
    "Docker",
    "AWS",
    "GraphQL",
    "Next.js",
  ]);
  const [newPreferredSkill, setNewPreferredSkill] = useState("");

  const [qualifications, setQualifications] = useState<string[]>([
    "Bachelor's degree in Computer Science, Software Engineering, or related technical field",
    "At least 2-3 years of hands-on experience building web applications",
  ]);
  const [newQualification, setNewQualification] = useState("");

  // Step 5: Benefits, Tags, Media
  const [benefits, setBenefits] = useState<string[]>([
    "Health Insurance & Comprehensive Medical Cover",
    "Flexible Work Hours & Remote Work Options",
    "Annual Performance Bonus & Festival Bonus",
  ]);
  const [newBenefit, setNewBenefit] = useState("");

  const [tags, setTags] = useState<string[]>(["startup", "tech", "growth"]);
  const [mediaUrls, setMediaUrls] = useState<string[]>([]);
  const [newMediaUrl, setNewMediaUrl] = useState("");

  // Populate the same form used for creation when editing an existing listing.
  useEffect(() => {
    if (!isOpen || !job) return;

    setStep(0);
    setSubmitted(false);
    setSubmitError(null);
    setTitle(job.title || "");
    setDesignation(job.designation || job.title || "");
    setDepartment(job.department || "");
    setEmploymentType((job.employmentType || "full_time").toLowerCase().replace(/[ -]/g, "_"));
    setWorkMode(job.workMode === "On-site" ? "on_site" : job.workMode.toLowerCase());
    setSeniorityLevel((job.seniorityLevel || "mid").toLowerCase().replace(/[ -]/g, "_"));
    setDescription(job.description || "");
    setMinExpMonths(String(job.minExperienceMonths ?? 0));
    setMaxExpMonths(String(job.maxExperienceMonths ?? 0));
    setLocations(job.locations?.length ? job.locations : job.location ? [job.location] : []);
    setExpiresAt(job.expiresAt ? job.expiresAt.slice(0, 10) : "");
    setStatus(job.status === "live" || job.status === "expiring" ? "published" : job.status === "closed" ? "CLOSED" : "draft");
    setMinSalary(String(job.minSalary ?? 0));
    setMaxSalary(String(job.maxSalary ?? 0));
    setSalaryCurrency(job.salaryCurrency || "NPR");
    setShowSalary(job.showSalary ?? true);
    setResponsibilities(job.responsibilities || []);
    setRequiredSkills(job.skills || []);
    setPreferredSkills(job.preferredSkills || []);
    setQualifications(job.qualifications || []);
    setBenefits(job.benefits || []);
    setTags(job.tags || []);
    setMediaUrls(job.media || []);
  }, [isOpen, job]);

  // Fetch Departments & Designations from DB when modal opens
  useEffect(() => {
    if (!isOpen) return;

    const fetchLookups = async () => {
      try {
        const headers: Record<string, string> = {};
        if (tokens.accessToken) {
          headers["Authorization"] = `Bearer ${tokens.accessToken}`;
        }

        const [deptRes, desigRes] = await Promise.all([
          fetch("/api/admin/departments?limit=100", {
            headers,
            credentials: "include",
          }),
          fetch("/api/admin/designations?limit=100", {
            headers,
            credentials: "include",
          }),
        ]);

        if (deptRes.ok) {
          const deptData = await deptRes.json();
          const items = deptData.items || deptData;
          if (Array.isArray(items) && items.length > 0) {
            const mapped = items.map((d: any) => ({
              id: d.id,
              name: d.departmentName || d.name,
            }));
            setDbDepartments(mapped);
            if (!job && mapped[0]?.name) setDepartment(mapped[0].name);
          }
        }

        if (desigRes.ok) {
          const desigData = await desigRes.json();
          const items = desigData.items || desigData;
          if (Array.isArray(items) && items.length > 0) {
            const mapped = items.map((d: any) => ({
              id: d.id,
              name: d.designationName || d.name,
            }));
            setDbDesignations(mapped);
            if (!job && mapped[0]?.name) setDesignation(mapped[0].name);
          }
        }
      } catch (err) {
        console.error("Failed to fetch departments/designations from DB:", err);
      }
    };

    fetchLookups();
  }, [isOpen, job, tokens.accessToken]);

  if (!isOpen) return null;

  const addResponsibility = () => {
    if (
      newResponsibility.trim() &&
      !responsibilities.includes(newResponsibility.trim())
    ) {
      setResponsibilities([...responsibilities, newResponsibility.trim()]);
      setNewResponsibility("");
    }
  };

  const addRequiredSkill = () => {
    if (
      newRequiredSkill.trim() &&
      !requiredSkills.includes(newRequiredSkill.trim())
    ) {
      setRequiredSkills([...requiredSkills, newRequiredSkill.trim()]);
      setNewRequiredSkill("");
    }
  };

  const addPreferredSkill = () => {
    if (
      newPreferredSkill.trim() &&
      !preferredSkills.includes(newPreferredSkill.trim())
    ) {
      setPreferredSkills([...preferredSkills, newPreferredSkill.trim()]);
      setNewPreferredSkill("");
    }
  };

  const addQualification = () => {
    if (
      newQualification.trim() &&
      !qualifications.includes(newQualification.trim())
    ) {
      setQualifications([...qualifications, newQualification.trim()]);
      setNewQualification("");
    }
  };

  const addBenefit = () => {
    if (
      newBenefit.trim() &&
      !benefits.includes(newBenefit.trim())
    ) {
      setBenefits([...benefits, newBenefit.trim()]);
      setNewBenefit("");
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

  const handlePublish = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    const payload = {
      title,
      designation,
      department,
      employmentType,
      workMode,
      seniorityLevel,
      description:
        description || "Exciting opportunity to build scalable products.",
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
      responsibilities: responsibilities.map((r, i) => ({
        responsibility: r,
        displayOrder: i,
        isKey: true,
      })),
      skills: [
        ...requiredSkills.map((s) => ({
          name: s,
          importance: "must_have",
          isMandatory: true,
        })),
        ...preferredSkills.map((s) => ({
          name: s,
          importance: "nice_to_have",
          isMandatory: false,
        })),
      ],
      qualifications,
      benefits,
      tags,
      media: mediaUrls.map((url) => ({ mediaType: "image", mediaUrl: url })),
    };

    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (tokens.accessToken) {
        headers["Authorization"] = `Bearer ${tokens.accessToken}`;
      }

      const response = await fetch(
        isEditing ? `/api/recruiter/jobs/${job!.id}` : "/api/recruiter/jobs",
        {
          method: isEditing ? "PUT" : "POST",
          headers,
          credentials: "include",
          body: JSON.stringify(payload),
        },
      );

      const savedJob = await response.json();

      if (!response.ok) {
        throw new Error(
          cleanErrorMessage(savedJob.message || "Failed to save job requisition to database."),
        );
      }

      setSubmitted(true);
      setTimeout(() => {
        if (isEditing) {
          onJobUpdated?.(savedJob);
        } else {
          onJobCreated(savedJob);
        }
        handleReset();
        onClose();
      }, 1200);
    } catch (err) {
      setSubmitError(
        cleanErrorMessage(err instanceof Error ? err.message : "Failed to post job requisition to database."),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setStep(0);
    setSubmitted(false);
    setTitle("");
    setDescription("");
    setMinExpMonths("24");
    setMaxExpMonths("72");
    setLocations(["Kathmandu, Nepal"]);
    setExpiresAt("");
    setStatus("draft");
    setMinSalary("800000");
    setMaxSalary("1800000");
    setSalaryCurrency("NPR");
    setResponsibilities([
      "Design, develop, and maintain high-performance features and microservices",
      "Collaborate closely with cross-functional product, UX, and QA teams",
      "Participate in code reviews, write unit tests, and optimize performance",
    ]);
    setRequiredSkills(["React", "Node.js", "TypeScript"]);
    setPreferredSkills(["Docker", "AWS", "GraphQL", "Next.js"]);
    setQualifications([
      "Bachelor's degree in Computer Science, Software Engineering, or related technical field",
      "At least 2-3 years of hands-on experience building web applications",
    ]);
    setBenefits([
      "Health Insurance & Comprehensive Medical Cover",
      "Flexible Work Hours & Remote Work Options",
      "Annual Performance Bonus & Festival Bonus",
    ]);
    setTags(["startup", "tech"]);
    setMediaUrls([]);
  };

  return (
    <div
      className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white border border-slate-200 rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-slate-900 flex items-center justify-center">
              <Plus className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="text-[15px] font-bold text-slate-900">
                {isEditing ? "Edit Job Requisition" : "Post New Job Requisition"}
              </h3>
              <p className="text-[11px] text-slate-400 font-medium">
                {isEditing ? "Update the listing using the same job details" : "Complete all steps to publish your listing"}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              handleReset();
              onClose();
            }}
            className="p-1.5 bg-slate-50 border border-slate-100 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition"
          >
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
            <h4 className="text-[18px] font-bold text-slate-900">
              {isEditing ? "Job Updated Successfully!" : "Job Posted Successfully!"}
            </h4>
            <p className="text-[13px] text-slate-500 mt-1 text-center max-w-sm">
              <strong>{title}</strong> has been{" "}
              {isEditing
                ? "updated"
                : status === "published"
                  ? "published and is now live"
                  : "saved as draft"}{" "}
              on your job board.
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
                    <h4 className="text-[14px] font-bold text-slate-900">
                      Basic Information
                    </h4>
                  </div>

                  <Field label="Job Title" required>
                    <input
                      type="text"
                      placeholder="e.g. Senior Full Stack Engineer"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className={inputCls}
                    />
                  </Field>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field
                      label="Designation"
                      required
                      hint="Loaded dynamically from database lookup table"
                    >
                      <select
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                        className={selectCls}
                      >
                        {dbDesignations.length > 0 ? (
                          dbDesignations.map((d) => (
                            <option key={d.id} value={d.name}>
                              {d.name}
                            </option>
                          ))
                        ) : (
                          <>
                            <option value="Software Engineer">
                              Software Engineer
                            </option>
                            <option value="Senior Software Engineer">
                              Senior Software Engineer
                            </option>
                            <option value="Lead Engineer">Lead Engineer</option>
                            <option value="Frontend Developer">
                              Frontend Developer
                            </option>
                            <option value="Backend Developer">
                              Backend Developer
                            </option>
                            <option value="Full Stack Developer">
                              Full Stack Developer
                            </option>
                            <option value="DevOps Engineer">
                              DevOps Engineer
                            </option>
                            <option value="QA Engineer">QA Engineer</option>
                            <option value="Product Manager">
                              Product Manager
                            </option>
                            <option value="UI/UX Designer">
                              UI/UX Designer
                            </option>
                          </>
                        )}
                      </select>
                    </Field>

                    <Field
                      label="Department"
                      hint="Loaded dynamically from database reference table"
                    >
                      <select
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className={selectCls}
                      >
                        {dbDepartments.length > 0 ? (
                          dbDepartments.map((d) => (
                            <option key={d.id} value={d.name}>
                              {d.name}
                            </option>
                          ))
                        ) : (
                          <>
                            <option value="Engineering">Engineering</option>
                            <option value="Product">Product</option>
                            <option value="Design">Design</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Sales">Sales</option>
                            <option value="Human Resources">
                              Human Resources
                            </option>
                            <option value="Finance">Finance</option>
                            <option value="Operations">Operations</option>
                          </>
                        )}
                      </select>
                    </Field>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Field label="Employment Type" required>
                      <select
                        value={employmentType}
                        onChange={(e) => setEmploymentType(e.target.value)}
                        className={selectCls}
                      >
                        <option value="full_time">Full-time</option>
                        <option value="part_time">Part-time</option>
                        <option value="contract">Contract</option>
                        <option value="internship">Internship</option>
                        <option value="freelance">Freelance</option>
                        <option value="temporary">Temporary</option>
                      </select>
                    </Field>

                    <Field label="Work Mode" required>
                      <select
                        value={workMode}
                        onChange={(e) => setWorkMode(e.target.value)}
                        className={selectCls}
                      >
                        <option value="remote">Remote</option>
                        <option value="hybrid">Hybrid</option>
                        <option value="on_site">On-site</option>
                      </select>
                    </Field>

                    <Field label="Seniority Level">
                      <select
                        value={seniorityLevel}
                        onChange={(e) => setSeniorityLevel(e.target.value)}
                        className={selectCls}
                      >
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
                    <h4 className="text-[14px] font-bold text-slate-900">
                      Job Details
                    </h4>
                  </div>

                  <Field
                    label="Job Description"
                    required
                    span={2}
                    hint="Describe key responsibilities, day-to-day expectations, and growth opportunities"
                  >
                    <textarea
                      rows={6}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Write a compelling job description that attracts top talent...

• What will the candidate work on?
• What are the key responsibilities?
• What does success look like in this role?
• What team will they join?"
                      className={`${inputCls} resize-none`}
                    />
                  </Field>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field
                      label="Min Experience (months)"
                      hint="Minimum experience required (e.g. 24 = 2 years)"
                    >
                      <input
                        type="number"
                        min="0"
                        value={minExpMonths}
                        onChange={(e) => setMinExpMonths(e.target.value)}
                        className={`${inputCls} font-mono`}
                      />
                    </Field>
                    <Field
                      label="Max Experience (months)"
                      hint="Maximum experience cap (e.g. 72 = 6 years)"
                    >
                      <input
                        type="number"
                        min="0"
                        value={maxExpMonths}
                        onChange={(e) => setMaxExpMonths(e.target.value)}
                        className={`${inputCls} font-mono`}
                      />
                    </Field>
                  </div>

                  <Field
                    label="Job Locations"
                    hint="Add one or more locations where this role is based. Press Enter to add."
                  >
                    <TagInput
                      value={locations}
                      onChange={setLocations}
                      placeholder="e.g. Kathmandu, Nepal (press Enter)"
                    />
                  </Field>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field
                      label="Expiry Date"
                      hint="When this listing should automatically close"
                    >
                      <input
                        type="date"
                        value={expiresAt}
                        onChange={(e) => setExpiresAt(e.target.value)}
                        className={inputCls}
                      />
                    </Field>
                    <Field label="Initial Status">
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className={selectCls}
                      >
                        <option value="draft">Draft — Save for later</option>
                        <option value="published">
                          Published — Go live immediately
                        </option>
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
                    <h4 className="text-[14px] font-bold text-slate-900">
                      Compensation & Salary
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Field label="Currency">
                      <select
                        value={salaryCurrency}
                        onChange={(e) => setSalaryCurrency(e.target.value)}
                        className={selectCls}
                      >
                        <option value="NPR">NPR (Nepalese Rupee)</option>
                        <option value="USD">USD (US Dollar)</option>
                        <option value="INR">INR (Indian Rupee)</option>
                        <option value="GBP">GBP (British Pound)</option>
                        <option value="EUR">EUR (Euro)</option>
                        <option value="AUD">AUD (Australian Dollar)</option>
                      </select>
                    </Field>
                    <Field label="Minimum Annual Salary" required>
                      <input
                        type="number"
                        min="0"
                        step="10000"
                        value={minSalary}
                        onChange={(e) => setMinSalary(e.target.value)}
                        className={`${inputCls} font-mono`}
                      />
                    </Field>
                    <Field label="Maximum Annual Salary" required>
                      <input
                        type="number"
                        min="0"
                        step="10000"
                        value={maxSalary}
                        onChange={(e) => setMaxSalary(e.target.value)}
                        className={`${inputCls} font-mono`}
                      />
                    </Field>
                  </div>

                  {/* Salary Preview */}
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                    <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold mb-2">
                      Salary Preview
                    </div>
                    <div className="text-[20px] font-bold text-slate-900 font-mono">
                      {salaryCurrency}{" "}
                      {parseInt(minSalary || "0").toLocaleString()} –{" "}
                      {parseInt(maxSalary || "0").toLocaleString()}
                      <span className="text-[12px] text-slate-400 font-sans ml-1">
                        / year
                      </span>
                    </div>
                    <div className="text-[12px] text-slate-500 mt-1 font-medium">
                      Monthly: {salaryCurrency}{" "}
                      {Math.round(
                        parseInt(minSalary || "0") / 12,
                      ).toLocaleString()}{" "}
                      –{" "}
                      {Math.round(
                        parseInt(maxSalary || "0") / 12,
                      ).toLocaleString()}
                    </div>
                  </div>

                  <label className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition">
                    <input
                      type="checkbox"
                      checked={showSalary}
                      onChange={(e) => setShowSalary(e.target.checked)}
                      className="h-4 w-4 accent-slate-900 rounded"
                    />
                    <div>
                      <div className="text-[13px] font-semibold text-slate-900">
                        Display salary on listing
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Jobs with visible salaries get 3x more applicants
                      </div>
                    </div>
                  </label>
                </div>
              )}

              {/* STEP 3: Requirements */}
              {step === 3 && (
                <div className="space-y-6">
                  {/* Job Responsibilities */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <ListChecks className="h-4 w-4 text-slate-400" />
                      <h4 className="text-[14px] font-bold text-slate-900">
                        Job Responsibilities
                      </h4>
                    </div>
                    <p className="text-[11px] text-slate-400 -mt-2">
                      Core duties and day-to-day expectations. Maps to{" "}
                      <code className="bg-slate-100 px-1 rounded text-[10px]">
                        JobResponsibility
                      </code>{" "}
                      table.
                    </p>

                    <div className="space-y-2">
                      {responsibilities.map((resp, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2"
                        >
                          <span className="text-[13px] font-medium text-slate-900 flex-1">
                            {resp}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              setResponsibilities(
                                responsibilities.filter((_, idx) => idx !== i),
                              )
                            }
                            className="text-slate-300 hover:text-rose-500 text-[14px] font-bold"
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Add a key responsibility..."
                        value={newResponsibility}
                        onChange={(e) => setNewResponsibility(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addResponsibility();
                          }
                        }}
                        className={`${inputCls} flex-1`}
                      />
                      <button
                        type="button"
                        onClick={addResponsibility}
                        className="px-3 py-2 text-[12px] font-semibold bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition"
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  {/* Required Skills */}
                  <div className="space-y-3 border-t border-slate-100 pt-5">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-slate-400" />
                      <h4 className="text-[14px] font-bold text-slate-900">
                        Required Skills (Must Have)
                      </h4>
                    </div>
                    <p className="text-[11px] text-slate-400 -mt-2">
                      Mandatory skills required for the role. Maps to{" "}
                      <code className="bg-slate-100 px-1 rounded text-[10px]">
                        JobSkill (is_mandatory = true)
                      </code>
                      .
                    </p>

                    <div className="space-y-2">
                      {requiredSkills.map((sk, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2"
                        >
                          <span className="text-[13px] font-medium text-slate-900 flex-1">
                            {sk}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              setRequiredSkills(
                                requiredSkills.filter((_, idx) => idx !== i),
                              )
                            }
                            className="text-slate-300 hover:text-rose-500 text-[14px] font-bold"
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Add a required skill (e.g. React)..."
                        value={newRequiredSkill}
                        onChange={(e) => setNewRequiredSkill(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addRequiredSkill();
                          }
                        }}
                        className={`${inputCls} flex-1`}
                      />
                      <button
                        type="button"
                        onClick={addRequiredSkill}
                        className="px-3 py-2 text-[12px] font-semibold bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition"
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  {/* Preferred Skills */}
                  <div className="space-y-3 border-t border-slate-100 pt-5">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-slate-400" />
                      <h4 className="text-[14px] font-bold text-slate-900">
                        Preferred Skills (Nice to Have)
                      </h4>
                    </div>
                    <p className="text-[11px] text-slate-400 -mt-2">
                      Bonus or secondary skills that give candidates an
                      advantage. Maps to{" "}
                      <code className="bg-slate-100 px-1 rounded text-[10px]">
                        JobSkill (is_mandatory = false)
                      </code>
                      .
                    </p>

                    <div className="space-y-2">
                      {preferredSkills.map((sk, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2"
                        >
                          <span className="text-[13px] font-medium text-slate-900 flex-1">
                            {sk}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              setPreferredSkills(
                                preferredSkills.filter((_, idx) => idx !== i),
                              )
                            }
                            className="text-slate-300 hover:text-rose-500 text-[14px] font-bold"
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Add a preferred skill (e.g. Docker)..."
                        value={newPreferredSkill}
                        onChange={(e) => setNewPreferredSkill(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addPreferredSkill();
                          }
                        }}
                        className={`${inputCls} flex-1`}
                      />
                      <button
                        type="button"
                        onClick={addPreferredSkill}
                        className="px-3 py-2 text-[12px] font-semibold bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition"
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  {/* Qualifications */}
                  <div className="space-y-3 border-t border-slate-100 pt-5">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-slate-400" />
                      <h4 className="text-[14px] font-bold text-slate-900">
                        Education & Qualifications
                      </h4>
                    </div>
                    <p className="text-[11px] text-slate-400 -mt-2">
                      Maps to{" "}
                      <code className="bg-slate-100 px-1 rounded text-[10px]">
                        JobQualification
                      </code>{" "}
                      table.
                    </p>

                    <div className="space-y-2">
                      {qualifications.map((q, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2"
                        >
                          <span className="text-[13px] font-medium text-slate-900 flex-1">
                            {q}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              setQualifications(
                                qualifications.filter((_, idx) => idx !== i),
                              )
                            }
                            className="text-slate-300 hover:text-rose-500 text-[14px] font-bold"
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Add a qualification (e.g. Bachelor's in CS)..."
                        value={newQualification}
                        onChange={(e) => setNewQualification(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addQualification();
                          }
                        }}
                        className={`${inputCls} flex-1`}
                      />
                      <button
                        type="button"
                        onClick={addQualification}
                        className="px-3 py-2 text-[12px] font-semibold bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition"
                      >
                        Add
                      </button>
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
                      <h4 className="text-[14px] font-bold text-slate-900">
                        Job Benefits
                      </h4>
                    </div>
                    <p className="text-[11px] text-slate-400 -mt-2">
                      Maps to{" "}
                      <code className="bg-slate-100 px-1 rounded text-[10px]">
                        JobBenefit
                      </code>{" "}
                      via benefits lookup table.
                    </p>

                    <div className="space-y-2">
                      {benefits.map((b, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2"
                        >
                          <span className="text-[13px] font-medium text-slate-900 flex-1">
                            {b}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              setBenefits(
                                benefits.filter((_, idx) => idx !== i),
                              )
                            }
                            className="text-slate-300 hover:text-rose-500 text-[14px] font-bold"
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Add a job benefit..."
                        value={newBenefit}
                        onChange={(e) => setNewBenefit(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addBenefit();
                          }
                        }}
                        className={`${inputCls} flex-1`}
                      />
                      <button
                        type="button"
                        onClick={addBenefit}
                        className="px-3 py-2 text-[12px] font-semibold bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition"
                      >
                        Add
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {[
                        "Gym Membership",
                        "Paid Parental Leave",
                        "Stock Options",
                        "Learning Budget",
                        "Annual Bonus",
                        "Meal Allowance",
                        "Travel Allowance",
                        "Work From Home Equipment",
                      ]
                        .filter((b) => !benefits.includes(b))
                        .map((sug) => (
                          <button
                            key={sug}
                            type="button"
                            onClick={() => setBenefits([...benefits, sug])}
                            className="text-[10px] font-medium text-slate-500 bg-white border border-dashed border-slate-300 hover:border-slate-400 hover:text-slate-700 px-2 py-1 rounded-md transition"
                          >
                            + {sug}
                          </button>
                        ))}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="space-y-3 border-t border-slate-100 pt-5">
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-slate-400" />
                      <h4 className="text-[14px] font-bold text-slate-900">
                        Tags & Keywords
                      </h4>
                    </div>
                    <p className="text-[11px] text-slate-400 -mt-2">
                      Maps to{" "}
                      <code className="bg-slate-100 px-1 rounded text-[10px]">
                        JobTag
                      </code>
                      . Improve discoverability in search.
                    </p>
                    <TagInput
                      value={tags}
                      onChange={setTags}
                      placeholder="e.g. react, agile, saas (press Enter)"
                    />
                  </div>

                  {/* Media */}
                  <div className="space-y-3 border-t border-slate-100 pt-5">
                    <div className="flex items-center gap-2">
                      <ImagePlus className="h-4 w-4 text-slate-400" />
                      <h4 className="text-[14px] font-bold text-slate-900">
                        Media Attachments
                      </h4>
                    </div>
                    <p className="text-[11px] text-slate-400 -mt-2">
                      Maps to{" "}
                      <code className="bg-slate-100 px-1 rounded text-[10px]">
                        JobMedia
                      </code>
                      . Add images or video URLs about the role.
                    </p>
                    {mediaUrls.length > 0 && (
                      <div className="space-y-1.5">
                        {mediaUrls.map((url, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2"
                          >
                            <span className="text-[12px] font-mono text-blue-600 truncate flex-1">
                              {url}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                setMediaUrls(
                                  mediaUrls.filter((_, idx) => idx !== i),
                                )
                              }
                              className="text-slate-300 hover:text-rose-500 text-[14px] font-bold"
                            >
                              &times;
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="flex gap-2">
                      <input
                        type="url"
                        placeholder="https://example.com/office-photo.jpg"
                        value={newMediaUrl}
                        onChange={(e) => setNewMediaUrl(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addMedia();
                          }
                        }}
                        className={`${inputCls} flex-1`}
                      />
                      <button
                        type="button"
                        onClick={addMedia}
                        className="px-3 py-2 text-[12px] font-semibold bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: Review */}
              {step === 5 && (
                <div className="space-y-5">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <h4 className="text-[14px] font-bold text-slate-900">
                      Review Job Posting
                    </h4>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
                    {/* Title Row */}
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                        Job Title
                      </div>
                      <div className="text-[16px] font-bold text-slate-900 mt-0.5">
                        {title || "Untitled"}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        ["Designation", designation],
                        ["Department", department],
                        ["Employment", employmentType.replace("_", "-")],
                        ["Work Mode", workMode.replace("_", " ")],
                        ["Seniority", seniorityLevel.replace("_", " ")],
                        [
                          "Experience",
                          `${minExpMonths}–${maxExpMonths} months`,
                        ],
                        [
                          "Salary",
                          `${salaryCurrency} ${parseInt(minSalary || "0").toLocaleString()} – ${parseInt(maxSalary || "0").toLocaleString()}`,
                        ],
                        [
                          "Status",
                          status === "published" ? "🟢 Published" : "📝 Draft",
                        ],
                      ].map(([label, value]) => (
                        <div key={label}>
                          <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                            {label}
                          </div>
                          <div className="text-[12px] font-semibold text-slate-700 mt-0.5 capitalize">
                            {value}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Locations */}
                    {locations.length > 0 && (
                      <div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                          Locations
                        </div>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {locations.map((loc, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center gap-1 text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-md"
                            >
                              <MapPin className="h-3 w-3" /> {loc}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {/* Description preview */}
                    {description && (
                      <div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                          Description Preview
                        </div>
                        <p className="text-[12px] text-slate-600 mt-1 whitespace-pre-line line-clamp-4">
                          {description}
                        </p>
                      </div>
                    )}
                    {/* Responsibilities */}
                    {responsibilities.length > 0 && (
                      <div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                          Key Responsibilities ({responsibilities.length})
                        </div>
                        <ul className="list-disc list-inside text-[12px] text-slate-700 font-medium space-y-0.5 mt-1">
                          {responsibilities.map((r, i) => (
                            <li key={i}>{r}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Required Skills */}
                    {requiredSkills.length > 0 && (
                      <div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                          Required Skills ({requiredSkills.length})
                        </div>
                        <ul className="list-disc list-inside text-[12px] text-slate-700 font-medium space-y-0.5 mt-1">
                          {requiredSkills.map((s, i) => (
                            <li key={i}>{s}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Preferred Skills */}
                    {preferredSkills.length > 0 && (
                      <div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                          Preferred Skills ({preferredSkills.length})
                        </div>
                        <ul className="list-disc list-inside text-[12px] text-slate-700 font-medium space-y-0.5 mt-1">
                          {preferredSkills.map((s, i) => (
                            <li key={i}>{s}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Qualifications */}
                    {qualifications.length > 0 && (
                      <div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                          Qualifications ({qualifications.length})
                        </div>
                        <ul className="list-disc list-inside text-[12px] text-slate-700 font-medium space-y-0.5 mt-1">
                          {qualifications.map((q, i) => (
                            <li key={i}>{q}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Benefits & Tags */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {benefits.length > 0 && (
                        <div>
                          <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                            Benefits ({benefits.length})
                          </div>
                          <ul className="list-disc list-inside text-[12px] text-slate-700 font-medium space-y-0.5 mt-1">
                            {benefits.map((b, i) => (
                              <li key={i}>{b}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                          Tags ({tags.length})
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {tags.map((t, i) => (
                            <span
                              key={i}
                              className="text-[10px] font-semibold bg-violet-50 text-violet-700 border border-violet-200 px-1.5 py-0.5 rounded-md"
                            >
                              #{t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
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
                  onClick={() =>
                    setStep((s) => Math.min(STEPS.length - 1, s + 1))
                  }
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-[12px] font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Next <ChevronRight className="h-3.5 w-3.5" />
                </button>
              ) : (
                <div className="flex flex-col items-end gap-1">
                  {submitError && (
                    <p className="text-[11px] font-medium text-rose-600">
                      {submitError}
                    </p>
                  )}
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={handlePublish}
                    className="inline-flex items-center gap-1.5 px-5 py-2 text-[12px] font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition shadow-xs disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />{" "}
                    {isSubmitting
                      ? "Saving to Database..."
                      : isEditing
                        ? "Save Changes"
                        : status === "published"
                          ? "Publish Job"
                          : "Save as Draft"}
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ──────────────── SCHEDULE INTERVIEW MODAL ──────────────── */

export function ScheduleInterviewModal({
  isOpen,
  onClose,
  onInterviewScheduled,
}: ScheduleInterviewModalProps) {
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
      scheduledAt: form.scheduledDate
        ? `${form.scheduledDate}T${form.scheduledTime}`
        : null,
      durationMinutes: parseInt(form.durationMinutes) || 60,
      locationOrUrl: form.meetLink,
      meetLink: form.meetLink,
      panelCount: form.panelists ? form.panelists.split(",").length : 1,
    });
    onClose();
    setForm({
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
  };

  return (
    <div
      className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white border border-slate-200 rounded-xl max-w-lg w-full p-6 shadow-xl space-y-5 animate-in fade-in zoom-in-95 duration-150"
      >
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-slate-900 flex items-center justify-center">
              <Calendar className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="text-[15px] font-bold text-slate-900">
                Schedule Candidate Interview
              </h3>
              <p className="text-[11px] text-slate-400 font-medium">
                Maps to Interview + InterviewPanelist tables
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 bg-slate-50 border border-slate-100 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-[13px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Candidate Name" required>
              <input
                type="text"
                required
                placeholder="e.g. Sujata Karki"
                value={form.candidateName}
                onChange={(e) =>
                  setForm({ ...form, candidateName: e.target.value })
                }
                className={inputCls}
              />
            </Field>
            <Field label="Target Requisition" required>
              <input
                type="text"
                required
                placeholder="e.g. Senior Laravel Developer"
                value={form.jobTitle}
                onChange={(e) => setForm({ ...form, jobTitle: e.target.value })}
                className={inputCls}
              />
            </Field>
          </div>

          <Field label="Interview Type / Round">
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className={selectCls}
            >
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
              <input
                type="date"
                required
                value={form.scheduledDate}
                onChange={(e) =>
                  setForm({ ...form, scheduledDate: e.target.value })
                }
                className={inputCls}
              />
            </Field>
            <Field label="Time" required>
              <input
                type="time"
                required
                value={form.scheduledTime}
                onChange={(e) =>
                  setForm({ ...form, scheduledTime: e.target.value })
                }
                className={inputCls}
              />
            </Field>
            <Field label="Duration (min)" hint="Maps to durationMinutes">
              <input
                type="number"
                min="15"
                step="15"
                value={form.durationMinutes}
                onChange={(e) =>
                  setForm({ ...form, durationMinutes: e.target.value })
                }
                className={`${inputCls} font-mono`}
              />
            </Field>
          </div>

          <Field
            label="Meeting URL"
            hint="Google Meet, Zoom, or Teams link (meetingUrl field)"
          >
            <input
              type="url"
              placeholder="https://meet.google.com/..."
              value={form.meetLink}
              onChange={(e) => setForm({ ...form, meetLink: e.target.value })}
              className={`${inputCls} font-mono text-[12px]`}
            />
          </Field>

          <Field
            label="Panel Members"
            hint="Comma-separated. Creates InterviewPanelist records."
          >
            <input
              type="text"
              placeholder="e.g. Tarun S., Bikash R."
              value={form.panelists}
              onChange={(e) => setForm({ ...form, panelists: e.target.value })}
              className={inputCls}
            />
          </Field>

          <Field label="Notes (optional)">
            <textarea
              rows={2}
              placeholder="Any prep instructions or candidate notes..."
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className={`${inputCls} resize-none`}
            />
          </Field>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[12px] font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-[12px] font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition"
            >
              Confirm & Schedule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
