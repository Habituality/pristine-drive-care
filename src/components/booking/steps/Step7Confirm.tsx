import { format } from "date-fns";
import { sv } from "date-fns/locale";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

import type { BookingState } from "../useBookingState";
import { carSizes, serviceAreas } from "../pricingData";
import { StepHeader, NavButtons, StepContainer } from "../WizardUI";

interface Props {
  state: BookingState;
  price: number;
  isSubmitting: boolean;
  onToggleTerms: () => void;
  onBack: () => void;
  onSubmit: () => void;
  totalSteps: number;
  stepNumber: number;
}

interface SummaryRowProps {
  label: string;
  value: string;
}

const SummaryRow = ({ label, value }: SummaryRowProps) => (
  <div className="flex justify-between items-start gap-4 py-2.5 border-b border-border last:border-0">
    <span className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground shrink-0">
      {label}
    </span>
    <span className="font-body text-sm text-foreground text-right">{value}</span>
  </div>
);

export default function Step7Confirm({
  state,
  price,
  isSubmitting,
  onToggleTerms,
  onBack,
  onSubmit,
  totalSteps,
  stepNumber,
}: Props) {
  const sizeLabel = carSizes.find((s) => s.id === state.carSize)?.label ?? state.carSize;
  const areaLabel =
    serviceAreas.find((a) => a.id === state.serviceArea)?.label ?? state.serviceArea;
  const formattedDate = state.date
    ? format(new Date(state.date), "EEEE d MMMM yyyy", { locale: sv })
    : "—";

  return (
    <StepContainer stepKey="step7">
      <StepHeader
        step={stepNumber}
        totalSteps={totalSteps}
        title="Granska & bekräfta"
        subtitle="Kontrollera att allt stämmer innan du skickar bokningen."
      />

      {/* Summary card */}
      <div className="border border-border bg-secondary/40 p-5 md:p-6 mb-6">
        <p className="font-body text-xs tracking-[0.2em] uppercase text-primary mb-4">
          Din bokning
        </p>

        <div className="space-y-0 mb-5">
          <SummaryRow label="Tjänst" value={areaLabel} />
          <SummaryRow label="Paket" value={state.isPremium ? "Premium" : "Standard"} />
          <SummaryRow label="Bilstorlek" value={sizeLabel} />
          <SummaryRow label="Datum" value={formattedDate} />
          <SummaryRow label="Tid" value={state.time || "—"} />
          <SummaryRow label="Adress" value={state.address || "—"} />
          <SummaryRow label="Namn" value={state.name || "—"} />
          <SummaryRow label="Telefon" value={state.phone || "—"} />
          <SummaryRow label="E-post" value={state.email || "—"} />
          {state.comments && <SummaryRow label="Kommentar" value={state.comments} />}
        </div>

        <div className="border-t border-primary/30 pt-4 flex items-center justify-between">
          <span className="font-body text-xs tracking-[0.2em] uppercase text-primary">
            Totalt
          </span>
          <span className="font-display text-3xl font-bold text-gold-gradient">
            {price} kr
          </span>
        </div>
      </div>

      {/* Terms checkbox */}
      <button
        type="button"
        onClick={onToggleTerms}
        className={cn(
          "w-full flex items-start gap-3 p-4 border text-left transition-colors",
          state.acceptedTerms
            ? "border-primary bg-primary/5"
            : "border-border bg-secondary hover:border-primary/40"
        )}
      >
        <span
          className={cn(
            "w-5 h-5 border flex items-center justify-center shrink-0 mt-0.5 transition-colors",
            state.acceptedTerms ? "border-primary bg-primary" : "border-muted-foreground"
          )}
        >
          {state.acceptedTerms && (
            <Check className="w-3 h-3 text-primary-foreground" strokeWidth={3} />
          )}
        </span>
        <span className="font-body text-sm text-foreground leading-relaxed">
          Jag godkänner{" "}
          <a
            href="/integritetspolicy"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-primary underline hover:text-gold-light transition-colors"
          >
            bokningsvillkoren
          </a>{" "}
          och bekräftar att uppgifterna stämmer.
        </span>
      </button>

      <NavButtons
        onBack={onBack}
        onNext={onSubmit}
        nextLabel="Bekräfta bokning"
        nextDisabled={!state.acceptedTerms}
        isSubmitting={isSubmitting}
      />
    </StepContainer>
  );
}