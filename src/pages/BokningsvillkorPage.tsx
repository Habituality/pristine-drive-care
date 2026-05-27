// src/pages/BokningsvillkorPage.tsx
import { Link } from "react-router-dom";
import { ChevronLeft, FileText, Mail, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { useSEO } from "@/hooks/useSEO";
import { makeCanonical } from "@/config/seo";

type SubSection = {
  ref?: string;
  text: string;
  bullets?: string[];
};

type Section = {
  number: string;
  title: string;
  subsections: SubSection[];
};

const sections: Section[] = [
  {
    number: "1",
    title: "PARTER",
    subsections: [
      {
        text: "Tjänsten utförs av Finn Eriksson (nedan \"Glanzio\"), enskild firma med org.nr 050205-0073, med adress Älvkvarnsvägen 63, 163 52 Spånga. Kunden är den fysiska person som genomfört bokningen (nedan \"Kunden\").",
      },
    ],
  },
  {
    number: "2",
    title: "TJÄNSTENS OMFATTNING",
    subsections: [
      {
        ref: "2.1",
        text: "Glanzio utför mobil bil- och hemvård på av Kunden angiven adress i Stockholm och angränsande kommuner.",
      },
      {
        ref: "2.2",
        text: "Tjänstens exakta innehåll framgår av valt paket (Standard/Premium) och valt tjänsteområde (Exteriör + Interiör / Endast Exteriör / Endast Interiör) enligt bokningsbekräftelsen.",
      },
      {
        ref: "2.3",
        text: "Glanzio förbehåller sig rätten att neka eller avbryta ett uppdrag om arbetsplatsen bedöms som osäker, otillgänglig eller olämplig (t.ex. ej tillräckligt med utrymme, avsaknad av vattenåtkomst om det krävs, eller trafikfarliga förhållanden).",
      },
      {
        ref: "2.4",
        text: "Uppskattad tidsåtgång är vägledande och inte bindande. Faktisk tid kan variera beroende på fordonets skick.",
      },
    ],
  },
  {
    number: "3",
    title: "BOKNING & BEKRÄFTELSE",
    subsections: [
      {
        ref: "3.1",
        text: "En bokning är bindande när Kunden mottagit skriftlig bekräftelse via e-post eller SMS från Glanzio.",
      },
      {
        ref: "3.2",
        text: "Kunden ansvarar för att lämnade uppgifter (adress, telefonnummer, fordonets registreringsnummer, bilstorlek m.m.) är korrekta. Felaktiga uppgifter kan medföra tilläggsavgift eller att tjänsten ej kan utföras.",
      },
      {
        ref: "3.3",
        text: "Glanzio bekräftar bokning inom 24 timmar på vardagar.",
      },
    ],
  },
  {
    number: "4",
    title: "PRISER & BETALNING",
    subsections: [
      {
        ref: "4.1",
        text: "Alla priser anges inklusive 25 % moms (SEK) i enlighet med svensk mervärdesskattelag.",
      },
      {
        ref: "4.2",
        text: "Betalning sker kontant på plats direkt efter utförd tjänst. Ingen betalning sker online.",
      },
      {
        ref: "4.3",
        text: "Accepterade betalningsmetoder: Swish, kontanter.",
      },
      {
        ref: "4.4",
        text: "Kvitto utfärdas alltid efter genomförd tjänst. Kvittot innehåller Glanizos namn, org.nr, momsreg.nr, tjänstebeskrivning, pris exkl. moms, momsbelopp och totalpris inkl. moms.",
      },
      {
        ref: "4.5",
        text: "Vid utebliven betalning förbehåller sig Glanzio rätten att kräva betalning via inkasso samt debitera dröjsmålsränta enligt räntelagen (1975:635), f.n. referensränta + 8 procentenheter.",
      },
    ],
  },
  {
    number: "5",
    title: "AVBOKNING & OMBOKNING",
    subsections: [
      {
        ref: "5.1",
        text: "Avbokning mer än 24 timmar före bokad tid: Kostnadsfri. Kunden meddelar via telefon eller e-post.",
      },
      {
        ref: "5.2",
        text: "Avbokning mindre än 24 timmar före bokad tid: Glanzio förbehåller sig rätten att debitera en avbokningsavgift om 50 % av det bokade paketets pris.",
      },
      {
        ref: "5.3",
        text: "Utebliven Kund (no-show): Om Kunden ej är tillgänglig vid bokad tid och plats utan föregående meddelande debiteras 100 % av paketpriset.",
      },
      {
        ref: "5.4",
        text: "Ombokning: Kostnadsfri om den görs mer än 24 timmar i förväg. Ombokning sker via telefon eller e-post och bekräftas skriftligen av Glanzio.",
      },
      {
        ref: "5.5",
        text: "Glanzio förbehåller sig rätten att avboka eller omboka en bokad tid vid force majeure (se punkt 9) eller om Kunden vid ett tidigare tillfälle ej fullgjort betalning.",
      },
    ],
  },
  {
    number: "6",
    title: "FORDONETS SKICK & SKADEDOKUMENTATION",
    subsections: [
      {
        ref: "6.1",
        text: "Fotodokumentation: Glanzio fotograferar fordonet invändigt och/eller utvändigt före och efter utförd tjänst. Fotografierna arkiveras i minst 12 månader och används vid eventuella tvister.",
      },
      {
        ref: "6.2",
        text: "Befintliga skador: Kunden bekräftar genom sin bokning att Glanzio har rätt att dokumentera fordonets skick. Skador som dokumenterats före tjänstens påbörjan är inte Glanizos ansvar.",
      },
      {
        ref: "6.3",
        text: "Kundprotokoll / Liability Waiver: Vid ankomst fyller Kunden i och undertecknar ett skadedokumentationsprotokoll som innehåller: datum, fordonets registreringsnummer, befintliga skador, samt Kundens underskrift. Tjänsten påbörjas inte förrän protokollet är undertecknat.",
      },
      {
        ref: "6.4",
        text: "Kunden ansvarar för att fordonet är tillgängligt och upplåst vid bokad tid. Om fordonet ej är tillgängligt gäller punkt 5.3 (no-show).",
      },
      {
        ref: "6.5",
        text: "Kunden ansvarar för att avlägsna personliga värdesaker ur fordonet innan tjänsten utförs. Glanzio ansvarar inte för stöld, förlust eller skada på kvarlämnade föremål.",
      },
    ],
  },
  {
    number: "7",
    title: "ANSVAR & REKLAMATION",
    subsections: [
      {
        ref: "7.1",
        text: "Glanzio åtar sig att utföra tjänsten fackmässigt och med omsorg i enlighet med god yrkessed.",
      },
      {
        ref: "7.2",
        text: "Glanizos ansvar är begränsat till direkt skada orsakad av Glanizos dokumenterade vårdslöshet under pågående tjänst, och ersättningen är maximalt begränsad till det belopp Kunden betalat för den aktuella tjänsten — såvida inte Glanzio har tecknad yrkesansvarsförsäkring som täcker högre belopp.",
      },
      {
        ref: "7.3",
        text: "Glanzio ansvarar inte för:",
        bullets: [
          "Skador som uppstått före tjänstens påbörjan (dokumenterade i protokollet)",
          "Skador orsakade av fordonets befintliga brister (t.ex. lös list, sprucken lack, gammal plastning)",
          "Indirekta skador, utebliven vinst eller följdskador",
          "Skador orsakade av extrema väderförhållanden under pågående arbete utomhus",
        ],
      },
      {
        ref: "7.4",
        text: "Reklamation ska göras skriftligen (e-post eller SMS) senast 5 arbetsdagar efter utförd tjänst. Reklamation som inkommer senare beaktas ej.",
      },
      {
        ref: "7.5",
        text: "Vid reklamation har Glanzio rätt att i första hand åtgärda felet (avhjälpande) innan prisavdrag eller återbetalning aktualiseras, i enlighet med konsumenttjänstlagen (1985:716).",
      },
      {
        ref: "7.6",
        text: "Kunden har som konsument rättigheter enligt konsumenttjänstlagen. Dessa villkor inskränker inte lagstadgade konsumenträttigheter.",
      },
    ],
  },
  {
    number: "8",
    title: "GDPR & PERSONUPPGIFTER",
    subsections: [
      {
        ref: "8.1",
        text: "Personuppgiftsansvarig: Finn Eriksson, Älvkvarnsvägen 63, 163 52 Spånga.",
      },
      {
        ref: "8.2",
        text: "Glanzio samlar in: namn, telefonnummer, e-postadress, besöksadress och fordonets registreringsnummer.",
      },
      {
        ref: "8.3",
        text: "Ändamål: Uppgifterna används uteslutande för att administrera och genomföra den bokade tjänsten samt utfärda kvitto.",
      },
      {
        ref: "8.4",
        text: "Lagringstid: Uppgifter raderas senast 24 månader efter senaste bokning, om inte längre lagringstid krävs enligt bokföringslag (7 år för räkenskapsinformation).",
      },
      {
        ref: "8.5",
        text: "Kunden har rätt att begära registerutdrag, rättelse eller radering av sina uppgifter genom att kontakta Glanzio via e-post. Radering sker inom 30 dagar.",
      },
      {
        ref: "8.6",
        text: "Uppgifter delas inte med tredje part, förutom vid laglig skyldighet (t.ex. Skatteverket).",
      },
      {
        ref: "8.7",
        text: "Fullständig integritetspolicy finns tillgänglig på Glanizos hemsida.",
      },
    ],
  },
  {
    number: "9",
    title: "FORCE MAJEURE",
    subsections: [
      {
        ref: "9.1",
        text: "Glanzio är befriad från ansvar och skyldighet att fullgöra tjänsten om fullgörandet förhindras eller väsentligen försvåras av omständighet utanför Glanizos kontroll, inklusive men ej begränsat till: extrema väderförhållanden (åska, snöstorm, is), allvarlig sjukdom, trafikolycka, myndighetsåtgärd eller annan oförutsedd händelse.",
      },
      {
        ref: "9.2",
        text: "Glanzio meddelar Kunden snarast möjligt vid force majeure och erbjuder kostnadsfri ombokning. Om ombokning ej är möjlig återbetalas eventuell förskottsbetalning i sin helhet.",
      },
    ],
  },
  {
    number: "10",
    title: "TVISTER",
    subsections: [
      {
        ref: "10.1",
        text: "Tvister ska i första hand lösas genom dialog mellan parterna.",
      },
      {
        ref: "10.2",
        text: "Om enighet ej nås kan Kunden vända sig till Allmänna reklamationsnämnden (ARN), Box 174, 101 23 Stockholm, www.arn.se — kostnadsfritt för konsumenter.",
      },
      {
        ref: "10.3",
        text: "I sista hand avgörs tvister av svensk allmän domstol med Stockholms tingsrätt som första instans, och svensk lag tillämpas.",
      },
    ],
  },
  {
    number: "11",
    title: "ÄNDRINGAR AV VILLKOR",
    subsections: [
      {
        text: "Glanzio förbehåller sig rätten att uppdatera dessa villkor. Ändringar träder i kraft 14 dagar efter publicering på hemsidan. Bokningar genomförda före ändringen regleras av de villkor som gällde vid bokningstillfället.",
      },
    ],
  },
];

const BokningsvillkorPage = () => {
  useSEO({
    title: "Bokningsvillkor | Glanzio Detailing Stockholm",
    description:
      "Läs Glanizos fullständiga bokningsvillkor – avbokning, betalning, ansvar och dina rättigheter som konsument enligt konsumenttjänstlagen.",
    canonical: makeCanonical("/bokningsvillkor"),
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
            <FileText className="w-8 h-8 text-primary shrink-0" />
            <h1 className="font-display text-4xl md:text-5xl font-bold">
              Bokningsvillkor
            </h1>
          </div>

          <p className="font-body text-lg text-muted-foreground leading-relaxed">
            Dessa villkor gäller för alla tjänster utförda av Glanzio Detailing
            (Finn Eriksson, org.nr 050205-0073) och reglerar bokning, betalning,
            avbokning, ansvar och dina rättigheter som konsument enligt
            konsumenttjänstlagen (1985:716). Villkoren gäller fr.o.m.
            2026-05-25.
          </p>
        </div>
      </section>

      {/* Sections */}
      <section className="pb-24 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="space-y-10">
            {sections.map((sec) => (
              <div key={sec.number} className="border-l-2 border-primary pl-6">
                <h2 className="font-display text-xl font-bold mb-4">
                  {sec.number}. {sec.title}
                </h2>
                <div className="space-y-3">
                  {sec.subsections.map((sub, i) => (
                    sub.bullets ? (
                      <div key={i}>
                        <p className="font-body text-muted-foreground leading-relaxed mb-2">
                          {sub.ref && (
                            <span className="font-semibold text-foreground">
                              {sub.ref}{" "}
                            </span>
                          )}
                          {sub.text}
                        </p>
                        <ul className="list-disc list-inside space-y-1 pl-2">
                          {sub.bullets.map((b, j) => (
                            <li
                              key={j}
                              className="font-body text-muted-foreground leading-relaxed text-sm"
                            >
                              {b}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <p
                        key={i}
                        className="font-body text-muted-foreground leading-relaxed"
                      >
                        {sub.ref && (
                          <span className="font-semibold text-foreground">
                            {sub.ref}{" "}
                          </span>
                        )}
                        {sub.text}
                      </p>
                    )
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Contact box */}
          <div className="mt-16 border border-border bg-secondary/40 p-8">
            <h2 className="font-display text-xl font-bold mb-2">
              Frågor om villkoren?
            </h2>
            <p className="font-body text-muted-foreground text-sm mb-6">
              Har du frågor om bokningsvillkoren eller behöver du lämna en
              reklamation? Kontakta oss skriftligen via e-post eller telefon.
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
            Version 1.0 — maj 2026 · Glanzio Detailing | Finn Eriksson |
            Org.nr 050205-0073 | Momsreg.nr SE050205007301 | Älvkvarnsvägen 63,
            163 52 Spånga
          </p>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default BokningsvillkorPage;
