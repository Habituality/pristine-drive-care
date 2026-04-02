import { useState, useMemo } from "react";
import {
  carSizes, carPackages, exteriorAddons, interiorAddons,
  drivewaySizes, drivewayPackages, drivewayAddons,
  deckMaterials, deckSizes, deckPackages, deckAddons,
} from "./pricingData";

export type ServiceType = "detailing" | "driveway" | "deck";

export interface BookingState {
  // Common
  service: ServiceType;
  name: string;
  phone: string;
  email: string;
  date: string;
  // Detailing
  carSize: string;
  carPackage: string;
  carExteriorAddons: string[];
  carInteriorAddons: string[];
  // Driveway
  drivewaySize: string;
  drivewayPackage: string;
  drivewayAddons: string[];
  // Deck
  deckMaterial: string;
  deckSize: string;
  deckPackage: string;
  deckAddons: string[];
}

const initial: BookingState = {
  service: "detailing",
  name: "",
  phone: "",
  email: "",
  date: "",
  carSize: "small",
  carPackage: "full-exterior",
  carExteriorAddons: [],
  carInteriorAddons: [],
  drivewaySize: "small",
  drivewayPackage: "pressure",
  drivewayAddons: [],
  deckMaterial: "wood",
  deckSize: "small",
  deckPackage: "pressure",
  deckAddons: [],
};

function toggleInArray(arr: string[], id: string) {
  return arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id];
}

export function useBookingState() {
  const [state, setState] = useState<BookingState>(initial);

  const set = <K extends keyof BookingState>(key: K, value: BookingState[K]) =>
    setState((prev) => ({ ...prev, [key]: value }));

  const toggleAddon = (key: "carExteriorAddons" | "carInteriorAddons" | "drivewayAddons" | "deckAddons", id: string) =>
    setState((prev) => ({ ...prev, [key]: toggleInArray(prev[key], id) }));

  const price = useMemo(() => {
    if (state.service === "detailing") {
      const size = carSizes.find((s) => s.id === state.carSize);
      const pkg = carPackages.find((p) => p.id === state.carPackage);
      if (!size || !pkg) return 0;
      let total = pkg.base * size.priceMultiplier;
      const isExt = state.carPackage.includes("exterior") || state.carPackage === "full-exterior";
      const isInt = state.carPackage.includes("interior") || state.carPackage === "full-interior";
      if (isExt) total += state.carExteriorAddons.reduce((s, id) => s + (exteriorAddons.find((a) => a.id === id)?.price ?? 0), 0);
      if (isInt) total += state.carInteriorAddons.reduce((s, id) => s + (interiorAddons.find((a) => a.id === id)?.price ?? 0), 0);
      // For full packages both addons apply
      if (state.carPackage === "full-exterior" || state.carPackage === "full-interior") {
        // already handled above
      }
      return Math.round(total);
    }
    if (state.service === "driveway") {
      const size = drivewaySizes.find((s) => s.id === state.drivewaySize);
      const pkg = drivewayPackages.find((p) => p.id === state.drivewayPackage);
      if (!size || !pkg) return 0;
      let total = pkg.base * size.priceMultiplier;
      total += state.drivewayAddons.reduce((s, id) => s + (drivewayAddons.find((a) => a.id === id)?.price ?? 0), 0);
      return Math.round(total);
    }
    // Deck
    const size = deckSizes.find((s) => s.id === state.deckSize);
    const pkg = deckPackages.find((p) => p.id === state.deckPackage);
    if (!size || !pkg) return 0;
    let total = pkg.base * size.priceMultiplier;
    total += state.deckAddons.reduce((s, id) => s + (deckAddons.find((a) => a.id === id)?.price ?? 0), 0);
    return Math.round(total);
  }, [state]);

  const summary = useMemo(() => {
    const lines: string[] = [];
    if (state.service === "detailing") {
      lines.push(`Bil Detailing`);
      lines.push(`Storlek: ${carSizes.find((s) => s.id === state.carSize)?.label}`);
      lines.push(`Paket: ${carPackages.find((p) => p.id === state.carPackage)?.label}`);
      if (state.carExteriorAddons.length) lines.push(`Exteriör-tillägg: ${state.carExteriorAddons.map((id) => exteriorAddons.find((a) => a.id === id)?.label).join(", ")}`);
      if (state.carInteriorAddons.length) lines.push(`Interiör-tillägg: ${state.carInteriorAddons.map((id) => interiorAddons.find((a) => a.id === id)?.label).join(", ")}`);
    } else if (state.service === "driveway") {
      lines.push(`Uppfart`);
      lines.push(`Storlek: ${drivewaySizes.find((s) => s.id === state.drivewaySize)?.label}`);
      lines.push(`Paket: ${drivewayPackages.find((p) => p.id === state.drivewayPackage)?.label}`);
      if (state.drivewayAddons.length) lines.push(`Tillägg: ${state.drivewayAddons.map((id) => drivewayAddons.find((a) => a.id === id)?.label).join(", ")}`);
    } else {
      lines.push(`Altan`);
      lines.push(`Material: ${deckMaterials.find((m) => m.id === state.deckMaterial)?.label}`);
      lines.push(`Storlek: ${deckSizes.find((s) => s.id === state.deckSize)?.label}`);
      lines.push(`Paket: ${deckPackages.find((p) => p.id === state.deckPackage)?.label}`);
      if (state.deckAddons.length) lines.push(`Tillägg: ${state.deckAddons.map((id) => deckAddons.find((a) => a.id === id)?.label).join(", ")}`);
    }
    lines.push(`Pris: ${price} kr`);
    return lines.join("\n");
  }, [state, price]);

  return { state, set, toggleAddon, price, summary };
}
