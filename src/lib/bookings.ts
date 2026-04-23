import { supabase } from "./supabaseClient";

type Booking = {
  name: string;
  phone: string;
  email: string;
  address: string;
  date: string | null;
  time: string;
  comments?: string;
  totalPrice: number; // 👈 viktigt
};

export async function createBooking(booking: any) {
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
    enabledriveway: booking.enableDriveway,
    enabledeck: booking.enableDeck,

    carsize: booking.carSize,
    carpackage: booking.carPackage,
    carexterioraddons: booking.carExteriorAddons,
    carinterioraddons: booking.carInteriorAddons,

    drivewaysqm: booking.drivewaySqm,
    drivewayaddons: booking.drivewayAddons,

    deckmaterial: booking.deckMaterial,
    decksize: booking.deckSize,
    deckaddons: booking.deckAddons,
  };

  const { data, error } = await supabase
    .from("bookings")
    .insert([payload])
    .select();

  if (error) throw error;

  return data;
}