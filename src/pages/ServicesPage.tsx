import { Car, Check, Clock, Sparkles, ShieldCheck, ArrowRight, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import afterCar from "@/assets/after-car.jpg";
import serviceDetailing from "@/assets/service-detailing.jpg";


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

      {/* Premium Service Section */}
<div className="py-16">
  <div className="container mx-auto px-4 max-w-3xl">

    <div className="relative overflow-hidden border border-border bg-card">

      {/* HERO IMAGE */}
      <div className="relative h-[420px]">
        <img
          src={afterCar}
          alt="Bil Detailing"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />

        <div className="absolute bottom-6 left-6 flex items-center gap-3">
          <div className="w-12 h-12 border border-primary/50 bg-background/80 backdrop-blur flex items-center justify-center">
            <Car className="w-6 h-6 text-primary" />
          </div>
          <h2 className="font-display text-2xl md:text-4xl font-bold">
            Bil Detailing
          </h2>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-6 md:p-10 space-y-10">

        {/* DESCRIPTION */}
        <p className="text-muted-foreground font-body text-lg leading-relaxed">
          Vår professionella bildetailing ger din bil ett showroom-resultat. Vi behandlar både exteriör och interiör med premiumprodukter och noggranna tekniker som skyddar lacken och ger en djup glans.
        </p>

        {/* 2 KORT: PROBLEM + FÖRDELAR */}
        <div className="grid md:grid-cols-2 gap-6">

          <div className="border border-border bg-secondary/40 p-6">
            <h3 className="font-display text-lg font-bold mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Problem vi löser
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground font-body">
              <li>Repig och matt lack</li>
              <li>Smutsig interiör</li>
              <li>Fälgar fulla av bromsdamm</li>
              <li>Dålig sikt i rutor</li>
            </ul>
          </div>

          <div className="border border-primary/30 bg-secondary/40 p-6">
            <h3 className="font-display text-lg font-bold mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary" />
              Fördelar
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground font-body">
              <li>Som ny bil-känsla</li>
              <li>Höjer andrahandsvärde</li>
              <li>Skydd mot UV & smuts</li>
              <li>Vi kommer till dig</li>
            </ul>
          </div>

        </div>

        {/* PACKAGE */}
        <div className="border border-border bg-secondary/50 p-6 md:p-8">

          <div className="flex items-center justify-between mb-2">
            <p className="text-xs uppercase tracking-[0.2em] text-primary font-body">
              Exteriör + Interiör
            </p>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="w-3.5 h-3.5 text-primary" />
              2–5 timmar
            </div>
          </div>

          <p className="font-display text-2xl font-bold mb-4">
            från 1 095 kr
          </p>

          <div className="grid sm:grid-cols-2 gap-2 text-sm text-muted-foreground font-body">
            <div>✓ Handtvätt & torkning</div>
            <div>✓ Fälgrengöring</div>
            <div>✓ Invändig rengöring</div>
            <div>✓ Fönsterputs</div>
          </div>
        </div>

        {/* CTA */}
        <Link
          to="/#bokning"
          className="inline-flex items-center justify-center gap-2 w-full px-8 py-4 bg-primary text-primary-foreground font-body text-sm font-semibold tracking-[0.2em] uppercase hover:bg-gold-light transition-colors"
        >
          Boka nu <ArrowRight className="w-4 h-4" />
        </Link>

      </div>
    </div>
  </div>
</div>

      {/* CTA */}
      <div className="py-20 bg-navy-gradient text-center">
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
