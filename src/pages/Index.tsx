// src/pages/Index.tsx
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import GallerySection from "@/components/GallerySection";
import AboutSection from "@/components/AboutSection";
import BookingSection from "@/components/BookingSection";
import FooterSection from "@/components/FooterSection";
import { useSEO } from "@/hooks/useSEO";
import { makeCanonical } from "@/config/seo";

const Index = () => {
  useSEO({
    title: "Glanzio Stockholm | Mobil Bilvård & Detailing",
    description: "Professionell mobil bilvård och detailing i Stockholm. Vi kommer till dig och gör bilen som ny – från 595 kr. Boka enkelt online.",
    canonical: makeCanonical("/"),
    ogTitle: "Glanzio Stockholm | Mobil Bilvård & Detailing",
    ogDescription: "Vi kommer till dig och gör bilen som ny. Professionell bildetailing i Stockholm från 595 kr. Boka online.",
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <GallerySection />
      <AboutSection />
      <BookingSection />
      <FooterSection />
    </div>
  );
};

export default Index;