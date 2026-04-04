import { supabase } from "./supabaseClient";

export async function createBooking(booking: any) {
  const { error } = await supabase
    .from("bookings")
    .insert([booking]);

  if (error) {
    console.error(error);
    throw error;
  }
}