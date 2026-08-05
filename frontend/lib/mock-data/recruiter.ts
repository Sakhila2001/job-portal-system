import { Job, JobApplication, Interview, TeamMember, CampaignPerformance } from "../types";

export const MOCK_RECRUITER_KPIS = [
  { title: "Active Jobs", value: "6", trendDelta: "2 closing soon", trendDirection: "neutral" as const },
  { title: "New Applicants", value: "42", trendDelta: "+18 today", trendDirection: "up" as const },
  { title: "Interviews This Week", value: "8", trendDelta: "3 today", trendDirection: "up" as const },
  { title: "Avg Time to Hire", value: "19 days", trendDelta: "-2 days vs last mo", trendDirection: "good" as const },
];

export const MOCK_PLAN_USAGE = {
  planName: "Business",
  usedSlots: 18,
  totalSlots: 25,
};

export const MOCK_JOB_POSTINGS: Job[] = [
  {
    id: "rec-job-1",
    companyId: "comp-1",
    companyName: "JPS Employer",
    title: "Senior Laravel Developer",
    department: "Engineering",
    employmentType: "Full-time",
    workMode: "Remote",
    location: "Kathmandu",
    applicantsCount: 21,
    viewsCount: 340,
    postedDate: "Jul 20",
    expiresInDays: 12,
    status: "live",
  },
  {
    id: "rec-job-2",
    companyId: "comp-1",
    companyName: "JPS Employer",
    title: "DevOps Engineer",
    department: "Engineering",
    employmentType: "Full-time",
    workMode: "Hybrid",
    location: "Lalitpur",
    applicantsCount: 9,
    viewsCount: 180,
    postedDate: "Jul 28",
    expiresInDays: 5,
    status: "live",
  },
  {
    id: "rec-job-3",
    companyId: "comp-1",
    companyName: "JPS Employer",
    title: "QA Engineer",
    department: "Engineering",
    employmentType: "Full-time",
    workMode: "On-site",
    location: "Kathmandu",
    applicantsCount: 7,
    viewsCount: 86,
    postedDate: "Jul 30",
    expiresInDays: 2,
    status: "expiring",
  },
  {
    id: "rec-job-4",
    companyId: "comp-1",
    companyName: "JPS Employer",
    title: "Product Designer",
    department: "Design",
    employmentType: "Full-time",
    workMode: "Remote",
    location: "Remote",
    applicantsCount: 5,
    viewsCount: 210,
    postedDate: "—",
    expiresInDays: null,
    status: "draft",
  },
  {
    id: "rec-job-5",
    companyId: "comp-1",
    companyName: "JPS Employer",
    title: "Frontend React Developer",
    department: "Engineering",
    employmentType: "Full-time",
    workMode: "Remote",
    location: "Remote",
    applicantsCount: 34,
    viewsCount: 512,
    postedDate: "Jun 15",
    expiresInDays: 0,
    status: "closed",
  },
  {
    id: "rec-job-6",
    companyId: "comp-1",
    companyName: "JPS Employer",
    title: "Technical Writer",
    department: "Product",
    employmentType: "Part-time",
    workMode: "Remote",
    location: "Kathmandu",
    applicantsCount: 12,
    viewsCount: 190,
    postedDate: "Jul 05",
    expiresInDays: 18,
    status: "live",
  },
];

