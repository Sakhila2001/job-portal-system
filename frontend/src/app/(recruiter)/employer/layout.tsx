import type { ReactNode } from "react";
import ProtectedRoute from "@/features/auth/components/ProtectedRoute";

export default function EmployerDashboardLayout({ children }: { children: ReactNode }) {
  return <ProtectedRoute allowedRoles={["employer", "recruiter"]}>{children}</ProtectedRoute>;
}
