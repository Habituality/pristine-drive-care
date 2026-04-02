import { Star, Shield, Clock } from "lucide-react";

const testimonials = [
  { name: "Anna L.", text: "Helt fantastiskt resultat! Min bil ser ut som ny. Kommer definitivt anlita Glanzio igen." },
  { name: "Erik S.", text: "Uppfarten hade inte sett så bra ut på 10 år. Proffsigt och snabbt. Rekommenderas varmt!" },
  { name: "Maria K.", text: "Smidig bokning och otroligt nöjd med altantvätten. Fem stjärnor utan tvekan." },
];

const AboutSection = () => {
  return (
    <section id="om-oss" className="py-24 bg-navy-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="font-body text-sm tracking-[0.3em] uppercase text-primary mb-3">Om oss</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            Varför välja <span className="text-gold-gradient">Glanzio</span>?
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            { icon: Star, title: "Premiumkvalitet", desc: "Vi använder enbart professionella produkter och tekniker för ett resultat i världsklass." },
            { icon: Clock, title: "Vi kommer till dig", desc: "Spara tid – vi utför allt arbete på plats, hemma hos dig eller på din arbetsplats." },
            { icon: Shield, title: "100% Nöjdgaranti", desc: "Är du inte nöjd åtgärdar vi det kostnadsfritt. Din tillfredsställelse är vår prioritet." },
          ].map((item) => (
            <div key={item.title} className="text-center p-8 border border-border bg-card hover:border-primary/50 transition-colors">
              <item.icon className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-display text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mb-10">
          <p className="font-body text-sm tracking-[0.3em] uppercase text-primary mb-3">Recensioner</p>
          <h3 className="font-display text-2xl md:text-3xl font-bold">Vad våra kunder säger</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="p-6 border border-border bg-card">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-primary fill-primary" />
                ))}
              </div>
              <p className="text-muted-foreground font-body text-sm italic leading-relaxed mb-4">"{t.text}"</p>
              <p className="font-body text-sm font-semibold text-foreground">— {t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
