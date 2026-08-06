"use client";

import React, { useState, useEffect } from "react";
import DashboardShell from "@/components/layout/DashboardShell";
import { useCandidateOverview } from "@/hooks/useCandidateOverview";
import { getCandidateNavItems } from "@/lib/candidate-nav";
import {
  User, Shield, Briefcase, GraduationCap, Sparkles, FolderGit2,
  Plus, Trash2, CheckCircle2, Lock, Edit3, X, ChevronRight, ChevronLeft,
  Mail, Phone, Calendar, DollarSign, Globe, Award, ExternalLink
} from "lucide-react";

export default function CandidateSettingsPage() {
  const { profile } = useCandidateOverview();

  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  // 1. User & UserProfile Schema Model State
  const [profileForm, setProfileForm] = useState({
    firstName: "Sakhi",
    lastName: "Karki",
    email: "sakhi.backend@email.com",
    mobile: "+977-9841234567",
    birthDate: "1998-05-14",
    headline: "Senior Backend Developer (Laravel & Node.js)",
    summary: "Passionate backend engineer with 3+ years of experience designing microservices, REST APIs, and database architectures.",
    totalExperienceMonths: 36,
    currentCtc: 85000,
    expectedCtc: 120000,
    openToWork: true,
    emailVerified: true,
  });

  // 2. CandidatePreference Schema Model State
  const [prefForm, setPrefForm] = useState({
    remotePreferred: true,
    jobAlertEnabled: true,
    profileVisible: true,
    preferredJobType: "Full-time",
    minimumExpectedSalary: 90000,
  });

  // 3. CandidateSkill Schema Model State
  const [skills, setSkills] = useState([
    { id: "sk-1", skillName: "Laravel", proficiencyLevel: "Advanced", experienceMonths: 36, isPrimary: true },
    { id: "sk-2", skillName: "Node.js", proficiencyLevel: "Intermediate", experienceMonths: 24, isPrimary: true },
    { id: "sk-3", skillName: "PostgreSQL", proficiencyLevel: "Advanced", experienceMonths: 30, isPrimary: false },
    { id: "sk-4", skillName: "Docker", proficiencyLevel: "Intermediate", experienceMonths: 12, isPrimary: false },
  ]);

  // 4. Education Schema Model State
  const [education, setEducation] = useState([
    {
      id: "edu-1",
      qualification: "Bachelor's Degree",
      specialization: "Computer Science & Engineering",
      institute: "Tribhuvan University",
      startYear: 2017,
      endYear: 2021,
      score: "3.75 CGPA",
    },
  ]);

  // 5. CandidateExperience Schema Model State
  const [experiences, setExperiences] = useState([
    {
      id: "exp-1",
      companyName: "TechCraft Nepal",
      designation: "Backend Developer",
      startDate: "2022-01-15",
      endDate: "",
      isCurrent: true,
      description: "Building API endpoints for fintech payment gateway using Laravel & Redis.",
    },
    {
      id: "exp-2",
      companyName: "WebWave Solutions",
      designation: "Junior PHP Developer",
      startDate: "2021-02-01",
      endDate: "2021-12-31",
      isCurrent: false,
      description: "Developed e-commerce modules and MySQL database migrations.",
    },
  ]);

  // 6. CandidateProject Schema Model State
  const [projects, setProjects] = useState([
    {
      id: "proj-1",
      projectName: "Job Portal Microservice Engine",
      projectUrl: "https://github.com/sakhi/job-portal-engine",
      startDate: "2023-03-01",
      endDate: "2023-08-15",
      description: "Event-driven notification system with queue workers handling 10,000 requests/sec.",
    },
  ]);

  // ── Wizard Modal State ──
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;

  // Temp form states inside wizard
  const [tempSkillName, setTempSkillName] = useState("");
  const [tempSkillProf, setTempSkillProf] = useState("Intermediate");

  const [newExp, setNewExp] = useState({ companyName: "", designation: "", startDate: "", endDate: "", isCurrent: false, description: "" });
  const [newEdu, setNewEdu] = useState({ qualification: "", specialization: "", institute: "", startYear: "2018", endYear: "2022", score: "" });
  const [newProj, setNewProj] = useState({ projectName: "", projectUrl: "", description: "" });

  const handleFinishWizard = () => {
    setIsWizardOpen(false);
    setToast("Profile successfully updated!");
  };

  const WIZARD_STEPS = [
    { num: 1, label: "Personal Info", icon: User },
    { num: 2, label: "Experience", icon: Briefcase },
    { num: 3, label: "Education", icon: GraduationCap },
    { num: 4, label: "Skills", icon: Sparkles },
    { num: 5, label: "Projects", icon: FolderGit2 },
    { num: 6, label: "Preferences", icon: Shield },
  ];

  return (
    <DashboardShell
      brandTitle="JPS"
      brandSubtitle="Candidate Dashboard"
      navItems={getCandidateNavItems("/dashboard/settings")}
      searchPlaceholder="Search candidate profile..."
      userAvatarText={profile.avatarText}
    >
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-slate-900 text-white text-[13px] font-semibold px-4 py-3 rounded-lg shadow-xl flex items-center gap-2 animate-in slide-in-from-top-2 fade-in duration-200">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" /> {toast}
        </div>
      )}

      <div className="space-y-6 max-w-4xl">
        {/* ── Page Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
          <div>
            <h1 className="text-[20px] font-bold text-slate-900 tracking-tight">Candidate Profile & Settings</h1>
            <p className="text-[13px] text-slate-500 mt-0.5">
              Review your candidate profile data or launch the animated multi-step profile editor wizard
            </p>
          </div>
          <button
            type="button"
            onClick={() => { setCurrentStep(1); setIsWizardOpen(true); }}
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-[12px] font-semibold px-4 py-2.5 rounded-lg transition shadow-xs shrink-0"
          >
            <Edit3 className="h-4 w-4" /> Edit Profile (Wizard)
          </button>
        </div>

        {/* ── READ-ONLY PROFILE VIEW MODE ── */}
        <div className="space-y-6 text-[13px]">
          {/* Card 1: User & Personal Details */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-xl bg-slate-900 text-white font-bold text-lg flex items-center justify-center font-mono shrink-0">
                  {profileForm.firstName.slice(0, 1)}{profileForm.lastName.slice(0, 1)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-[18px] font-bold text-slate-900">{profileForm.firstName} {profileForm.lastName}</h2>
                    {profileForm.openToWork && (
                      <span className="text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
                        Open to Work
                      </span>
                    )}
                  </div>
                  <p className="text-[13px] text-slate-600 font-medium mt-0.5">{profileForm.headline}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => { setCurrentStep(1); setIsWizardOpen(true); }}
                className="text-[12px] font-semibold text-slate-700 hover:text-slate-900 border border-slate-200 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-lg transition"
              >
                Edit
              </button>
            </div>

            <p className="text-[13px] text-slate-600 leading-relaxed bg-slate-50 border border-slate-100 rounded-xl p-3.5">
              {profileForm.summary}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-[12px] pt-1">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-center">
                <div className="text-[10px] text-slate-400 font-sans uppercase">Total Experience</div>
                <div className="text-[16px] font-bold text-slate-900 mt-0.5">{(profileForm.totalExperienceMonths / 12).toFixed(1)} yrs</div>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-center">
                <div className="text-[10px] text-slate-400 font-sans uppercase">Current CTC</div>
                <div className="text-[16px] font-bold text-slate-900 mt-0.5">Rs {profileForm.currentCtc.toLocaleString()}/mo</div>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-center">
                <div className="text-[10px] text-slate-400 font-sans uppercase">Expected CTC</div>
                <div className="text-[16px] font-bold text-slate-900 mt-0.5">Rs {profileForm.expectedCtc.toLocaleString()}/mo</div>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-center">
                <div className="text-[10px] text-slate-400 font-sans uppercase">Preferred Type</div>
                <div className="text-[14px] font-bold text-slate-900 font-sans mt-0.5">{prefForm.preferredJobType}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-[12px] text-slate-600">
              <div className="flex items-center gap-2 font-mono">
                <Mail className="h-4 w-4 text-slate-400" /> {profileForm.email}
              </div>
              <div className="flex items-center gap-2 font-mono">
                <Phone className="h-4 w-4 text-slate-400" /> {profileForm.mobile}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-slate-400" /> DOB: {profileForm.birthDate}
              </div>
            </div>
          </div>

          {/* Card 2: Work Experience */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-[15px] font-bold text-slate-900 flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-slate-500" /> Work Experience (`CandidateExperience`)
              </h3>
              <button
                type="button"
                onClick={() => { setCurrentStep(2); setIsWizardOpen(true); }}
                className="text-[12px] font-semibold text-slate-700 hover:text-slate-900 border border-slate-200 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-lg transition"
              >
                Edit
              </button>
            </div>
            <div className="space-y-3">
              {experiences.map((exp) => (
                <div key={exp.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <div className="font-bold text-slate-900 text-[14px] flex items-center gap-2">
                    {exp.designation} <span className="text-[12px] font-medium text-slate-500">at {exp.companyName}</span>
                    {exp.isCurrent && <span className="text-[10px] bg-slate-900 text-white font-mono px-1.5 py-0.5 rounded font-semibold">Current</span>}
                  </div>
                  <div className="text-[11px] font-mono text-slate-500">{exp.startDate} – {exp.isCurrent ? "Present" : exp.endDate}</div>
                  <p className="text-[12px] text-slate-600 mt-1">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Education */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-[15px] font-bold text-slate-900 flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-slate-500" /> Education & Qualifications (`Education`)
              </h3>
              <button
                type="button"
                onClick={() => { setCurrentStep(3); setIsWizardOpen(true); }}
                className="text-[12px] font-semibold text-slate-700 hover:text-slate-900 border border-slate-200 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-lg transition"
              >
                Edit
              </button>
            </div>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <div className="font-bold text-slate-900 text-[14px]">{edu.qualification} — {edu.specialization}</div>
                  <div className="text-[12px] text-slate-600">{edu.institute}</div>
                  <div className="text-[11px] font-mono text-slate-500">{edu.startYear} – {edu.endYear} • Score: {edu.score}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 4: Skills & Tech Stack */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-[15px] font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-slate-500" /> Skills & Tech Stack (`CandidateSkill`)
              </h3>
              <button
                type="button"
                onClick={() => { setCurrentStep(4); setIsWizardOpen(true); }}
                className="text-[12px] font-semibold text-slate-700 hover:text-slate-900 border border-slate-200 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-lg transition"
              >
                Edit
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <span key={s.id} className="inline-flex items-center gap-2 bg-slate-100 border border-slate-200 rounded-lg px-3 py-1.5 text-[12px] font-semibold text-slate-800">
                  {s.skillName}
                  <span className="text-[10px] text-slate-500 bg-white border border-slate-200 px-1.5 py-0.5 rounded font-normal">
                    {s.proficiencyLevel}
                  </span>
                </span>
              ))}
            </div>
          </div>

          {/* Card 5: Projects */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-[15px] font-bold text-slate-900 flex items-center gap-2">
                <FolderGit2 className="h-4 w-4 text-slate-500" /> Portfolio Projects (`CandidateProject`)
              </h3>
              <button
                type="button"
                onClick={() => { setCurrentStep(5); setIsWizardOpen(true); }}
                className="text-[12px] font-semibold text-slate-700 hover:text-slate-900 border border-slate-200 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-lg transition"
              >
                Edit
              </button>
            </div>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <div className="font-bold text-slate-900 text-[14px] flex items-center gap-2">
                    {proj.projectName}
                    {proj.projectUrl && (
                      <a href={proj.projectUrl} target="_blank" rel="noreferrer" className="text-blue-600 font-mono text-[11px] hover:underline flex items-center gap-1">
                        <ExternalLink className="h-3 w-3" /> Live Demo
                      </a>
                    )}
                  </div>
                  <p className="text-[12px] text-slate-600">{proj.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Card 6: Job Preferences & Privacy */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-[15px] font-bold text-slate-900 flex items-center gap-2">
                <Shield className="h-4 w-4 text-slate-500" /> Preferences & Privacy (`CandidatePreference`)
              </h3>
              <button
                type="button"
                onClick={() => { setCurrentStep(6); setIsWizardOpen(true); }}
                className="text-[12px] font-semibold text-slate-700 hover:text-slate-900 border border-slate-200 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-lg transition"
              >
                Edit
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[12px]">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Remote Preference</div>
                <div className="font-bold text-slate-900 mt-0.5">{prefForm.remotePreferred ? "Remote Preferred" : "On-site / Hybrid"}</div>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Recruiter Discovery</div>
                <div className="font-bold text-slate-900 mt-0.5">{prefForm.profileVisible ? "Visible to Recruiters" : "Hidden / Private"}</div>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Job Alerts</div>
                <div className="font-bold text-slate-900 mt-0.5">{prefForm.jobAlertEnabled ? "Email Alerts Enabled" : "Alerts Paused"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── ANIMATED MULTI-STEP PROFILE WIZARD MODAL ── */}
      {isWizardOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200" onClick={() => setIsWizardOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col justify-between">
            {/* Modal Header */}
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-[18px] font-bold text-slate-900">Edit Candidate Profile Wizard</h3>
                  <p className="text-[12px] text-slate-500">Step {currentStep} of {totalSteps} — {WIZARD_STEPS[currentStep - 1]?.label}</p>
                </div>
                <button type="button" onClick={() => setIsWizardOpen(false)} className="text-slate-400 hover:text-slate-900 p-1"><X className="h-5 w-5" /></button>
              </div>

              {/* Wizard Steps Progress Bar */}
              <div className="flex items-center gap-1 pt-4 pb-2 border-b border-slate-100 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {WIZARD_STEPS.map((step) => {
                  const StepIcon = step.icon;
                  const isActive = currentStep === step.num;
                  const isDone = currentStep > step.num;
                  return (
                    <button
                      key={step.num}
                      type="button"
                      onClick={() => setCurrentStep(step.num)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold transition shrink-0 ${
                        isActive
                          ? "bg-slate-900 text-white"
                          : isDone
                          ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                          : "text-slate-400 hover:bg-slate-50"
                      }`}
                    >
                      <StepIcon className="h-3.5 w-3.5" />
                      <span>{step.num}. {step.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step Body Container */}
            <div className="py-2 overflow-y-auto max-h-[55vh] text-[13px]">
              {/* STEP 1: Personal Info */}
              {currentStep === 1 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-3 duration-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[12px] font-semibold text-slate-700">First Name *</label>
                      <input
                        type="text" value={profileForm.firstName} onChange={(e) => setProfileForm({ ...profileForm, firstName: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-medium focus:outline-none focus:border-slate-400"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[12px] font-semibold text-slate-700">Last Name *</label>
                      <input
                        type="text" value={profileForm.lastName} onChange={(e) => setProfileForm({ ...profileForm, lastName: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-medium focus:outline-none focus:border-slate-400"
                      />
                    </div>
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-[12px] font-semibold text-slate-700">Professional Headline</label>
                      <input
                        type="text" value={profileForm.headline} onChange={(e) => setProfileForm({ ...profileForm, headline: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-medium focus:outline-none focus:border-slate-400"
                      />
                    </div>
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-[12px] font-semibold text-slate-700">Summary / About Candidate</label>
                      <textarea
                        rows={3} value={profileForm.summary} onChange={(e) => setProfileForm({ ...profileForm, summary: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-900 font-medium focus:outline-none focus:border-slate-400"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[12px] font-semibold text-slate-700">Mobile Phone</label>
                      <input
                        type="text" value={profileForm.mobile} onChange={(e) => setProfileForm({ ...profileForm, mobile: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-mono font-medium focus:outline-none focus:border-slate-400"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[12px] font-semibold text-slate-700">Date of Birth</label>
                      <input
                        type="date" value={profileForm.birthDate} onChange={(e) => setProfileForm({ ...profileForm, birthDate: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-medium focus:outline-none focus:border-slate-400"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[12px] font-semibold text-slate-700">Current CTC (NPR/mo)</label>
                      <input
                        type="number" value={profileForm.currentCtc} onChange={(e) => setProfileForm({ ...profileForm, currentCtc: parseInt(e.target.value) || 0 })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-mono font-medium focus:outline-none focus:border-slate-400"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[12px] font-semibold text-slate-700">Expected CTC (NPR/mo)</label>
                      <input
                        type="number" value={profileForm.expectedCtc} onChange={(e) => setProfileForm({ ...profileForm, expectedCtc: parseInt(e.target.value) || 0 })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-mono font-medium focus:outline-none focus:border-slate-400"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Work Experience */}
              {currentStep === 2 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-3 duration-200">
                  <div className="space-y-2">
                    {experiences.map((exp) => (
                      <div key={exp.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                        <div>
                          <div className="font-bold text-slate-900">{exp.designation} at {exp.companyName}</div>
                          <div className="text-[11px] font-mono text-slate-500">{exp.startDate} – {exp.isCurrent ? "Present" : exp.endDate}</div>
                        </div>
                        <button type="button" onClick={() => setExperiences(experiences.filter(e => e.id !== exp.id))} className="text-slate-400 hover:text-rose-600"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    ))}
                  </div>

                  <div className="p-3.5 border border-slate-200 rounded-xl space-y-3 bg-white">
                    <div className="font-bold text-slate-900 text-[12px]">Add New Position</div>
                    <div className="grid grid-cols-2 gap-2">
                      <input type="text" placeholder="Company Name" value={newExp.companyName} onChange={(e) => setNewExp({ ...newExp, companyName: e.target.value })} className="bg-slate-50 border rounded-lg px-3 py-2 text-[12px]" />
                      <input type="text" placeholder="Designation" value={newExp.designation} onChange={(e) => setNewExp({ ...newExp, designation: e.target.value })} className="bg-slate-50 border rounded-lg px-3 py-2 text-[12px]" />
                      <input type="date" value={newExp.startDate} onChange={(e) => setNewExp({ ...newExp, startDate: e.target.value })} className="bg-slate-50 border rounded-lg px-3 py-2 text-[12px]" />
                      <input type="date" disabled={newExp.isCurrent} value={newExp.endDate} onChange={(e) => setNewExp({ ...newExp, endDate: e.target.value })} className="bg-slate-50 border rounded-lg px-3 py-2 text-[12px] disabled:opacity-40" />
                    </div>
                    <label className="flex items-center gap-2 text-[11px]">
                      <input type="checkbox" checked={newExp.isCurrent} onChange={(e) => setNewExp({ ...newExp, isCurrent: e.target.checked })} className="h-3.5 w-3.5 accent-slate-900" /> I currently work here
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        if (newExp.companyName) {
                          setExperiences([...experiences, { id: `exp-${Date.now()}`, ...newExp }]);
                          setNewExp({ companyName: "", designation: "", startDate: "", endDate: "", isCurrent: false, description: "" });
                        }
                      }}
                      className="bg-slate-900 text-white font-semibold text-[11px] px-3 py-1.5 rounded-lg"
                    >
                      + Add Position
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Education */}
              {currentStep === 3 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-3 duration-200">
                  <div className="space-y-2">
                    {education.map((edu) => (
                      <div key={edu.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                        <div>
                          <div className="font-bold text-slate-900">{edu.qualification} — {edu.specialization}</div>
                          <div className="text-[11px] text-slate-500">{edu.institute} ({edu.startYear}-{edu.endYear})</div>
                        </div>
                        <button type="button" onClick={() => setEducation(education.filter(e => e.id !== edu.id))} className="text-slate-400 hover:text-rose-600"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    ))}
                  </div>

                  <div className="p-3.5 border border-slate-200 rounded-xl space-y-3 bg-white">
                    <div className="font-bold text-slate-900 text-[12px]">Add Education</div>
                    <div className="grid grid-cols-2 gap-2">
                      <input type="text" placeholder="Degree / Qualification" value={newEdu.qualification} onChange={(e) => setNewEdu({ ...newEdu, qualification: e.target.value })} className="bg-slate-50 border rounded-lg px-3 py-2 text-[12px]" />
                      <input type="text" placeholder="Specialization" value={newEdu.specialization} onChange={(e) => setNewEdu({ ...newEdu, specialization: e.target.value })} className="bg-slate-50 border rounded-lg px-3 py-2 text-[12px]" />
                      <input type="text" placeholder="Institute" value={newEdu.institute} onChange={(e) => setNewEdu({ ...newEdu, institute: e.target.value })} className="bg-slate-50 border rounded-lg px-3 py-2 text-[12px]" />
                      <input type="text" placeholder="Score / CGPA" value={newEdu.score} onChange={(e) => setNewEdu({ ...newEdu, score: e.target.value })} className="bg-slate-50 border rounded-lg px-3 py-2 text-[12px]" />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        if (newEdu.qualification) {
                          setEducation([...education, { id: `edu-${Date.now()}`, qualification: newEdu.qualification, specialization: newEdu.specialization, institute: newEdu.institute || "Nepal Univ", startYear: 2018, endYear: 2022, score: newEdu.score || "Passed" }]);
                          setNewEdu({ qualification: "", specialization: "", institute: "", startYear: "2018", endYear: "2022", score: "" });
                        }
                      }}
                      className="bg-slate-900 text-white font-semibold text-[11px] px-3 py-1.5 rounded-lg"
                    >
                      + Add Qualification
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: Skills */}
              {currentStep === 4 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-3 duration-200">
                  <div className="flex flex-wrap gap-2">
                    {skills.map((s) => (
                      <span key={s.id} className="inline-flex items-center gap-2 bg-slate-100 border border-slate-200 rounded-lg px-3 py-1.5 text-[12px] font-semibold text-slate-800">
                        {s.skillName} ({s.proficiencyLevel})
                        <button type="button" onClick={() => setSkills(skills.filter(item => item.id !== s.id))} className="text-slate-400 hover:text-rose-600"><Trash2 className="h-3.5 w-3.5" /></button>
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <input
                      type="text" placeholder="Skill name..." value={tempSkillName} onChange={(e) => setTempSkillName(e.target.value)}
                      className="flex-1 bg-slate-50 border rounded-lg px-3 py-2 text-[12px]"
                    />
                    <select
                      value={tempSkillProf} onChange={(e) => setTempSkillProf(e.target.value)}
                      className="bg-slate-50 border rounded-lg px-3 py-2 text-[12px]"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="Expert">Expert</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => {
                        if (tempSkillName) {
                          setSkills([...skills, { id: `sk-${Date.now()}`, skillName: tempSkillName, proficiencyLevel: tempSkillProf, experienceMonths: 12, isPrimary: false }]);
                          setTempSkillName("");
                        }
                      }}
                      className="bg-slate-900 text-white font-semibold text-[12px] px-4 py-2 rounded-lg"
                    >
                      Add
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 5: Projects */}
              {currentStep === 5 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-3 duration-200">
                  <div className="space-y-2">
                    {projects.map((p) => (
                      <div key={p.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                        <div>
                          <div className="font-bold text-slate-900">{p.projectName}</div>
                          <div className="text-[11px] text-slate-500 truncate max-w-xs">{p.description}</div>
                        </div>
                        <button type="button" onClick={() => setProjects(projects.filter(item => item.id !== p.id))} className="text-slate-400 hover:text-rose-600"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    ))}
                  </div>

                  <div className="p-3.5 border border-slate-200 rounded-xl space-y-3 bg-white">
                    <div className="font-bold text-slate-900 text-[12px]">Add Portfolio Project</div>
                    <input type="text" placeholder="Project Name" value={newProj.projectName} onChange={(e) => setNewProj({ ...newProj, projectName: e.target.value })} className="w-full bg-slate-50 border rounded-lg px-3 py-2 text-[12px]" />
                    <input type="url" placeholder="Project URL" value={newProj.projectUrl} onChange={(e) => setNewProj({ ...newProj, projectUrl: e.target.value })} className="w-full bg-slate-50 border rounded-lg px-3 py-2 text-[12px] font-mono" />
                    <textarea rows={2} placeholder="Description..." value={newProj.description} onChange={(e) => setNewProj({ ...newProj, description: e.target.value })} className="w-full bg-slate-50 border rounded-lg p-2.5 text-[12px]" />
                    <button
                      type="button"
                      onClick={() => {
                        if (newProj.projectName) {
                          setProjects([...projects, { id: `proj-${Date.now()}`, projectName: newProj.projectName, projectUrl: newProj.projectUrl, startDate: "2023-01-01", endDate: "2023-06-01", description: newProj.description }]);
                          setNewProj({ projectName: "", projectUrl: "", description: "" });
                        }
                      }}
                      className="bg-slate-900 text-white font-semibold text-[11px] px-3 py-1.5 rounded-lg"
                    >
                      + Add Project
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 6: Preferences */}
              {currentStep === 6 && (
                <div className="space-y-3 animate-in fade-in slide-in-from-right-3 duration-200">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[12px] font-semibold text-slate-700">Preferred Employment Type</label>
                      <select value={prefForm.preferredJobType} onChange={(e) => setPrefForm({ ...prefForm, preferredJobType: e.target.value })} className="w-full bg-slate-50 border rounded-lg px-3 py-2 text-[12px]">
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[12px] font-semibold text-slate-700">Min Salary Expectation (NPR)</label>
                      <input type="number" value={prefForm.minimumExpectedSalary} onChange={(e) => setPrefForm({ ...prefForm, minimumExpectedSalary: parseInt(e.target.value) || 0 })} className="w-full bg-slate-50 border rounded-lg px-3 py-2 text-[12px] font-mono" />
                    </div>
                  </div>

                  <label className="flex items-center justify-between p-3 bg-slate-50 border rounded-lg cursor-pointer">
                    <div><div className="font-semibold text-slate-900">Open to Work Badge</div><div className="text-[11px] text-slate-500">Show recruiter status indicator</div></div>
                    <input type="checkbox" checked={profileForm.openToWork} onChange={(e) => setProfileForm({ ...profileForm, openToWork: e.target.checked })} className="h-4 w-4 accent-slate-900" />
                  </label>

                  <label className="flex items-center justify-between p-3 bg-slate-50 border rounded-lg cursor-pointer">
                    <div><div className="font-semibold text-slate-900">Prefer Remote Work</div><div className="text-[11px] text-slate-500">Prioritize remote positions</div></div>
                    <input type="checkbox" checked={prefForm.remotePreferred} onChange={(e) => setPrefForm({ ...prefForm, remotePreferred: e.target.checked })} className="h-4 w-4 accent-slate-900" />
                  </label>

                  <label className="flex items-center justify-between p-3 bg-slate-50 border rounded-lg cursor-pointer">
                    <div><div className="font-semibold text-slate-900">Profile Visible to Employers</div><div className="text-[11px] text-slate-500">Discoverable in candidate searches</div></div>
                    <input type="checkbox" checked={prefForm.profileVisible} onChange={(e) => setPrefForm({ ...prefForm, profileVisible: e.target.checked })} className="h-4 w-4 accent-slate-900" />
                  </label>
                </div>
              )}
            </div>

            {/* Modal Footer Controls */}
            <div className="flex items-center justify-between border-t border-slate-100 pt-3">
              <button
                type="button"
                disabled={currentStep === 1}
                onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
                className="inline-flex items-center gap-1 px-3.5 py-2 text-[12px] font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4" /> Previous
              </button>

              <div className="flex items-center gap-2">
                {currentStep < totalSteps ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(prev => Math.min(totalSteps, prev + 1))}
                    className="inline-flex items-center gap-1 px-4 py-2 text-[12px] font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition"
                  >
                    Next Step <ChevronRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleFinishWizard}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-[12px] font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition shadow-xs"
                  >
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Save & Finish
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
