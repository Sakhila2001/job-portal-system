"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Briefcase, LogOut, Shield } from "lucide-react";
import MegaMenu from "@/components/ui/mega-menu";
import CandidateLoginDrawer from "@/components/features/auth/candidate-login-drawer";
import EmployerAuthDrawer from "@/components/features/auth/employer-auth-drawer";
import { useAuth } from "@/contexts/AuthContext";

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
  const { user, isAuthenticated, login, logout, clearTokens } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Mobile menu open/close
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Hover Mega Menu states
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Candidate login drawer state
  const [isLoginDrawerOpen, setIsLoginDrawerOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

    fetch("/api/auth/refresh", { method: "POST", credentials: "include" })
      .then(async (response) => {
        if (!response.ok) throw new Error("Google sign-in session could not be started.");
        const data = await response.json() as { accessToken: string };
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

  const redirectBasedOnRole = (role: string) => {
    switch (role) {
      case "admin":
        router.push("/admin");
        break;
      case "candidate":
        router.push("/dashboard");
        break;
      case "employer":
      case "recruiter":
        router.push("/employer");
        break;
      default:
        router.push("/");
    }
  };

  const dashboardHref = (role: string) => {
    switch (role) {
      case "admin":
        return "/admin";
      case "candidate":
        return "/dashboard";
      case "employer":
      case "recruiter":
        return "/employer";
      default:
        return "/";
    }
  };

  const handleCandidateLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsLoggingIn(true);
    try {
      const { user: userData, accessToken } = await login(email, password, "candidate");
      setIsLoginDrawerOpen(false);
      setEmail("");
      setPassword("");
      redirectBasedOnRole(userData.role);
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
      try {
        const { user: userData } = await login(employerEmail, employerPassword, "employer");

        // Only allow users with employer or recruiter role to access the Employer Portal
        if ((userData.role as string) !== "employer" && userData.role !== "recruiter") {
          clearTokens();
          setEmployerRegistrationError(
            "Access denied. This portal is for employers only. Please use the candidate login instead."
          );
          return;
        }

        setIsEmployerDrawerOpen(false);
        setEmployerEmail("");
        setEmployerPassword("");
        redirectBasedOnRole(userData.role);
      } catch (error) {
        setEmployerRegistrationError(error instanceof Error ? error.message : "Login failed.");
      }
    } else {
      if (employerPassword !== confirmEmployerPassword) {
        setEmployerRegistrationError("Passwords do not match.");
        return;
      }

      setIsEmployerRegistrationLoading(true);
      try {
        const response = await fetch("/api/auth/register/employer", {
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
      const response = await fetch("/api/auth/resend-verification", {
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

  const handleLogout = async () => {
    await logout();
    router.push("/");
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
      <header className="sticky top-0 z-40 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* Logo and Nav links */}
          <div className="flex items-center gap-10">
            <Link href="/" className="flex items-center gap-2 text-lg font-semibold tracking-tight text-slate-900 shrink-0">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-white shadow-xs">
                <Briefcase className="h-4.5 w-4.5" />
              </span>
              <span>
                Job<span className="text-slate-500 font-normal">Portal</span>
              </span>
            </Link>

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
                      className={`text-sm font-semibold transition-colors hover:text-slate-900 flex items-center gap-0.5 border-b-2 py-5 ${
                        pathname.startsWith(menu.href) || isActive
                          ? "border-slate-900 text-slate-900"
                          : "border-transparent text-slate-500"
                      }`}
                    >
                      {menu.title}
                    </Link>

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

          {/* Right Action buttons */}
          <div className="hidden md:flex items-center gap-4">
            {mounted && isAuthenticated && user ? (
              <>
                <Link
                  href={dashboardHref(user.role)}
                  className="text-sm font-medium text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-50 transition-all flex items-center gap-1.5"
                >
                  Dashboard
                </Link>
                <span className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                  <Shield className="h-4 w-4" />
                  {user.role}
                </span>
                <span className="text-sm text-slate-500">{user.email}</span>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-slate-500 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-50 transition-all flex items-center gap-1.5"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setEmployerActiveTab("login");
                    setIsEmployerDrawerOpen(true);
                  }}
                  className="text-sm font-medium text-slate-500 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-50 transition-all"
                >
                  For employers
                </button>

                <button
                  onClick={() => setIsLoginDrawerOpen(true)}
                  className="text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 px-4 py-2 rounded-lg transition-all"
                >
                  Login
                </button>

                <Link
                  href="/register"
                  className="text-sm font-semibold bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg shadow-xs transition-all block text-center"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-3">
            {mounted && isAuthenticated && user ? (
              <>
                <Link
                  href={dashboardHref(user.role)}
                  className="text-xs font-semibold text-slate-600 hover:text-brand-primary border border-slate-200 px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-xs font-semibold text-slate-600 hover:text-brand-primary border border-slate-200 px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  Logout
                </button>
              </>
            ) : (
              <>
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
              </>
            )}
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
              {mounted && isAuthenticated && user ? (
                <>
                  <Link
                    href={dashboardHref(user.role)}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full text-center text-sm font-semibold text-slate-700 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 flex items-center justify-center gap-2"
                  >
                    Dashboard ({user.role})
                  </Link>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="w-full text-center text-sm font-semibold text-slate-700 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 flex items-center justify-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout ({user.role})
                  </button>
                </>
              ) : (
                <>
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
                </>
              )}
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
