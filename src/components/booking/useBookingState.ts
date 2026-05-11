import { useState, useMemo } from "react";
import {
  carSizes, carPackages, exteriorAddons, interiorAddons,
} from "./pricingData";

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
  carExteriorAddons: string[];
  carInteriorAddons: string[];
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
  carPackage: "ext-int",
  carExteriorAddons: [],
  carInteriorAddons: [],
};

function toggleInArray(arr: string[], id: string) {
  return arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id];
}

function getSizeIndex(sizeId: string): number {
  const idx = carSizes.findIndex((s) => s.id === sizeId);
  return idx >= 0 ? idx : 0;
}

export function useBookingState() {
  const [state, setState] = useState<BookingState>(initial);

  const set = <K extends keyof BookingState>(key: K, value: BookingState[K]) =>
    setState((prev) => ({ ...prev, [key]: value }));

  const toggleAddon = (key: "carExteriorAddons" | "carInteriorAddons", id: string) =>
    setState((prev) => ({ ...prev, [key]: toggleInArray(prev[key], id) }));

  const detailingPrice = useMemo(() => {
    if (!state.enableDetailing) return 0;
    const size = carSizes.find((s) => s.id === state.carSize);
    const pkg = carPackages.find((p) => p.id === state.carPackage);
    if (!size || !pkg) return 0;
    let total = pkg.base + size.baseSurcharge;
    const sizeIdx = getSizeIndex(state.carSize);
    const showExt = state.carPackage === "ext-int" || state.carPackage === "exterior-only";
    const showInt = state.carPackage === "ext-int" || state.carPackage === "interior-only";
    if (showExt) {
      total += state.carExteriorAddons.reduce((s, id) => {
        const a = exteriorAddons.find((x) => x.id === id);
        return s + (a ? a.basePrice + a.sizeSurcharge * sizeIdx : 0);
      }, 0);
    }
    if (showInt) {
      total += state.carInteriorAddons.reduce((s, id) => {
        const a = interiorAddons.find((x) => x.id === id);
        return s + (a ? a.basePrice + a.sizeSurcharge * sizeIdx : 0);
      }, 0);
    }
    return Math.round(total);
  }, [state.enableDetailing, state.carSize, state.carPackage, state.carExteriorAddons, state.carInteriorAddons]);

  const price = detailingPrice;

  const hasAnyService = state.enableDetailing

  const summary = useMemo(() => {
  const lines: string[] = [];

  if (state.enableDetailing) {
    lines.push(`── Bil Detailing ──`);
    lines.push(`Storlek: ${carSizes.find((s) => s.id === state.carSize)?.label}`);
    lines.push(`Paket: ${carPackages.find((p) => p.id === state.carPackage)?.label}`);

    if (state.carExteriorAddons.length) {
      lines.push(
        `Exteriör-tillägg: ${state.carExteriorAddons
          .map((id) => exteriorAddons.find((a) => a.id === id)?.label)
          .join(", ")}`
      );
    }

    if (state.carInteriorAddons.length) {
      lines.push(
        `Interiör-tillägg: ${state.carInteriorAddons
          .map((id) => interiorAddons.find((a) => a.id === id)?.label)
          .join(", ")}`
      );
    }

    lines.push(`Delpris: ${detailingPrice} kr`);
    lines.push("");
  }

  lines.push(`Totalt: ${price} kr`);

  return lines.join("\n");
}, [
  state.enableDetailing,
  state.carSize,
  state.carPackage,
  state.carExteriorAddons,
  state.carInteriorAddons,
  detailingPrice,
  price,
]);

return {
  state,
  set,
  toggleAddon,
  price,
  summary,
  hasAnyService,
  detailingPrice,
};
}