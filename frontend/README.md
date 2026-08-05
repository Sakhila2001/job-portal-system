# JPS — Job Portal System

A multi-tenant, role-based job portal with three distinct dashboards: **Admin**, **Candidate**, and **Recruiter/Employer**. Built with Next.js 14 App Router, TypeScript (strict), Tailwind CSS, shadcn/ui primitives, Recharts, and Framer Motion.

---

## Quick Start

```bash
cd frontend
pnpm install        # or npm install
pnpm dev            # starts at http://localhost:3000
```

---

## Dashboard Routes

| Role       | Route                  | Description                            |
|------------|------------------------|----------------------------------------|
| Admin      | `/admin`               | Platform overview, moderation, KPIs    |
| Candidate  | `/dashboard`           | Applications pipeline, job discovery   |
| Recruiter  | `/employer`            | Job postings, applicant pipeline, team |

---

## Folder Architecture

```
frontend/
├── app/
│   ├── (admin)/admin/          # Admin dashboard route + loading skeleton
│   ├── (candidate)/dashboard/  # Candidate dashboard route + loading skeleton
│   └── (recruiter)/employer/   # Recruiter dashboard route + loading skeleton
│
├── components/
│   ├── layout/
│   │   ├── DashboardShell.tsx  # Sidebar + Topbar wrapper — all dashboards share this
│   │   ├── Sidebar.tsx         # Collapsible nav with badge counters
│   │   └── Topbar.tsx          # Search, date range, notifications, user avatar
│   │
│   ├── shared/                 # Generic, role-agnostic building blocks
│   │   ├── KpiCard.tsx         # Animated metric card with trend delta
│   │   ├── StatusBadge.tsx     # Pill badge driven by status-colors.ts config
│   │   ├── DataTable.tsx       # Generic table with checkboxes, bulk actions, pagination
│   │   ├── FilterBar.tsx       # Search + dropdown filter strips
│   │   ├── Pagination.tsx      # Page-navigation footer
│   │   ├── EmptyState.tsx      # Zero-data placeholder with icon + CTA
│   │   ├── ChartCard.tsx       # Recharts BarChart wrapper
│   │   ├── DetailPanel.tsx     # Framer Motion slide-over inspector panel
│   │   └── NotificationList.tsx # Timestamped notification feed
│   │
│   ├── admin/
│   │   ├── ModerationQueueTable.tsx
│   │   ├── TopCompaniesTable.tsx
│   │   ├── PlanBreakdownPanel.tsx
│   │   └── AuditActivityFeed.tsx
│   │
│   ├── candidate/
│   │   ├── ProfileSummaryCard.tsx
│   │   ├── ApplicationPipelineTable.tsx
│   │   ├── RecommendedJobsPanel.tsx
│   │   └── SkillGapPanel.tsx
│   │
│   └── recruiter/
│       ├── JobPostingsTable.tsx
│       ├── ApplicantPipelineBoard.tsx
│       ├── CampaignPerformancePanel.tsx
│       └── TeamPanel.tsx
│
├── hooks/
│   ├── useAdminOverview.ts      # All admin state, filtering, actions
│   ├── useCandidateOverview.ts  # All candidate state, filtering, pagination
│   └── useRecruiterOverview.ts  # All recruiter state, filtering, bulk selection
│
└── lib/
    ├── design-tokens.ts         # Color palette, radii, shadow tokens
    ├── status-colors.ts         # StatusBadge config — maps status → pill styles
    ├── types.ts                 # All entity interfaces (User, Job, Application, etc.)
    └── mock-data/
        ├── admin.ts             # Admin wireframe mock dataset
        ├── candidate.ts         # Candidate wireframe mock dataset
        └── recruiter.ts         # Recruiter wireframe mock dataset
```

---

## Design System

### Color Palette

| Token           | Value       | Usage                        |
|-----------------|-------------|------------------------------|
| Background      | `#FAFAF9`   | Off-white app base           |
| Surface         | `#FFFFFF`   | Cards, panels                |
| Primary Blue    | `#2563EB`   | CTA buttons, links           |
| Border Hairline | `#E7E5E4`   | `border-stone-200`           |
| Text Primary    | `#1C1917`   | `text-stone-900`             |
| Text Muted      | `#78716C`   | `text-stone-500`             |

All design tokens are in [`lib/design-tokens.ts`](./lib/design-tokens.ts).

### Status Badges

Status pill styles are **data-driven** from a single config object:

```ts
// lib/status-colors.ts
getStatusConfig("live")    // → emerald pill
getStatusConfig("pending") // → amber pill
getStatusConfig("flagged") // → rose pill
```

To add a new status, add one entry to `STATUS_CONFIG` in `status-colors.ts`. No other changes needed.

### Typography

- Font: `Inter` (Google Fonts) via `globals.css`
- Numeric metrics: `font-mono font-semibold tabular-nums` class combination
- Consistent spacing: 8px grid, `rounded-xl` (12px) on cards, `rounded-lg` (8px) on inputs

---

## Swapping Mock Data for Real API Endpoints

All page data flows through one of three **overview hooks**:

```
useAdminOverview()      → app/(admin)/admin/page.tsx
useCandidateOverview()  → app/(candidate)/dashboard/page.tsx
useRecruiterOverview()  → app/(recruiter)/employer/page.tsx
```

Each hook currently imports from `lib/mock-data/`. To connect a real API:

1. **Replace the import** at the top of the hook with a `useSWR` or `useQuery` call:

```ts
// Before (mock)
import { MOCK_RECRUITER_KPIS } from "@/lib/mock-data/recruiter";

// After (real API with SWR)
import useSWR from "swr";
const { data: kpis } = useSWR<KpiItem[]>("/api/recruiter/kpis", fetcher);
```

2. The **hook's returned shape stays the same** — page components do not need to change.

3. Set `isLoading: true` during the fetch; `DataTable` and `KpiCard` automatically show skeleton states.

---

## Key Patterns

### Thin Page Files

Page files are composition-only (~40–60 lines of JSX). No business logic, no local state beyond what's destructured from hooks.

```tsx
// app/(admin)/admin/page.tsx
const { kpis, moderationQueue, ... } = useAdminOverview();
return (
  <DashboardShell ...>
    <KpiCard ... />
    <ModerationQueueTable ... />
  </DashboardShell>
);
```

### Generic DataTable

`DataTable<T>` is fully generic and handles:
- Row checkbox selection → `selectedIds` array
- Floating bulk action bar (appears when `selectedIds.length > 0`)
- `onRowClick` → opens slide-over `DetailPanel`
- Skeleton loading rows (via `isLoading` prop)
- `EmptyState` rendering when `data.length === 0`
- Footer `Pagination` component

### Slide-Over DetailPanel

`DetailPanel` accepts arbitrary `children` content, so each dashboard passes its own detail JSX. The panel uses Framer Motion `AnimatePresence` + `x: "100%"` → `x: 0` for a native slide-over feel.

---

## Adding a New Dashboard Section

1. Add mock data to the relevant `lib/mock-data/*.ts` file.
2. Export it from the relevant `hooks/use*Overview.ts` hook.
3. Create a component in `components/<role>/`.
4. Import and place it in the page file — no other files need changes.

---

## License

MIT
