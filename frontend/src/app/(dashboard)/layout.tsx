import type { ReactNode } from "react";

// Passthrough layout — each role sub-group has its own auth-protected layout.
export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
