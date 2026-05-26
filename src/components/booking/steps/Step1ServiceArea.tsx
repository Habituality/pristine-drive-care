import { Car, Sparkles, Sofa, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ServiceArea } from "@/lib/priceEngine";
import { StepHeader, NavButtons, StepContainer } from "../WizardUI";

interface Props {
  selected: ServiceArea;
  onSelect: (area: ServiceArea) => void;
  onNext: () => void;
  totalSteps: number;
}

const options: { id: ServiceArea; label: string; description: string; icon: typeof Car }[] = [
  {
    id: "ext-int",
    label: "Exteriör + Interiör",
    description: "Komplett rekond — både ut- och invändigt.",
    icon: Sparkles,
  },
  {
    id: "exterior-only",
    label: "Endast Exteriör",
    description: "Handtvätt, fälgar, fönster och torkning.",
    icon: Car,
  },
  {
    id: "interior-only",
    label: "Endast Interiör",
    description: "Dammsugning, avtorkning och fönsterputs invändigt.",
    icon: Sofa,
  },
];

export default function Step1ServiceArea({ selected, onSelect, onNext, totalSteps }: Props) {
  return (
    <StepContainer stepKey="step1">
      <StepHeader
        step={1}
        totalSteps={totalSteps}
        title="Vilken tjänst vill du boka?"
        subtitle="Välj det område vi ska ta hand om."
      />

      <div className="grid gap-3 sm:grid-cols-3">
        {options.map((opt) => {
          const Icon = opt.icon;
          const isSelected = selected === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onSelect(opt.id)}
              className={cn(
                "relative text-left p-5 border transition-all duration-200 flex flex-col items-start gap-3 min-h-[160px]",
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
              <div
                className={cn(
                  "w-10 h-10 border flex items-center justify-center shrink-0",
                  isSelected ? "border-primary/50 bg-primary/10" : "border-border bg-card"
                )}
              >
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-display text-lg font-bold mb-1">{opt.label}</p>
                <p className="font-body text-xs text-muted-foreground leading-relaxed">
                  {opt.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <NavButtons onNext={onNext} showBack={false} />
    </StepContainer>
  );
}