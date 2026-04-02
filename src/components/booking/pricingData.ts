// ====== Bil Detailing ======
export const carSizes = [
  { id: "small", label: "Liten bil", baseSurcharge: 0 },
  { id: "medium", label: "Mellanstor", baseSurcharge: 100 },
  { id: "xl", label: "XL / SUV", baseSurcharge: 200 },
] as const;

export const carPackages = [
  { id: "ext-int", label: "Exteriör + Interiör", base: 1495 },
  { id: "exterior-only", label: "Bara Exteriör", base: 895 },
  { id: "interior-only", label: "Bara Interiör", base: 795 },
] as const;

export const exteriorAddons = [
  { id: "clay-bar", label: "Clay Bar", basePrice: 495, sizeSurcharge: 50 },
  { id: "wax", label: "Vaxning", basePrice: 495, sizeSurcharge: 50 },
] as const;

export const interiorAddons = [
  { id: "leather", label: "Läderrengöring", basePrice: 495, sizeSurcharge: 50 },
  { id: "textile", label: "Textil & Vinylrengöring", basePrice: 295, sizeSurcharge: 50 },
] as const;

// ====== Uppfart ======
export const drivewayPricing = {
  startPrice: 500,
  pricePerSqm: 30,
} as const;

export const drivewayAddons = [
  { id: "moss", label: "Moss- & Algrengöring", price: 495 },
] as const;

// ====== Altan ======
export const deckMaterials = [
  { id: "wood", label: "Trä" },
  { id: "composite", label: "Komposit" },
] as const;

export const deckSizes = [
  { id: "small", label: "Liten (< 15 m²)", sqm: 12 },
  { id: "medium", label: "Mellan (15–30 m²)", sqm: 22 },
  { id: "large", label: "Stor (30+ m²)", sqm: 35 },
] as const;

export const deckPricing = {
  startPrice: 600,
  pricePerSqm: 35,
} as const;

export const deckAddons = [
  { id: "algae", label: "Moss- & Algrengöring", price: 495 },
] as const;
