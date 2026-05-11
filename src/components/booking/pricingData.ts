// ====== Bil Detailing ======
export const carSizes = [
  { id: "small", label: "Liten bil", baseSurcharge: 0 },
  { id: "medium", label: "Mellanstor", baseSurcharge: 100 },
  { id: "xl", label: "XL / SUV", baseSurcharge: 200 },
] as const;

export const carPackages = [
  { id: "ext-int", label: "Exteriör + Interiör", base: 995 },
  { id: "exterior-only", label: "Bara Exteriör", base: 495 },
  { id: "interior-only", label: "Bara Interiör", base: 595 },
] as const;

export const exteriorAddons = [
  { id: "clay-bar", label: "Clay Bar", basePrice: 495, sizeSurcharge: 50 },
  { id: "wax", label: "Vaxning", basePrice: 495, sizeSurcharge: 50 },
  {id: "engine-bay", label: "Motorrumsrengöring", basePrice: 395, sizeSurcharge: 50,
},
] as const;

export const interiorAddons = [
 { id: "interior-conditioning", label: "Interiör rekonditionering", basePrice: 495, sizeSurcharge: 50, },
] as const;

