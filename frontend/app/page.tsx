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
          <div className="bg-slate-900 text-white rounded-3xl p-8 flex flex-col justify-between min-h-[300px] relative overflow-hidden shadow-lg">
            {/* Backdrop gradients */}
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-blue-500/20 blur-2xl" />
            <div className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-indigo-500/10 blur-xl" />

            <div className="space-y-4 relative z-10">
              <span className="bg-blue-500/20 text-blue-300 text-xs font-semibold px-2.5 py-1 rounded-full border border-blue-500/30">
                Exclusive Feature
              </span>
              <h3 className="text-3xl font-extrabold tracking-tight leading-tight">
                Stand out with a video profile
              </h3>
              <p className="text-sm text-slate-300 max-w-md">
                Candidates with active video resumes receive up to 3x higher response rates from global tech recruiters. Upload your short pitch today.
              </p>
            </div>
            
            <div className="mt-8 flex flex-wrap gap-4 items-center relative z-10">
              <button className="bg-white text-slate-900 hover:bg-slate-100 px-6 py-3 rounded-xl text-sm font-semibold transition-all shadow-md shadow-white/5">
                Create Video Resume
              </button>
              <a href="#" className="text-sm font-medium text-slate-300 hover:text-white flex items-center gap-1">
                <span>Learn how it works</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Card B: Premium Services */}
          <div className="bg-gradient-to-tr from-brand-primary to-indigo-900 text-white rounded-3xl p-8 flex flex-col justify-between min-h-[300px] relative overflow-hidden shadow-lg">
            {/* Backdrop highlights */}
            <div className="absolute right-0 bottom-0 h-44 w-44 rounded-full bg-white/10 blur-2xl" />
            
            <div className="space-y-4 relative z-10">
              <div className="flex items-center gap-2 text-amber-300">
                <Award className="h-5 w-5 fill-amber-300" />
                <span className="text-xs font-bold uppercase tracking-wider">Top Tier Assistance</span>
              </div>
              <h3 className="text-3xl font-extrabold tracking-tight leading-tight">
                Accelerate search with premium resume services
              </h3>
              <p className="text-sm text-blue-100 max-w-md">
                Get your profile professionally reviewed and formatted by career experts to clear both ATS scanners and recruiter screening.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4 items-center relative z-10">
              <button className="bg-brand-secondary hover:bg-orange-600 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all shadow-md shadow-brand-secondary/15">
                Get Expert Review
              </button>
              <div className="flex items-center gap-2 text-xs text-blue-200">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
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
        <section className="bg-white border border-border rounded-3xl p-8 md:p-12 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-brand-primary border border-blue-100 shrink-0">
              <Zap className="h-6 w-6" />
            </span>
            <div>
              <h4 className="font-bold text-slate-900 text-base">Instant Apply</h4>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Apply to verified roles with a single click. Keep track of application progress directly in real-time.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600 border border-amber-100 shrink-0">
              <ShieldCheck className="h-6 w-6" />
            </span>
            <div>
              <h4 className="font-bold text-slate-900 text-base">100% Verified Employers</h4>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Zero spam policy. Every hiring entity undergoes manual corporate verification before listing positions.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 shrink-0">
              <Award className="h-6 w-6" />
            </span>
            <div>
              <h4 className="font-bold text-slate-900 text-base">Detailed Comparisons</h4>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
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
