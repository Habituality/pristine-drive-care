import { Car, Home } from "lucide-react";
import serviceDetailing from "@/assets/service-detailing.jpg";
import serviceDriveway from "@/assets/service-driveway.jpg";

const services = [
  {
    icon: Car,
    title: "Bilvård & Detailing",
    description: "Utvändig och invändig rengöring, polering, vaxning och keramiskt skydd. Vi ger din bil showroom-känsla.",
    image: serviceDetailing,
    packages: [
      { name: "Standard", price: "från 995 kr", features: ["Utvändig handtvätt", "Fälgrengöring", "Däckglans"] },
      { name: "Premium", price: "från 2 495 kr", features: ["Allt i Standard", "Invändig rengöring", "Polering & vax"] },
    ],
  },
  {
    icon: Home,
    title: "Uppfart & Altan",
    description: "Högtryckstvätt av sten, plattor och trä. Vi återställer ytor till nyskick med skonsamma metoder.",
    image: serviceDriveway,
    packages: [
      { name: "Standard", price: "från 1 495 kr", features: ["Upp till 30 m²", "Högtryckstvätt", "Ogräsborttagning"] },
      { name: "Premium", price: "från 2 995 kr", features: ["Upp till 60 m²", "Impregnering", "Fogning ingår"] },
    ],
  },
  {
    icon: Building,
    title: "Fasadtvätt",
    description: "Professionell rengöring av fasader, tak och väggar. Bort med smuts, mossa och alger.",
    image: serviceFacade,
    packages: [
      { name: "Standard", price: "från 2 495 kr", features: ["Fasad upp till 80 m²", "Biologisk rengöring"] },
      { name: "Premium", price: "från 4 995 kr", features: ["Fasad + tak", "Alg- & mossbehandling", "Impregnering"] },
    ],
  },
];

const ServicesSection = () => {
  return (
    <section id="tjanster" className="py-24 bg-navy-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="font-body text-sm tracking-[0.3em] uppercase text-primary mb-3">Våra tjänster</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            Kvalitet i varje <span className="text-gold-gradient">detalj</span>
          </h2>
        </div>

        <div className="space-y-20">
          {services.map((service, i) => (
            <div key={service.title} className={`flex flex-col ${i % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} gap-10 items-center`}>
              <div className="lg:w-1/2">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full aspect-[4/3] object-cover"
                  loading="lazy"
                  width={800}
                  height={600}
                />
              </div>
              <div className="lg:w-1/2 space-y-6">
                <div className="flex items-center gap-3">
                  <service.icon className="w-6 h-6 text-primary" />
                  <h3 className="font-display text-2xl md:text-3xl font-bold">{service.title}</h3>
                </div>
                <p className="text-muted-foreground font-body leading-relaxed">{service.description}</p>

                <div className="grid sm:grid-cols-2 gap-4">
                  {service.packages.map((pkg) => (
                    <div key={pkg.name} className="border border-border p-5 bg-card hover:border-primary/50 transition-colors">
                      <p className="font-body text-xs tracking-[0.2em] uppercase text-primary mb-1">{pkg.name}</p>
                      <p className="font-display text-xl font-bold mb-3">{pkg.price}</p>
                      <ul className="space-y-1">
                        {pkg.features.map((f) => (
                          <li key={f} className="text-muted-foreground text-sm font-body">— {f}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <a href="#bokning" className="inline-block mt-2 px-8 py-3 bg-primary text-primary-foreground font-body text-sm font-medium tracking-[0.15em] uppercase hover:bg-gold-light transition-colors">
                  Boka denna tjänst
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
