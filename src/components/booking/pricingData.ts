export const carSizes = [
  { id: "small", label: "Liten bil", surcharge: 0 },
  { id: "medium", label: "Mellanstor", surcharge: 100 },
  { id: "xl", label: "XL / SUV", surcharge: 200 },
] as const;

export type CarSizeId = (typeof carSizes)[number]["id"];

export const serviceAreas = [
  { id: "ext-int", label: "Exteriör + Interiör" },
  { id: "exterior-only", label: "Bara Exteriör" },
  { id: "interior-only", label: "Bara Interiör" },
] as const;