export const MOCK_JOB_APPLICANTS: JobApplication[] = [
  // ── Senior Laravel Developer (rec-job-1) ──
  {
    id: "app-r1", sn: 1, jobId: "rec-job-1",
    jobTitle: "Senior Laravel Developer", companyName: "JPS Employer",
    candidateName: "Sujata K.", candidateEmail: "sujata.k@email.com",
    appliedDate: "Jul 21", location: "Kathmandu", salaryText: "Rs 90,000/mo",
    experienceYears: 4, screeningScore: 87, status: "interview", statusCustomPill: "Interview Tomorrow",
  },
  {
    id: "app-r2", sn: 2, jobId: "rec-job-1",
    jobTitle: "Senior Laravel Developer", companyName: "JPS Employer",
    candidateName: "Ramesh B.", candidateEmail: "ramesh.b@email.com",
    appliedDate: "Jul 22", location: "Lalitpur", salaryText: "Rs 85,000/mo",
    experienceYears: 3, screeningScore: 74, status: "screening",
  },
  {
    id: "app-r3", sn: 3, jobId: "rec-job-1",
    jobTitle: "Senior Laravel Developer", companyName: "JPS Employer",
    candidateName: "Anita M.", candidateEmail: "anita.m@email.com",
    appliedDate: "Jul 25", location: "Kathmandu", salaryText: "Rs 95,000/mo",
    experienceYears: 5, screeningScore: 68, status: "applied",
  },
  {
    id: "app-r4", sn: 4, jobId: "rec-job-1",
    jobTitle: "Senior Laravel Developer", companyName: "JPS Employer",
    candidateName: "Bimal T.", candidateEmail: "bimal.t@email.com",
    appliedDate: "Jul 20", location: "Remote", salaryText: "Rs 1,10,000/mo",
    experienceYears: 6, screeningScore: 91, status: "offer",
  },
  {
    id: "app-r5", sn: 5, jobId: "rec-job-1",
    jobTitle: "Senior Laravel Developer", companyName: "JPS Employer",
    candidateName: "Sabina G.", candidateEmail: "sabina.g@email.com",
    appliedDate: "Jul 26", location: "Kathmandu", salaryText: "Rs 75,000/mo",
    experienceYears: 2, screeningScore: 63, status: "rejected",
  },
  {
    id: "app-r6", sn: 6, jobId: "rec-job-1",
    jobTitle: "Senior Laravel Developer", companyName: "JPS Employer",
    candidateName: "Prakash D.", candidateEmail: "prakash.d@email.com",
    appliedDate: "Jul 27", location: "Pokhara", salaryText: "Rs 80,000/mo",
    experienceYears: 4, screeningScore: 79, status: "screening",
  },

  // ── DevOps Engineer (rec-job-2) ──
  {
    id: "app-r7", sn: 1, jobId: "rec-job-2",
    jobTitle: "DevOps Engineer", companyName: "JPS Employer",
    candidateName: "Arjun S.", candidateEmail: "arjun.s@email.com",
    appliedDate: "Jul 29", location: "Lalitpur", salaryText: "Rs 1,00,000/mo",
    experienceYears: 5, screeningScore: 82, status: "interview",
  },
  {
    id: "app-r8", sn: 2, jobId: "rec-job-2",
    jobTitle: "DevOps Engineer", companyName: "JPS Employer",
    candidateName: "Sunita P.", candidateEmail: "sunita.p@email.com",
    appliedDate: "Jul 29", location: "Kathmandu", salaryText: "Rs 95,000/mo",
    experienceYears: 3, screeningScore: 71, status: "applied",
  },
  {
    id: "app-r9", sn: 3, jobId: "rec-job-2",
    jobTitle: "DevOps Engineer", companyName: "JPS Employer",
    candidateName: "Nirajan T.", candidateEmail: "nirajan.t@email.com",
    appliedDate: "Jul 30", location: "Remote", salaryText: "Rs 90,000/mo",
    experienceYears: 4, screeningScore: 77, status: "screening",
  },
  {
    id: "app-r10", sn: 4, jobId: "rec-job-2",
    jobTitle: "DevOps Engineer", companyName: "JPS Employer",
    candidateName: "Pooja R.", candidateEmail: "pooja.r@email.com",
    appliedDate: "Aug 1", location: "Kathmandu", salaryText: "Rs 85,000/mo",
    experienceYears: 2, screeningScore: 59, status: "rejected",
  },

  // ── QA Engineer (rec-job-3) ──
  {
    id: "app-r11", sn: 1, jobId: "rec-job-3",
    jobTitle: "QA Engineer", companyName: "JPS Employer",
    candidateName: "Bibek L.", candidateEmail: "bibek.l@email.com",
    appliedDate: "Aug 1", location: "Kathmandu", salaryText: "Rs 70,000/mo",
    experienceYears: 3, screeningScore: 80, status: "screening",
  },
  {
    id: "app-r12", sn: 2, jobId: "rec-job-3",
    jobTitle: "QA Engineer", companyName: "JPS Employer",
    candidateName: "Manisha K.", candidateEmail: "manisha.k@email.com",
    appliedDate: "Aug 2", location: "Lalitpur", salaryText: "Rs 65,000/mo",
    experienceYears: 2, screeningScore: 66, status: "applied",
  },
  {
    id: "app-r13", sn: 3, jobId: "rec-job-3",
    jobTitle: "QA Engineer", companyName: "JPS Employer",
    candidateName: "Roshan G.", candidateEmail: "roshan.g@email.com",
    appliedDate: "Aug 3", location: "Kathmandu", salaryText: "Rs 72,000/mo",
    experienceYears: 4, screeningScore: 85, status: "interview", statusCustomPill: "Today 3PM",
  },

  // ── Product Designer (rec-job-4) ──
  {
    id: "app-r14", sn: 1, jobId: "rec-job-4",
    jobTitle: "Product Designer", companyName: "JPS Employer",
    candidateName: "Priya S.", candidateEmail: "priya.s@email.com",
    appliedDate: "Aug 1", location: "Remote", salaryText: "Rs 95,000/mo",
    experienceYears: 4, screeningScore: 89, status: "interview",
  },
  {
    id: "app-r15", sn: 2, jobId: "rec-job-4",
    jobTitle: "Product Designer", companyName: "JPS Employer",
    candidateName: "Dipesh M.", candidateEmail: "dipesh.m@email.com",
    appliedDate: "Aug 2", location: "Kathmandu", salaryText: "Rs 85,000/mo",
    experienceYears: 3, screeningScore: 72, status: "applied",
  },

  // ── Technical Writer (rec-job-6) ──
  {
    id: "app-r16", sn: 1, jobId: "rec-job-6",
    jobTitle: "Technical Writer", companyName: "JPS Employer",
    candidateName: "Smita B.", candidateEmail: "smita.b@email.com",
    appliedDate: "Jul 20", location: "Kathmandu", salaryText: "Rs 55,000/mo",
    experienceYears: 2, screeningScore: 76, status: "offer",
  },
  {
    id: "app-r17", sn: 2, jobId: "rec-job-6",
    jobTitle: "Technical Writer", companyName: "JPS Employer",
    candidateName: "Dinesh R.", candidateEmail: "dinesh.r@email.com",
    appliedDate: "Jul 22", location: "Remote", salaryText: "Rs 52,000/mo",
    experienceYears: 1, screeningScore: 61, status: "applied",
  },
  {
    id: "app-r18", sn: 3, jobId: "rec-job-6",
    jobTitle: "Technical Writer", companyName: "JPS Employer",
    candidateName: "Kabita T.", candidateEmail: "kabita.t@email.com",
    appliedDate: "Jul 25", location: "Lalitpur", salaryText: "Rs 58,000/mo",
    experienceYears: 3, screeningScore: 83, status: "screening",
  },
];

