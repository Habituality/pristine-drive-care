export const carSizes = [
  { id: "small", label: "Liten bil", baseSurcharge: 0 },
  { id: "medium", label: "Mellanstor", baseSurcharge: 100 },
  { id: "xl", label: "XL / SUV", baseSurcharge: 200 },
] as const;

export const carPackages = [
  { id: "ext-int", label: "Exteriör + Interiör (Standard)", base: 995 },
  { id: "exterior-only", label: "Bara Exteriör (Standard)", base: 595 },
  { id: "interior-only", label: "Bara Interiör (Standard)", base: 595 },

  { id: "ext-int-premium", label: "Exteriör + Interiör (Premium)", base: 1995 },
  { id: "exterior-only-premium", label: "Bara Exteriör (Premium)", base: 1195 },
  { id: "interior-only-premium", label: "Bara Interiör (Premium)", base: 1195 },
] as const;

