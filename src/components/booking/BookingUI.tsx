import { cn } from "@/lib/utils";

interface OptionCardProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  detail?: string;
}

export const OptionCard = ({ label, selected, onClick, detail }: OptionCardProps) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      "px-4 py-3 border text-left font-body text-sm transition-all duration-200",
      selected
        ? "border-primary bg-primary/10 text-foreground"
        : "border-border bg-secondary text-muted-foreground hover:border-primary/40"
    )}
  >
    <span className="block font-medium">{label}</span>
    {detail && <span className="block text-xs mt-0.5 opacity-70">{detail}</span>}
  </button>
);

interface CheckboxCardProps {
  label: string;
  price: number;
  checked: boolean;
  onChange: () => void;
}

export const CheckboxCard = ({ label, price, checked, onChange }: CheckboxCardProps) => (
  <button
    type="button"
    onClick={onChange}
    className={cn(
      "flex items-center justify-between px-4 py-3 border font-body text-sm transition-all duration-200",
      checked
        ? "border-primary bg-primary/10 text-foreground"
        : "border-border bg-secondary text-muted-foreground hover:border-primary/40"
    )}
  >
    <span className="flex items-center gap-2">
      <span
        className={cn(
          "w-4 h-4 border flex items-center justify-center transition-colors",
          checked ? "border-primary bg-primary" : "border-muted-foreground"
        )}
      >
        {checked && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4L3.5 6.5L9 1" stroke="hsl(220, 30%, 7%)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      {label}
    </span>
    <span className="text-primary font-medium">+{price} kr</span>
  </button>
);

export const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="font-body text-xs tracking-[0.2em] uppercase text-primary mb-2">{children}</p>
);

export const PriceDisplay = ({ price }: { price: number }) => (
  <div className="border border-primary/30 bg-secondary p-5 text-center">
    <p className="font-body text-xs tracking-[0.2em] uppercase text-primary mb-1">Totalt pris</p>
    <p className="font-display text-4xl font-bold text-gold-gradient">{price} kr</p>
    <p className="font-body text-xs text-muted-foreground mt-1">Inga dolda avgifter</p>
  </div>
);
