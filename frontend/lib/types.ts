/**
 * JPS Shared TypeScript Schema Types & Entity Interfaces
 * Mirrors Prisma schema models and frontend view data objects.
 */

export interface User {
  id: string;
  email: string;
  mobile?: string | null;
  role: "admin" | "candidate" | "recruiter";
  status: "active" | "suspended" | "restricted";
  emailVerified: boolean;
  createdAt: string;
  lastLoginAt?: string | null;
}

export interface UserProfile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  headline?: string | null;
  summary?: string | null;
  totalExperienceMonths?: number | null;
  currentCtc?: number | null;
  expectedCtc?: number | null;
  openToWork: boolean;
  skills?: string[];
  completenessPercent: number;
}

export interface Company {
  id: string;
  legalName: string;
  displayName: string;
  slug: string;
  companyType?: string | null;
  foundedYear?: number | null;
  verificationStatus: "pending" | "verified" | "rejected";
  isActive: boolean;
  openJobsCount: number;
  applicantsCount: number;
  rating: number;
  plan: "free" | "basic" | "pro" | "enterprise";
}

export interface Job {
  id: string;
  companyId: string;
  companyName: string;
  title: string;
  designation?: string;
  department: string;
  employmentType: string;
  workMode: "Remote" | "Hybrid" | "On-site";
  seniorityLevel?: string;
  location: string;
  minExperienceMonths?: number | null;
  maxExperienceMonths?: number | null;
  minSalary?: number | null;
  maxSalary?: number | null;
  salaryCurrency?: string;
  showSalary?: boolean;
  salaryText?: string;
  applicantsCount: number;
  viewsCount: number;
  postedDate: string;
  expiresInDays?: number | null;
  status: "live" | "draft" | "expiring" | "closed";
  description?: string;
  skills?: string[];
  responsibilities?: string[];
  qualifications?: string[];
  benefits?: string[];
  tags?: string[];
  locations?: string[];
  media?: string[];
}

export interface JobApplication {
  id: string;
  sn: number;
  jobId: string;
  jobTitle: string;
  companyName: string;
  candidateName: string;
  candidateEmail?: string;
  appliedDate: string;
  location: string;
  salaryText: string;
  experienceYears?: number;
  screeningScore?: number;
  status: "applied" | "screening" | "interview" | "offer" | "rejected" | "not selected" | "hired";
  statusCustomPill?: string;
  resumeUrl?: string;
  job?: Job;
}

export interface ModerationItem {
  id: string;
  type: "Job" | "Company" | "User" | "Review";
  item: string;
  submittedBy: string;
  age: string;
  status: "pending" | "flagged" | "spam risk";
  details?: string;
}

export interface AuditLog {
  id: string;
  time: string;
  actor: string;
  action: string;
  entityType: string;
  entityId: string;
}

export interface Interview {
  id: string;
  jobId?: string;
  companyName: string;
  candidateName: string;
  jobTitle: string;
  type: string;
  dateText: string;
  locationOrUrl?: string;
  meetLink?: string;
  panelCount?: number;
}

export interface CampaignPerformance {
  id: string;
  name: string;
  spend: number;
  costPerApplicant: number;
  status?: string;
}

export interface SkillGap {
  skill: string;
  status: "have" | "missing";
}

export interface AppNotification {
  id: string;
  type: "mail" | "view" | "alert" | "system";
  message: string;
  timeAgo: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: "admin" | "recruiter" | "interviewer";
  avatar?: string;
  email?: string;
}

// Generic Table Column Definition
export interface ColumnDef<T> {
  key: string;
  header: string;
  align?: "left" | "center" | "right";
  width?: string;
  render?: (row: T, index: number) => React.ReactNode;
}

// Generic Filter Definition
export interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

// Pagination Interface
export interface PaginationState {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
}

export interface ApplicationTimelineStep {
  stage: "applied" | "screening" | "interview" | "offer" | "hired" | "rejected";
  label: string;
  date?: string;
  note?: string;
  active: boolean;
  completed: boolean;
}

export interface InterviewDetail {
  id: string;
  applicationId: string;
  companyName: string;
  jobTitle: string;
  round: string;
  date: string;
  time: string;
  meetLink?: string;
  interviewerName?: string;
  interviewerRole?: string;
  prepNotes?: string;
  reminderSet: boolean;
  status: "upcoming" | "completed" | "cancelled";
}

export interface JobMatchDetail {
  jobId: string;
  jobTitle: string;
  companyName: string;
  overallMatch: number;
  matchedSkills: string[];
  missingSkills: string[];
  salaryMatch: { candidate: number; jobMin: number; jobMax: number; match: boolean };
  locationMatch: boolean;
  experienceMatch: boolean;
  experienceNote: string;
}

export interface SkillSuggestion {
  skill: string;
  reason: string;
  priority: "high" | "medium" | "low";
  learnUrl?: string;
}

export interface ResumeVersion {
  id: string;
  label: string;
  fileName: string;
  targetRole: string;
  uploadedDate: string;
  isDefault: boolean;
  size: string;
}

export interface CoverLetter {
  id: string;
  jobTitle: string;
  companyName: string;
  createdDate: string;
  content: string;
  applicationId?: string;
}

export interface SavedJobCollection {
  id: string;
  name: string;
  icon: string;
  color: string;
  jobs: Array<{ id: string; title: string; company: string; location: string; salaryText: string; expiresIn?: string }>;
}

export interface ApplicationNote {
  applicationId: string;
  recruiterName?: string;
  interviewFeedback?: string;
  followUpDate?: string;
  salaryDiscussion?: string;
  privateNotes?: string;
  lastUpdated: string;
}

export interface FollowUpReminder {
  applicationId: string;
  jobTitle: string;
  companyName: string;
  appliedDate: string;
  daysSince: number;
  status: string;
  suggestedAction: string;
}

export interface ProfileViewStat {
  week: string;
  views: number;
}

export interface ProfileAnalytics {
  totalViews: number;
  viewsThisWeek: number;
  searchAppearances: number;
  profileStrength: number;
  topSkillsFound: string[];
  recentViewers: Array<{ company: string; role: string; timeAgo: string }>;
  weeklyViews: ProfileViewStat[];
}

export interface QuickApplyJob {
  id: string;
  title: string;
  company: string;
  location: string;
  workMode: "Remote" | "Hybrid" | "On-site";
  salaryText: string;
  matchPercentage: number;
  tags: string[];
  postedAgo: string;
}

export interface Message {
  id: string;
  senderId: string; // "recruiter" | candidate id
  senderName: string;
  text: string;
  timestamp: string;
  isRead: boolean;
}

export interface MessageThread {
  id: string;
  candidateName: string;
  candidateInitials: string;
  jobTitle: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: Message[];
  isArchived: boolean;
}
