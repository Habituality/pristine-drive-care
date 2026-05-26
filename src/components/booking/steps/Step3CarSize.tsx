import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { carSizes, type CarSizeId } from "../pricingData";
import type { ServiceArea } from "@/lib/priceEngine";
import { calculatePrice } from "@/lib/priceEngine";
import { StepHeader, NavButtons, StepContainer } from "../WizardUI";
import { PriceDisplay } from "../BookingUI";

interface Props {
  serviceArea: ServiceArea;
  isPremium: boolean;
  carSize: CarSizeId;
  onSelect: (size: CarSizeId) => void;
  onBack: () => void;
  onNext: () => void;
  totalSteps: number;
}

const sizeDescriptions: Record<CarSizeId, string> = {
  small: "T.ex. Polo, Fiesta, Yaris",
  medium: "T.ex. Golf, Passat, V70",
  xl: "T.ex. XC90, Q7, stadsjeepar",
};

export default function Step3CarSize({
  serviceArea,
  isPremium,
  carSize,
  onSelect,
  onBack,
  onNext,
  totalSteps,
}: Props) {
  const finalPrice = calculatePrice(serviceArea, isPremium, carSize);

  return (
    <StepContainer stepKey="step3">
      <StepHeader
        step={3}
        totalSteps={totalSteps}
        title="Hur stor är din bil?"
        subtitle="Storleken påverkar tidsåtgång och slutpris."
      />

      <div className="grid gap-3 sm:grid-cols-3 mb-6">
        {carSizes.map((s) => {
          const isSelected = carSize === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => onSelect(s.id)}
              className={cn(
                "relative text-left p-5 border transition-all duration-200 min-h-[120px]",
                isSelected
                  ? "border-primary bg-primary/10"
                  : "border-border bg-secondary hover:border-primary/40"
              )}
            >
              {isSelected && (
                <span className="absolute top-3 right-3 w-5 h-5 bg-primary flex items-center justify-center">
                  <Check className="w-3 h-3 text-primary-foreground" />
                </span>
              )}
              <p className="font-display text-lg font-bold mb-1">{s.label}</p>
              <p className="font-body text-xs text-muted-foreground mb-3">
                {sizeDescriptions[s.id]}
              </p>
              <p className="font-body text-sm text-primary font-semibold">
                {s.surcharge > 0 ? `+${s.surcharge} kr` : "Baspris"}
              </p>
            </button>
          );
        })}
      </div>

      <PriceDisplay price={finalPrice} />

      <NavButtons onBack={onBack} onNext={onNext} nextLabel="Välj tid" />
    </StepContainer>
  );
}