export type ServiceArea =
  | "ext-int"
  | "exterior-only"
  | "interior-only";

export function calculatePrice(
  serviceArea: ServiceArea,
  isPremium: boolean
) {
  const prices = {
    "ext-int": isPremium ? 1995 : 995,
    "exterior-only": isPremium ? 1195 : 595,
    "interior-only": isPremium ? 1195 : 595,
  };

  return prices[serviceArea];
}