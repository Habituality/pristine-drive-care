import { Car, Sparkles, Check, Shield, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ServiceArea } from "@/lib/priceEngine";
import { calculatePrice } from "@/lib/priceEngine";
import { StepHeader, NavButtons, StepContainer } from "../WizardUI";

interface Props {
  serviceArea: ServiceArea;
  isPremium: boolean;
  onSelect: (premium: boolean) => void;
  onBack: () => void;
  onNext: () => void;
  totalSteps: number;
}

const standardFeatures = [
  "Utvändig handtvätt & torkning",
  "Fälg- & däckrengöring",
  "Invändig dammsugning & avtorkning",
  "Fönsterputs in- & utsida",
  "Doftfräschning",
];

const premiumFeatures = [
  "Allt i Standard",
  "Clay Bar-behandling",
  "Vaxning & lackskydd",
  "Läder- & textilrengöring",
  "Motorrumsrengöring",
  "UV-skydd & glansbehandling",
];

export default function Step2Package({
  serviceArea,
  isPremium,
  onSelect,
  onBack,
  onNext,
  totalSteps,
}: Props) {
  const standardPrice = calculatePrice(serviceArea, false, "small");
  const premiumPrice = calculatePrice(serviceArea, true, "small");

  return (
    <StepContainer stepKey="step2">
      <StepHeader
        step={2}
        totalSteps={totalSteps}
        title="Standard eller Premium?"
        subtitle="Välj nivå för din rekond. Du kan justera bilstorlek i nästa steg."
      />

      <div className="grid gap-4 md:grid-cols-2">
        {/* Standard */}
        <button
          type="button"
          onClick={() => onSelect(false)}
          className={cn(
            "relative text-left flex flex-col border transition-all duration-200 p-6",
            !isPremium
              ? "border-primary bg-primary/10"
              : "border-border bg-secondary hover:border-primary/40"
          )}
        >
          {!isPremium && (
            <span className="absolute top-4 right-4 w-5 h-5 bg-primary flex items-center justify-center">
              <Check className="w-3 h-3 text-primary-foreground" />
            </span>
          )}

          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 border border-border bg-card flex items-center justify-center">
              <Car className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-body text-xs tracking-[0.2em] uppercase text-primary mb-0.5">
                Klassisk rekond
              </p>
              <h4 className="font-display text-xl font-bold leading-none">Standard</h4>
            </div>
          </div>

          <div className="mb-3">
            <span className="font-body text-xs text-muted-foreground">från </span>
            <span className="font-display text-3xl font-bold">{standardPrice}</span>
            <span className="font-body text-sm text-muted-foreground"> kr</span>
          </div>

          <div className="flex items-center gap-2 mb-4 text-muted-foreground font-body text-xs">
            <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
            <span>Beräknad tid: 1–4 timmar</span>
          </div>

          <div className="h-px bg-border mb-4" />

          <ul className="space-y-2">
            {standardFeatures.map((f) => (
              <li
                key={f}
                className="flex items-start gap-2 font-body text-sm text-muted-foreground"
              >
                <Check className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </button>

        {/* Premium */}
        <button
          type="button"
          onClick={() => onSelect(true)}
          className={cn(
            "relative text-left flex flex-col border transition-all duration-200 p-6",
            isPremium
              ? "border-primary bg-primary/10"
              : "border-primary/40 bg-secondary hover:border-primary"
          )}
        >
          {isPremium && (
            <span className="absolute top-4 right-4 w-5 h-5 bg-primary flex items-center justify-center">
              <Check className="w-3 h-3 text-primary-foreground" />
            </span>
          )}
          {!isPremium && (
            <span className="absolute top-4 right-4 flex items-center gap-1 px-2 py-0.5 bg-primary/10 border border-primary/30 font-body text-[10px] tracking-[0.15em] uppercase text-primary">
              <Shield className="w-3 h-3" /> Populärast
            </span>
          )}

          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 border border-primary/50 bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-body text-xs tracking-[0.2em] uppercase text-primary mb-0.5">
                Djupgående detailing
              </p>
              <h4 className="font-display text-xl font-bold leading-none">Premium</h4>
            </div>
          </div>

          <div className="mb-3">
            <span className="font-body text-xs text-muted-foreground">från </span>
            <span className="font-display text-3xl font-bold text-gold-gradient">
              {premiumPrice}
            </span>
            <span className="font-body text-sm text-muted-foreground"> kr</span>
          </div>

          <div className="flex items-center gap-2 mb-4 text-muted-foreground font-body text-xs">
            <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
            <span>Beräknad tid: 2–5 timmar</span>
          </div>

          <div className="h-px bg-border mb-4" />

          <ul className="space-y-2">
            {premiumFeatures.map((f) => (
              <li
                key={f}
                className="flex items-start gap-2 font-body text-sm text-muted-foreground"
              >
                <Check className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </button>
      </div>

      <NavButtons onBack={onBack} onNext={onNext} />
    </StepContainer>
  );
}