import { Car, Home, Trees } from "lucide-react";
import { OptionCard, CheckboxCard, SectionLabel, PriceDisplay } from "./BookingUI";
import {
  carSizes, carPackages, exteriorAddons, interiorAddons,
  drivewaySizes, drivewayPackages, drivewayAddons,
  deckMaterials, deckSizes, deckPackages, deckAddons,
} from "./pricingData";
import type { BookingState } from "./useBookingState";
import { cn } from "@/lib/utils";

interface Props {
  state: BookingState;
  set: <K extends keyof BookingState>(key: K, value: BookingState[K]) => void;
  toggleAddon: (key: "carExteriorAddons" | "carInteriorAddons" | "drivewayAddons" | "deckAddons", id: string) => void;
  price: number;
  onBook: () => void;
}

const tabs = [
  { id: "detailing" as const, label: "Bil Detailing", icon: Car },
  { id: "driveway" as const, label: "Uppfart", icon: Home },
  { id: "deck" as const, label: "Altan", icon: Trees },
];

export default function ServiceConfigurator({ state, set, toggleAddon, price, onBook }: Props) {
  const showExtAddons = state.carPackage.includes("exterior") || state.carPackage.startsWith("full");
  const showIntAddons = state.carPackage.includes("interior") || state.carPackage.startsWith("full");

  return (
    <div className="space-y-8">
      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => set("service", t.id)}
            className={cn(
              "flex items-center gap-2 px-5 py-3 font-body text-sm font-medium tracking-wide uppercase transition-all duration-200 border",
              state.service === t.id
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-secondary text-muted-foreground hover:border-primary/50"
            )}
          >
            <t.icon className="w-4 h-4" />
            {t.label}
          </button>
        ))}
      </div>

      {/* ====== Detailing ====== */}
      {state.service === "detailing" && (
        <div className="space-y-6 animate-fade-in-up">
          <div>
            <SectionLabel>Bilstorlek</SectionLabel>
            <div className="grid grid-cols-3 gap-3">
              {carSizes.map((s) => (
                <OptionCard key={s.id} label={s.label} selected={state.carSize === s.id} onClick={() => set("carSize", s.id)} />
              ))}
            </div>
          </div>
          <div>
            <SectionLabel>Välj paket</SectionLabel>
            <div className="grid grid-cols-2 gap-3">
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
                  <CheckboxCard key={a.id} label={a.label} price={a.price} checked={state.carExteriorAddons.includes(a.id)} onChange={() => toggleAddon("carExteriorAddons", a.id)} />
                ))}
              </div>
            </div>
          )}
          {showIntAddons && (
            <div>
              <SectionLabel>Interiör-tillägg</SectionLabel>
              <div className="grid sm:grid-cols-2 gap-3">
                {interiorAddons.map((a) => (
                  <CheckboxCard key={a.id} label={a.label} price={a.price} checked={state.carInteriorAddons.includes(a.id)} onChange={() => toggleAddon("carInteriorAddons", a.id)} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ====== Driveway ====== */}
      {state.service === "driveway" && (
        <div className="space-y-6 animate-fade-in-up">
          <div>
            <SectionLabel>Storlek</SectionLabel>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {drivewaySizes.map((s) => (
                <OptionCard key={s.id} label={s.label} selected={state.drivewaySize === s.id} onClick={() => set("drivewaySize", s.id)} />
              ))}
            </div>
          </div>
          <div>
            <SectionLabel>Paket</SectionLabel>
            <div className="grid grid-cols-3 gap-3">
              {drivewayPackages.map((p) => (
                <OptionCard key={p.id} label={p.label} detail={`från ${p.base} kr`} selected={state.drivewayPackage === p.id} onClick={() => set("drivewayPackage", p.id)} />
              ))}
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
      {state.service === "deck" && (
        <div className="space-y-6 animate-fade-in-up">
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
            <SectionLabel>Paket</SectionLabel>
            <div className="grid grid-cols-3 gap-3">
              {deckPackages.map((p) => (
                <OptionCard key={p.id} label={p.label} detail={`från ${p.base} kr`} selected={state.deckPackage === p.id} onClick={() => set("deckPackage", p.id)} />
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

      {/* Price + CTA */}
      <PriceDisplay price={price} />
      <button
        type="button"
        onClick={onBook}
        className="w-full px-8 py-4 bg-primary text-primary-foreground font-body text-sm font-semibold tracking-[0.2em] uppercase hover:bg-gold-light transition-colors"
      >
        Boka nu
      </button>
    </div>
  );
}
