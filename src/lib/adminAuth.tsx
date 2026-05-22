import React, { createContext, useContext, useState, useEffect } from "react";

const SESSION_KEY = "glanzio_admin_session";
const SESSION_DURATION = 24 * 60 * 60 * 1000;
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD as string;

interface AdminAuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (password: string) => void;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Date.now() < parsed.expiresAt) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem(SESSION_KEY);
        }
      }
    } catch {
      localStorage.removeItem(SESSION_KEY);
    }
    setLoading(false);
  }, []);

  const login = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem(
        SESSION_KEY,
        JSON.stringify({ expiresAt: Date.now() + SESSION_DURATION })
      );
      setIsAuthenticated(true);
      setError(null);
    } else {
      setError("Felaktigt lösenord");
    }
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setIsAuthenticated(false);
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, loading, error, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}