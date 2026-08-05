"use client";

import React from "react";
import Link from "next/link";
import { X } from "lucide-react";

interface CandidateLoginDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
  error: string | null;
  isLoading: boolean;
}

export default function CandidateLoginDrawer({
  isOpen,
  onClose,
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  onSubmit,
  error,
  isLoading,
}: CandidateLoginDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        onClick={onClose}
        className="fixed inset-0 login-backdrop transition-opacity duration-300 animate-in fade-in"
      />

      <div className="relative w-full sm:w-[480px] bg-white h-full shadow-2xl flex flex-col justify-between z-50 animate-in slide-in-from-right duration-300 ease-out p-8">
        <div>
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Login</h3>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/register"
                onClick={onClose}
                className="text-sm font-semibold text-slate-700 hover:text-slate-900 hover:underline"
              >
                Register for free
              </Link>
              <button
                onClick={onClose}
                className="p-1.5 bg-slate-50 border border-slate-100 rounded-lg hover:bg-slate-100 text-slate-400"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-5 pt-8">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Email ID / Username
              </label>
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your active Email ID / Username"
                className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 placeholder-slate-400 font-medium transition"
              />
            </div>

            <div className="space-y-2 relative">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Password
                </label>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-white border border-slate-200 rounded-lg pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 placeholder-slate-400 font-medium transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500 hover:text-slate-900 px-1 py-0.5 transition"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              <div className="text-right">
                <a href="#" className="text-xs font-semibold text-slate-500 hover:text-slate-900 hover:underline transition">
                  Forgot Password?
                </a>
              </div>
            </div>

            {error && <p className="text-sm font-medium text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold py-3 rounded-lg shadow-xs transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>

            <div className="text-center pt-1">
              <button type="button" className="text-sm font-semibold text-slate-500 hover:text-slate-900 hover:underline transition">
                Use OTP to Login
              </button>
            </div>
          </form>
        </div>

        <div className="space-y-4 border-t border-slate-100 pt-6">
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100" />
            </div>
            <span className="relative bg-white px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Or
            </span>
          </div>

          <button
            type="button"
            onClick={() => window.location.assign("http://localhost:5000/api/auth/google")}
            className="w-full flex items-center justify-center gap-2 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-sm font-semibold text-slate-700 py-3 rounded-lg transition-colors"
          >
            <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.184 4.114-3.415 0-6.19-2.775-6.19-6.19 0-3.414 2.775-6.189 6.19-6.189 1.492 0 2.856.541 3.926 1.43l3.02-3.02C18.847 1.832 15.753.86 12.24.86c-6.16 0-11.14 4.98-11.14 11.14 0 6.161 4.98 11.14 11.14 11.14 5.928 0 10.875-4.27 10.875-10.875 0-.712-.086-1.396-.23-2.072H12.24z" />
              <path fill="#4285F4" d="M22.885 12.215c0-.712-.086-1.396-.23-2.072H12.24v4.115h6.887c-.28 1.042-.876 1.93-1.688 2.535l2.97 2.302c1.737-1.602 2.74-3.96 2.74-6.88z" />
              <path fill="#FBBC05" d="M17.439 16.793c-.812.605-1.808 1.023-2.852 1.206V22.31c2.193-.38 4.136-1.464 5.568-3.003l-2.97-2.302c-.22.18-.466.368-.746.518z" />
              <path fill="#34A853" d="M12.24 18.514c-2.665 0-4.94-1.704-5.568-4.114H1.054v2.46c1.43 2.85 4.372 4.794 7.784 4.794 2.193 0 4.137-.73 5.679-1.936l-2.97-2.302c-.38.22-.84.343-1.307.343z" />
            </svg>
            <span>Sign in with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}
