"use client";

import React from "react";
import Link from "next/link";
import {
  Briefcase,
  Mail,
  Send,
  Code2,
  Globe,
  Phone,
  MapPin,
} from "lucide-react";

const footerLinks = {
  jobSeekers: [
    { label: "Browse Jobs", href: "/jobs" },
    { label: "Job Categories", href: "/jobs" },
    { label: "Featured Companies", href: "/#companies" },
    { label: "Career Tips", href: "#" },
    { label: "Resume Builder", href: "#" },
    { label: "Salary Guide", href: "#" },
  ],
  employers: [
    { label: "Post a Job", href: "/employer/post-job" },
    { label: "Employer Dashboard", href: "/employer/dashboard" },
    { label: "Search Resumes", href: "#" },
    { label: "Hiring Plans", href: "/#services" },
    { label: "Recruitment Solutions", href: "#" },
    { label: "Employer Branding", href: "#" },
  ],
  resources: [
    { label: "About Us", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Help Center", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Sitemap", href: "#" },
  ],
};

const nepalLocations = [
  "Kathmandu",
  "Pokhara",
  "Lalitpur",
  "Biratnagar",
  "Birgunj",
  "Butwal",
  "Dharan",
  "Bharatpur",
];

export default function Footer() {
  return (
    <footer className="w-full bg-slate-50 border-t border-slate-200 text-slate-600">
      {/* Main Footer Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-5">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-lg font-semibold tracking-tight text-slate-900"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-white shadow-xs">
                <Briefcase className="h-4.5 w-4.5" />
              </span>
              Job<span className="text-slate-500 font-normal">Portal</span>
            </Link>

            <p className="text-sm leading-relaxed text-slate-500 max-w-xs">
              Nepal's fastest-growing job portal connecting talented
              professionals with the country's top employers across every
              industry.
            </p>

            {/* Contact info */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-slate-500">
                <MapPin className="h-4 w-4 text-brand-primary shrink-0" />
                <span>Kathmandu, Bagmati Province, Nepal</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <Phone className="h-4 w-4 text-brand-primary shrink-0" />
                <span>+977-1-4567890</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <Mail className="h-4 w-4 text-brand-primary shrink-0" />
                <span>hello@jobportal.com.np</span>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {[
                // { icon: Linkedin, label: "LinkedIn" },
                // { icon: Twitter, label: "Twitter" },
                { icon: Code2, label: "GitHub" },
                { icon: Globe, label: "Website" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm hover:border-brand-primary hover:text-brand-primary hover:shadow-brand-primary/10 transition-all"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Job Seekers */}
          <div className="space-y-4">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-800">
              Job Seekers
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.jobSeekers.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-500 hover:text-brand-primary hover:translate-x-0.5 transition-all inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Employers */}
          <div className="space-y-4">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-800">
              Employers
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.employers.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-500 hover:text-brand-primary hover:translate-x-0.5 transition-all inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-800">
              Resources
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-500 hover:text-brand-primary hover:translate-x-0.5 transition-all inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h4 className="font-semibold text-slate-800 text-sm mb-0.5">
              Get job alerts in your inbox
            </h4>
            <p className="text-xs text-slate-500">
              Subscribe and never miss the latest opportunities.
            </p>
          </div>
          <form
            className="flex items-center gap-2 w-full sm:w-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="relative flex-1 min-w-0">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              <input
                type="email"
                placeholder="you@email.com"
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-slate-200 bg-white text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-slate-300 transition"
              />
            </div>
            <button
              type="submit"
              className="shrink-0 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition shadow-xs"
            >
              <Send className="h-3.5 w-3.5" />
              Subscribe
            </button>
          </form>
        </div>

        <div className="mt-8">
          <h4 className="text-xs font-semibold text-slate-600 mb-3">
            Jobs by Location in Nepal
          </h4>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {nepalLocations.map((city) => (
              <Link
                key={city}
                href={`/jobs?location=${city}`}
                className="text-xs text-slate-500 hover:text-slate-900 transition"
              >
                Jobs in {city}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} JobPortal Nepal. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {["Privacy Policy", "Terms of Use", "Cookie Policy"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs text-slate-400 hover:text-brand-primary transition"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
