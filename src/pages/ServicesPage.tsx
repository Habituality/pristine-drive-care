import { Car, Home, Trees, Check, Clock, Sparkles, ShieldCheck, ArrowRight, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import afterCar from "@/assets/after-car.jpg";
import afterDriveway from "@/assets/after-driveway.jpg";
import afterDeck from "@/assets/after-deck.jpg";
import serviceDetailing from "@/assets/service-detailing.jpg";
import serviceDriveway from "@/assets/service-driveway.jpg";
import galleryDeck from "@/assets/gallery-deck.jpg";

const services = [
  {
    icon: Car,
    title: "Bil Detailing",
    hero: afterCar,
    description:
      "Vår professionella bildetailing ger din bil ett showroom-resultat. Vi behandlar både exteriör och interiör med premiumprodukter och noggranna tekniker som skyddar lacken och ger en djup glans.",
    problems: [
      "Repig och matt lack efter vinter och vägsalt",
      "Smutsig och illaluktande interiör",
      "Fälgar och däck fulla av bromsbelägg",
      "Fönster med fläckar och nedsatt sikt",
    ],
    benefits: [
      "Bilen ser ut som ny – höjer andrahandsvärdet",
      "Skyddar lacken mot UV, smuts och oxidering",
      "Vi kommer till dig – ingen tid borta",
      "Miljövänliga produkter som är skonsamma mot ytan",
    ],
    packages: [
      {
        name: "Exteriör + Interiör",
        price: "från 1 095 kr",
        time: "2–5 timmar",
        features: [
          "Utvändig handtvätt & torkning",
          "Fälg- & däckrengöring",
          "Invändig dammsugning & avtorkning",
          "Fönsterputs in- & utsida",
        ],
      },
    ],
    addons: [
      { name: "Clay Bar-behandling", desc: "Avlägsnar inbäddade föroreningar och skapar en slät yta inför vaxning." },
      { name: "Vaxning & lackskydd", desc: "Skapar ett skyddande lager som ger djup glans och skyddar mot väder." },
      { name: "Läderrengöring", desc: "Rengör och återfuktar lädersäten för att förhindra sprickor och slitage." },
      { name: "Textil- & vinylrengöring", desc: "Djuprengör textil- och vinylytor, tar bort fläckar och lukt." },
    ],
    gallery: [serviceDetailing],
  },
  {
    icon: Home,
    title: "Uppfartstvätt",
    hero: afterDriveway,
    description:
      "Vår högtryckstvätt med professionella rengöringsmedel tar bort år av smuts, mossa och alger. Resultatet: en uppfart som ser ut som nylagd.",
    problems: [
      "Mossa och alger som gör ytan hal och ful",
      "Ingrodd smuts och oljefläckar",
      "Ogräs i fogar som breder ut sig",
      "Missfärgade plattor som drar ner helhetsintrycket",
    ],
    benefits: [
      "Ökar fastighetens attraktivitet och värde",
      "Förhindrar halkolyckor från mossa",
      "Förlänger livslängden på sten och plattor",
      "Proffsigt resultat utan att du lyfter ett finger",
    ],
    packages: [
      {
        name: "Högtryckstvätt",
        price: "från 400 kr + 30 kr/m²",
        time: "1–3 timmar",
        features: [
          "Högtryckstvätt med rengöringsmedel",
          "Ogräs- & smutsborttagning",
          "Anpassat efter ytmaterial",
        ],
      },
    ],
    addons: [
      { name: "Moss- & Algrengöring", desc: "Djupverkande behandling som förhindrar återväxt av mossa och alger i månader." },
    ],
    gallery: [serviceDriveway],
  },
  {
    icon: Trees,
    title: "Altantvätt",
    hero: afterDeck,
    description:
      "Skonsam men effektiv rengöring anpassad för trä och komposit. Vi ger din altan nytt liv utan att skada materialet.",
    problems: [
      "Grått och förslitet trä som tappat sin färg",
      "Mossa, alger och halka på altanen",
      "Smuts och matfläckar som satt sig",
      "Altanen känns inte inbjudande att använda",
    ],
    benefits: [
      "Träet återfår sin naturliga, varma färg",
      "Säkrare yta utan halt belägg",
      "Förlänger altanens livslängd",
      "Perfekt inför sommarens utemiddagar",
    ],
    packages: [
      {
        name: "Högtryckstvätt",
        price: "från 500 kr + 30 kr/m²",
        time: "1–3 timmar",
        features: [
          "Högtryckstvätt med rengöringsmedel",
          "Anpassat för trä & komposit",
          "Varsam behandling",
        ],
      },
    ],
    addons: [
      { name: "Moss- & Algrengöring", desc: "Preventiv behandling som håller altanen fri från mossa och alger längre." },
    ],
    gallery: [galleryDeck],
  },
];

const ServicesPage = () => {
  return (
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

      {/* Services */}
      <div className="py-16">
        <div className="container mx-auto px-4 space-y-24">
          {services.map((service, idx) => (
            <div key={service.title} id={service.title.toLowerCase().replace(/\s/g, "-")}>
              {/* Hero image */}
              <div className="relative overflow-hidden mb-10 max-h-[400px]">
                <img
                  src={service.hero}
                  alt={service.title}
                  className="w-full h-[400px] object-cover"
                  loading={idx === 0 ? undefined : "lazy"}
                  width={1200}
                  height={400}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="absolute bottom-6 left-6 flex items-center gap-3">
                  <div className="w-12 h-12 border border-primary/50 bg-background/80 flex items-center justify-center">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="font-display text-2xl md:text-4xl font-bold">{service.title}</h2>
                </div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground font-body text-base md:text-lg leading-relaxed max-w-3xl mb-10">
                {service.description}
              </p>

              {/* Problems & Benefits */}
              <div className="grid md:grid-cols-2 gap-6 mb-10">
                <div className="border border-border bg-card p-6 md:p-8">
                  <h3 className="font-display text-lg font-bold mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" /> Vilka problem löser det?
                  </h3>
                  <ul className="space-y-3">
                    {service.problems.map((p) => (
                      <li key={p} className="flex items-start gap-3 text-muted-foreground font-body text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border border-primary/30 bg-card p-6 md:p-8">
                  <h3 className="font-display text-lg font-bold mb-4 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-primary" /> Fördelar för dig
                  </h3>
                  <ul className="space-y-3">
                    {service.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-muted-foreground font-body text-sm">
                        <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Packages */}
              {service.packages.map((pkg) => (
                <div key={pkg.name} className="border border-border bg-secondary/50 p-6 md:p-8 mb-6">
                  <div className="flex flex-wrap items-baseline gap-4 mb-1">
                    <p className="font-body text-xs tracking-[0.2em] uppercase text-primary">{pkg.name}</p>
                    <div className="flex items-center gap-2 text-muted-foreground font-body text-xs">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                      Beräknad tid: {pkg.time}
                    </div>
                  </div>
                  <p className="font-display text-2xl font-bold mb-4">{pkg.price}</p>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-muted-foreground text-sm font-body">
                        <Check className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Add-ons */}
              {service.addons.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-display text-lg font-bold mb-4">Tillval</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {service.addons.map((addon) => (
                      <div key={addon.name} className="border border-border bg-card p-5">
                        <p className="font-body text-sm font-semibold text-foreground mb-1">{addon.name}</p>
                        <p className="font-body text-sm text-muted-foreground leading-relaxed">{addon.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Gallery row */}
              {service.gallery.length > 0 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {service.gallery.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`${service.title} exempel ${i + 1}`}
                      className="h-48 w-auto object-cover flex-shrink-0"
                      loading="lazy"
                    />
                  ))}
                </div>
              )}

              {idx < services.length - 1 && <div className="border-t border-border mt-12" />}
            </div>
          ))}
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
  );
};

export default ServicesPage;
