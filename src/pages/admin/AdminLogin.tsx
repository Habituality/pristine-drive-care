// src/pages/admin/AdminLogin.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "@/lib/adminAuth";
import { cn } from "@/lib/utils";
import { AlertCircle, LogIn } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { makeCanonical } from "@/config/seo";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const { login, error, isAuthenticated } = useAdminAuth();
  const navigate = useNavigate();

  useSEO({
    title: "Admin | Glanzio Stockholm",
    description: "Adminpanel för Glanzio Stockholm.",
    canonical: makeCanonical("/admin/login"),
    noindex: true,
  });

  if (isAuthenticated) {
    navigate("/admin/dashboard", { replace: true });
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy-gradient px-4">
      <div className="w-full max-w-sm border border-border bg-card p-8">
        <div className="mb-8 text-center">
          <p className="font-display text-3xl font-bold text-gold-gradient">Glanzio</p>
          <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mt-1">
            Adminpanel
          </p>
        </div>

        {error && (
          <div className="mb-4 flex items-center gap-2 border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground mb-1.5 block">
              Lösenord
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoFocus
              className="w-full border border-border bg-secondary px-4 py-3 font-body text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={!password}
            className={cn(
              "w-full flex items-center justify-center gap-2 py-3 font-body text-sm font-semibold tracking-[0.15em] uppercase transition-colors",
              !password
                ? "bg-muted text-muted-foreground cursor-not-allowed"
                : "bg-primary text-primary-foreground hover:bg-gold-light"
            )}
          >
            <LogIn className="h-4 w-4" />
            Logga in
          </button>
        </form>
      </div>
    </div>
  );
}