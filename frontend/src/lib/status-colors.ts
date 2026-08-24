/**
 * Single source of truth for Status Badges across Admin, Candidate, and Recruiter dashboards.
 * Maps status keys (case-insensitive) to 10% opacity backgrounds with dark text and hairline border.
 */

export interface StatusConfig {
  label: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
  dotClass?: string;
}

const STATUS_MAP: Record<string, StatusConfig> = {
  // Active / Success / Live
  active: { label: "Active", bgClass: "bg-emerald-50", textClass: "text-emerald-700", borderClass: "border-emerald-200", dotClass: "bg-emerald-500" },
  live: { label: "Live", bgClass: "bg-emerald-50", textClass: "text-emerald-700", borderClass: "border-emerald-200", dotClass: "bg-emerald-500" },
  hired: { label: "Hired", bgClass: "bg-emerald-50", textClass: "text-emerald-700", borderClass: "border-emerald-200" },
  verified: { label: "Verified", bgClass: "bg-emerald-50", textClass: "text-emerald-700", borderClass: "border-emerald-200" },
  have: { label: "Have", bgClass: "bg-emerald-50", textClass: "text-emerald-700", borderClass: "border-emerald-200" },
  
  // Pending / Warning / Screening / Expiring
  pending: { label: "Pending", bgClass: "bg-amber-50", textClass: "text-amber-700", borderClass: "border-amber-200", dotClass: "bg-amber-500" },
  expiring: { label: "Expiring", bgClass: "bg-amber-50", textClass: "text-amber-700", borderClass: "border-amber-200", dotClass: "bg-amber-500" },
  screening: { label: "Screening", bgClass: "bg-amber-50", textClass: "text-amber-800", borderClass: "border-amber-200" },
  applied: { label: "Applied", bgClass: "bg-stone-100", textClass: "text-stone-700", borderClass: "border-stone-200" },

  // Danger / Flagged / Spam / Rejected / Missing
  flagged: { label: "Flagged", bgClass: "bg-rose-50", textClass: "text-rose-700", borderClass: "border-rose-200", dotClass: "bg-rose-500" },
  "spam risk": { label: "Spam Risk", bgClass: "bg-rose-50", textClass: "text-rose-700", borderClass: "border-rose-200", dotClass: "bg-rose-500" },
  rejected: { label: "Rejected", bgClass: "bg-rose-50", textClass: "text-rose-700", borderClass: "border-rose-200" },
  "not selected": { label: "Not Selected", bgClass: "bg-rose-50", textClass: "text-rose-700", borderClass: "border-rose-200" },
  suspended: { label: "Suspended", bgClass: "bg-rose-50", textClass: "text-rose-700", borderClass: "border-rose-200" },
  restricted: { label: "Restricted", bgClass: "bg-rose-50", textClass: "text-rose-700", borderClass: "border-rose-200" },
  missing: { label: "Missing", bgClass: "bg-rose-50", textClass: "text-rose-700", borderClass: "border-rose-200" },

  // Interview / Info / Blue / Purple
  interview: { label: "Interview", bgClass: "bg-blue-50", textClass: "text-blue-700", borderClass: "border-blue-200", dotClass: "bg-blue-500" },
  "interview scheduled": { label: "Interview Scheduled", bgClass: "bg-blue-50", textClass: "text-blue-700", borderClass: "border-blue-200" },
  offer: { label: "Offer", bgClass: "bg-violet-50", textClass: "text-violet-700", borderClass: "border-violet-200" },
  
  // Plans
  enterprise: { label: "Enterprise", bgClass: "bg-violet-50", textClass: "text-violet-700", borderClass: "border-violet-200" },
  pro: { label: "Pro", bgClass: "bg-blue-50", textClass: "text-blue-700", borderClass: "border-blue-200" },
  basic: { label: "Basic", bgClass: "bg-stone-100", textClass: "text-stone-700", borderClass: "border-stone-200" },
  free: { label: "Free", bgClass: "bg-stone-100", textClass: "text-stone-600", borderClass: "border-stone-200" },
  
  // Draft / Neutral
  draft: { label: "Draft", bgClass: "bg-stone-100", textClass: "text-stone-600", borderClass: "border-stone-200" },
  closed: { label: "Closed", bgClass: "bg-stone-100", textClass: "text-stone-600", borderClass: "border-stone-200" },
  archived: { label: "Archived", bgClass: "bg-stone-100", textClass: "text-stone-600", borderClass: "border-stone-200" },
};

export function getStatusConfig(status: string): StatusConfig {
  const normalized = status.trim().toLowerCase();
  
  // Custom interview handling like "Interview Aug 8"
  if (normalized.startsWith("interview")) {
    return {
      label: status,
      bgClass: "bg-emerald-50",
      textClass: "text-emerald-700",
      borderClass: "border-emerald-300",
    };
  }

  return (
    STATUS_MAP[normalized] || {
      label: status,
      bgClass: "bg-stone-100",
      textClass: "text-stone-700",
      borderClass: "border-stone-200",
    }
  );
}
