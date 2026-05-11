import { supabase } from "./supabaseClient";

type Booking = {
  name: string;
  phone: string;
  email: string;
  address: string;
  date: string | null;
  time: string;
  comments?: string;

  totalPrice: number;

  enableDetailing: boolean;

  carSize: string;
  carPackage: string;

  carExteriorAddons: string[];
  carInteriorAddons: string[];
};

export async function createBooking(booking: Booking) {
  const payload = {
    name: booking.name,
    phone: booking.phone,
    email: booking.email,
    address: booking.address,

    date: booking.date,
    time: booking.time,
    comments: booking.comments,

    total_price: booking.totalPrice,

    enabledetailing: booking.enableDetailing,

    carsize: booking.carSize,
    carpackage: booking.carPackage,

    carexterioraddons: booking.carExteriorAddons,
    carinterioraddons: booking.carInteriorAddons,
  };

  const { data, error } = await supabase
    .from("bookings")
    .insert([payload])
    .select();

  if (error) throw error;

  return data;
}