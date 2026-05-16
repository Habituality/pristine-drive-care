import { supabase } from "./supabaseClient";
import type { ServiceArea } from "./priceEngine";

type Booking = {
  date: string | null;
  time: string;

  price: number;

  comments?: string;

  serviceArea: ServiceArea;

  isPremium: boolean;
};

export async function createBooking(booking: Booking) {
  const payload = {
    date: booking.date,
    time: booking.time,

    price: booking.price,

    comments: booking.comments,

    service_area: booking.serviceArea,

    is_premium: booking.isPremium,
  };

  const { data, error } = await supabase
    .from("bookings")
    .insert([payload])
    .select();

  if (error) throw error;

  return data;
}