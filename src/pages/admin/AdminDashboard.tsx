import { useEffect, useState } from "react";
import { useSEO } from "@/hooks/useSEO";
import { fetchStats, BookingStats } from "@/lib/admin";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { BookOpen, DollarSign, TrendingUp, Star } from "lucide-react";
import { startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, format } from "date-fns";

type Range = "day" | "week" | "month";

const CHART_COLORS = ["hsl(43 55% 54%)", "hsl(220 25% 16%)", "hsl(220 10% 30%)"];

const SERVICE_LABELS: Record<string, string> = {
  "ext-int": "Ext + Int",
  "exterior-only": "Exteriör",
  "interior-only": "Interiör",
};

function getRangeDates(range: Range): { start: string; end: string } {
  const now = new Date();
  switch (range) {
    case "day":
      return {
        start: format(startOfDay(now), "yyyy-MM-dd"),
        end: format(endOfDay(now), "yyyy-MM-dd"),
      };
    case "week":
      return {
        start: format(startOfWeek(now, { weekStartsOn: 1 }), "yyyy-MM-dd"),
        end: format(endOfWeek(now, { weekStartsOn: 1 }), "yyyy-MM-dd"),
      };
    case "month":
    default:
      return {
        start: format(startOfMonth(now), "yyyy-MM-dd"),
        end: format(endOfMonth(now), "yyyy-MM-dd"),
      };
  }
}

export default function AdminDashboard() {
  useSEO({
    title: "Dashboard | Glanzio Admin",
    description: "Adminpanel – statistik och översikt.",
    noindex: true,
  });

  const [range, setRange] = useState<Range>("month");
  const [stats, setStats] = useState<BookingStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { start, end } = getRangeDates(range);
    setLoading(true);
    fetchStats({ startDate: start, endDate: end })
      .then(setStats)
      .finally(() => setLoading(false));
  }, [range]);

  const serviceData = stats
    ? Object.entries(stats.serviceBreakdown).map(([key, value]) => ({
        name: SERVICE_LABELS[key] ?? key,
        value,
      }))
    : [];

  const typeData = stats
    ? [
        { name: "Standard", value: stats.standardCount },
        { name: "Premium", value: stats.premiumCount },
      ]
    : [];

  const RANGES: { label: string; value: Range }[] = [
    { label: "Idag", value: "day" },
    { label: "Denna vecka", value: "week" },
    { label: "Denna månad", value: "month" },
  ];

  const statCards = stats
    ? [
        { label: "Bokningar", value: String(stats.totalBookings), icon: BookOpen, suffix: "" },
        { label: "Total intäkt", value: stats.totalRevenue.toLocaleString("sv-SE"), icon: DollarSign, suffix: " kr" },
        { label: "Snittspris", value: String(stats.averagePrice), icon: TrendingUp, suffix: " kr" },
        {
          label: "Premium andel",
          value: stats.totalBookings > 0
            ? String(Math.round((stats.premiumCount / stats.totalBookings) * 100))
            : "0",
          icon: Star,
          suffix: "%",
        },
      ]
    : [];

  return (
    <div className="space-y-6">
      {/* Range selector */}
      <div className="flex justify-end">
        <div className="flex border border-border bg-card">
          {RANGES.map((r) => (
            <button
              key={r.value}
              onClick={() => setRange(r.value)}
              className={`px-4 py-2 font-body text-sm transition-colors ${
                range === r.value
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="border border-border bg-card p-6 animate-pulse">
                <div className="h-4 w-24 rounded bg-muted mb-3" />
                <div className="h-8 w-20 rounded bg-muted" />
              </div>
            ))
          : statCards.map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.label} className="border border-border bg-card p-6">
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground">
                      {card.label}
                    </p>
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <p className="font-display text-3xl font-bold">
                    {card.value}{card.suffix}
                  </p>
                </div>
              );
            })}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="border border-border bg-card p-6">
          <p className="font-body text-xs tracking-[0.2em] uppercase text-primary mb-1">Tjänstfördelning</p>
          <p className="font-display text-lg font-bold mb-4">Bokningar per tjänst</p>
          {loading ? (
            <div className="h-56 animate-pulse bg-muted rounded" />
          ) : serviceData.some((d) => d.value > 0) ? (
            <ResponsiveContainer width="100%" height={224}>
              <PieChart>
                <Pie
                  data={serviceData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                  labelLine={false}
                >
                  {serviceData.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "hsl(220 25% 11%)",
                    border: "1px solid hsl(220 15% 20%)",
                    borderRadius: 4,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-56 flex items-center justify-center text-muted-foreground font-body text-sm">
              Ingen data för perioden
            </div>
          )}
        </div>

        <div className="border border-border bg-card p-6">
          <p className="font-body text-xs tracking-[0.2em] uppercase text-primary mb-1">Paketsplit</p>
          <p className="font-display text-lg font-bold mb-4">Standard vs Premium</p>
          {loading ? (
            <div className="h-56 animate-pulse bg-muted rounded" />
          ) : typeData.some((d) => d.value > 0) ? (
            <ResponsiveContainer width="100%" height={224}>
              <PieChart>
                <Pie
                  data={typeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                  labelLine={false}
                >
                  {typeData.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "hsl(220 25% 11%)",
                    border: "1px solid hsl(220 15% 20%)",
                    borderRadius: 4,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-56 flex items-center justify-center text-muted-foreground font-body text-sm">
              Ingen data för perioden
            </div>
          )}
        </div>
      </div>
    </div>
  );
}