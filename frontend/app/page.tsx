import React from "react";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import Hero from "@/components/ui/hero";
import CompanyCarousel from "@/components/ui/company-carousel";
import RoleExplorer from "@/components/ui/role-explorer";
import TestimonialCard from "@/components/ui/testimonial";
import InterviewPrep from "@/components/ui/interview-prep";
import { testimonials } from "@/lib/dummy-data";
import { Award, Zap, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <Header />

      {/* Hero & Search Banner */}
      <Hero />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        
        {/* Section 1: Active Hirers Carousel */}
        <section id="companies" className="scroll-mt-20">
          <CompanyCarousel />
        </section>

        {/* Section 2: Discover Jobs Across Popular Roles */}
        <section className="scroll-mt-20">
          <RoleExplorer />
        </section>

        {/* Section 3: Premium Promo Banners (Inspired by image 2) */}
        <section id="services" className="grid grid-cols-1 md:grid-cols-2 gap-8 scroll-mt-20">
        {/* Card A: Video Resume */}
          <div className="bg-white text-slate-800 rounded-xl p-8 flex flex-col justify-between min-h-[280px] border border-slate-100 hover:border-slate-200 hover:shadow-xs transition-all">
            <div className="space-y-3">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Exclusive Feature
              </p>
              <h3 className="text-xl font-bold tracking-tight leading-snug text-slate-900">
                Stand out with a video profile
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed max-w-md">
                Candidates with active video resumes receive up to 3x higher response rates from global tech recruiters. Upload your short pitch today.
              </p>
            </div>
            
            <div className="mt-8 flex flex-wrap gap-4 items-center">
              <button className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-xs">
                Create Video Resume
              </button>
              <a href="#" className="text-sm font-medium text-slate-500 hover:text-slate-900 flex items-center gap-1 group/link">
                <span>Learn how it works</span>
                <ArrowRight className="h-4 w-4 group-hover/link:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Card B: Premium Services */}
          <div className="bg-white text-slate-800 rounded-xl p-8 flex flex-col justify-between min-h-[280px] border border-slate-100 hover:border-slate-200 hover:shadow-xs transition-all">
            <div className="space-y-3">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Premium Services
              </p>
              <h3 className="text-xl font-bold tracking-tight leading-snug text-slate-900">
                Accelerate search with premium resume services
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed max-w-md">
                Get your profile professionally reviewed and formatted by career experts to clear both ATS scanners and recruiter screening.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4 items-center">
              <button className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-xs">
                Get Expert Review
              </button>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>ATS Compatible Guarantee</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Interview Preparation (Company-wise questions) */}
        <section className="scroll-mt-20">
          <InterviewPrep />
        </section>

        {/* Section 5: Testimonials (Job seeker quotes) */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Trusted by 5 Million+ Seekers
            </h2>
            <p className="text-sm text-muted-foreground">
              Read how candidates landed roles at top companies using our comparative dashboard and interview guides.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((test) => (
              <TestimonialCard key={test.id} testimonial={test} />
            ))}
          </div>
        </section>

        {/* Section 6: Additional Features (Trust signals) */}
        <section className="bg-white border border-slate-100 rounded-xl p-8 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex gap-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 border border-slate-100 text-slate-600 shrink-0">
              <Zap className="h-5 w-5" strokeWidth={1.75} />
            </span>
            <div>
              <h4 className="font-semibold text-slate-900 text-sm">Instant Apply</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Apply to verified roles with a single click. Keep track of application progress directly in real-time.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 border border-slate-100 text-slate-600 shrink-0">
              <ShieldCheck className="h-5 w-5" strokeWidth={1.75} />
            </span>
            <div>
              <h4 className="font-semibold text-slate-900 text-sm">100% Verified Employers</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Zero spam policy. Every hiring entity undergoes manual corporate verification before listing positions.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 border border-slate-100 text-slate-600 shrink-0">
              <Award className="h-5 w-5" strokeWidth={1.75} />
            </span>
            <div>
              <h4 className="font-semibold text-slate-900 text-sm">Detailed Comparisons</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Compare job offers, insurance benefits, increments, and culture ratings side-by-side.
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
