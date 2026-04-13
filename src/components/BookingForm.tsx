import React from "react";
import { useBookingState } from "./booking/useBookingState";
import { createBooking } from "../lib/bookings";

export const BookingForm: React.FC = () => {
  const { state, set, toggleAddon, price, summary } = useBookingState();

  const handleBooking = async () => {
    try {
      await createBooking({ ...state, totalPrice: price });
      alert("Bokning skickad!");
    } catch (err) {
      console.error(err);
      alert("Fel vid bokning. Kolla konsolen.");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h2>Bokning</h2>

      <label>Namn:</label>
      <input type="text" value={state.name} onChange={(e) => set("name", e.target.value)} />

      <label>Telefon:</label>
      <input type="text" value={state.phone} onChange={(e) => set("phone", e.target.value)} />

      <label>Email:</label>
      <input type="email" value={state.email} onChange={(e) => set("email", e.target.value)} />

      <label>Adress:</label>
      <input type="text" value={state.address} onChange={(e) => set("address", e.target.value)} />

      <label>Datum:</label>
      <input type="date" value={state.date} onChange={(e) => set("date", e.target.value)} />

      <hr />

      <label>
        <input type="checkbox" checked={state.enableDetailing} onChange={(e) => set("enableDetailing", e.target.checked)} /> Bil Detailing
      </label>

      <label>
        <input type="checkbox" checked={state.enableDriveway} onChange={(e) => set("enableDriveway", e.target.checked)} /> Uppfart
      </label>

      <label>
        <input type="checkbox" checked={state.enableDeck} onChange={(e) => set("enableDeck", e.target.checked)} /> Altan
      </label>

      <hr />

      <h3>Pris: {price} kr</h3>
      <pre>{summary}</pre>
      <button onClick={handleBooking}>Boka</button>
    </div>
  );
};
