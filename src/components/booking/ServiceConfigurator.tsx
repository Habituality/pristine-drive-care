import { Car, Clock } from "lucide-react";
import { OptionCard, CheckboxCard, SectionLabel, PriceDisplay } from "./BookingUI";
import {
  carSizes,
  carPackages,
  exteriorAddons,
  interiorAddons,
} from "./pricingData";
import type { BookingState } from "./useBookingState";
import { cn } from "@/lib/utils";

interface Props {
  state: BookingState;
  set: <K extends keyof BookingState>(key: K, value: BookingState[K]) => void;

  toggleAddon: (
    key: "carExteriorAddons" | "carInteriorAddons",
    id: string
  ) => void;

  price: number;
  detailingPrice: number;

  hasAnyService: boolean;
  onBook: () => void;
}

const serviceToggles = [
  { key: "enableDetailing" as const, label: "Bil Detailing", icon: Car, time: "1–5 h" },
];

export default function ServiceConfigurator({ state, set, toggleAddon, price, detailingPrice, hasAnyService, onBook }: Props) {
  const showExtAddons = state.carPackage === "ext-int" || state.carPackage === "exterior-only";
  const showIntAddons = state.carPackage === "ext-int" || state.carPackage === "interior-only";
  const sizeIdx = carSizes.findIndex((s) => s.id === state.carSize);

  return (
    <div className="space-y-8">
      {/* Service toggles */}
      <div>
        <SectionLabel>Välj tjänster</SectionLabel>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {serviceToggles.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => set(t.key, !state[t.key])}
              className={cn(
                "flex flex-col items-center gap-2 px-5 py-4 font-body text-sm font-medium tracking-wide uppercase transition-all duration-200 border",
                state[t.key]
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border bg-secondary text-muted-foreground hover:border-primary/50"
              )}
            >
              <t.icon className="w-5 h-5" />
              <span>{t.label}</span>
              <span className="flex items-center gap-1 text-xs normal-case tracking-normal opacity-70">
                <Clock className="w-3 h-3" /> {t.time}
              </span>
            </button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground font-body mt-2">Du kan välja flera tjänster samtidigt</p>
      </div>

      {/* ====== Detailing ====== */}
      {state.enableDetailing && (
        <div className="space-y-6 animate-fade-in-up border border-border p-5 md:p-6 bg-secondary/50">
          <div className="flex items-center gap-2 mb-1">
            <Car className="w-5 h-5 text-primary" />
            <h3 className="font-display text-lg font-bold">Bil Detailing</h3>
            <span className="flex items-center gap-1 text-xs text-muted-foreground font-body ml-1"><Clock className="w-3 h-3" /> 2–5 h</span>
            {detailingPrice > 0 && <span className="ml-auto font-body text-sm text-primary font-semibold">{detailingPrice} kr</span>}
          </div>
          <div>
            <SectionLabel>Bilstorlek</SectionLabel>
            <div className="grid grid-cols-3 gap-3">
              {carSizes.map((s) => (
                <OptionCard key={s.id} label={s.label} detail={s.baseSurcharge > 0 ? `+${s.baseSurcharge} kr` : "Baspris"} selected={state.carSize === s.id} onClick={() => set("carSize", s.id)} />
              ))}
            </div>
          </div>
          <div>
            <SectionLabel>Välj paket</SectionLabel>
            <div className="grid grid-cols-3 gap-3">
              {carPackages.map((p) => (
                <OptionCard key={p.id} label={p.label} detail={`från ${p.base} kr`} selected={state.carPackage === p.id} onClick={() => set("carPackage", p.id)} />
              ))}
            </div>
          </div>
          {showExtAddons && (
            <div>
              <SectionLabel>Exteriör-tillägg</SectionLabel>
              <div className="grid sm:grid-cols-2 gap-3">
                {exteriorAddons.map((a) => (
                  <CheckboxCard key={a.id} label={a.label} price={a.basePrice + a.sizeSurcharge * sizeIdx} checked={state.carExteriorAddons.includes(a.id)} onChange={() => toggleAddon("carExteriorAddons", a.id)} />
                ))}
              </div>
            </div>
          )}
          {showIntAddons && (
            <div>
              <SectionLabel>Interiör-tillägg</SectionLabel>
              <div className="grid sm:grid-cols-2 gap-3">
                {interiorAddons.map((a) => (
                  <CheckboxCard key={a.id} label={a.label} price={a.basePrice + a.sizeSurcharge * sizeIdx} checked={state.carInteriorAddons.includes(a.id)} onChange={() => toggleAddon("carInteriorAddons", a.id)} />
                ))}
              </div>
            </div>
          )}
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
