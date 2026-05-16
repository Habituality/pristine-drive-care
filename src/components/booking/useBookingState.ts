import { useState, useMemo } from "react";
import { carSizes, carPackages } from "./pricingData";

export interface BookingState {
  // Which services are enabled
  enableDetailing: boolean;
  // Common
  name: string;
  phone: string;
  email: string;
  address: string;
  date: string;
  time: string;
  // Detailing
  carSize: string;
  carPackage: string;
}

const initial: BookingState = {
  enableDetailing: true,
  name: "",
  phone: "",
  email: "",
  address: "",
  date: "",
  time: "", // 👈 LÄGG TILL
  carSize: "small",
  carPackage: "standard",
};


function getSizeIndex(sizeId: string): number {
  const idx = carSizes.findIndex((s) => s.id === sizeId);
  return idx >= 0 ? idx : 0;
}

export function useBookingState() {
  const [state, setState] = useState<BookingState>(initial);

  const set = <K extends keyof BookingState>(key: K, value: BookingState[K]) =>
    setState((prev) => ({ ...prev, [key]: value }));

  const detailingPrice = useMemo(() => {
    if (!state.enableDetailing) return 0;
    const size = carSizes.find((s) => s.id === state.carSize);
    const pkg = carPackages.find((p) => p.id === state.carPackage);
    if (!size || !pkg) return 0;
    let total = pkg.base + size.baseSurcharge;

    return Math.round(total);
  }, [state.enableDetailing, state.carSize, state.carPackage ]);

  const price = detailingPrice;

  const hasAnyService = state.enableDetailing

  const summary = useMemo(() => {
  const lines: string[] = [];

  if (state.enableDetailing) {
    lines.push(`── Bil Detailing ──`);
    lines.push(`Storlek: ${carSizes.find((s) => s.id === state.carSize)?.label}`);
    lines.push(`Paket: ${carPackages.find((p) => p.id === state.carPackage)?.label}`);
    lines.push(`Delpris: ${detailingPrice} kr`);
    lines.push("");
  }

  lines.push(`Totalt: ${price} kr`);

  return lines.join("\n");
}, [
  state.enableDetailing,
  state.carSize,
  state.carPackage,
  detailingPrice,
  price,
]);

return {
  state,
  set,
  price,
  summary,
  hasAnyService,
  detailingPrice,
};
}