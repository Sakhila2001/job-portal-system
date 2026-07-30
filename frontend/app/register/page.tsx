"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import {
  UploadCloud,
  CheckCircle,
  Briefcase,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [workStatus, setWorkStatus] = useState<"experienced" | "fresher">(
    "fresher",
  );
  const [resumeName, setResumeName] = useState<string | null>(null);
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      alert("Please agree to the Terms and Conditions.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Navbar */}
      <Header />

      {/* Main Registration Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center justify-center">
        {submitted ? (
          /* Success Screen */
          <div className="bg-white border border-border rounded-3xl p-8 md:p-12 text-center max-w-lg w-full shadow-sm space-y-6 animate-in zoom-in-95 duration-200">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
              <CheckCircle className="h-10 w-10" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold text-slate-900">
                Registration Successful!
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                Thank you for creating an account,{" "}
                <strong className="text-slate-800">{fullName}</strong>. We've
                sent a verification link to{" "}
                <span className="text-brand-primary font-medium">{email}</span>.
                Please verify your email to unlock applications.
              </p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-left text-xs text-slate-500 space-y-2">
              <div className="font-semibold text-slate-700">Next steps:</div>
              <ul className="list-disc list-inside space-y-1">
                <li>Verify your email inbox.</li>
                <li>Complete your profile resume details.</li>
                <li>Apply to matching jobs on the search page.</li>
              </ul>
            </div>
            <Link
              href="/jobs"
              className="block w-full text-center bg-brand-primary hover:bg-brand-hover text-white text-sm font-semibold py-3 rounded-xl transition-all shadow-sm"
            >
              Start Searching Jobs
            </Link>
          </div>
        ) : (
          /* Form Screen */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full max-w-5xl">
            {/* Left Column: Promo Banner */}
            <div className="lg:col-span-5 bg-gradient-to-br from-brand-primary to-indigo-900 text-white rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden shadow-md">
              <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-white/5 blur-xl" />

              <div className="space-y-6">
                <div>
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-xl font-bold tracking-tight text-white mb-6"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white border border-white/20">
                      <Briefcase className="h-4.5 w-4.5" />
                    </span>
                    <span>
                      Job<span className="text-blue-300">Portal</span>
                    </span>
                  </Link>
                  <h3 className="text-3xl font-extrabold tracking-tight leading-tight">
                    Build your career profile today
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-blue-300 shrink-0">
                      ✓
                    </span>
                    <div>
                      <h4 className="font-bold text-sm">
                        One-click Applications
                      </h4>
                      <p className="text-xs text-blue-100 mt-0.5 leading-relaxed">
                        Apply instantly to thousands of top-tier verified
                        corporations.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-blue-300 shrink-0">
                      ✓
                    </span>
                    <div>
                      <h4 className="font-bold text-sm">
                        ATS Optimized Profiles
                      </h4>
                      <p className="text-xs text-blue-100 mt-0.5 leading-relaxed">
                        Our structured profile helps you pass automated resume
                        scanners.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-blue-300 shrink-0">
                      ✓
                    </span>
                    <div>
                      <h4 className="font-bold text-sm">
                        Custom Job Recommendations
                      </h4>
                      <p className="text-xs text-blue-100 mt-0.5 leading-relaxed">
                        Receive matched opportunities straight to your
                        dashboard.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust badge */}
              <div className="mt-8 border-t border-white/10 pt-6 flex items-center gap-2 text-xs text-blue-200">
                <ShieldCheck className="h-4.5 w-4.5 text-emerald-400 shrink-0" />
                <span>Secure, encrypted, and spam-free career portal.</span>
              </div>
            </div>

            {/* Right Column: Registration Card */}
            <div className="lg:col-span-7 bg-white border border-border rounded-3xl p-6 md:p-8 shadow-sm">
              <div className="space-y-2 mb-6">
                <h2 className="text-2xl font-extrabold text-slate-900">
                  Create Candidate Account
                </h2>
                <p className="text-sm text-muted-foreground">
                  Already registered?{" "}
                  <button
                    type="button"
                    onClick={() =>
                      alert(
                        "Please open the login drawer from the home page navbar.",
                      )
                    }
                    className="text-brand-primary font-semibold hover:underline"
                  >
                    Log in here
                  </button>
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your first and last name"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-primary placeholder-slate-400 font-medium"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Email ID
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your active Email address"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-primary placeholder-slate-400 font-medium"
                  />
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-primary placeholder-slate-400 font-medium"
                  />
                </div>

                {/* Mobile number */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="Enter 10-digit mobile number"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-primary placeholder-slate-400 font-medium"
                  />
                </div>

                {/* Work status tabs */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Work Status
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setWorkStatus("experienced")}
                      className={`flex flex-col items-center gap-2 p-3 border rounded-xl text-left transition-all ${
                        workStatus === "experienced"
                          ? "border-brand-primary bg-brand-light/35 ring-1 ring-brand-primary/10"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <Briefcase
                        className={`h-5 w-5 ${workStatus === "experienced" ? "text-brand-primary" : "text-slate-400"}`}
                      />
                      <div className="text-center">
                        <div className="text-xs font-bold text-slate-800">
                          I'm Experienced
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          I have worked before
                        </div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setWorkStatus("fresher")}
                      className={`flex flex-col items-center gap-2 p-3 border rounded-xl text-left transition-all ${
                        workStatus === "fresher"
                          ? "border-brand-primary bg-brand-light/35 ring-1 ring-brand-primary/10"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <GraduationCap
                        className={`h-5 w-5 ${workStatus === "fresher" ? "text-brand-primary" : "text-slate-400"}`}
                      />
                      <div className="text-center">
                        <div className="text-xs font-bold text-slate-800">
                          I'm a Fresher
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          I am student / never worked
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Terms agreement */}
                <label className="flex items-start gap-2.5 text-xs text-slate-500 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-brand-primary focus:ring-brand-primary/20 accent-brand-primary cursor-pointer mt-0.5"
                  />
                  <span className="leading-normal">
                    I agree to the Terms, Privacy Policy, and consent to receive
                    emails, sms, and WhatsApp alerts for new job postings.
                  </span>
                </label>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full bg-brand-primary hover:bg-brand-hover text-white text-sm font-semibold py-3.5 rounded-xl transition-all shadow-md shadow-brand-primary/10"
                >
                  Register Now
                </button>
              </form>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
