"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Briefcase, ChevronRight, Eye, EyeOff, Building2, Send, Check } from "lucide-react";
import MegaMenu from "@/components/ui/mega-menu";

interface MegaMenuColumn {
  title: string;
  items: string[];
}

interface MegaMenuData {
  key: string;
  title: string;
  href: string;
  columns: MegaMenuColumn[];
}

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  // Mobile menu open/close
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Hover Mega Menu states
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Candidate Login Drawer state
  const [isLoginDrawerOpen, setIsLoginDrawerOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Employer Login/Register Drawer state
  const [isEmployerDrawerOpen, setIsEmployerDrawerOpen] = useState(false);
  const [employerActiveTab, setEmployerActiveTab] = useState<"login" | "register">("login");
  const [showEmployerPassword, setShowEmployerPassword] = useState(false);
  
  // Employer inputs
  const [employerEmail, setEmployerEmail] = useState("");
  const [employerPassword, setEmployerPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [hrName, setHrName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [employerSubmitted, setEmployerSubmitted] = useState(false);

  const handleMouseEnter = (menuKey: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(menuKey);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleMegaMenuClick = (item: string, hrefBase: string) => {
    setActiveMenu(null);
    if (hrefBase.startsWith("/jobs")) {
      router.push(`/jobs?q=${encodeURIComponent(item)}`);
    } else {
      router.push(hrefBase);
    }
  };

  const handleCandidateLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Candidate Logged in: ${email}`);
    setIsLoginDrawerOpen(false);
    setEmail("");
    setPassword("");
  };

  const handleEmployerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (employerActiveTab === "login") {
      alert(`Employer Logged in: ${employerEmail}`);
      setIsEmployerDrawerOpen(false);
      setEmployerEmail("");
      setEmployerPassword("");
    } else {
      setEmployerSubmitted(true);
      setTimeout(() => {
        setIsEmployerDrawerOpen(false);
        setEmployerSubmitted(false);
        setCompanyName("");
        setHrName("");
        setEmployerEmail("");
        setEmployerPassword("");
        setContactNumber("");
      }, 3000);
    }
  };

  const megaMenus: MegaMenuData[] = [
    {
      key: "jobs",
      title: "Jobs",
      href: "/jobs",
      columns: [
        {
          title: "Popular categories",
          items: ["IT jobs", "Sales jobs", "Marketing jobs", "Data Science jobs", "HR jobs", "Engineering jobs"]
        },
        {
          title: "Jobs in demand",
          items: ["Fresher jobs", "MNC jobs", "Remote jobs", "Work from home jobs", "Walk-in jobs", "Part-time jobs"]
        },
        {
          title: "Jobs by location",
          items: ["Jobs in Kathmandu", "Jobs in Pokhara", "Jobs in Lalitpur", "Jobs in Biratnagar", "Jobs in Birgunj", "Jobs in Butwal"]
        }
      ]
    },
    {
      key: "companies",
      title: "Companies",
      href: "/#companies",
      columns: [
        {
          title: "Explore categories",
          items: ["Unicorn", "MNC", "Startup", "Product based", "Internet"]
        },
        {
          title: "Explore collections",
          items: ["Top companies", "IT companies", "Fintech companies", "Sponsored companies", "Featured companies"]
        },
        {
          title: "Research companies",
          items: ["Interview questions", "Company salaries", "Company reviews", "Salary Calculator"]
        }
      ]
    },
    {
      key: "services",
      title: "Services",
      href: "/#services",
      columns: [
        {
          title: "Resume writing",
          items: ["Text resume", "Visual resume", "Resume critique"]
        },
        {
          title: "Find Jobs",
          items: ["Jobs4u", "Priority applicant", "Contact us"]
        },
        {
          title: "Get recruiter's attention",
          items: ["Resume display"]
        },
        {
          title: "Monthly subscriptions",
          items: ["Basic & premium plans"]
        },
        {
          title: "Free resume resources",
          items: ["Resume maker", "Resume quality score", "Resume samples", "Job letter samples"]
        }
      ]
    }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border bg-white shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* Logo and Nav links */}
          <div className="flex items-center gap-10">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-brand-primary shrink-0">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary text-white shadow-md shadow-brand-primary/20">
                <Briefcase className="h-5 w-5" />
              </span>
              <span>
                Job<span className="text-brand-secondary">Portal</span>
              </span>
            </Link>

            {/* Desktop Nav Links with Hover Mega Dropdown */}
            <nav className="hidden md:flex items-center gap-8 h-16">
              {megaMenus.map((menu) => {
                const isActive = activeMenu === menu.key;
                return (
                  <div
                    key={menu.key}
                    onMouseEnter={() => handleMouseEnter(menu.key)}
                    onMouseLeave={handleMouseLeave}
                    className="relative flex items-center h-full"
                  >
                    <Link
                      href={menu.href}
                      className={`text-sm font-semibold transition-colors hover:text-brand-primary flex items-center gap-0.5 border-b-2 py-5 ${
                        pathname.startsWith(menu.href) || isActive
                          ? "border-brand-secondary text-brand-primary"
                          : "border-transparent text-slate-600"
                      }`}
                    >
                      {menu.title}
                    </Link>

                    {/* Mega Menu Dropdown */}
                    <MegaMenu
                      menuKey={menu.key}
                      href={menu.href}
                      columns={menu.columns}
                      isVisible={isActive}
                      onItemClick={handleMegaMenuClick}
                    />
                  </div>
                );
              })}
            </nav>
          </div>

          {/* Right Action buttons (Removed Bell and Find Jobs links) */}
          <div className="hidden md:flex items-center gap-4">
            
            {/* For Employers Action button */}
            <button
              onClick={() => {
                setEmployerActiveTab("login");
                setIsEmployerDrawerOpen(true);
              }}
              className="text-sm font-semibold text-slate-600 hover:text-brand-primary px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors"
            >
              For employers
            </button>

            <div className="h-4 w-px bg-slate-200" />

            {/* Candidate Login */}
            <button
              onClick={() => setIsLoginDrawerOpen(true)}
              className="text-sm font-bold text-brand-primary hover:bg-brand-light border border-brand-primary/20 hover:border-brand-primary/30 px-5 py-2.5 rounded-xl transition-all"
            >
              Login
            </button>
            
            {/* Candidate Register Page navigation */}
            <Link
              href="/register"
              className="text-sm font-bold bg-brand-secondary hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all block text-center"
            >
              Register
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => {
                setEmployerActiveTab("login");
                setIsEmployerDrawerOpen(true);
              }}
              className="text-xs font-semibold text-slate-600 hover:text-brand-primary border border-slate-200 px-2.5 py-1.5 rounded-lg transition-colors"
            >
              Employers
            </button>
            <button
              onClick={() => setIsLoginDrawerOpen(true)}
              className="text-xs font-bold text-brand-primary border border-brand-primary/20 px-2.5 py-1.5 rounded-lg"
            >
              Login
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-xl p-1.5 text-muted-foreground hover:bg-muted hover:text-brand-primary"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu block */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-white px-4 py-4 space-y-3">
            <nav className="flex flex-col gap-3">
              {megaMenus.map((menu) => (
                <div key={menu.key} className="space-y-1">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block px-2 mt-2">
                    {menu.title}
                  </span>
                  {menu.columns.slice(0, 2).map((col) => (
                    <div key={col.title} className="pl-3">
                      {col.items.slice(0, 3).map((item) => (
                        <button
                          key={item}
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            handleMegaMenuClick(item, menu.href);
                          }}
                          className="text-left text-sm text-slate-600 hover:text-brand-primary py-2.5 block border-b border-slate-50 w-full"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </nav>
            <div className="flex flex-col gap-2 pt-4">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsLoginDrawerOpen(true);
                }}
                className="w-full text-center text-sm font-semibold text-brand-primary py-2.5 rounded-xl border border-brand-primary/25 hover:bg-brand-light"
              >
                Candidate Login
              </button>
              <Link
                href="/register"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center text-sm font-semibold bg-brand-secondary text-white py-2.5 rounded-xl hover:bg-orange-600 block"
              >
                Candidate Register
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* CANDIDATE LOGIN SLIDE-IN SIDE DRAWER */}
      {isLoginDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            onClick={() => setIsLoginDrawerOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
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
                    onClick={() => setIsLoginDrawerOpen(false)}
                    className="text-sm font-semibold text-brand-primary hover:underline"
                  >
                    Register for free
                  </Link>
                  <button
                    onClick={() => setIsLoginDrawerOpen(false)}
                    className="p-1.5 bg-slate-50 border border-slate-100 rounded-xl hover:bg-slate-100 text-slate-400"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <form onSubmit={handleCandidateLoginSubmit} className="space-y-6 pt-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Email ID / Username
                  </label>
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your active Email ID / Username"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-primary placeholder-slate-400 font-medium"
                  />
                </div>

                <div className="space-y-2 relative">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
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
                      className="w-full bg-white border border-slate-200 rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:border-brand-primary placeholder-slate-400 font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-brand-primary hover:underline px-1 py-0.5"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>

                  <div className="text-right">
                    <a href="#" className="text-xs font-semibold text-brand-primary hover:underline">
                      Forgot Password?
                    </a>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-primary hover:bg-brand-hover text-white text-sm font-semibold py-3.5 rounded-xl shadow-md shadow-brand-primary/10 transition-all"
                >
                  Login
                </button>

                <div className="text-center pt-2">
                  <button type="button" className="text-sm font-semibold text-brand-primary hover:underline">
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
                onClick={() => alert("Google Sign in clicked")}
                className="w-full flex items-center justify-center gap-2 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-sm font-bold text-slate-700 py-3.5 rounded-xl transition-colors"
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
      )}

      {/* EMPLOYER LOGIN & REGISTER SLIDE-IN SIDE DRAWER */}
      {isEmployerDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Custom Backdrop using login-backdrop class */}
          <div
            onClick={() => setIsEmployerDrawerOpen(false)}
            className="fixed inset-0 login-backdrop transition-opacity duration-300 animate-in fade-in"
          />

          <div className="relative w-full sm:w-[480px] bg-white h-full shadow-2xl flex flex-col justify-between z-50 animate-in slide-in-from-right duration-300 ease-out p-8 overflow-y-auto">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-brand-primary" />
                  <h3 className="text-xl font-bold text-slate-900">Employer Portal</h3>
                </div>
                <button
                  onClick={() => setIsEmployerDrawerOpen(false)}
                  className="p-1.5 bg-slate-50 border border-slate-100 rounded-xl hover:bg-slate-100 text-slate-400"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Tab Selector */}
              <div className="grid grid-cols-2 bg-slate-100 rounded-xl p-1 mt-6">
                <button
                  onClick={() => {
                    setEmployerActiveTab("login");
                    setEmployerSubmitted(false);
                  }}
                  className={`text-xs font-bold py-2.5 rounded-lg transition-all ${
                    employerActiveTab === "login"
                      ? "bg-white text-brand-primary shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Employer Login
                </button>
                <button
                  onClick={() => {
                    setEmployerActiveTab("register");
                    setEmployerSubmitted(false);
                  }}
                  className={`text-xs font-bold py-2.5 rounded-lg transition-all ${
                    employerActiveTab === "register"
                      ? "bg-white text-brand-primary shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Register Company
                </button>
              </div>

              {employerSubmitted ? (
                /* Company Registration Success Box */
                <div className="py-12 text-center space-y-4 animate-in zoom-in-95 duration-200">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                    <Check className="h-8 w-8" />
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-lg">Company Application Sent!</h4>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                    Corporate verification for <strong className="text-slate-700">{companyName}</strong> is underway. Our sales division will email you at <span className="text-brand-primary font-medium">{employerEmail}</span> within 24 hours.
                  </p>
                </div>
              ) : employerActiveTab === "login" ? (
                /* Employer Login Form */
                <form onSubmit={handleEmployerSubmit} className="space-y-5 pt-6 animate-in fade-in duration-200">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Official Email ID</label>
                    <input
                      type="email"
                      required
                      value={employerEmail}
                      onChange={(e) => setEmployerEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-primary placeholder-slate-400 font-medium"
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
                        className="w-full bg-white border border-slate-200 rounded-xl pl-4 pr-12 py-2.5 text-sm focus:outline-none focus:border-brand-primary placeholder-slate-400 font-medium"
                      />
                      <button
                        type="button"
                        onClick={() => setShowEmployerPassword(!showEmployerPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-brand-primary hover:underline px-1 py-0.5"
                      >
                        {showEmployerPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-brand-primary hover:bg-brand-hover text-white text-sm font-semibold py-3 rounded-xl transition-all shadow-md shadow-brand-primary/15"
                  >
                    Login to Recruiter Dashboard
                  </button>
                </form>
              ) : (
                /* Employer Registration Form */
                <form onSubmit={handleEmployerSubmit} className="space-y-4 pt-5 animate-in fade-in duration-200">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Company Name</label>
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Acme Tech Solutions"
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-brand-primary placeholder-slate-400 font-medium"
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
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-brand-primary placeholder-slate-400 font-medium"
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
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-brand-primary placeholder-slate-400 font-medium"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Password</label>
                    <input
                      type="password"
                      required
                      value={employerPassword}
                      onChange={(e) => setEmployerPassword(e.target.value)}
                      placeholder="Create recruiter password"
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-brand-primary placeholder-slate-400 font-medium"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                      placeholder="e.g. +1 555-019-2834"
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-brand-primary placeholder-slate-400 font-medium"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-brand-primary hover:bg-brand-hover text-white text-sm font-semibold py-3 rounded-xl transition-all shadow-md shadow-brand-primary/15"
                  >
                    Submit Company Registration
                  </button>
                </form>
              )}
            </div>

            {/* Trust disclaimer */}
            <div className="border-t border-slate-100 pt-6 text-[10px] text-slate-400 leading-normal flex items-start gap-2">
              <span className="text-base leading-none text-emerald-500 shrink-0">🛡️</span>
              <span>
                By clicking submit, you confirm that you are an authorized representative of the hiring entity. False representation is subject to immediate corporate banning.
              </span>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
