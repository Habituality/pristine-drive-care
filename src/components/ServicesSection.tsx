import { Car, Home, Trees, Check, Clock, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Car,
    title: "Bil Detailing",
    description:
      "Professionell utvändig och invändig rengöring som ger din bil showroom-känsla. Vi kommer till dig.",
    time: "2–5 timmar",
    packages: [
      {
        name: "Exteriör + Interiör",
        price: "från 1 495 kr",
        features: [
          "Utvändig handtvätt & torkning",
          "Fälg- & däckrengöring",
          "Invändig dammsugning & avtorkning",
          "Fönsterputs in- & utsida",
        ],
      },
    ],
    addons: ["Clay Bar-behandling", "Vaxning & lackskydd", "Läderrengöring", "Textil- & vinylrengöring"],
  },
  {
    icon: Home,
    title: "Uppfart",
    description:
      "Högtryckstvätt med rengöringsmedel som återställer sten och plattor till nyskick.",
    time: "1–3 timmar",
    packages: [
      {
        name: "Högtryckstvätt",
        price: "från 500 kr + 30 kr/m²",
        features: [
          "Högtryckstvätt med rengöringsmedel",
          "Ogräs- & smutsborttagning",
          "Anpassat efter yta",
        ],
      },
    ],
    addons: ["Moss- & Algrengöring"],
  },
  {
    icon: Trees,
    title: "Altan",
    description:
      "Skonsam högtryckstvätt anpassad för trä och komposit. Nytt liv åt din altan.",
    time: "1–3 timmar",
    packages: [
      {
        name: "Högtryckstvätt",
        price: "från 600 kr + 35 kr/m²",
        features: [
          "Högtryckstvätt med rengöringsmedel",
          "Anpassat för trä & komposit",
          "Varsam behandling",
        ],
      },
    ],
    addons: ["Moss- & Algrengöring"],
  },
];

const ServicesSection = () => {
  return (
    <section id="tjanster" className="py-24 bg-navy-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="font-body text-sm tracking-[0.3em] uppercase text-primary mb-3">
            Våra tjänster
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            Kvalitet i varje <span className="text-gold-gradient">detalj</span>
          </h2>
          <p className="mt-4 text-muted-foreground font-body max-w-lg mx-auto">
            Tre specialiserade tjänster – välj en eller kombinera flera vid bokning.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="border border-border bg-card p-6 md:p-8 flex flex-col hover:border-primary/40 transition-colors group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 border border-primary/30 flex items-center justify-center">
                  <service.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display text-xl md:text-2xl font-bold">
                  {service.title}
                </h3>
              </div>

              <p className="text-muted-foreground font-body text-sm leading-relaxed mb-5">
                {service.description}
              </p>

              <div className="flex items-center gap-2 mb-5 text-muted-foreground font-body text-xs">
                <Clock className="w-3.5 h-3.5 text-primary" />
                <span>Beräknad tid: {service.time}</span>
              </div>

              {service.packages.map((pkg) => (
                <div key={pkg.name} className="border border-border bg-secondary/50 p-4 mb-4">
                  <p className="font-body text-xs tracking-[0.2em] uppercase text-primary mb-1">
                    {pkg.name}
                  </p>
                  <p className="font-display text-lg font-bold mb-3">{pkg.price}</p>
                  <ul className="space-y-1.5">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-muted-foreground text-sm font-body">
                        <Check className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {service.addons.length > 0 && (
                <div className="mb-5">
                  <p className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">
                    Tillval
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.addons.map((a) => (
                      <span
                        key={a}
                        className="px-2.5 py-1 border border-border bg-secondary text-muted-foreground font-body text-xs"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-auto">
                <a
                  href="#bokning"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-body text-sm font-medium tracking-[0.15em] uppercase hover:bg-gold-light transition-colors w-full justify-center group-hover:gap-3"
                >
                  Boka {service.title.toLowerCase()}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
