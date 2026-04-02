import heroImage from "@/assets/hero-car.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <img
        src={heroImage}
        alt="Professionell biltvätt och detaljering"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-background/70" />

      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <p className="font-body text-sm tracking-[0.3em] uppercase text-primary mb-6 animate-fade-in-up">
          Mobil rengöring & detaljering
        </p>
        <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
          Vi kommer till dig –{" "}
          <span className="text-gold-gradient">exklusiv</span> bil- & hemvård
        </h1>
        <p className="font-body text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          Professionell biltvätt, detaljering, altan och uppfarts tvätt och –<br />direkt på plats hos dig.
        </p>
        <div className="animate-fade-in-up" style={{ animationDelay: "0.45s" }}>
          <a
            href="#bokning"
            className="inline-block px-10 py-4 bg-primary text-primary-foreground font-body text-sm font-semibold tracking-[0.2em] uppercase hover:bg-gold-light transition-colors"
          >
            Boka nu
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-px h-12 bg-primary/40" />
      </div>
    </section>
  );
};

export default HeroSection;
