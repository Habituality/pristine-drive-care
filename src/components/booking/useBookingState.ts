import { useState, useMemo } from "react";
import {
  carSizes, carPackages, exteriorAddons, interiorAddons,
  drivewayPricing, drivewayAddons,
  deckMaterials, deckSizes, deckPricing, deckAddons,
} from "./pricingData";

export interface BookingState {
  // Which services are enabled
  enableDetailing: boolean;
  enableDriveway: boolean;
  enableDeck: boolean;
  // Common
  name: string;
  phone: string;
  email: string;
  address: string;
  date: string;
  // Detailing
  carSize: string;
  carPackage: string;
  carExteriorAddons: string[];
  carInteriorAddons: string[];
  // Driveway
  drivewaySqm: number;
  drivewayAddons: string[];
  // Deck
  deckMaterial: string;
  deckSize: string;
  deckAddons: string[];
}

const initial: BookingState = {
  enableDetailing: true,
  enableDriveway: false,
  enableDeck: false,
  name: "",
  phone: "",
  email: "",
  date: "",
  carSize: "small",
  carPackage: "ext-int",
  carExteriorAddons: [],
  carInteriorAddons: [],
  drivewaySqm: 20,
  drivewayAddons: [],
  deckMaterial: "wood",
  deckSize: "small",
  deckAddons: [],
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

  const toggleAddon = (key: "carExteriorAddons" | "carInteriorAddons" | "drivewayAddons" | "deckAddons", id: string) =>
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

  const drivewayPrice = useMemo(() => {
    if (!state.enableDriveway) return 0;
    let total = drivewayPricing.startPrice + drivewayPricing.pricePerSqm * state.drivewaySqm;
    total += state.drivewayAddons.reduce((s, id) => s + (drivewayAddons.find((a) => a.id === id)?.price ?? 0), 0);
    return Math.round(total);
  }, [state.enableDriveway, state.drivewaySqm, state.drivewayAddons]);

  const deckPrice = useMemo(() => {
    if (!state.enableDeck) return 0;
    const size = deckSizes.find((s) => s.id === state.deckSize);
    if (!size) return 0;
    let total = deckPricing.startPrice + deckPricing.pricePerSqm * size.sqm;
    total += state.deckAddons.reduce((s, id) => s + (deckAddons.find((a) => a.id === id)?.price ?? 0), 0);
    return Math.round(total);
  }, [state.enableDeck, state.deckSize, state.deckAddons]);

  const price = detailingPrice + drivewayPrice + deckPrice;

  const hasAnyService = state.enableDetailing || state.enableDriveway || state.enableDeck;

  const summary = useMemo(() => {
    const lines: string[] = [];
    if (state.enableDetailing) {
      lines.push(`── Bil Detailing ──`);
      lines.push(`Storlek: ${carSizes.find((s) => s.id === state.carSize)?.label}`);
      lines.push(`Paket: ${carPackages.find((p) => p.id === state.carPackage)?.label}`);
      if (state.carExteriorAddons.length) lines.push(`Exteriör-tillägg: ${state.carExteriorAddons.map((id) => exteriorAddons.find((a) => a.id === id)?.label).join(", ")}`);
      if (state.carInteriorAddons.length) lines.push(`Interiör-tillägg: ${state.carInteriorAddons.map((id) => interiorAddons.find((a) => a.id === id)?.label).join(", ")}`);
      lines.push(`Delpris: ${detailingPrice} kr`);
      lines.push("");
    }
    if (state.enableDriveway) {
      lines.push(`── Uppfart ──`);
      lines.push(`Yta: ${state.drivewaySqm} m²`);
      lines.push(`Paket: Högtryckstvätt`);
      if (state.drivewayAddons.length) lines.push(`Tillägg: ${state.drivewayAddons.map((id) => drivewayAddons.find((a) => a.id === id)?.label).join(", ")}`);
      lines.push(`Delpris: ${drivewayPrice} kr`);
      lines.push("");
    }
    if (state.enableDeck) {
      lines.push(`── Altan ──`);
      lines.push(`Material: ${deckMaterials.find((m) => m.id === state.deckMaterial)?.label}`);
      lines.push(`Storlek: ${deckSizes.find((s) => s.id === state.deckSize)?.label}`);
      lines.push(`Paket: Högtryckstvätt`);
      if (state.deckAddons.length) lines.push(`Tillägg: ${state.deckAddons.map((id) => deckAddons.find((a) => a.id === id)?.label).join(", ")}`);
      lines.push(`Delpris: ${deckPrice} kr`);
      lines.push("");
    }
    lines.push(`Totalt: ${price} kr`);
    return lines.join("\n");
  }, [state, detailingPrice, drivewayPrice, deckPrice, price]);

  return { state, set, toggleAddon, price, summary, hasAnyService, detailingPrice, drivewayPrice, deckPrice };
}
