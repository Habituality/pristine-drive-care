import { supabase } from "./supabaseClient";
import type { ServiceArea } from "./priceEngine";
import type { CarSizeId } from "@/components/booking/pricingData";

export type Booking = {
  name: string;
  phone: string;
  email: string;
  date: string;
  address: string;
  time: string;
  serviceArea: ServiceArea;
  isPremium: boolean;
  carSize: CarSizeId;
  price: number;
  comments?: string;
};

export async function createBooking(booking: Booking) {
  const { data, error } = await supabase
    .from("bookings")
    .insert([
      {
        name: booking.name,
        phone: booking.phone,
        email: booking.email,
        date: booking.date,
        address: booking.address,
        time: booking.time,
        service_area: booking.serviceArea,
        is_premium: booking.isPremium,
        car_size: booking.carSize,
        price: booking.price,
        comments: booking.comments ?? null,
      },
    ])

  if (error) throw error;
  return data;
}