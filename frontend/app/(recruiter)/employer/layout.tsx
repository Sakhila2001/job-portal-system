import type { ReactNode } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function EmployerDashboardLayout({ children }: { children: ReactNode }) {
  return <ProtectedRoute allowedRoles={["employer", "recruiter"]}>{children}</ProtectedRoute>;
}
