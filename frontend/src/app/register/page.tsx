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
  Loader2,
  Mail,
} from "lucide-react";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [mobile, setMobile] = useState("");
  const [workStatus, setWorkStatus] = useState<"experienced" | "fresher">(
    "fresher",
  );
  const [resumeName, setResumeName] = useState<string | null>(null);
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!agreed) {
      setError("Please agree to the Terms and Conditions.");
      return;
    }

    setLoading(true);
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/register/candidate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName,
          email,
          password,
          mobile,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Registration failed");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendLoading(true);
    setResendSuccess(false);

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/resend-verification`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name: fullName,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to resend verification email");
      }

      setResendSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to resend verification email");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Navbar */}
      <Header />

      {/* Main Registration Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center justify-center">
        {submitted ? (
          /* Check Email Screen */
          <div className="bg-white border border-slate-100 rounded-xl p-8 md:p-12 text-center max-w-lg w-full space-y-6 animate-in zoom-in-95 duration-200">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-50 text-slate-700 border border-slate-200">
              <Mail className="h-7 w-7 text-slate-900" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-900">
                Verify your email
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                We've sent a verification link to{" "}
                <span className="text-slate-900 font-medium">{email}</span>.
                Please check your inbox and spam folder, then click the link to
                activate your account.
              </p>
            </div>

            {error && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg p-3">
                {error}
              </div>
            )}

            <div className="space-y-3">
              <button
                type="button"
                onClick={handleResend}
                disabled={resendLoading || resendSuccess}
                className="w-full text-center border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-semibold py-3 rounded-lg transition-all disabled:opacity-50"
              >
                {resendLoading ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Resending...
                  </span>
                ) : resendSuccess ? (
                  "Verification email resent"
                ) : (
                  "Resend verification email"
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setError(null);
                  setResendSuccess(false);
                }}
                className="w-full text-center text-sm text-slate-500 hover:text-slate-700 underline"
              >
                Use a different email
              </button>
            </div>
          </div>
        ) : (
          /* Form Screen */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full max-w-5xl">
            {/* Left Column: Promo Banner */}
            <div className="lg:col-span-5 bg-slate-900 text-white rounded-xl p-8 flex flex-col justify-between relative overflow-hidden">
              <div className="space-y-6">
                <div>
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-lg font-semibold tracking-tight text-white mb-6"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white border border-white/20">
                      <Briefcase className="h-4.5 w-4.5" />
                    </span>
                    <span>
                      Job<span className="text-slate-400 font-normal">Portal</span>
                    </span>
                  </Link>
                  <h3 className="text-2xl font-bold tracking-tight leading-tight">
                    Build your career profile today
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-md bg-white/10 text-slate-300 shrink-0 text-xs font-bold">
                      ✓
                    </span>
                    <div>
                      <h4 className="font-bold text-sm">
                        One-click Applications
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                        Apply instantly to thousands of top-tier verified
                        corporations.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-md bg-white/10 text-slate-300 shrink-0 text-xs font-bold">
                      ✓
                    </span>
                    <div>
                      <h4 className="font-bold text-sm">
                        ATS Optimized Profiles
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                        Our structured profile helps you pass automated resume
                        scanners.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-md bg-white/10 text-slate-300 shrink-0 text-xs font-bold">
                      ✓
                    </span>
                    <div>
                      <h4 className="font-bold text-sm">
                        Custom Job Recommendations
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                        Receive matched opportunities straight to your
                        dashboard.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust badge */}
              <div className="mt-8 border-t border-white/10 pt-6 flex items-center gap-2 text-xs text-slate-400">
                <ShieldCheck className="h-4.5 w-4.5 text-slate-400 shrink-0" />
                <span>Secure, encrypted, and spam-free career portal.</span>
              </div>
            </div>

            {/* Right Column: Registration Card */}
            <div className="lg:col-span-7 bg-white border border-slate-100 rounded-xl p-6 md:p-8">
              <div className="space-y-2 mb-6">
                <h2 className="text-2xl font-bold text-slate-900">
                  Create Candidate Account
                </h2>
                <p className="text-sm text-slate-500">
                  Already registered?{" "}
                  <button
                    type="button"
                    onClick={() =>
                      window.dispatchEvent(
                        new CustomEvent("open-login-drawer"),
                      )
                    }
                    className="text-slate-700 font-semibold hover:text-slate-900 hover:underline"
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
                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 placeholder-slate-400 font-medium"
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
                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 placeholder-slate-400 font-medium"
                  />
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Minimum 6 characters"
                      className="w-full bg-white border border-slate-200 rounded-lg pl-4 pr-20 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 placeholder-slate-400 font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500 hover:text-slate-900 px-1 py-0.5 transition"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter your password"
                      className="w-full bg-white border border-slate-200 rounded-lg pl-4 pr-20 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 placeholder-slate-400 font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500 hover:text-slate-900 px-1 py-0.5 transition"
                    >
                      {showConfirmPassword ? "Hide" : "Show"}
                    </button>
                  </div>
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
                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 placeholder-slate-400 font-medium"
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
                      className={`flex flex-col items-center gap-2 p-3 border rounded-lg text-left transition-all ${
                        workStatus === "experienced"
                          ? "border-slate-900 bg-slate-50 ring-1 ring-slate-900/10"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <Briefcase
                        className={`h-5 w-5 ${workStatus === "experienced" ? "text-slate-900" : "text-slate-400"}`}
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
                      className={`flex flex-col items-center gap-2 p-3 border rounded-lg text-left transition-all ${
                        workStatus === "fresher"
                          ? "border-slate-900 bg-slate-50 ring-1 ring-slate-900/10"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <GraduationCap
                        className={`h-5 w-5 ${workStatus === "fresher" ? "text-slate-900" : "text-slate-400"}`}
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
                    className="h-4 w-4 rounded border-slate-300 accent-slate-900 cursor-pointer mt-0.5"
                  />
                  <span className="leading-normal">
                    I agree to the Terms, Privacy Policy, and consent to receive
                    emails, sms, and WhatsApp alerts for new job postings.
                  </span>
                </label>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold py-3 rounded-lg transition-all shadow-xs disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Creating account...
                    </span>
                  ) : (
                    "Register Now"
                  )}
                </button>

                {error && !submitted && (
                  <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg p-3">
                    {error}
                  </div>
                )}
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
