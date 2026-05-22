import { Outlet, Link, useLocation } from "react-router-dom";
import { useAdminAuth } from "@/lib/adminAuth";
import { cn } from "@/lib/utils";
import { BarChart3, BookOpen, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Översikt", href: "/admin/dashboard", icon: BarChart3 },
  { label: "Bokningar", href: "/admin/bookings", icon: BookOpen },
];

export default function AdminLayout() {
  const { logout } = useAdminAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (href: string) => location.pathname === href;
  const currentPage = navItems.find((item) => isActive(item.href))?.label ?? "Admin";

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-card transition-transform duration-200 lg:relative lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <div>
            <p className="font-display text-xl font-bold text-gold-gradient">Glanzio</p>
            <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground">
              Admin
            </p>
          </div>
          <button
            className="text-muted-foreground hover:text-foreground lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 font-body text-sm tracking-wide transition-colors",
                  isActive(item.href)
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="border-t border-border px-3 py-4">
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 px-3 py-2.5 font-body text-sm text-muted-foreground hover:text-destructive transition-colors"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            Logga ut
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center gap-4 border-b border-border bg-card px-6 py-4">
          <button
            className="text-muted-foreground hover:text-foreground lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="font-display text-xl font-bold">{currentPage}</h1>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
