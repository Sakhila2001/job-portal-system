"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/context";

const LOGIN_TARGET = "/?login=true";
const CLOCK_SKEW_MS = 30_000;

function decodeTokenExp(token: string | null): number | null {
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
    return typeof payload.exp === "number" ? payload.exp : null;
  } catch {
    return null;
  }
}

function isTokenExpired(token: string | null): boolean {
  const exp = decodeTokenExp(token);
  if (exp === null) return true;
  return Date.now() >= exp * 1000 - CLOCK_SKEW_MS;
}

function dashboardForRole(role: string): string {
  switch (role) {
    case "admin":
      return "/admin";
    case "candidate":
      return "/dashboard";
    case "employer":
    case "recruiter":
      return "/employer";
    default:
      return "/";
  }
}

export default function ProtectedRoute({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles?: string[];
}) {
  const { user, isAuthenticated, tokens, loaded, clearTokens } = useAuth();
  const router = useRouter();

  const hasToken = !!tokens.accessToken;
  const tokenValid = hasToken && !isTokenExpired(tokens.accessToken);
  const roleOk = !allowedRoles || !user || allowedRoles.includes(user.role);
  const canRender = loaded && isAuthenticated && tokenValid && roleOk;

  useEffect(() => {
    if (!loaded) return;

    if (!isAuthenticated || !hasToken) {
      clearTokens();
      router.replace(LOGIN_TARGET);
      return;
    }
    if (!tokenValid) {
      clearTokens();
      router.replace(LOGIN_TARGET);
      return;
    }
    if (!roleOk) {
      router.replace(dashboardForRole(user?.role ?? ""));
    }
  }, [
    loaded,
    isAuthenticated,
    hasToken,
    tokenValid,
    roleOk,
    user,
    allowedRoles,
    clearTokens,
    router,
  ]);

  if (!canRender) {
    return (
      <div className="flex h-[60vh] w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-slate-900" />
      </div>
    );
  }

  return <>{children}</>;
}
