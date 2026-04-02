import heroImage from "@/assets/hero-car.jpg";
import galleryCarAfter from "@/assets/gallery-car-after.jpg";
import galleryDeck from "@/assets/gallery-deck.jpg";
import serviceDriveway from "@/assets/service-driveway.jpg";
import serviceFacade from "@/assets/service-facade.jpg";
import serviceDetailing from "@/assets/service-detailing.jpg";

const images = [
  { src: heroImage, alt: "Biltvätt i detalj" },
  { src: galleryDeck, alt: "Altanrengöring före och efter" },
  { src: galleryCarAfter, alt: "Polerad bil efter detailing" },
  { src: serviceDriveway, alt: "Uppfartstvätt" },
  { src: serviceFacade, alt: "Fasadrengöring" },
  { src: serviceDetailing, alt: "Interiör detailing" },
];

const GallerySection = () => {
  return (
    <section id="galleri" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="font-body text-sm tracking-[0.3em] uppercase text-primary mb-3">Galleri</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            Före & <span className="text-gold-gradient">efter</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {images.map((img, i) => (
            <div key={i} className="overflow-hidden group">
              <img
                src={img.src}
                alt={img.alt}
                className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                width={400}
                height={400}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
