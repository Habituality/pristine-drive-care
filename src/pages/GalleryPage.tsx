// src/pages/GalleryPage.tsx
import { useState } from "react";
import { Car, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import beforeCar from "@/assets/before-car.jpg";
import afterCar from "@/assets/after-car.jpg";
import heroImage from "@/assets/hero-car.jpg";
import galleryCarAfter from "@/assets/gallery-car-after.jpg";
import serviceDetailing from "@/assets/service-detailing.jpg";
import VolvoSideBefore from "@/assets/volvo-before-side.jpg";
import VolvoSideAfter from "@/assets/volvo-after-side.jpg";
import { useSEO } from "@/hooks/useSEO";
import { makeCanonical } from "@/config/seo";

type Category = "all" | "bil";

interface GalleryItem {
  src: string;
  alt: string;
  category: Category;
  label?: string;
}

const galleryItems: GalleryItem[] = [
  { src: beforeCar, alt: "Bil före professionell detailing i Stockholm", category: "bil", label: "Före" },
  { src: afterCar, alt: "Bil efter professionell detailing i Stockholm", category: "bil", label: "Efter" },
  { src: heroImage, alt: "Mobil bildetailing Stockholm närbild", category: "bil" },
  { src: galleryCarAfter, alt: "Polerad och vaxad bil efter Premium detailing", category: "bil" },
  { src: serviceDetailing, alt: "Interiör rengöring och detailing", category: "bil" },
  { src: VolvoSideBefore, alt: "Volvo före bilrekond Stockholm", category: "bil", label: "Före" },
  { src: VolvoSideAfter, alt: "Volvo efter bilrekond Stockholm", category: "bil", label: "Efter" },
];

const filters: { value: Category; label: string; icon: typeof Car }[] = [
  { value: "all", label: "Alla", icon: Car },
  { value: "bil", label: "Bildetailing", icon: Car },
];

const GalleryPage = () => {
  useSEO({
    title: "Galleri – Innan & Efter Detailing Stockholm | Glanzio",
    description: "Se verkliga resultat från vår professionella bilvård i Stockholm. Innan och efter bilder från Standard och Premium bildetailing – boka din tid idag.",
    canonical: makeCanonical("/galleri"),
    ogTitle: "Innan & Efter – Bildetailing Stockholm | Glanzio",
    ogDescription: "Se vad professionell bilvård och detailing gör för din bil. Riktiga resultat från kunder i Stockholm.",
  });

  const [activeFilter, setActiveFilter] = useState<Category>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = activeFilter === "all" ? galleryItems : galleryItems.filter((i) => i.category === activeFilter);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prev = () => setLightboxIndex((i) => (i !== null ? (i - 1 + filtered.length) % filtered.length : null));
  const next = () => setLightboxIndex((i) => (i !== null ? (i + 1) % filtered.length : null));

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
            <p className="font-body text-sm tracking-[0.3em] uppercase text-primary mb-3">Galleri</p>
            <h1 className="font-display text-3xl md:text-5xl font-bold">
              Innan & <span className="text-gold-gradient">efter</span>
            </h1>
            <p className="mt-4 text-muted-foreground font-body max-w-lg">
              Riktiga resultat från vår mobila bildetailing i Stockholm. Se skillnaden professionell bilvård gör.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="border-b border-border bg-card sticky top-16 z-30">
          <div className="container mx-auto px-4">
            <div className="flex gap-1 overflow-x-auto py-3">
              {filters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setActiveFilter(f.value)}
                  className={`flex items-center gap-2 px-5 py-2.5 font-body text-sm tracking-wider uppercase whitespace-nowrap transition-colors ${
                    activeFilter === f.value
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  <f.icon className="w-4 h-4" />
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {filtered.map((item, i) => (
                <button
                  key={`${item.src}-${i}`}
                  onClick={() => openLightbox(i)}
                  className="relative overflow-hidden group cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {item.label && (
                    <span className={`absolute top-2 left-2 z-10 px-2 py-0.5 font-body text-xs tracking-[0.1em] uppercase ${
                      item.label === "Efter" ? "bg-primary text-primary-foreground" : "bg-background/90 border border-border text-muted-foreground"
                    }`}>
                      {item.label}
                    </span>
                  )}
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    width={400}
                    height={400}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="py-16 bg-navy-gradient text-center">
          <h2 className="font-display text-2xl md:text-4xl font-bold mb-4">
            Redo att se <span className="text-gold-gradient">skillnaden</span>?
          </h2>
          <p className="text-muted-foreground font-body mb-8 max-w-md mx-auto">
            Boka din bilvård i Stockholm idag – vi kommer till dig och gör bilen som ny.
          </p>
          <Link
            to="/#bokning"
            className="inline-block px-10 py-4 bg-primary text-primary-foreground font-body text-sm font-semibold tracking-[0.2em] uppercase hover:bg-gold-light transition-colors"
          >
            Boka nu
          </Link>
        </div>

        {/* Lightbox */}
        {lightboxIndex !== null && (
          <div className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center" onClick={closeLightbox}>
            <button onClick={closeLightbox} className="absolute top-6 right-6 text-foreground hover:text-primary transition-colors">
              <X className="w-8 h-8" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 md:left-8 text-foreground hover:text-primary transition-colors"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 md:right-8 text-foreground hover:text-primary transition-colors"
            >
              <ChevronRight className="w-10 h-10" />
            </button>
            <img
              src={filtered[lightboxIndex].src}
              alt={filtered[lightboxIndex].alt}
              className="max-w-[90vw] max-h-[85vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
              <p className="font-body text-sm text-muted-foreground">
                {filtered[lightboxIndex].alt}
                {filtered[lightboxIndex].label && (
                  <span className={`ml-2 px-2 py-0.5 text-xs uppercase ${
                    filtered[lightboxIndex].label === "Efter" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                  }`}>
                    {filtered[lightboxIndex].label}
                  </span>
                )}
              </p>
              <p className="font-body text-xs text-muted-foreground mt-1">
                {lightboxIndex + 1} / {filtered.length}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default GalleryPage;