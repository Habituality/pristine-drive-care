import { useEffect, useState, useCallback } from "react";
import { fetchBookings, deleteBooking, bookingsToCSV, AdminBooking } from "@/lib/admin";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { sv } from "date-fns/locale";
import { toast } from "sonner";
import { Trash2, Download, ChevronLeft, ChevronRight, Search } from "lucide-react";

const LIMIT = 20;

const SERVICE_LABELS: Record<string, string> = {
  "ext-int": "Ext + Int",
  "exterior-only": "Exteriör",
  "interior-only": "Interiör",
};

const SIZE_LABELS: Record<string, string> = {
  small: "Liten",
  medium: "Medel",
  xl: "XL/SUV",
};

export default function AdminBookings() {
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "standard" | "premium">("all");
  const [deleteTarget, setDeleteTarget] = useState<AdminBooking | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { data, count: total } = await fetchBookings({
        startDate: dateFilter || undefined,
        endDate: dateFilter || undefined,
        limit: LIMIT,
        offset: page * LIMIT,
      });
      setBookings(data);
      setCount(total);
    } catch {
      toast.error("Kunde inte hämta bokningar");
    } finally {
      setLoading(false);
    }
  }, [page, dateFilter]);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = bookings.filter((b) => {
    if (typeFilter === "premium" && !b.is_premium) return false;
    if (typeFilter === "standard" && b.is_premium) return false;
    if (search) {
      const s = search.toLowerCase();
      if (
        !b.name.toLowerCase().includes(s) &&
        !b.email.toLowerCase().includes(s) &&
        !b.phone.includes(s)
      )
        return false;
    }
    return true;
  });

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteBooking(deleteTarget.id);
      toast.success("Bokning raderad");
      setDeleteTarget(null);
      load();
    } catch {
      toast.error("Kunde inte radera bokning");
    } finally {
      setDeleting(false);
    }
  };

  const handleExport = async () => {
    try {
      const { data } = await fetchBookings({ limit: 10000 });
      const csv = bookingsToCSV(data);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `bokningar-${format(new Date(), "yyyy-MM-dd")}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Exporterat till CSV");
    } catch {
      toast.error("Export misslyckades");
    }
  };

  const totalPages = Math.ceil(count / LIMIT);

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="border border-border bg-card p-4">
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              placeholder="Namn, e-post eller telefon..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-border bg-secondary pl-9 pr-4 py-2 font-body text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
            />
          </div>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => { setDateFilter(e.target.value); setPage(0); }}
            className="border border-border bg-secondary px-4 py-2 font-body text-sm text-muted-foreground focus:border-primary focus:outline-none transition-colors"
          />
          <div className="flex border border-border bg-secondary">
            {(["all", "standard", "premium"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={cn(
                  "flex-1 py-2 font-body text-sm capitalize transition-colors",
                  typeFilter === t
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t === "all" ? "Alla" : t === "standard" ? "Standard" : "Premium"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Header row */}
      <div className="flex items-center justify-between">
        <p className="font-body text-sm text-muted-foreground">
          {count} bokningar totalt
        </p>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 border border-border bg-card px-4 py-2 font-body text-sm text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
        >
          <Download className="h-4 w-4" />
          Exportera CSV
        </button>
      </div>

      {/* Table */}
      <div className="border border-border bg-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              {["Namn", "Telefon", "Datum", "Tid", "Tjänst", "Typ", "Bilstorlek", "Pris", ""].map((h) => (
                <th key={h} className="px-4 py-3 text-left font-body text-xs tracking-[0.1em] uppercase text-muted-foreground whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-b border-border">
                  {Array.from({ length: 9 }).map((_, j) => (
                    <td key={j} className="px-4 py-3">
                      <div className="h-4 rounded bg-muted animate-pulse" />
                    </td>
                  ))}
                </tr>
              ))
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-4 py-10 text-center font-body text-sm text-muted-foreground">
                  Inga bokningar hittades
                </td>
              </tr>
            ) : (
              filtered.map((b) => (
                <tr key={b.id} className="border-b border-border hover:bg-secondary/30 transition-colors">
                  <td className="px-4 py-3 font-medium whitespace-nowrap">{b.name}</td>
                  <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{b.phone}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {format(new Date(b.date), "d MMM yyyy", { locale: sv })}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{b.time}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {SERVICE_LABELS[b.service_area] ?? b.service_area}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        "px-2 py-0.5 font-body text-xs tracking-wide uppercase",
                        b.is_premium
                          ? "bg-primary/15 text-primary border border-primary/30"
                          : "bg-secondary text-muted-foreground border border-border"
                      )}
                    >
                      {b.is_premium ? "Premium" : "Standard"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                    {SIZE_LABELS[b.car_size] ?? b.car_size}
                  </td>
                  <td className="px-4 py-3 font-medium text-primary whitespace-nowrap">
                    {b.price.toLocaleString("sv-SE")} kr
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setDeleteTarget(b)}
                      className="text-muted-foreground hover:text-destructive transition-colors p-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="flex items-center gap-1 border border-border px-3 py-2 font-body text-sm text-muted-foreground hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="h-4 w-4" /> Föregående
          </button>
          <span className="font-body text-sm text-muted-foreground">
            {page + 1} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            className="flex items-center gap-1 border border-border px-3 py-2 font-body text-sm text-muted-foreground hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Nästa <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Delete confirm */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-sm border border-border bg-card p-6">
            <h2 className="font-display text-lg font-bold mb-2">Radera bokning?</h2>
            <p className="font-body text-sm text-muted-foreground mb-1">
              <strong className="text-foreground">{deleteTarget.name}</strong> —{" "}
              {format(new Date(deleteTarget.date), "d MMM yyyy", { locale: sv })} kl {deleteTarget.time}
            </p>
            <p className="font-body text-sm text-muted-foreground mb-6">
              Åtgärden kan inte ångras.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 border border-border py-2.5 font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Avbryt
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 bg-destructive py-2.5 font-body text-sm font-semibold text-white hover:bg-destructive/90 disabled:opacity-60 transition-colors"
              >
                {deleting ? "Raderar..." : "Radera"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}