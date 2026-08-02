"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Briefcase } from "lucide-react";
import MegaMenu from "@/components/ui/mega-menu";
import CandidateLoginDrawer from "@/components/features/auth/candidate-login-drawer";
import EmployerAuthDrawer from "@/components/features/auth/employer-auth-drawer";

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
  const accessTokenRef = useRef<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Employer Login/Register Drawer state
  const [isEmployerDrawerOpen, setIsEmployerDrawerOpen] = useState(false);
  const [employerActiveTab, setEmployerActiveTab] = useState<"login" | "register">("login");
  const [showEmployerPassword, setShowEmployerPassword] = useState(false);
  
  // Employer inputs
  const [employerEmail, setEmployerEmail] = useState("");
  const [employerPassword, setEmployerPassword] = useState("");
  const [confirmEmployerPassword, setConfirmEmployerPassword] = useState("");
  const [showConfirmEmployerPassword, setShowConfirmEmployerPassword] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [hrName, setHrName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [employerSubmitted, setEmployerSubmitted] = useState(false);
  const [employerRegistrationError, setEmployerRegistrationError] = useState<string | null>(null);
  const [isEmployerRegistrationLoading, setIsEmployerRegistrationLoading] = useState(false);
  const [isResendingEmployerVerification, setIsResendingEmployerVerification] = useState(false);
  const [employerResendMessage, setEmployerResendMessage] = useState<string | null>(null);

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

  useEffect(() => {
    const handler = () => setIsLoginDrawerOpen(true);
    window.addEventListener("open-login-drawer", handler);
    return () => window.removeEventListener("open-login-drawer", handler);
  }, []);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("login") === "true") {
      setIsLoginDrawerOpen(true);
    }
  }, []);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("googleSignIn") !== "success") return;

    fetch("http://localhost:5000/api/auth/refresh", { method: "POST", credentials: "include" })
      .then(async (response) => {
        if (!response.ok) throw new Error("Google sign-in session could not be started.");
        const data = await response.json() as { accessToken: string };
        accessTokenRef.current = data.accessToken;
        window.history.replaceState({}, "", "/");
      })
      .catch(() => setLoginError("Google sign-in completed, but the session could not be restored."));
  }, []);

  const handleMegaMenuClick = (item: string, hrefBase: string) => {
    setActiveMenu(null);
    if (hrefBase.startsWith("/jobs")) {
      router.push(`/jobs?q=${encodeURIComponent(item)}`);
    } else {
      router.push(hrefBase);
    }
  };

  const handleCandidateLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsLoggingIn(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json() as { accessToken?: string; message?: string };
      if (!response.ok || !data.accessToken) throw new Error(data.message || "Login failed.");

      accessTokenRef.current = data.accessToken;
      setIsLoginDrawerOpen(false);
      setEmail("");
      setPassword("");
    } catch (error) {
      setLoginError(error instanceof Error ? error.message : "Login failed.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleEmployerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmployerRegistrationError(null);
    if (employerActiveTab === "login") {
      alert(`Employer Logged in: ${employerEmail}`);
      setIsEmployerDrawerOpen(false);
      setEmployerEmail("");
      setEmployerPassword("");
    } else {
      if (employerPassword !== confirmEmployerPassword) {
        setEmployerRegistrationError("Passwords do not match.");
        return;
      }

      setIsEmployerRegistrationLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/auth/register/employer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            companyName,
            hrName,
            email: employerEmail,
            password: employerPassword,
            contactNumber,
          }),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Employer registration failed.");
        }

        setEmployerSubmitted(true);
      } catch (error) {
        setEmployerRegistrationError(
          error instanceof Error ? error.message : "Employer registration failed.",
        );
      } finally {
        setIsEmployerRegistrationLoading(false);
      }
    }
  };

  const handleResendEmployerVerification = async () => {
    setEmployerResendMessage(null);
    setIsResendingEmployerVerification(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: employerEmail, name: hrName }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to resend the verification email.");
      }

      setEmployerResendMessage("Verification email resent. Please check your inbox and spam folder.");
    } catch (error) {
      setEmployerResendMessage(
        error instanceof Error ? error.message : "Failed to resend the verification email.",
      );
    } finally {
      setIsResendingEmployerVerification(false);
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

      <CandidateLoginDrawer
        isOpen={isLoginDrawerOpen}
        onClose={() => setIsLoginDrawerOpen(false)}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        onSubmit={handleCandidateLoginSubmit}
        error={loginError}
        isLoading={isLoggingIn}
      />

      <EmployerAuthDrawer
        isOpen={isEmployerDrawerOpen}
        onClose={() => setIsEmployerDrawerOpen(false)}
        activeTab={employerActiveTab}
        setActiveTab={setEmployerActiveTab}
        employerEmail={employerEmail}
        setEmployerEmail={setEmployerEmail}
        employerPassword={employerPassword}
        setEmployerPassword={setEmployerPassword}
        confirmEmployerPassword={confirmEmployerPassword}
        setConfirmEmployerPassword={setConfirmEmployerPassword}
        showEmployerPassword={showEmployerPassword}
        setShowEmployerPassword={setShowEmployerPassword}
        showConfirmEmployerPassword={showConfirmEmployerPassword}
        setShowConfirmEmployerPassword={setShowConfirmEmployerPassword}
        companyName={companyName}
        setCompanyName={setCompanyName}
        hrName={hrName}
        setHrName={setHrName}
        contactNumber={contactNumber}
        setContactNumber={setContactNumber}
        submitted={employerSubmitted}
        setSubmitted={setEmployerSubmitted}
        onSubmit={handleEmployerSubmit}
        registrationError={employerRegistrationError}
        isRegistrationLoading={isEmployerRegistrationLoading}
        onResendVerification={handleResendEmployerVerification}
        isResendingVerification={isResendingEmployerVerification}
        resendMessage={employerResendMessage}
      />
    </>
  );
}
