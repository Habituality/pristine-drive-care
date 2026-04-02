import { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import ServiceConfigurator from "./booking/ServiceConfigurator";
import { useBookingState } from "./booking/useBookingState";

const BookingSection = () => {
  const { state, set, toggleAddon, price, summary } = useBookingState();
  const [showForm, setShowForm] = useState(false);

  const handleBook = () => {
    setShowForm(true);
    setTimeout(() => {
      document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Tack för din bokning! Vi återkommer inom kort.\n\n${summary}`);
    setShowForm(false);
  };

  return (
    <section id="bokning" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="font-body text-sm tracking-[0.3em] uppercase text-primary mb-3">Bokning</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            Konfigurera din <span className="text-gold-gradient">tjänst</span>
          </h2>
          <p className="mt-4 text-muted-foreground font-body max-w-lg mx-auto">
            Välj tjänst, paket och tillägg – se priset direkt. Klicka sedan "Boka nu" för att slutföra.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <ServiceConfigurator
            state={state}
            set={set}
            toggleAddon={toggleAddon}
            price={price}
            onBook={handleBook}
          />

          {showForm && (
            <form
              id="booking-form"
              onSubmit={handleSubmit}
              className="mt-12 space-y-5 border border-border p-6 md:p-8 bg-secondary animate-fade-in-up"
            >
              <p className="font-display text-xl font-bold mb-2">Fyll i dina uppgifter</p>
              <div className="grid sm:grid-cols-2 gap-5">
                <input
                  type="text"
                  placeholder="Namn"
                  required
                  maxLength={100}
                  className="w-full bg-background border border-border px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  value={state.name}
                  onChange={(e) => set("name", e.target.value)}
                />
                <input
                  type="tel"
                  placeholder="Telefon"
                  required
                  maxLength={20}
                  className="w-full bg-background border border-border px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  value={state.phone}
                  onChange={(e) => set("phone", e.target.value)}
                />
              </div>
              <input
                type="email"
                placeholder="E-post"
                required
                maxLength={255}
                className="w-full bg-background border border-border px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                value={state.email}
                onChange={(e) => set("email", e.target.value)}
              />
              <input
                type="date"
                required
                className="w-full bg-background border border-border px-4 py-3 font-body text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                value={state.date}
                onChange={(e) => set("date", e.target.value)}
              />

              {/* Summary */}
              <div className="border border-primary/20 bg-card p-4 font-body text-sm text-muted-foreground whitespace-pre-line">
                {summary}
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-primary text-primary-foreground font-body text-sm font-semibold tracking-[0.2em] uppercase hover:bg-gold-light transition-colors"
              >
                Skicka bokning
              </button>
            </form>
          )}
        </div>

        {/* Contact info */}
        <div className="max-w-3xl mx-auto mt-12 grid sm:grid-cols-3 gap-6">
          <a href="tel:+46761865882" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors font-body text-sm">
            <Phone className="w-5 h-5 text-primary" />
            076-186 58 82
          </a>
          <a href="mailto:info@pureshine.se" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors font-body text-sm">
            <Mail className="w-5 h-5 text-primary" />
            info@pureshine.se
          </a>
          <div className="flex items-center gap-3 text-muted-foreground font-body text-sm">
            <MapPin className="w-5 h-5 text-primary" />
            Stockholm & Storstockholm
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
