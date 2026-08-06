"use client";

import React, { useState, useEffect } from "react";
import DashboardShell from "@/components/layout/DashboardShell";
import { getRecruiterNavItems } from "@/lib/recruiter-nav";
import StatusBadge from "@/components/shared/StatusBadge";
import {
  Save, Building2, MapPin, Globe, Phone, Mail, Award, Plus, Trash2,
  ShieldCheck, Heart, CheckCircle2, Edit3, X, Sparkles
} from "lucide-react";

interface LocationItem {
  id: string;
  city: string;
  country: string;
  officeType: string;
  isHeadquarters: boolean;
}

interface BenefitItem {
  id: string;
  name: string;
  category: string;
}

export default function RecruiterCompanyPage() {
  const [company, setCompany] = useState({
    legalName: "JPS Employer Corporation Pvt. Ltd.",
    displayName: "JPS Employer Corp",
    slug: "jps-employer-corp",
    companyType: "Private Limited",
    ownershipType: "Private",
    foundedYear: 2020,
    websiteUrl: "https://jpsemployer.io",
    verificationStatus: "verified" as const,
    hrContactName: "Tarun Sharma",
    contactNumber: "+977-9801234567",
    aboutCompany: "JPS Employer Corp is a leading technology organization specializing in enterprise cloud architecture and web application development.",
    employeeCountMin: 50,
    employeeCountMax: 200,
    overallRating: 4.8,
    reviewCount: 34,
  });

  const [locations, setLocations] = useState<LocationItem[]>([
    { id: "loc-1", city: "Kathmandu", country: "Nepal", officeType: "Headquarters", isHeadquarters: true },
    { id: "loc-2", city: "Pokhara", country: "Nepal", officeType: "Regional Office", isHeadquarters: false },
  ]);

  const [benefits, setBenefits] = useState<BenefitItem[]>([
    { id: "b1", name: "Comprehensive Health Insurance (SSF)", category: "Health" },
    { id: "b2", name: "Flexible Remote & Hybrid Hours", category: "Work-Life" },
    { id: "b3", name: "Annual Learning & Certification Stipend", category: "Growth" },
    { id: "b4", name: "Paid Dashain & Festival Bonus", category: "Financial" },
  ]);

  const [toast, setToast] = useState<string | null>(null);

  // Modal States
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState<LocationItem | null>(null);
  const [locationForm, setLocationForm] = useState({
    city: "",
    country: "Nepal",
    officeType: "Branch Office",
    isHeadquarters: false,
  });

  const [isBenefitModalOpen, setIsBenefitModalOpen] = useState(false);
  const [editingBenefit, setEditingBenefit] = useState<BenefitItem | null>(null);
  const [benefitForm, setBenefitForm] = useState({
    name: "",
    category: "Health & Wellness",
  });

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setToast("Company profile, locations, and benefits saved successfully!");
  };

  /* ────────── Location Handlers ────────── */
  const openAddLocation = () => {
    setEditingLocation(null);
    setLocationForm({ city: "", country: "Nepal", officeType: "Branch Office", isHeadquarters: false });
    setIsLocationModalOpen(true);
  };

  const openEditLocation = (loc: LocationItem) => {
    setEditingLocation(loc);
    setLocationForm({ city: loc.city, country: loc.country, officeType: loc.officeType, isHeadquarters: loc.isHeadquarters });
    setIsLocationModalOpen(true);
  };

  const handleSaveLocation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!locationForm.city.trim()) return;

    let updatedLocs = [...locations];

    // If making this HQ, unsetHQ on all others
    if (locationForm.isHeadquarters) {
      updatedLocs = updatedLocs.map(l => ({ ...l, isHeadquarters: false }));
    }

    if (editingLocation) {
      setLocations(updatedLocs.map(l => l.id === editingLocation.id ? { ...editingLocation, ...locationForm } : l));
      setToast(`Updated location "${locationForm.city}"`);
    } else {
      const newLoc: LocationItem = {
        id: `loc-${Date.now()}`,
        ...locationForm,
      };
      setLocations([...updatedLocs, newLoc]);
      setToast(`Added location "${locationForm.city}"`);
    }
    setIsLocationModalOpen(false);
  };

  const handleDeleteLocation = (id: string, city: string) => {
    setLocations(locations.filter((l) => l.id !== id));
    setToast(`Removed location "${city}"`);
  };

  /* ────────── Benefit Handlers ────────── */
  const openAddBenefit = () => {
    setEditingBenefit(null);
    setBenefitForm({ name: "", category: "Health & Wellness" });
    setIsBenefitModalOpen(true);
  };

  const openEditBenefit = (b: BenefitItem) => {
    setEditingBenefit(b);
    setBenefitForm({ name: b.name, category: b.category });
    setIsBenefitModalOpen(true);
  };

  const handleSaveBenefit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!benefitForm.name.trim()) return;

    if (editingBenefit) {
      setBenefits(benefits.map(b => b.id === editingBenefit.id ? { ...editingBenefit, ...benefitForm } : b));
      setToast(`Updated perk "${benefitForm.name}"`);
    } else {
      const newBenefit: BenefitItem = {
        id: `b-${Date.now()}`,
        ...benefitForm,
      };
      setBenefits([...benefits, newBenefit]);
      setToast(`Added perk "${benefitForm.name}"`);
    }
    setIsBenefitModalOpen(false);
  };

  const handleDeleteBenefit = (id: string, name: string) => {
    setBenefits(benefits.filter((b) => b.id !== id));
    setToast(`Removed perk "${name}"`);
  };

  return (
    <DashboardShell
      brandTitle="JPS"
      brandSubtitle="Employer Dashboard"
      navItems={getRecruiterNavItems("/employer/company")}
      searchPlaceholder="Search company settings..."
      userAvatarText="JE"
    >
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-slate-900 text-white text-[13px] font-semibold px-4 py-3 rounded-lg shadow-xl flex items-center gap-2 animate-in slide-in-from-top-2 fade-in duration-200">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" /> {toast}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
          <div>
            <h1 className="text-[20px] font-bold text-slate-900 tracking-tight">Company Profile & Branding</h1>
            <p className="text-[13px] text-slate-500 mt-0.5">
              Manage legal details, public company profile, perks & benefits, and office locations (`Company`, `CompanyProfile`, `CompanyLocation`, `CompanyBenefit`)
            </p>
          </div>
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-[12px] font-semibold px-4 py-2.5 rounded-lg transition shrink-0 shadow-xs"
          >
            <Save className="h-4 w-4" /> Save Profile
          </button>
        </div>

        {/* Section 1: Legal & Identity */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4 text-[13px]">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-[14px] font-bold text-slate-900 flex items-center gap-2">
              <Building2 className="h-4 w-4 text-slate-500" /> Legal Entity & Verification Status
            </h3>
            <StatusBadge status={company.verificationStatus} showDot />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[12px] font-semibold text-slate-700">Legal Company Name</label>
              <input
                type="text"
                value={company.legalName}
                onChange={(e) => setCompany({ ...company, legalName: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-medium focus:outline-none focus:border-slate-400"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[12px] font-semibold text-slate-700">Display Brand Name</label>
              <input
                type="text"
                value={company.displayName}
                onChange={(e) => setCompany({ ...company, displayName: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-medium focus:outline-none focus:border-slate-400"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[12px] font-semibold text-slate-700">Company Type</label>
              <select
                value={company.companyType}
                onChange={(e) => setCompany({ ...company, companyType: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-medium focus:outline-none focus:border-slate-400"
              >
                <option value="Private Limited">Private Limited</option>
                <option value="Public Ltd">Public Ltd</option>
                <option value="Sole Proprietorship">Sole Proprietorship</option>
                <option value="Non Profit">Non Profit</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[12px] font-semibold text-slate-700">Ownership Type</label>
              <input
                type="text"
                value={company.ownershipType}
                onChange={(e) => setCompany({ ...company, ownershipType: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-medium focus:outline-none focus:border-slate-400"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[12px] font-semibold text-slate-700">HR Contact Name</label>
              <input
                type="text"
                value={company.hrContactName}
                onChange={(e) => setCompany({ ...company, hrContactName: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-medium focus:outline-none focus:border-slate-400"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[12px] font-semibold text-slate-700">HR Contact Phone</label>
              <input
                type="text"
                value={company.contactNumber}
                onChange={(e) => setCompany({ ...company, contactNumber: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-medium font-mono focus:outline-none focus:border-slate-400"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Profile & Employee Count */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4 text-[13px]">
          <h3 className="text-[14px] font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <Award className="h-4 w-4 text-slate-500" /> Public Branding & Size
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-[12px] font-semibold text-slate-700">Founded Year</label>
              <input
                type="number"
                value={company.foundedYear}
                onChange={(e) => setCompany({ ...company, foundedYear: parseInt(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-medium focus:outline-none focus:border-slate-400"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[12px] font-semibold text-slate-700">Min Employee Count</label>
              <input
                type="number"
                value={company.employeeCountMin}
                onChange={(e) => setCompany({ ...company, employeeCountMin: parseInt(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-medium focus:outline-none focus:border-slate-400"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[12px] font-semibold text-slate-700">Max Employee Count</label>
              <input
                type="number"
                value={company.employeeCountMax}
                onChange={(e) => setCompany({ ...company, employeeCountMax: parseInt(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-medium focus:outline-none focus:border-slate-400"
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[12px] font-semibold text-slate-700">About Company (`aboutCompany`)</label>
            <textarea
              rows={4}
              value={company.aboutCompany}
              onChange={(e) => setCompany({ ...company, aboutCompany: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-900 font-medium focus:outline-none focus:border-slate-400"
            />
          </div>
        </div>

        {/* Section 3: Locations (`CompanyLocation`) */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4 text-[13px]">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-[14px] font-bold text-slate-900 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-slate-500" /> Office Locations (`CompanyLocation` Model)
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Manage headquarters, regional branches, and international offices</p>
            </div>
            <button
              type="button"
              onClick={openAddLocation}
              className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-[12px] font-semibold px-3 py-1.5 rounded-lg transition"
            >
              <Plus className="h-3.5 w-3.5" /> Add Location
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {locations.map((loc) => (
              <div key={loc.id} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between hover:border-slate-300 transition">
                <div>
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    {loc.city}, {loc.country}
                    {loc.isHeadquarters && (
                      <span className="text-[10px] bg-slate-900 text-white font-mono px-1.5 py-0.5 rounded font-semibold">HQ</span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{loc.officeType}</div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => openEditLocation(loc)}
                    className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-200 rounded transition"
                    title="Edit Location"
                  >
                    <Edit3 className="h-3.5 w-3.5" />
                  </button>
                  {!loc.isHeadquarters && (
                    <button
                      type="button"
                      onClick={() => handleDeleteLocation(loc.id, loc.city)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-100 rounded transition"
                      title="Delete Location"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Benefits & Perks (`CompanyBenefit`) */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4 text-[13px]">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-[14px] font-bold text-slate-900 flex items-center gap-2">
                <Heart className="h-4 w-4 text-slate-500" /> Perks & Benefits (`CompanyBenefit` Model)
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Showcase employee benefits offered across health, financial, and culture categories</p>
            </div>
            <button
              type="button"
              onClick={openAddBenefit}
              className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-[12px] font-semibold px-3 py-1.5 rounded-lg transition"
            >
              <Plus className="h-3.5 w-3.5" /> Add Perk
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {benefits.map((b) => (
              <div key={b.id} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between hover:border-slate-300 transition">
                <div>
                  <div className="font-semibold text-slate-900">{b.name}</div>
                  <div className="text-[10px] text-slate-500 uppercase font-mono font-semibold tracking-wider mt-0.5">{b.category}</div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => openEditBenefit(b)}
                    className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-200 rounded transition"
                    title="Edit Perk"
                  >
                    <Edit3 className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteBenefit(b.id, b.name)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-100 rounded transition"
                    title="Delete Perk"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </form>

      {/* ── LOCATION MODAL ─────────────────────────────────────── */}
      {isLocationModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50" onClick={() => setIsLocationModalOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} className="bg-white border border-slate-200 rounded-xl max-w-md w-full p-6 shadow-xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-slate-900" />
                <h3 className="text-[16px] font-bold text-slate-900">
                  {editingLocation ? "Edit Office Location" : "Add Office Location"}
                </h3>
              </div>
              <button type="button" onClick={() => setIsLocationModalOpen(false)} className="text-slate-400 hover:text-slate-900"><X className="h-5 w-5" /></button>
            </div>

            <form onSubmit={handleSaveLocation} className="space-y-4 text-[13px]">
              <div className="space-y-1">
                <label className="text-[12px] font-semibold text-slate-700">City *</label>
                <input
                  type="text" required placeholder="e.g. Kathmandu, Pokhara, Lalitpur"
                  value={locationForm.city} onChange={(e) => setLocationForm({ ...locationForm, city: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[12px] font-semibold text-slate-700">Country</label>
                <input
                  type="text" required placeholder="e.g. Nepal"
                  value={locationForm.country} onChange={(e) => setLocationForm({ ...locationForm, country: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[12px] font-semibold text-slate-700">Office Type</label>
                <select
                  value={locationForm.officeType} onChange={(e) => setLocationForm({ ...locationForm, officeType: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition"
                >
                  <option value="Headquarters">Headquarters</option>
                  <option value="Regional Office">Regional Office</option>
                  <option value="Branch Office">Branch Office</option>
                  <option value="R&D Center">R&D Center</option>
                  <option value="Remote Hub">Remote Hub</option>
                </select>
              </div>

              <label className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-100 transition">
                <input
                  type="checkbox"
                  checked={locationForm.isHeadquarters}
                  onChange={(e) => setLocationForm({ ...locationForm, isHeadquarters: e.target.checked })}
                  className="h-4 w-4 accent-slate-900 rounded cursor-pointer"
                />
                <div>
                  <div className="font-semibold text-slate-900 text-[12px]">Set as Corporate Headquarters (HQ)</div>
                  <div className="text-[11px] text-slate-500">Marks this location as the primary headquarters for your company profile</div>
                </div>
              </label>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button type="button" onClick={() => setIsLocationModalOpen(false)} className="px-4 py-2 text-[12px] font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition">Cancel</button>
                <button type="submit" className="px-4 py-2 text-[12px] font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition">
                  {editingLocation ? "Save Changes" : "Add Location"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── BENEFIT MODAL ─────────────────────────────────────── */}
      {isBenefitModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50" onClick={() => setIsBenefitModalOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} className="bg-white border border-slate-200 rounded-xl max-w-md w-full p-6 shadow-xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-slate-900" />
                <h3 className="text-[16px] font-bold text-slate-900">
                  {editingBenefit ? "Edit Perk & Benefit" : "Add Perk & Benefit"}
                </h3>
              </div>
              <button type="button" onClick={() => setIsBenefitModalOpen(false)} className="text-slate-400 hover:text-slate-900"><X className="h-5 w-5" /></button>
            </div>

            <form onSubmit={handleSaveBenefit} className="space-y-4 text-[13px]">
              <div className="space-y-1">
                <label className="text-[12px] font-semibold text-slate-700">Perk / Benefit Title *</label>
                <input
                  type="text" required placeholder="e.g. Comprehensive Health Insurance (SSF), Annual Learning Budget"
                  value={benefitForm.name} onChange={(e) => setBenefitForm({ ...benefitForm, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[12px] font-semibold text-slate-700">Category</label>
                <select
                  value={benefitForm.category} onChange={(e) => setBenefitForm({ ...benefitForm, category: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition"
                >
                  <option value="Health & Wellness">Health & Wellness</option>
                  <option value="Work-Life Balance">Work-Life Balance</option>
                  <option value="Financial & Retirement">Financial & Retirement</option>
                  <option value="Professional Development">Professional Development</option>
                  <option value="Culture & Equipment">Culture & Equipment</option>
                  <option value="Food & Transportation">Food & Transportation</option>
                </select>
              </div>

              {/* Suggestions */}
              <div className="space-y-1.5 pt-1">
                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Quick Templates</div>
                <div className="flex flex-wrap gap-1">
                  {[
                    "Paid Dashain Bonus", "Remote Work Stipend", "Gym & Fitness Pass",
                    "Stock Options (ESOP)", "Certification Reimbursement", "Free Lunch & Snacks"
                  ].map((sug) => (
                    <button
                      key={sug} type="button"
                      onClick={() => setBenefitForm({ ...benefitForm, name: sug })}
                      className="text-[10px] font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded transition"
                    >
                      + {sug}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button type="button" onClick={() => setIsBenefitModalOpen(false)} className="px-4 py-2 text-[12px] font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition">Cancel</button>
                <button type="submit" className="px-4 py-2 text-[12px] font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition">
                  {editingBenefit ? "Save Changes" : "Add Perk"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
