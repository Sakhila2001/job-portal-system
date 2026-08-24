/**
 * JPS Design System Tokens
 * Strict color, spacing, radius, and typography constants matching the JPS Slate landing theme.
 */

export const DESIGN_TOKENS = {
  colors: {
    bgApp: "#F8FAFC", // slate-50 base
    bgSurface: "#FFFFFF",
    bgMuted: "#F1F5F9", // slate-100
    borderHairline: "#E2E8F0", // slate-200
    borderStrong: "#CBD5E1", // slate-300
    
    // Primary Accent (Deep Dark Slate / Black matching landing CTAs)
    primary: "#0F172A", // slate-900
    primaryHover: "#1E293B", // slate-800
    primaryLight: "#F8FAFC", // slate-50
    primaryBorder: "#CBD5E1", // slate-300

    // Text hierarchy
    textHeading: "#0F172A", // slate-900
    textBody: "#334155", // slate-700
    textMuted: "#64748B", // slate-500
    textSubtle: "#94A3B8", // slate-400

    // Status colors
    status: {
      success: { bg: "#F0FDF4", text: "#166534", border: "#BBF7D0" }, // emerald
      warning: { bg: "#FFFBEB", text: "#92400E", border: "#FDE68A" }, // amber
      danger: { bg: "#FEF2F2", text: "#991B1B", border: "#FECACA" }, // red
      info: { bg: "#F5F3FF", text: "#5B21B6", border: "#DDD6FE" }, // violet
      blue: { bg: "#F0F9FF", text: "#0369A1", border: "#BAE6FD" }, // sky/blue
      neutral: { bg: "#F1F5F9", text: "#475569", border: "#E2E8F0" }, // slate
    },
  },
  radius: {
    input: "8px",
    button: "8px",
    card: "12px",
    pill: "9999px",
  },
  typography: {
    fontFamily: "Inter, var(--font-sans), sans-serif",
    pageTitle: "text-[24px] font-semibold tracking-tight leading-8 text-slate-900",
    sectionTitle: "text-[16px] font-medium leading-6 text-slate-900",
    body: "text-[14px] leading-5 text-slate-700",
    caption: "text-[12px] leading-4 text-slate-500",
  },
} as const;
