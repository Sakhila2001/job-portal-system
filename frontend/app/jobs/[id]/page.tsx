import React from "react";
import { notFound } from "next/navigation";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import JobCard from "@/components/ui/job-card";
import CompanyComparison from "@/components/ui/company-comparison";
import { jobs, companies } from "@/lib/dummy-data";
import { Star, MapPin, Briefcase, DollarSign, Clock, ShieldCheck, ThumbsUp, ThumbsDown, Bookmark, Share2, Send } from "lucide-react";
import Link from "next/link";

interface JobDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return jobs.map((job) => ({
    id: job.id,
  }));
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { id } = await params;
  const job = jobs.find((j) => j.id === id);

  if (!job) {
    notFound();
  }

  const company = companies.find((c) => c.id === job.companyId);

  // Find similar jobs from list
  const similarJobsList = jobs.filter(
    (j) => job.similarJobs.includes(j.id) && j.id !== job.id
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Header />

      {/* Hero Panel: Job Overview */}
      <div className="w-full bg-white border-b border-border py-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
            
            {/* Header info details */}
            <div className="flex gap-4">
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 border border-slate-200 text-4xl shadow-inner shrink-0">
                {job.companyLogo}
              </span>
              <div className="space-y-2">
                <h1 className="text-xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                  {job.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500">
                  <span className="font-semibold text-slate-800 text-base">{job.companyName}</span>
                  <span className="text-slate-300">|</span>
                  <div className="flex items-center gap-1">
                    <span className="flex items-center gap-0.5 text-amber-500 font-semibold bg-amber-50 px-1.5 py-0.5 rounded">
                      <Star className="h-3 w-3 fill-amber-500" />
                      {job.rating}
                    </span>
                    <span className="text-xs hover:underline cursor-pointer">({job.reviewsCount} Reviews)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sticky/Header Action buttons */}
            <div className="flex items-center gap-3 w-full sm:w-auto shrink-0 pt-2 lg:pt-0">
              <button className="flex-1 sm:flex-initial bg-brand-primary hover:bg-brand-hover text-white text-sm font-semibold px-6 py-3 rounded-xl transition-all shadow-md shadow-brand-primary/20 flex items-center justify-center gap-2">
                <Send className="h-4 w-4" />
                <span>Apply on Company Site</span>
              </button>
              
              <button className="p-3 border border-border bg-white text-slate-500 hover:text-brand-primary hover:bg-slate-50 rounded-xl transition-colors shadow-sm">
                <Bookmark className="h-4 w-4" />
              </button>
              
              <button className="p-3 border border-border bg-white text-slate-500 hover:text-brand-primary hover:bg-slate-50 rounded-xl transition-colors shadow-sm">
                <Share2 className="h-4 w-4" />
              </button>
            </div>

          </div>

          {/* Mini attributes strip */}
          <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-500 border-t border-slate-100 mt-8 pt-5">
            <span className="flex items-center gap-1.5 font-medium">
              <Briefcase className="h-4 w-4 text-slate-400 shrink-0" />
              Experience: <strong className="text-slate-800">{job.experience}</strong>
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <DollarSign className="h-4 w-4 text-slate-400 shrink-0" />
              Salary: <strong className="text-slate-800">{job.salary}</strong>
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <MapPin className="h-4 w-4 text-slate-400 shrink-0" />
              Location: <strong className="text-slate-800">{job.location}</strong>
            </span>
            <span className="flex items-center gap-1.5 font-medium ml-auto">
              <Clock className="h-4 w-4 text-slate-400 shrink-0" />
              Posted: <strong className="text-slate-800">{job.postedTime}</strong>
            </span>
          </div>

        </div>
      </div>

      {/* Main Grid content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Main pane (8 columns) */}
          <div className="col-span-12 lg:col-span-8 space-y-8">
            
            {/* Job Description Card */}
            <div className="bg-white border border-border rounded-3xl p-6 md:p-8 space-y-4 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-50 pb-2">
                Job Description
              </h2>
              <div className="text-sm text-slate-600 space-y-4 leading-relaxed">
                <p>{job.description}</p>
                <p>
                  We are looking for self-motivated candidates with solid foundational skills. You will work within agile engineering teams, contributing to high-volume websites and business processes. Candidates should be capable of writing test suites, reviewing peer components, and debugging frontend visual discrepancies.
                </p>
                <h4 className="font-bold text-slate-800">Primary Responsibilities:</h4>
                <ul className="list-disc list-inside space-y-2 pl-2">
                  <li>Formulate responsive user interface logic in React and Next.js.</li>
                  <li>Develop lightweight components conforming to shared Design Systems.</li>
                  <li>Optimize page loads, bundle distributions, and image layouts.</li>
                  <li>Collaborate with backend product nodes to integrate GraphQL and REST APIs.</li>
                </ul>
              </div>

              {/* Skills Tags */}
              <div className="space-y-2 pt-4">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Required Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1 rounded-lg border border-slate-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* About Company details */}
            {company && (
              <div className="bg-white border border-border rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-50 pb-3">
                  <h2 className="text-lg font-bold text-slate-900">
                    About {company.name}
                  </h2>
                  <span className="text-xs font-semibold text-slate-400">
                    Corporate Profile
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                    <span className="text-xs text-slate-400 block uppercase font-bold tracking-wider">Rating</span>
                    <span className="text-lg font-bold text-slate-900 flex items-center justify-center gap-1 mt-1">
                      <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                      {company.rating}
                    </span>
                  </div>
                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                    <span className="text-xs text-slate-400 block uppercase font-bold tracking-wider">Founded</span>
                    <span className="text-lg font-bold text-slate-900 block mt-1">{company.founded}</span>
                  </div>
                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                    <span className="text-xs text-slate-400 block uppercase font-bold tracking-wider">Employees</span>
                    <span className="text-sm font-bold text-slate-900 block mt-1.5 line-clamp-1">{company.employees.split(" ")[0]}</span>
                  </div>
                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                    <span className="text-xs text-slate-400 block uppercase font-bold tracking-wider">CEO Approval</span>
                    <span className="text-lg font-bold text-emerald-600 block mt-1">{company.ceoApproval}%</span>
                  </div>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {job.aboutCompany}
                </p>

                {/* Company Reviews sub-grid */}
                <div className="space-y-4 pt-2">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Employee Satisfaction Ratings</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-slate-600">
                        <span>Work-Life Balance</span>
                        <span>{company.workLifeBalance} / 5</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-brand-primary rounded-full" style={{ width: `${(company.workLifeBalance / 5) * 100}%` }} />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-slate-600">
                        <span>Job Security & Stability</span>
                        <span>{company.jobSecurity} / 5</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-brand-primary rounded-full" style={{ width: `${(company.jobSecurity / 5) * 100}%` }} />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-slate-600">
                        <span>Salary & Benefits</span>
                        <span>{company.salaryBenefits} / 5</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-brand-primary rounded-full" style={{ width: `${(company.salaryBenefits / 5) * 100}%` }} />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-slate-600">
                        <span>Career Growth Paths</span>
                        <span>{company.careerGrowth} / 5</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-brand-primary rounded-full" style={{ width: `${(company.careerGrowth / 5) * 100}%` }} />
                      </div>
                    </div>

                  </div>
                </div>

                {/* Pros and Cons (visual layout) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-100 pt-6">
                  <div className="space-y-3">
                    <h5 className="text-xs font-bold text-emerald-700 flex items-center gap-1.5 uppercase tracking-wider">
                      <ThumbsUp className="h-4 w-4" />
                      <span>Pros / Benefits</span>
                    </h5>
                    <ul className="space-y-2 text-xs text-slate-600 list-inside pl-1 list-none">
                      {company.pros.map((p, i) => (
                        <li key={i} className="flex gap-2 items-start leading-relaxed">
                          <span className="text-emerald-500 font-bold shrink-0">✓</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h5 className="text-xs font-bold text-red-700 flex items-center gap-1.5 uppercase tracking-wider">
                      <ThumbsDown className="h-4 w-4" />
                      <span>Cons / Drawbacks</span>
                    </h5>
                    <ul className="space-y-2 text-xs text-slate-600 list-inside pl-1 list-none">
                      {company.cons.map((c, i) => (
                        <li key={i} className="flex gap-2 items-start leading-relaxed">
                          <span className="text-red-400 font-bold shrink-0">⚠</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
            )}

            {/* Company Comparison (dynamic parameters) */}
            <CompanyComparison primaryCompanyId={job.companyId} />

            {/* Similar Jobs widget */}
            {similarJobsList.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900">Similar Jobs</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {similarJobsList.map((simJob) => (
                    <JobCard key={simJob.id} job={simJob} layout="grid" />
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right sidebar pane (4 columns) */}
          <div className="col-span-12 lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            
            {/* Job Perks/Benefits block */}
            <div className="bg-white border border-border rounded-3xl p-6 space-y-4 shadow-sm">
              <h3 className="font-bold text-slate-900 text-sm border-b border-slate-50 pb-2">
                Benefits & Stipends
              </h3>
              <div className="space-y-4">
                {job.benefits.map((ben, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="text-2xl shrink-0 p-1 bg-slate-50 rounded-xl border border-slate-100">
                      {ben.icon}
                    </span>
                    <div>
                      <h4 className="font-bold text-slate-800 text-xs">{ben.title}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{ben.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety & Job Scam alert card (inspired by screenshots) */}
            <div className="bg-amber-50/50 border border-amber-100 rounded-3xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-amber-700">
                <ShieldCheck className="h-5 w-5 text-amber-600 shrink-0" />
                <h4 className="font-bold text-xs uppercase tracking-wider">Safety & Fraud Tip</h4>
              </div>
              <p className="text-[11px] text-amber-900/80 leading-relaxed">
                Do not pay any verification fees or buying deposits to potential employers. JobPortal never handles payment transfers on behalf of hiring entities. Report any suspicious behavior.
              </p>
              <a href="#" className="inline-block text-[10px] font-bold text-brand-primary hover:underline">
                Report suspicious listing
              </a>
            </div>

          </div>

        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
