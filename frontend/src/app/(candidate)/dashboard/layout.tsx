import type { ReactNode } from "react";
import ProtectedRoute from "@/features/auth/components/ProtectedRoute";

export default function CandidateDashboardLayout({ children }: { children: ReactNode }) {
  return <ProtectedRoute allowedRoles={["candidate"]}>{children}</ProtectedRoute>;
}
