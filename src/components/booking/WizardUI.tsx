import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepHeaderProps {
  step: number;
  totalSteps: number;
  title: string;
  subtitle?: string;
}

export const StepHeader = ({ step, totalSteps, title, subtitle }: StepHeaderProps) => {
  const progress = (step / totalSteps) * 100;
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <p className="font-body text-xs tracking-[0.2em] uppercase text-primary">
          Steg {step} av {totalSteps}
        </p>
        <p className="font-body text-xs text-muted-foreground">
          {Math.round(progress)}%
        </p>
      </div>
      <div className="h-[2px] w-full bg-border overflow-hidden mb-6">
        <div
          className="h-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <h3 className="font-display text-2xl md:text-3xl font-bold mb-2">{title}</h3>
      {subtitle && (
        <p className="font-body text-sm text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
};

interface NavButtonsProps {
  onBack?: () => void;
  onNext: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  isSubmitting?: boolean;
  showBack?: boolean;
}

export const NavButtons = ({
  onBack,
  onNext,
  nextLabel = "Nästa",
  nextDisabled = false,
  isSubmitting = false,
  showBack = true,
}: NavButtonsProps) => {
  return (
    <div className="flex gap-3 mt-8">
      {showBack && onBack && (
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="flex items-center gap-2 px-5 py-3.5 border border-border bg-secondary text-muted-foreground font-body text-sm font-semibold tracking-[0.15em] uppercase hover:text-foreground hover:border-primary/40 transition-colors disabled:opacity-50"
        >
          <ChevronLeft className="w-4 h-4" />
          Tillbaka
        </button>
      )}
      <button
        type="button"
        onClick={onNext}
        disabled={nextDisabled || isSubmitting}
        className={cn(
          "flex-1 flex items-center justify-center gap-2 py-3.5 font-body text-sm font-semibold tracking-[0.15em] uppercase transition-colors",
          nextDisabled || isSubmitting
            ? "bg-muted text-muted-foreground cursor-not-allowed"
            : "bg-primary text-primary-foreground hover:bg-gold-light"
        )}
      >
        {isSubmitting ? "Skickar..." : nextLabel}
        {!isSubmitting && <ChevronRight className="w-4 h-4" />}
      </button>
    </div>
  );
};

interface StickyPriceBarProps {
  price: number;
  visible: boolean;
}

export const StickyPriceBar = ({ price, visible }: StickyPriceBarProps) => {
  if (!visible) return null;
  return (
    <div className="sticky top-16 z-20 -mx-4 px-4 py-3 bg-card/95 backdrop-blur-md border-b border-border mb-6">
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground">
          Ditt pris
        </p>
        <p className="font-display text-2xl font-bold text-gold-gradient">
          {price} kr
        </p>
      </div>
    </div>
  );
};

interface StepContainerProps {
  children: React.ReactNode;
  stepKey: string | number;
}

/**
 * Wraps step content with a fade/slide animation keyed by stepKey
 * so it remounts and re-animates whenever the step changes.
 */
export const StepContainer = ({ children, stepKey }: StepContainerProps) => (
  <div
    key={stepKey}
    className="animate-fade-in-up"
    style={{ animationDuration: "300ms" }}
  >
    {children}
  </div>
);