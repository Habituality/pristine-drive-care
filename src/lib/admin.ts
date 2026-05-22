import { supabase } from "./supabaseClient";

export interface AdminBooking {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  address: string;
  service_area: "ext-int" | "exterior-only" | "interior-only";
  is_premium: boolean;
  car_size: "small" | "medium" | "xl";
  price: number;
  comments: string | null;
}

export interface BookingStats {
  totalBookings: number;
  totalRevenue: number;
  averagePrice: number;
  premiumCount: number;
  standardCount: number;
  serviceBreakdown: Record<string, number>;
}

export async function fetchBookings(opts?: {
  startDate?: string;
  endDate?: string;
  limit?: number;
  offset?: number;
}): Promise<{ data: AdminBooking[]; count: number }> {
  const { startDate, endDate, limit = 50, offset = 0 } = opts ?? {};

  let query = supabase
    .from("bookings")
    .select("*", { count: "exact" })
    .order("date", { ascending: false })
    .order("time", { ascending: false })
    .range(offset, offset + limit - 1);

  if (startDate) query = query.gte("date", startDate);
  if (endDate) query = query.lte("date", endDate);

  const { data, count, error } = await query;
  if (error) throw error;
  return { data: (data ?? []) as AdminBooking[], count: count ?? 0 };
}

export async function fetchStats(opts?: {
  startDate?: string;
  endDate?: string;
}): Promise<BookingStats> {
  const { startDate, endDate } = opts ?? {};

  let query = supabase.from("bookings").select("price, is_premium, service_area");
  if (startDate) query = query.gte("date", startDate);
  if (endDate) query = query.lte("date", endDate);

  const { data, error } = await query;
  if (error) throw error;

  const rows = (data ?? []) as Pick<AdminBooking, "price" | "is_premium" | "service_area">[];
  const totalRevenue = rows.reduce((s, r) => s + r.price, 0);
  const premiumCount = rows.filter((r) => r.is_premium).length;

  const serviceBreakdown: Record<string, number> = {};
  rows.forEach((r) => {
    serviceBreakdown[r.service_area] = (serviceBreakdown[r.service_area] ?? 0) + 1;
  });

  return {
    totalBookings: rows.length,
    totalRevenue,
    averagePrice: rows.length ? Math.round(totalRevenue / rows.length) : 0,
    premiumCount,
    standardCount: rows.length - premiumCount,
    serviceBreakdown,
  };
}

export async function deleteBooking(id: string): Promise<void> {
  const { error } = await supabase.from("bookings").delete().eq("id", id);
  if (error) throw error;
}

export function bookingsToCSV(bookings: AdminBooking[]): string {
  const headers = [
    "ID", "Namn", "Telefon", "E-post", "Datum", "Tid",
    "Adress", "Tjänst", "Typ", "Bilstorlek", "Pris (kr)", "Kommentarer",
  ];
  const esc = (v: string) => `"${v.replace(/"/g, '""')}"`;
  const rows = bookings.map((b) =>
    [
      b.id, b.name, b.phone, b.email, b.date, b.time,
      b.address, b.service_area,
      b.is_premium ? "Premium" : "Standard",
      b.car_size, String(b.price), b.comments ?? "",
    ].map(esc).join(",")
  );
  return [headers.map(esc).join(","), ...rows].join("\n");
}