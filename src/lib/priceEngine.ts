import { carSizes, type CarSizeId } from "@/components/booking/pricingData";

export type ServiceArea = "ext-int" | "exterior-only" | "interior-only";

const basePrices: Record<ServiceArea, { standard: number; premium: number }> = {
  "ext-int":         { standard: 995,  premium: 1995 },
  "exterior-only":   { standard: 595,  premium: 1195 },
  "interior-only":   { standard: 595,  premium: 1195 },
};

export function calculatePrice(
  serviceArea: ServiceArea,
  isPremium: boolean,
  carSizeId: CarSizeId = "small"
): number {
  const base = isPremium
    ? basePrices[serviceArea].premium
    : basePrices[serviceArea].standard;

  const size = carSizes.find((s) => s.id === carSizeId);
  const surcharge = size?.surcharge ?? 0;

  return base + surcharge;
}