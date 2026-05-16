import { Car, Check, Clock, ArrowRight, Sparkles, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const packages = [
  {
    tier: "Standard",
    tagline: "Klassisk rekond",
    description: "Professionell bilvård som ger din bil ett fräscht och rent utseende – invändigt och utvändigt.",
    price: 595,
    time: "1–4 timmar",
    icon: Car,
    accent: false,
    features: [
      "Utvändig handtvätt & torkning",
      "Fälg- & däckrengöring",
      "Invändig dammsugning & avtorkning",
      "Fönsterputs in- & utsida",
      "Doftfräschning",
    ],
  },
  {
    tier: "Premium",
    tagline: "Djupgående detailing",
    description: "Showroom-resultat med premiumprodukter. Lackskydd, djuprengöring och behandling som håller länge.",
    price: 1195,
    time: "2–5 timmar",
    icon: Sparkles,
    accent: true,
    features: [
      "Allt i Standard",
      "Clay Bar-behandling",
      "Vaxning & lackskydd",
      "Läder- & textilrengöring",
      "Motorrumsrengöring",
      "UV-skydd & glansbehandling",
    ],
  },
];

const ServicesSection = () => {
  return (
    <section id="tjanster" className="py-24 bg-navy-gradient">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-body text-sm tracking-[0.3em] uppercase text-primary mb-3">
            Våra tjänster
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            Kvalitet i varje <span className="text-gold-gradient">detalj</span>
          </h2>
          <p className="mt-4 text-muted-foreground font-body max-w-lg mx-auto">
            Exklusiv bilvård på plats – för dig som vill ha en ren, skyddad och välvårdad bil utan att lyfta ett finger.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {packages.map((pkg) => (
            <div
              key={pkg.tier}
              className={`relative flex flex-col border ${
                pkg.accent
                  ? "border-primary/60 bg-card"
                  : "border-border bg-card"
              } overflow-hidden group hover:border-primary/60 transition-colors duration-300`}
            >

              {/* Top accent bar */}
              {pkg.accent && (
                <div className="h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent" />
              )}

              {/* Badge */}
              {pkg.accent && (
                <div className="absolute top-4 right-4">
                  <span className="flex items-center gap-1 px-2.5 py-1 bg-primary/10 border border-primary/30 font-body text-xs tracking-[0.15em] uppercase text-primary">
                    <Shield className="w-3 h-3" /> Populärast
                  </span>
                </div>
              )}

              <div className="p-7 flex flex-col flex-1">

                {/* Icon + Tier */}
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-10 h-10 border flex items-center justify-center shrink-0 ${
                    pkg.accent ? "border-primary/50 bg-primary/10" : "border-border bg-secondary"
                  }`}>
                    <pkg.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-body text-xs tracking-[0.25em] uppercase text-primary mb-0.5">
                      Bil Detailing
                    </p>
                    <h3 className="font-display text-xl font-bold leading-none">
                      {pkg.tier}
                    </h3>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <span className="font-body text-xs text-muted-foreground">från </span>
                  <span className={`font-display text-4xl font-bold ${pkg.accent ? "text-gold-gradient" : ""}`}>
                    {pkg.price}
                  </span>
                  <span className="font-body text-sm text-muted-foreground"> kr</span>
                </div>

                {/* Tagline + desc */}
                <p className="font-display text-base font-semibold mb-1">{pkg.tagline}</p>
                <p className="font-body text-sm text-muted-foreground leading-relaxed mb-5">
                  {pkg.description}
                </p>

                {/* Time */}
                <div className="flex items-center gap-2 mb-6 text-muted-foreground font-body text-xs">
                  <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span>Beräknad tid: {pkg.time}</span>
                </div>

                {/* Divider */}
                <div className="h-px bg-border mb-6" />

                {/* Features */}
                <ul className="space-y-2.5 mb-8 flex-1">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 font-body text-sm text-muted-foreground">
                      <Check className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#bokning"
                  className={`mt-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 font-body text-sm font-semibold tracking-[0.15em] uppercase transition-colors group-hover:gap-3 ${
                    pkg.accent
                      ? "bg-primary text-primary-foreground hover:bg-gold-light"
                      : "bg-secondary border border-border text-foreground hover:border-primary hover:text-primary"
                  }`}
                >
                  Boka {pkg.tier.toLowerCase()}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </a>

              </div>

              {/* Bottom accent bar for premium */}
              {pkg.accent && (
                <div className="h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent" />
              )}

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;