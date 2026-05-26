import { Sparkles, ArrowRight, Check } from "lucide-react";
import type { ServiceArea } from "@/lib/priceEngine";
import { calculatePrice } from "@/lib/priceEngine";
import type { CarSizeId } from "../pricingData";
import { StepHeader, StepContainer } from "../WizardUI";

interface Props {
  serviceArea: ServiceArea;
  carSize: CarSizeId;
  onAccept: () => void;
  onDecline: () => void;
  onBack: () => void;
  totalSteps: number;
  stepNumber: number;
}

const premiumExtras = [
  "Clay Bar-behandling",
  "Vaxning & lackskydd",
  "Läder- & textilrengöring",
  "Motorrumsrengöring",
  "UV-skydd & glansbehandling",
];

export default function StepUpsell({
  serviceArea,
  carSize,
  onAccept,
  onDecline,
  onBack,
  totalSteps,
  stepNumber,
}: Props) {
  const standardPrice = calculatePrice(serviceArea, false, carSize);
  const premiumPrice = calculatePrice(serviceArea, true, carSize);
  const diff = premiumPrice - standardPrice;

  return (
    <StepContainer stepKey="upsell">
      <StepHeader
        step={stepNumber}
        totalSteps={totalSteps}
        title="Vill du uppgradera?"
        subtitle="Få showroom-resultat och lackskydd som håller länge."
      />

      <div className="border border-primary/40 bg-primary/5 p-6 md:p-8">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 border border-primary/50 bg-primary/10 flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="font-body text-xs tracking-[0.2em] uppercase text-primary mb-0.5">
              Uppgradering
            </p>
            <h4 className="font-display text-2xl font-bold leading-tight">
              Premium — endast {diff} kr mer
            </h4>
          </div>
        </div>

        <p className="font-body text-sm text-muted-foreground mb-5 leading-relaxed">
          Få djupgående detailing med premiumprodukter. Skyddet håller flera månader
          och bilen håller sig ren längre.
        </p>

        <div className="border-t border-primary/20 pt-5 mb-6">
          <p className="font-body text-xs tracking-[0.2em] uppercase text-primary mb-3">
            Du får dessutom
          </p>
          <ul className="grid sm:grid-cols-2 gap-2">
            {premiumExtras.map((f) => (
              <li
                key={f}
                className="flex items-start gap-2 font-body text-sm text-foreground"
              >
                <Check className="w-3.5 h-3.5 text-primary mt-1 shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-between border-t border-primary/20 pt-5 mb-6">
          <div>
            <p className="font-body text-xs text-muted-foreground">Nytt totalpris</p>
            <p className="font-display text-3xl font-bold text-gold-gradient">
              {premiumPrice} kr
            </p>
          </div>
          <div className="text-right">
            <p className="font-body text-xs text-muted-foreground">Tillägg</p>
            <p className="font-display text-xl font-bold text-primary">+{diff} kr</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={onDecline}
            className="flex-1 px-5 py-3.5 border border-border bg-secondary text-muted-foreground font-body text-sm font-semibold tracking-[0.15em] uppercase hover:text-foreground hover:border-primary/40 transition-colors"
          >
            Nej tack, fortsätt
          </button>
          <button
            type="button"
            onClick={onAccept}
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 bg-primary text-primary-foreground font-body text-sm font-semibold tracking-[0.15em] uppercase hover:bg-gold-light transition-colors"
          >
            Ja, uppgradera
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={onBack}
        className="mt-6 font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        ← Tillbaka
      </button>
    </StepContainer>
  );
}