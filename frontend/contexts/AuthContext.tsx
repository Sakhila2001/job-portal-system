"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

interface AuthUser {
  id: string;
  email: string;
  role: "admin" | "candidate" | "recruiter";
}

interface AuthTokens {
  accessToken: string | null;
  refreshToken: string | null;
}

interface AuthContextType {
  user: AuthUser | null;
  tokens: AuthTokens;
  isAuthenticated: boolean;
  loaded: boolean;
  login: (email: string, password: string, role?: string) => Promise<{ user: AuthUser; accessToken: string }>;
  logout: () => Promise<void>;
  refreshAccessToken: () => Promise<string | null>;
  clearTokens: () => void;
}

const STORAGE_KEY_ACCESS = "jps_access_token";
const STORAGE_KEY_REFRESH = "jps_refresh_token";
const STORAGE_KEY_USER = "jps_user";

const AuthContext = createContext<AuthContextType | null>(null);

function loadStoredTokens(): AuthTokens {
  return {
    accessToken: typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY_ACCESS) : null,
    refreshToken: typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY_REFRESH) : null,
  };
}

function loadStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(STORAGE_KEY_USER);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

function storeTokens(accessToken: string, refreshToken: string) {
  localStorage.setItem(STORAGE_KEY_ACCESS, accessToken);
  localStorage.setItem(STORAGE_KEY_REFRESH, refreshToken);
}

function storeUser(user: AuthUser) {
  localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
}

function clearStoredAuth() {
  localStorage.removeItem(STORAGE_KEY_ACCESS);
  localStorage.removeItem(STORAGE_KEY_REFRESH);
  localStorage.removeItem(STORAGE_KEY_USER);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [tokens, setTokens] = useState<AuthTokens>({ accessToken: null, refreshToken: null });
  const [loaded, setLoaded] = useState(false);

  const isAuthenticated = loaded && !!user && !!tokens.accessToken;

  const clearTokens = useCallback(() => {
    setUser(null);
    setTokens({ accessToken: null, refreshToken: null });
    clearStoredAuth();
  }, []);

  const refreshAccessToken = useCallback(async (): Promise<string | null> => {
    try {
      const response = await fetch("/api/auth/refresh", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        clearTokens();
        return null;
      }

      const data = await response.json();
      const newAccessToken = data.accessToken as string;
      setTokens((prev) => ({ ...prev, accessToken: newAccessToken }));
      localStorage.setItem(STORAGE_KEY_ACCESS, newAccessToken);
      return newAccessToken;
    } catch {
      return null;
    }
  }, [clearTokens]);

  const login = useCallback(
    async (email: string, password: string, role?: string): Promise<{ user: AuthUser; accessToken: string }> => {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Login failed.");
      }

      const data = await response.json();
      const { user: userData, accessToken } = data as {
        user: AuthUser;
        accessToken: string;
      };

      setUser(userData);
      setTokens({ accessToken, refreshToken: null });
      localStorage.setItem(STORAGE_KEY_ACCESS, accessToken);
      storeUser(userData);

      return { user: userData, accessToken };
    },
    []
  );

  const logout = useCallback(async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch {
      // Ignore network errors during logout
    }
    clearTokens();
  }, [clearTokens]);

  useEffect(() => {
    const stored = loadStoredUser();
    const storedTokens = loadStoredTokens();
    if (stored && storedTokens.accessToken) {
      setUser(stored);
      setTokens(storedTokens);
    }
    setLoaded(true);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        tokens,
        isAuthenticated,
        loaded,
        login,
        logout,
        refreshAccessToken,
        clearTokens,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { AuthContext };