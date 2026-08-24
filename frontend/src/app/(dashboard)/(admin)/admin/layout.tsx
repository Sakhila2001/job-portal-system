import type { ReactNode } from "react";
import ProtectedRoute from "@/features/auth/components/ProtectedRoute";

export default function AdminDashboardLayout({ children }: { children: ReactNode }) {
  return <ProtectedRoute allowedRoles={["admin"]}>{children}</ProtectedRoute>;
}
