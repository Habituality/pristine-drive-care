import { Car, Clock } from "lucide-react";
import { OptionCard, SectionLabel, PriceDisplay } from "./BookingUI";
import { carSizes, serviceAreas } from "./pricingData";
import type { BookingState } from "./useBookingState";
import { cn } from "@/lib/utils";

interface Props {
  state: BookingState;
  set: <K extends keyof BookingState>(key: K, value: BookingState[K]) => void;
  price: number;
  detailingPrice: number;
  hasAnyService: boolean;
  onBook: () => void;
}

export default function ServiceConfigurator({ state, set, price, detailingPrice, hasAnyService, onBook }: Props) {
  return (
    <div className="space-y-8">

      {/* ====== Detailing ====== */}
      {state.enableDetailing && (
        <div className="space-y-6 animate-fade-in-up border border-border p-5 md:p-6 bg-secondary/50">
          <div className="flex items-center gap-2 mb-1">
            <Car className="w-5 h-5 text-primary" />
            <h3 className="font-display text-lg font-bold">Bil Detailing</h3>
            <span className="flex items-center gap-1 text-xs text-muted-foreground font-body ml-1">
              <Clock className="w-3 h-3" /> 1–5 h
            </span>
            {detailingPrice > 0 && (
              <span className="ml-auto font-body text-sm text-primary font-semibold">{detailingPrice} kr</span>
            )}
          </div>

          {/* Premium toggle */}
          <div>
            <SectionLabel>Nivå</SectionLabel>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => set("isPremium", false)}
                className={cn(
                  "border p-4 text-left transition",
                  !state.isPremium ? "border-primary bg-primary/10" : "border-border"
                )}
              >
                <p className="font-semibold">Standard</p>
                <p className="text-xs text-muted-foreground mt-1">Klassisk rekond för vardagsbil.</p>
              </button>
              <button
                type="button"
                onClick={() => set("isPremium", true)}
                className={cn(
                  "border p-4 text-left transition",
                  state.isPremium ? "border-primary bg-primary/10" : "border-border"
                )}
              >
                <p className="font-semibold text-primary">Premium</p>
                <p className="text-xs text-muted-foreground mt-1">Djupgående detailing + skydd.</p>
              </button>
            </div>
          </div>

          {/* Service area */}
          <div>
            <SectionLabel>Tjänst</SectionLabel>
            <div className="grid grid-cols-3 gap-3">
              {serviceAreas.map((a) => (
                <OptionCard
                  key={a.id}
                  label={a.label}
                  selected={state.serviceArea === a.id}
                  onClick={() => set("serviceArea", a.id)}
                />
              ))}
            </div>
          </div>

          {/* Car size */}
          <div>
            <SectionLabel>Bilstorlek</SectionLabel>
            <div className="grid grid-cols-3 gap-3">
              {carSizes.map((s) => (
                <OptionCard
                  key={s.id}
                  label={s.label}
                  detail={s.surcharge > 0 ? `+${s.surcharge} kr` : "Baspris"}
                  selected={state.carSize === s.id}
                  onClick={() => set("carSize", s.id)}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Total Price + CTA */}
      {hasAnyService && (
        <>
          <PriceDisplay price={price} />
          <button
            type="button"
            onClick={onBook}
            className="w-full px-8 py-4 bg-primary text-primary-foreground font-body text-sm font-semibold tracking-[0.2em] uppercase hover:bg-gold-light transition-colors"
          >
            Boka nu
          </button>
        </>
      )}
    </div>
  );
}