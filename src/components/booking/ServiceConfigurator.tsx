import { Car, Home, Trees, Clock } from "lucide-react";
import { OptionCard, CheckboxCard, SectionLabel, PriceDisplay } from "./BookingUI";
import {
  carSizes, carPackages, exteriorAddons, interiorAddons,
  drivewayAddons,
  deckMaterials, deckSizes, deckAddons,
} from "./pricingData";
import type { BookingState } from "./useBookingState";
import { cn } from "@/lib/utils";

interface Props {
  state: BookingState;
  set: <K extends keyof BookingState>(key: K, value: BookingState[K]) => void;
  toggleAddon: (key: "carExteriorAddons" | "carInteriorAddons" | "drivewayAddons" | "deckAddons", id: string) => void;
  price: number;
  detailingPrice: number;
  drivewayPrice: number;
  deckPrice: number;
  hasAnyService: boolean;
  onBook: () => void;
}

const serviceToggles = [
  { key: "enableDetailing" as const, label: "Bil Detailing", icon: Car, time: "2–5 h" },
  { key: "enableDriveway" as const, label: "Uppfart", icon: Home, time: "1–3 h" },
  { key: "enableDeck" as const, label: "Altan", icon: Trees, time: "1–3 h" },
];

export default function ServiceConfigurator({ state, set, toggleAddon, price, detailingPrice, drivewayPrice, deckPrice, hasAnyService, onBook }: Props) {
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

      {/* ====== Driveway ====== */}
      {state.enableDriveway && (
        <div className="space-y-6 animate-fade-in-up border border-border p-5 md:p-6 bg-secondary/50">
          <div className="flex items-center gap-2 mb-1">
            <Home className="w-5 h-5 text-primary" />
            <h3 className="font-display text-lg font-bold">Uppfart</h3>
            <span className="flex items-center gap-1 text-xs text-muted-foreground font-body ml-1"><Clock className="w-3 h-3" /> 1–3 h</span>
            {drivewayPrice > 0 && <span className="ml-auto font-body text-sm text-primary font-semibold">{drivewayPrice} kr</span>}
          </div>
          <div>
            <SectionLabel>Paket: Högtryckstvätt med rengöringsmedel</SectionLabel>
          </div>
          <div>
            <SectionLabel>Yta (m²)</SectionLabel>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min={5}
                max={100}
                step={1}
                value={state.drivewaySqm}
                onChange={(e) => set("drivewaySqm", Number(e.target.value))}
                className="w-full accent-primary"
              />
              <span className="font-body text-sm font-semibold text-foreground min-w-[4rem] text-right">{state.drivewaySqm} m²</span>
            </div>
          </div>
          <div>
            <SectionLabel>Tillägg</SectionLabel>
            <div className="grid sm:grid-cols-2 gap-3">
              {drivewayAddons.map((a) => (
                <CheckboxCard key={a.id} label={a.label} price={a.price} checked={state.drivewayAddons.includes(a.id)} onChange={() => toggleAddon("drivewayAddons", a.id)} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ====== Deck ====== */}
      {state.enableDeck && (
        <div className="space-y-6 animate-fade-in-up border border-border p-5 md:p-6 bg-secondary/50">
          <div className="flex items-center gap-2 mb-1">
            <Trees className="w-5 h-5 text-primary" />
            <h3 className="font-display text-lg font-bold">Altan</h3>
            <span className="flex items-center gap-1 text-xs text-muted-foreground font-body ml-1"><Clock className="w-3 h-3" /> 1–3 h</span>
            {deckPrice > 0 && <span className="ml-auto font-body text-sm text-primary font-semibold">{deckPrice} kr</span>}
          </div>
          <div>
            <SectionLabel>Paket: Högtryckstvätt med rengöringsmedel</SectionLabel>
          </div>
          <div>
            <SectionLabel>Material</SectionLabel>
            <div className="grid grid-cols-2 gap-3">
              {deckMaterials.map((m) => (
                <OptionCard key={m.id} label={m.label} selected={state.deckMaterial === m.id} onClick={() => set("deckMaterial", m.id)} />
              ))}
            </div>
          </div>
          <div>
            <SectionLabel>Storlek</SectionLabel>
            <div className="grid grid-cols-3 gap-3">
              {deckSizes.map((s) => (
                <OptionCard key={s.id} label={s.label} selected={state.deckSize === s.id} onClick={() => set("deckSize", s.id)} />
              ))}
            </div>
          </div>
          <div>
            <SectionLabel>Tillägg</SectionLabel>
            <div className="grid sm:grid-cols-2 gap-3">
              {deckAddons.map((a) => (
                <CheckboxCard key={a.id} label={a.label} price={a.price} checked={state.deckAddons.includes(a.id)} onChange={() => toggleAddon("deckAddons", a.id)} />
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
