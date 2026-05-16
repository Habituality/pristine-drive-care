import { useState, useMemo } from "react";
import { carSizes, serviceAreas, type CarSizeId } from "./pricingData";
import { calculatePrice, type ServiceArea } from "@/lib/priceEngine";

export interface BookingState {
  enableDetailing: boolean;
  // Contact
  name: string;
  phone: string;
  email: string;
  address: string;
  // Scheduling
  date: string;
  time: string;
  comments: string;
  // Detailing options
  carSize: CarSizeId;
  serviceArea: ServiceArea;
  isPremium: boolean;
}

const initial: BookingState = {
  enableDetailing: true,
  name: "",
  phone: "",
  email: "",
  address: "",
  date: "",
  time: "",
  comments: "",
  carSize: "small",
  serviceArea: "ext-int",
  isPremium: false,
};

export function useBookingState() {
  const [state, setState] = useState<BookingState>(initial);

  const set = <K extends keyof BookingState>(key: K, value: BookingState[K]) =>
    setState((prev) => ({ ...prev, [key]: value }));

  const reset = () => setState(initial);

  const detailingPrice = useMemo(() => {
    if (!state.enableDetailing) return 0;
    return calculatePrice(state.serviceArea, state.isPremium, state.carSize);
  }, [state.enableDetailing, state.serviceArea, state.isPremium, state.carSize]);

  const price = detailingPrice;
  const hasAnyService = state.enableDetailing;

  const summary = useMemo(() => {
    const lines: string[] = [];
    if (state.enableDetailing) {
      const sizeLabel = carSizes.find((s) => s.id === state.carSize)?.label;
      const areaLabel = serviceAreas.find((a) => a.id === state.serviceArea)?.label;
      lines.push(`── Bil Detailing ──`);
      lines.push(`Storlek: ${sizeLabel}`);
      lines.push(`Tjänst: ${areaLabel}`);
      lines.push(`Nivå: ${state.isPremium ? "Premium" : "Standard"}`);
      lines.push(`Delpris: ${detailingPrice} kr`);
      lines.push("");
    }
    lines.push(`Totalt: ${price} kr`);
    return lines.join("\n");
  }, [state.enableDetailing, state.carSize, state.serviceArea, state.isPremium, detailingPrice, price]);

  return { state, set, reset, price, summary, hasAnyService, detailingPrice };
}