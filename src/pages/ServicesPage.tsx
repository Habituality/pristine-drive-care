import { Car, Check, Clock, ArrowRight, ChevronLeft, Sparkles, Shield, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import afterCar from "@/assets/after-car.jpg";

const packages = [
  {
    tier: "Standard",
    tagline: "Klassisk rekond",
    description: "Professionell bilvård som ger din bil ett fräscht och rent utseende – invändigt och utvändigt.",
    price: 595,
    time: "1–3 timmar",
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
    time: "3–5 timmar",
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

const ServicesPage = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background">

        {/* Header */}
        <div className="pt-24 pb-12 bg-navy-gradient">
          <div className="container mx-auto px-4">
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-body text-sm mb-6">
              <ChevronLeft className="w-4 h-4" /> Tillbaka
            </Link>
            <p className="font-body text-sm tracking-[0.3em] uppercase text-primary mb-3">Tjänster</p>
            <h1 className="font-display text-3xl md:text-5xl font-bold">
              Tjänster & <span className="text-gold-gradient">fördelar</span>
            </h1>
            <p className="mt-4 text-muted-foreground font-body max-w-lg">
              Läs mer om våra tjänster, vad de innebär och vilka fördelar de ger dig som kund.
            </p>
          </div>
        </div>

        {/* Hero image */}
        <div className="relative h-64 md:h-96 overflow-hidden">
          <img src={afterCar} alt="Bil Detailing" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
            <div className="flex items-center gap-3 justify-center">
              <div className="w-10 h-10 border border-primary/50 bg-background/80 backdrop-blur flex items-center justify-center">
                <Car className="w-5 h-5 text-primary" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold">Bil Detailing</h2>
            </div>
          </div>
        </div>

        {/* Why us */}
        <div className="py-16 bg-card">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-border bg-secondary/40 p-6">
                <h3 className="font-display text-lg font-bold mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Problem vi löser
                </h3>
                <ul className="space-y-2.5 font-body text-sm text-muted-foreground">
                  {["Repig och matt lack", "Smutsig interiör", "Fälgar fulla av bromsdamm", "Dålig sikt i rutor"].map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">—</span> {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-primary/30 bg-secondary/40 p-6">
                <h3 className="font-display text-lg font-bold mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  Fördelar
                </h3>
                <ul className="space-y-2.5 font-body text-sm text-muted-foreground">
                  {["Som ny bil-känsla", "Höjer andrahandsvärde", "Skydd mot UV & smuts", "Vi kommer till dig"].map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Package cards */}
        <div className="py-16 bg-navy-gradient">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-12">
              <p className="font-body text-sm tracking-[0.3em] uppercase text-primary mb-3">Välj paket</p>
              <h2 className="font-display text-2xl md:text-4xl font-bold">
                Standard eller <span className="text-gold-gradient">Premium</span>?
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {packages.map((pkg) => (
                <div
                  key={pkg.tier}
                  className={`relative flex flex-col border overflow-hidden group hover:border-primary/60 transition-colors duration-300 ${
                    pkg.accent ? "border-primary/60 bg-card" : "border-border bg-card"
                  }`}
                >
                  {pkg.accent && (
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent" />
                  )}

                  {pkg.accent && (
                    <div className="absolute top-4 right-4">
                      <span className="flex items-center gap-1 px-2.5 py-1 bg-primary/10 border border-primary/30 font-body text-xs tracking-[0.15em] uppercase text-primary">
                        <Shield className="w-3 h-3" /> Populärast
                      </span>
                    </div>
                  )}

                  <div className="p-7 flex flex-col flex-1">

                    <div className="flex items-center gap-3 mb-5">
                      <div className={`w-10 h-10 border flex items-center justify-center shrink-0 ${
                        pkg.accent ? "border-primary/50 bg-primary/10" : "border-border bg-secondary"
                      }`}>
                        <pkg.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-body text-xs tracking-[0.25em] uppercase text-primary mb-0.5">Bil Detailing</p>
                        <h3 className="font-display text-xl font-bold leading-none">{pkg.tier}</h3>
                      </div>
                    </div>

                    <div className="mb-4">
                      <span className="font-body text-xs text-muted-foreground">från </span>
                      <span className={`font-display text-4xl font-bold ${pkg.accent ? "text-gold-gradient" : ""}`}>
                        {pkg.price}
                      </span>
                      <span className="font-body text-sm text-muted-foreground"> kr</span>
                    </div>

                    <p className="font-display text-base font-semibold mb-1">{pkg.tagline}</p>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed mb-5">{pkg.description}</p>

                    <div className="flex items-center gap-2 mb-6 text-muted-foreground font-body text-xs">
                      <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>Beräknad tid: {pkg.time}</span>
                    </div>

                    <div className="h-px bg-border mb-6" />

                    <ul className="space-y-2.5 mb-8 flex-1">
                      {pkg.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 font-body text-sm text-muted-foreground">
                          <Check className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <Link
                      to="/#bokning"
                      className={`mt-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 font-body text-sm font-semibold tracking-[0.15em] uppercase transition-colors group-hover:gap-3 ${
                        pkg.accent
                          ? "bg-primary text-primary-foreground hover:bg-gold-light"
                          : "bg-secondary border border-border text-foreground hover:border-primary hover:text-primary"
                      }`}
                    >
                      Boka {pkg.tier.toLowerCase()}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>

                  </div>

                  {pkg.accent && (
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="py-20 bg-card text-center">
          <h2 className="font-display text-2xl md:text-4xl font-bold mb-4">
            Redo att <span className="text-gold-gradient">boka</span>?
          </h2>
          <p className="text-muted-foreground font-body mb-8 max-w-md mx-auto">
            Konfigurera din tjänst, välj tillägg och boka direkt – vi kommer till dig.
          </p>
          <Link
            to="/#bokning"
            className="inline-flex items-center gap-2 px-10 py-4 bg-primary text-primary-foreground font-body text-sm font-semibold tracking-[0.2em] uppercase hover:bg-gold-light transition-colors"
          >
            Boka nu <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </>
  );
};

export default ServicesPage;