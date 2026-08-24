import { ModerationItem, Company, AuditLog, CampaignPerformance } from "../types";

export const MOCK_ADMIN_KPIS = [
  {
    title: "Active Users",
    value: "18,204",
    trendDelta: "+4.2% wow",
    trendDirection: "up" as const,
    subtitle: "Active platform accounts",
  },
  {
    title: "New Signups Today",
    value: "312",
    trendDelta: "198 candidates, 114 employers",
    trendDirection: "neutral" as const,
    subtitle: "Daily registrations",
  },
  {
    title: "Open Jobs",
    value: "1,392",
    trendDelta: "85 expiring in 3 days",
    trendDirection: "neutral" as const,
    subtitle: "Published job listings",
  },
  {
    title: "MRR",
    value: "Rs 4.12L",
    trendDelta: "+6.8% mom",
    trendDirection: "up" as const,
    subtitle: "Monthly recurring revenue",
  },
  {
    title: "Churn Rate",
    value: "2.1%",
    trendDelta: "+0.3pt mom",
    trendDirection: "down" as const,
    subtitle: "Subscription churn rate",
  },
  {
    title: "Applications Today",
    value: "2,847",
    trendDelta: "avg 2.1 per job",
    trendDirection: "up" as const,
    subtitle: "Daily submitted applications",
  },
];

export const MOCK_SIGNUPS_VS_POSTINGS = [
  { week: "W1", signups: 245, postings: 120 },
  { week: "W2", signups: 310, postings: 145 },
  { week: "W3", signups: 338, postings: 162 },
  { week: "W4", signups: 370, postings: 180 },
  { week: "W5", signups: 412, postings: 210 },
  { week: "W6", signups: 450, postings: 240 },
];

export const MOCK_MODERATION_QUEUE: ModerationItem[] = [
  {
    id: "mod-1",
    type: "Job",
    item: "Senior React Developer — Remote",
    submittedBy: "Nexoria Tech",
    age: "2h",
    status: "pending",
    details: "High salary listing ($180k). Requires compliance scan verification before going live to public index.",
  },
  {
    id: "mod-2",
    type: "Company",
    item: "Brightpath Consulting profile edit",
    submittedBy: "r.mehta@brightpath.io",
    age: "5h",
    status: "flagged",
    details: "Updated website URL points to unverified external domain. Flagged by automated link checker.",
  },
  {
    id: "mod-3",
    type: "User",
    item: "Bulk applications from one IP",
    submittedBy: "user_44812",
    age: "9h",
    status: "spam risk",
    details: "Submitted 64 applications in 12 minutes from IP 185.220.101.4. High risk of automated bot activity.",
  },
  {
    id: "mod-4",
    type: "Job",
    item: "Data Entry — Rs 90k/month",
    submittedBy: "QuickHire Solutions",
    age: "1d",
    status: "spam risk",
    details: "Unrealistic entry-level compensation with wire transfer contact instructions in job description.",
  },
  {
    id: "mod-5",
    type: "Review",
    item: "1-star review on Ardent Labs",
    submittedBy: "a.fernandes@gmail.com",
    age: "1d",
    status: "pending",
    details: "Reported by company HR as containing defamatory language regarding internal severance agreements.",
  },
];

export const MOCK_TOP_COMPANIES: Company[] = [
  {
    id: "comp-1",
    legalName: "Nexoria Tech Private Limited",
    displayName: "Nexoria Tech",
    slug: "nexoria-tech",
    verificationStatus: "verified",
    isActive: true,
    openJobsCount: 64,
    applicantsCount: 3412,
    rating: 4.6,
    plan: "enterprise",
  },
  {
    id: "comp-2",
    legalName: "Brightpath Consulting Services",
    displayName: "Brightpath Consulting",
    slug: "brightpath-consulting",
    verificationStatus: "verified",
    isActive: true,
    openJobsCount: 38,
    applicantsCount: 1908,
    rating: 4.2,
    plan: "pro",
  },
  {
    id: "comp-3",
    legalName: "Ardent Labs Technologies",
    displayName: "Ardent Labs",
    slug: "ardent-labs",
    verificationStatus: "verified",
    isActive: true,
    openJobsCount: 21,
    applicantsCount: 864,
    rating: 3.9,
    plan: "basic",
  },
];

export const MOCK_PLAN_BREAKDOWN = [
  { name: "Free", count: 12480 },
  { name: "Basic", count: 3120 },
  { name: "Pro", count: 1842 },
  { name: "Enterprise", count: 762 },
];

export const MOCK_ADMIN_CAMPAIGNS: CampaignPerformance[] = [
  {
    id: "camp-1",
    name: "Spring Hiring Push",
    spend: 84000,
    costPerApplicant: 46,
    status: "active",
  },
  {
    id: "camp-2",
    name: "Employer Reactivation",
    spend: 31500,
    costPerApplicant: 112,
    status: "active",
  },
];

export const MOCK_AUDIT_LOGS: AuditLog[] = [
  { id: "audit-1", time: "09:42", actor: "SA", action: "suspended user_44812", entityType: "User", entityId: "user_44812" },
  { id: "audit-2", time: "09:15", actor: "MK", action: "approved 6 job posts", entityType: "Job", entityId: "job-batch-102" },
  { id: "audit-3", time: "08:50", actor: "System", action: "Ardent Labs plan to basic", entityType: "UserSubscription", entityId: "sub-991" },
  { id: "audit-4", time: "08:04", actor: "SA", action: "updated spam filter rules", entityType: "SystemRule", entityId: "rule-spam-04" },
];

export const MOCK_SYSTEM_HEALTH = [
  { metric: "API uptime", value: "99.88%" },
  { metric: "Avg response time", value: "182 ms" },
  { metric: "Failed jobs / email queue", value: "4 / 21" },
];

export const MOCK_PENDING_VERIFICATIONS = [
  { label: "Employer KYC docs", count: 12 },
  { label: "Recruiter licence checks", count: 7 },
  { label: "Payout / refund requests", count: 5 },
];

export const MOCK_HIRING_FUNNEL = [
  { stage: "Views", count: 184320 },
  { stage: "Applications", count: 42180 },
  { stage: "Shortlisted", count: 9640 },
  { stage: "Interviews", count: 3105 },
  { stage: "Hired", count: 812, isHighlighted: true },
];
