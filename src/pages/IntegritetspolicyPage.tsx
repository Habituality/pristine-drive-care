// src/pages/IntegritetspolicyPage.tsx
import { Link } from "react-router-dom";
import { ChevronLeft, Mail, Phone, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { useSEO } from "@/hooks/useSEO";
import { makeCanonical } from "@/config/seo";

const sections = [
  {
    title: "Vilka uppgifter samlar vi in?",
    body: "När du genomför en bokning hos oss samlar vi in ditt namn, telefonnummer, e-postadress och den adress där tjänsten ska utföras. Vi samlar inte in fler uppgifter än vad som är nödvändigt.",
  },
  {
    title: "Varför samlar vi in uppgifterna?",
    body: "Dina uppgifter används enbart för att bekräfta, planera och genomföra din bokning. Vi kan också behöva kontakta dig vid ändringar eller frågor kring din bokning.",
  },
  {
    title: "Hur länge sparas uppgifterna?",
    body: "Dina personuppgifter lagras i vår säkra databas i högst 12 månader efter att tjänsten har utförts, varefter de raderas automatiskt.",
  },
  {
    title: "Delas uppgifterna med någon annan?",
    body: "Nej. Dina uppgifter delas aldrig med tredje part, säljs inte vidare och används inte för marknadsföringsändamål utanför det direkta bokningsflödet.",
  },
  {
    title: "Dina rättigheter",
    body: "Enligt GDPR har du rätt att när som helst begära att se vilka uppgifter vi har om dig, få dem rättade om de är felaktiga, eller få dem helt raderade. Kontakta oss via e-post eller telefon så hanterar vi din förfrågan snarast möjligt.",
  },
  {
    title: "Personuppgiftsansvarig",
    body: "Glanzio Bil & Hemvård ansvarar för behandlingen av dina personuppgifter i enlighet med Dataskyddsförordningen (GDPR, EU 2016/679).",
  },
];

const IntegritetspolicyPage = () => {
  useSEO({
    title: "Integritetspolicy & Dataskydd | Glanzio Stockholm",
    description:
      "Läs om hur Glanzio Stockholm hanterar dina personuppgifter i enlighet med GDPR. Vi samlar bara in det vi behöver och delar aldrig dina uppgifter med tredje part.",
    canonical: makeCanonical("/integritetspolicy"),
  });

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-body text-sm mb-10"
          >
            <ChevronLeft className="w-4 h-4" /> Tillbaka till startsidan
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <ShieldCheck className="w-8 h-8 text-primary shrink-0" />
            <h1 className="font-display text-4xl md:text-5xl font-bold">
              Dataskydd
            </h1>
          </div>

          <p className="font-body text-lg text-muted-foreground leading-relaxed">
            Vi samlar in dina kontaktuppgifter och adress enbart för att bekräfta
            och genomföra din bokning. Dina uppgifter lagras i vår säkra databas i
            högst 12 månader och delas aldrig med tredje part. Du kan när som helst
            begära att se, ändra eller ta bort dina uppgifter genom att kontakta
            oss.
          </p>
        </div>
      </section>

      {/* Sections */}
      <section className="pb-24 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="space-y-10">
            {sections.map((s) => (
              <div key={s.title} className="border-l-2 border-primary pl-6">
                <h2 className="font-display text-xl font-bold mb-3">{s.title}</h2>
                <p className="font-body text-muted-foreground leading-relaxed">
                  {s.body}
                </p>
              </div>
            ))}
          </div>

          {/* Contact box */}
          <div className="mt-16 border border-border bg-secondary/40 p-8">
            <h2 className="font-display text-xl font-bold mb-2">
              Kontakta oss om dina uppgifter
            </h2>
            <p className="font-body text-muted-foreground text-sm mb-6">
              Har du frågor om hur vi hanterar dina personuppgifter, eller vill du
              utöva dina rättigheter? Hör av dig till oss.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="mailto:info@glanzio.se"
                className="inline-flex items-center gap-2 text-primary hover:text-gold-light transition-colors font-body text-sm"
              >
                <Mail className="w-4 h-4" /> info@glanzio.se
              </a>
              <a
                href="tel:+46761865882"
                className="inline-flex items-center gap-2 text-primary hover:text-gold-light transition-colors font-body text-sm"
              >
                <Phone className="w-4 h-4" /> 076-186 58 82
              </a>
            </div>
          </div>

          <p className="mt-10 font-body text-xs text-muted-foreground">
            Senast uppdaterad: maj 2025 · Glanzio Bil & Hemvård
          </p>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default IntegritetspolicyPage;
