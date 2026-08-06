import type { ReactNode } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function CandidateDashboardLayout({ children }: { children: ReactNode }) {
  return <ProtectedRoute allowedRoles={["candidate"]}>{children}</ProtectedRoute>;
}
