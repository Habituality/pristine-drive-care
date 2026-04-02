import { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";

const BookingSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    date: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form handling would go here
    alert("Tack för din bokning! Vi återkommer inom kort.");
  };

  return (
    <section id="bokning" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="font-body text-sm tracking-[0.3em] uppercase text-primary mb-3">Bokning</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            Boka din <span className="text-gold-gradient">tjänst</span>
          </h2>
          <p className="mt-4 text-muted-foreground font-body max-w-lg mx-auto">
            Fyll i formuläret nedan så återkommer vi med en bekräftelse inom 24 timmar.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 max-w-5xl mx-auto">
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <input
                type="text"
                placeholder="Namn"
                required
                maxLength={100}
                className="w-full bg-secondary border border-border px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <input
                type="tel"
                placeholder="Telefon"
                required
                maxLength={20}
                className="w-full bg-secondary border border-border px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <input
              type="email"
              placeholder="E-post"
              required
              maxLength={255}
              className="w-full bg-secondary border border-border px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <select
              required
              className="w-full bg-secondary border border-border px-4 py-3 font-body text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            >
              <option value="">Välj tjänst</option>
              <option value="bilvärd">Bilvård & Detailing</option>
              <option value="uppfart">Uppfart & Altan</option>
              <option value="fasad">Fasadtvätt</option>
            </select>
            <input
              type="date"
              required
              className="w-full bg-secondary border border-border px-4 py-3 font-body text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
            <textarea
              placeholder="Eventuellt meddelande"
              maxLength={1000}
              rows={3}
              className="w-full bg-secondary border border-border px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
            <button
              type="submit"
              className="w-full px-8 py-4 bg-primary text-primary-foreground font-body text-sm font-semibold tracking-[0.2em] uppercase hover:bg-gold-light transition-colors"
            >
              Boka nu
            </button>
          </form>

          <div className="space-y-8">
            <div>
              <h3 className="font-display text-xl font-bold mb-4">Kontakta oss</h3>
              <div className="space-y-4">
                <a href="tel:+46701234567" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors font-body text-sm">
                  <Phone className="w-5 h-5 text-primary" />
                  070-123 45 67
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

            <div className="p-5 border border-primary/30 bg-secondary">
              <p className="font-body text-xs tracking-[0.2em] uppercase text-primary mb-2">Snabb respons</p>
              <p className="text-muted-foreground font-body text-sm">
                Vi svarar inom 24 timmar. För akuta ärenden, ring oss direkt.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