export const MOCK_APPLICANT_STAGE_COUNTS = {
  applied: 21,
  screened: 9,
  interview: 4,
  offer: 1,
};

export const MOCK_APPLICANT_FUNNEL_SUMMARY = {
  hired: 0,
  rejected: 11,
  avgScreenScore: 78,
  offerAcceptRate: "67%",
};

export const MOCK_HIRING_ANALYTICS = {
  applicantsPerWeek: [
    { week: "W1", count: 8 },
    { week: "W2", count: 12 },
    { week: "W3", count: 18 },
    { week: "W4", count: 24 },
    { week: "W5", count: 32 },
    { week: "W6", count: 42 },
  ],
  sourceMix: [
    { name: "Portal", percentage: 54 },
    { name: "Referral", percentage: 26 },
    { name: "Ads", percentage: 20 },
  ],
  funnelDropoff: "Screen 43% → Interview 44%",
  timeToFirstResponse: "1.4 days",
};

export const MOCK_RECRUITER_CAMPAIGNS: CampaignPerformance[] = [
  {
    id: "r-camp-1",
    name: "Laravel Dev Boost",
    spend: 24000,
    costPerApplicant: 1143,
  },
  {
    id: "r-camp-2",
    name: "DevOps Hiring Push",
    spend: 12500,
    costPerApplicant: 1389,
  },
];

export const MOCK_RECRUITER_INTERVIEWS: Interview[] = [
  {
    id: "r-int-1",
    jobId: "rec-job-1",
    jobTitle: "Senior Laravel Developer",
    candidateName: "Sujata K.",
    companyName: "JPS Employer",
    type: "Technical",
    dateText: "Aug 6, 10:00 AM",
    meetLink: "#",
  },
  {
    id: "r-int-2",
    jobId: "rec-job-3",
    jobTitle: "QA Engineer",
    candidateName: "Roshan G.",
    companyName: "JPS Employer",
    type: "HR",
    dateText: "Aug 6, 3:00 PM",
    meetLink: "#",
  },
  {
    id: "r-int-3",
    jobId: "rec-job-2",
    jobTitle: "DevOps Engineer",
    candidateName: "Arjun S.",
    companyName: "JPS Employer",
    type: "System Design",
    dateText: "Aug 7, 11:00 AM",
    meetLink: "#",
  },
];

export const MOCK_TEAM_MEMBERS: TeamMember[] = [
  { id: "tm-1", name: "Tarun S.", role: "admin", email: "tarun@jps.io" },
  { id: "tm-2", name: "Bikash R.", role: "recruiter", email: "bikash@jps.io" },
  { id: "tm-3", name: "Nisha P.", role: "interviewer", email: "nisha@jps.io" },
];

export const MOCK_TASKS_AND_APPROVALS = [
  { id: "task-1", label: "Approve offer — Bimal T.", dueDate: "Today", completed: false },
  { id: "task-2", label: "Review 12 new applicants", dueDate: "Aug 8", completed: false },
  { id: "task-3", label: "Renew QA Engineer posting", dueDate: "Aug 9", completed: false },
];
