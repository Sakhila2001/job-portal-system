"use client";

import React from "react";
import Link from "next/link";
import { X, Building2, Check, ShieldCheck } from "lucide-react";

interface EmployerAuthDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: "login" | "register";
  setActiveTab: (tab: "login" | "register") => void;
  employerEmail: string;
  setEmployerEmail: (value: string) => void;
  employerPassword: string;
  setEmployerPassword: (value: string) => void;
  confirmEmployerPassword: string;
  setConfirmEmployerPassword: (value: string) => void;
  showEmployerPassword: boolean;
  setShowEmployerPassword: (value: boolean) => void;
  showConfirmEmployerPassword: boolean;
  setShowConfirmEmployerPassword: (value: boolean) => void;
  companyName: string;
  setCompanyName: (value: string) => void;
  hrName: string;
  setHrName: (value: string) => void;
  contactNumber: string;
  setContactNumber: (value: string) => void;
  submitted: boolean;
  setSubmitted: (value: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
  registrationError: string | null;
  isRegistrationLoading: boolean;
  onResendVerification: () => void;
  isResendingVerification: boolean;
  resendMessage: string | null;
}

export default function EmployerAuthDrawer({
  isOpen,
  onClose,
  activeTab,
  setActiveTab,
  employerEmail,
  setEmployerEmail,
  employerPassword,
  setEmployerPassword,
  confirmEmployerPassword,
  setConfirmEmployerPassword,
  showEmployerPassword,
  setShowEmployerPassword,
  showConfirmEmployerPassword,
  setShowConfirmEmployerPassword,
  companyName,
  setCompanyName,
  hrName,
  setHrName,
  contactNumber,
  setContactNumber,
  submitted,
  setSubmitted,
  onSubmit,
  registrationError,
  isRegistrationLoading,
  onResendVerification,
  isResendingVerification,
  resendMessage,
}: EmployerAuthDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        onClick={onClose}
        className="fixed inset-0 login-backdrop transition-opacity duration-300 animate-in fade-in"
      />

      <div className="relative w-full sm:w-[480px] bg-white h-full shadow-2xl flex flex-col justify-between z-50 animate-in slide-in-from-right duration-300 ease-out p-8 overflow-y-auto">
        <div>
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-slate-700" />
              <h3 className="text-xl font-bold text-slate-900">Employer Portal</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 bg-slate-50 border border-slate-100 rounded-lg hover:bg-slate-100 text-slate-400"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-2 bg-slate-100 rounded-lg p-1 mt-6">
            <button
              onClick={() => {
                setActiveTab("login");
                setSubmitted(false);
              }}
              className={`text-xs font-bold py-2.5 rounded-md transition-all ${
                activeTab === "login"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Employer Login
            </button>
            <button
              onClick={() => {
                setActiveTab("register");
                setSubmitted(false);
              }}
              className={`text-xs font-bold py-2.5 rounded-md transition-all ${
                activeTab === "register"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Register Company
            </button>
          </div>

          {submitted ? (
            <div className="py-12 text-center space-y-4 animate-in zoom-in-95 duration-200">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-50 text-slate-700 border border-slate-200">
                <Check className="h-8 w-8 text-slate-900" />
              </div>
              <h4 className="font-extrabold text-slate-900 text-lg">Company Registered!</h4>
              <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                A verification link has been sent to <span className="text-slate-900 font-medium">{employerEmail}</span>. Verify your email to continue with your employer account.
              </p>
              <button
                type="button"
                onClick={onResendVerification}
                disabled={isResendingVerification}
                className="text-sm font-semibold text-slate-700 hover:text-slate-900 hover:underline disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isResendingVerification ? "Resending verification email..." : "Resend verification email"}
              </button>
              {resendMessage && <p className="text-xs text-slate-500">{resendMessage}</p>}
            </div>
          ) : activeTab === "login" ? (
            <form onSubmit={onSubmit} className="space-y-5 pt-6 animate-in fade-in duration-200">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Official Email ID</label>
                <input
                  type="email"
                  required
                  value={employerEmail}
                  onChange={(e) => setEmployerEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 placeholder-slate-400 font-medium"
                />
              </div>

              <div className="space-y-1.5 relative">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Password</label>
                <div className="relative">
                  <input
                    type={showEmployerPassword ? "text" : "password"}
                    required
                    value={employerPassword}
                    onChange={(e) => setEmployerPassword(e.target.value)}
                    placeholder="Enter employer password"
                    className="w-full bg-white border border-slate-200 rounded-lg pl-4 pr-12 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 placeholder-slate-400 font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowEmployerPassword(!showEmployerPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500 hover:text-slate-900 px-1 py-0.5"
                  >
                    {showEmployerPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {registrationError && (
                <p className="text-xs font-medium text-red-600">{registrationError}</p>
              )}

              <button
                type="submit"
                className="w-full bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold py-3 rounded-lg transition-all shadow-xs"
              >
                Login to Recruiter Dashboard
              </button>
            </form>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4 pt-5 animate-in fade-in duration-200">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Company Name</label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Acme Tech Solutions"
                  className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 placeholder-slate-400 font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">HR Contact Name</label>
                <input
                  type="text"
                  required
                  value={hrName}
                  onChange={(e) => setHrName(e.target.value)}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 placeholder-slate-400 font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Official Email ID</label>
                <input
                  type="email"
                  required
                  value={employerEmail}
                  onChange={(e) => setEmployerEmail(e.target.value)}
                  placeholder="sarah@acmetech.com"
                  className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 placeholder-slate-400 font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Password</label>
                <div className="relative">
                  <input
                    type={showEmployerPassword ? "text" : "password"}
                    required
                    value={employerPassword}
                    onChange={(e) => setEmployerPassword(e.target.value)}
                    placeholder="Create recruiter password"
                    className="w-full bg-white border border-slate-200 rounded-lg pl-4 pr-20 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 placeholder-slate-400 font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowEmployerPassword(!showEmployerPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500 hover:text-slate-900 px-1 py-0.5"
                  >
                    {showEmployerPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmEmployerPassword ? "text" : "password"}
                    required
                    value={confirmEmployerPassword}
                    onChange={(e) => setConfirmEmployerPassword(e.target.value)}
                    placeholder="Re-enter your password"
                    className="w-full bg-white border border-slate-200 rounded-lg pl-4 pr-20 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 placeholder-slate-400 font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmEmployerPassword(!showConfirmEmployerPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500 hover:text-slate-900 px-1 py-0.5"
                  >
                    {showConfirmEmployerPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  placeholder="e.g. +1 555-019-2834"
                  className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 placeholder-slate-400 font-medium"
                />
              </div>

              {registrationError && <p className="text-xs font-medium text-red-600">{registrationError}</p>}

              <button
                type="submit"
                disabled={isRegistrationLoading}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold py-3 rounded-lg transition-all shadow-xs disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isRegistrationLoading ? "Creating employer account..." : "Submit Company Registration"}
              </button>
            </form>
          )}
        </div>

        <div className="border-t border-slate-100 pt-6 text-[10px] text-slate-400 leading-normal flex items-start gap-2">
          <ShieldCheck className="h-4 w-4 text-slate-400 shrink-0" />
          <span>
            By clicking submit, you confirm that you are an authorized representative of the hiring entity. False representation is subject to immediate corporate banning.
          </span>
        </div>
      </div>
    </div>
  );
}
