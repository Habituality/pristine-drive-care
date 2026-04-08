import { Car, Home, Trees, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import beforeCar from "@/assets/before-car.jpg";
import afterCar from "@/assets/after-car.jpg";
import beforeDriveway from "@/assets/before-driveway.jpg";
import afterDriveway from "@/assets/after-driveway.jpg";
import beforeDeck from "@/assets/before-deck.jpg";
import afterDeck from "@/assets/after-deck.jpg";

const comparisons = [
  {
    icon: Car,
    title: "Bildetailing",
    before: beforeCar,
    after: afterCar,
    altBefore: "Bil före detailing",
    altAfter: "Bil efter detailing",
  },
  {
    icon: Home,
    title: "Uppfartstvätt",
    before: beforeDriveway,
    after: afterDriveway,
    altBefore: "Uppfart före högtryckstvätt",
    altAfter: "Uppfart efter högtryckstvätt",
  },
  {
    icon: Trees,
    title: "Altantvätt",
    before: beforeDeck,
    after: afterDeck,
    altBefore: "Altan före rengöring",
    altAfter: "Altan efter rengöring",
  },
];

const GallerySection = () => {
  return (
    <section id="galleri" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="font-body text-sm tracking-[0.3em] uppercase text-primary mb-3">Resultat</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            Före & <span className="text-gold-gradient">efter</span>
          </h2>
          <p className="mt-4 text-muted-foreground font-body max-w-lg mx-auto">
            Se skillnaden våra tjänster gör – verkliga resultat från nöjda kunder.
          </p>
        </div>

        <div className="space-y-16">
          {comparisons.map((item) => (
            <div key={item.title}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 border border-primary/30 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display text-xl md:text-2xl font-bold">{item.title}</h3>
              </div>

              <div className="grid grid-cols-2 gap-3 md:gap-6">
                <div className="relative overflow-hidden group">
                  <span className="absolute top-3 left-3 z-10 px-3 py-1 bg-background/90 border border-border font-body text-xs tracking-[0.15em] uppercase text-muted-foreground">
                    Före
                  </span>
                  <img
                    src={item.before}
                    alt={item.altBefore}
                    className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    width={800}
                    height={600}
                  />
                </div>
                <div className="relative overflow-hidden group">
                  <span className="absolute top-3 left-3 z-10 px-3 py-1 bg-primary text-primary-foreground font-body text-xs tracking-[0.15em] uppercase">
                    Efter
                  </span>
                  <img
                    src={item.after}
                    alt={item.altAfter}
                    className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    width={800}
                    height={600}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            to="/galleri"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-body text-sm font-semibold tracking-[0.2em] uppercase hover:bg-gold-light transition-colors"
          >
            Se fler resultat
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
