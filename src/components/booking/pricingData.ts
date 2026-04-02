// ====== Bil Detailing ======
export const carSizes = [
  { id: "small", label: "Liten bil", priceMultiplier: 1.0 },
  { id: "medium", label: "Mellanstor", priceMultiplier: 1.25 },
  { id: "xl", label: "XL / SUV", priceMultiplier: 1.5 },
] as const;

export const carPackages = [
  { id: "full-exterior", label: "Full Exteriör", base: 1495 },
  { id: "full-interior", label: "Full Interiör", base: 1295 },
  { id: "exterior-only", label: "Bara Exteriör", base: 895 },
  { id: "interior-only", label: "Bara Interiör", base: 795 },
] as const;

export const exteriorAddons = [
  { id: "clay-bar", label: "Clay Bar", price: 495 },
  { id: "wax", label: "Vaxning", price: 395 },
] as const;

export const interiorAddons = [
  { id: "leather", label: "Läderrengöring", price: 395 },
  { id: "textile", label: "Textil / Vinyl", price: 295 },
] as const;

// ====== Uppfart ======
export const drivewaySizes = [
  { id: "small", label: "Liten (< 20 m²)", priceMultiplier: 1.0 },
  { id: "medium", label: "Mellan (20–40 m²)", priceMultiplier: 1.4 },
  { id: "large", label: "Stor (40–60 m²)", priceMultiplier: 1.8 },
  { id: "xl", label: "XL (60+ m²)", priceMultiplier: 2.3 },
] as const;

export const drivewayPackages = [
  { id: "pressure", label: "Högtryckstvätt", base: 995 },
  { id: "soap-brush", label: "Tvål & Borste", base: 1295 },
  { id: "combo", label: "Kombinationspaket", base: 1795 },
] as const;

export const drivewayAddons = [
  { id: "stain", label: "Fläckborttagning", price: 395 },
  { id: "moss", label: "Moss- & Algrengöring", price: 495 },
  { id: "seal", label: "Impregnering", price: 695 },
] as const;

// ====== Altan ======
export const deckMaterials = [
  { id: "wood", label: "Trä" },
  { id: "composite", label: "Komposit" },
] as const;

export const deckSizes = [
  { id: "small", label: "Liten (< 15 m²)", priceMultiplier: 1.0 },
  { id: "medium", label: "Mellan (15–30 m²)", priceMultiplier: 1.4 },
  { id: "large", label: "Stor (30+ m²)", priceMultiplier: 1.8 },
] as const;

export const deckPackages = [
  { id: "pressure", label: "Högtryckstvätt", base: 1195 },
  { id: "soap-brush", label: "Tvål & Borste", base: 1495 },
  { id: "combo", label: "Kombinationspaket", base: 1995 },
] as const;

export const deckAddons = [
  { id: "stain", label: "Fläckborttagning", price: 395 },
  { id: "oil", label: "Olja / Sealer", price: 695 },
  { id: "algae", label: "Algrengöring", price: 495 },
] as const;
