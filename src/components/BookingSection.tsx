import { useState } from "react";
import { Phone, Mail, MapPin, CalendarIcon, MessageSquare } from "lucide-react";
import { format } from "date-fns";
import ServiceConfigurator from "./booking/ServiceConfigurator";
import { useBookingState } from "./booking/useBookingState";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const timeSlots = [
  "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00",
];

// Simulated booked slots (in production, fetch from backend)
const bookedSlots: Record<string, string[]> = {
  // Example: "2026-04-10": ["09:00", "14:00"]
};

const BookingSection = () => {
  const { state, set, toggleAddon, price, summary, hasAnyService, detailingPrice, drivewayPrice, deckPrice } = useBookingState();
  const [showForm, setShowForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [comments, setComments] = useState("");

  const handleBook = () => {
    setShowForm(true);
    setTimeout(() => {
      document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  const dateStr = selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";
  const unavailableTimes = dateStr ? (bookedSlots[dateStr] || []) : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullSummary = `${summary}\nDatum: ${dateStr}\nTid: ${selectedTime}\n${comments ? `Kommentarer: ${comments}` : ""}`;
    alert(`Tack för din bokning! Vi återkommer inom kort.\n\n${fullSummary}`);
    setShowForm(false);
  };

  const isFormComplete = state.name && state.phone && state.email && selectedDate && selectedTime;

  return (
    <section id="bokning" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="font-body text-sm tracking-[0.3em] uppercase text-primary mb-3">Bokning</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            Konfigurera din <span className="text-gold-gradient">tjänst</span>
          </h2>
          <p className="mt-4 text-muted-foreground font-body max-w-lg mx-auto">
            Välj tjänster, anpassa paket och tillägg – se priset direkt. Fyll i dina uppgifter och välj tid.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Step 1: Configure services */}
          <div className="mb-4">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-8 border border-primary flex items-center justify-center font-display text-sm font-bold text-primary">1</span>
              <h3 className="font-display text-lg font-bold">Välj & konfigurera tjänster</h3>
            </div>
          </div>

          <ServiceConfigurator
            state={state}
            set={set}
            toggleAddon={toggleAddon}
            price={price}
            detailingPrice={detailingPrice}
            drivewayPrice={drivewayPrice}
            deckPrice={deckPrice}
            hasAnyService={hasAnyService}
            onBook={handleBook}
          />

          {showForm && (
            <form
              id="booking-form"
              onSubmit={handleSubmit}
              className="mt-12 space-y-6 border border-border p-6 md:p-8 bg-secondary animate-fade-in-up"
            >
              {/* Step 2: Contact info */}
              <div className="flex items-center gap-3 mb-2">
                <span className="w-8 h-8 border border-primary flex items-center justify-center font-display text-sm font-bold text-primary">2</span>
                <h3 className="font-display text-lg font-bold">Dina uppgifter</h3>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <input type="text" placeholder="Namn" required maxLength={100}
                  className="w-full bg-background border border-border px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  value={state.name} onChange={(e) => set("name", e.target.value)} />
                <input type="tel" placeholder="Telefon" required maxLength={20}
                  className="w-full bg-background border border-border px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  value={state.phone} onChange={(e) => set("phone", e.target.value)} />
              </div>
              <input type="email" placeholder="E-post" required maxLength={255}
                className="w-full bg-background border border-border px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                value={state.email} onChange={(e) => set("email", e.target.value)} />

              {/* Step 3: Calendar & Time */}
              <div className="flex items-center gap-3 mb-2 mt-8">
                <span className="w-8 h-8 border border-primary flex items-center justify-center font-display text-sm font-bold text-primary">3</span>
                <h3 className="font-display text-lg font-bold">Välj datum & tid</h3>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <p className="font-body text-xs tracking-[0.15em] uppercase text-primary mb-2">Datum</p>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        className={cn(
                          "w-full flex items-center gap-2 bg-background border border-border px-4 py-3 font-body text-sm text-left transition-colors focus:outline-none focus:border-primary",
                          !selectedDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="w-4 h-4 text-primary" />
                        {selectedDate ? format(selectedDate, "d MMMM yyyy") : "Välj datum"}
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <p className="font-body text-xs tracking-[0.15em] uppercase text-primary mb-2">Tid</p>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((slot) => {
                      const isUnavailable = unavailableTimes.includes(slot);
                      return (
                        <button
                          key={slot}
                          type="button"
                          disabled={isUnavailable}
                          onClick={() => setSelectedTime(slot)}
                          className={cn(
                            "px-2 py-2 border font-body text-sm transition-all",
                            isUnavailable
                              ? "border-border bg-muted text-muted-foreground cursor-not-allowed line-through opacity-50"
                              : selectedTime === slot
                                ? "border-primary bg-primary/10 text-foreground font-medium"
                                : "border-border bg-background text-muted-foreground hover:border-primary/50"
                          )}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Comments */}
              <div>
                <p className="font-body text-xs tracking-[0.15em] uppercase text-primary mb-2 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5" /> Kommentarer (valfritt)
                </p>
                <textarea
                  placeholder="Speciella önskemål, viktig information, portkod..."
                  maxLength={500}
                  rows={3}
                  className="w-full bg-background border border-border px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                />
              </div>

              {/* Summary */}
              <div className="border border-primary/20 bg-card p-4 font-body text-sm text-muted-foreground whitespace-pre-line">
                {summary}
                {selectedDate && `\nDatum: ${format(selectedDate, "d MMMM yyyy")}`}
                {selectedTime && `\nTid: ${selectedTime}`}
                {comments && `\nKommentar: ${comments}`}
              </div>

              <button
                type="submit"
                disabled={!isFormComplete}
                className={cn(
                  "w-full px-8 py-4 font-body text-sm font-semibold tracking-[0.2em] uppercase transition-colors",
                  isFormComplete
                    ? "bg-primary text-primary-foreground hover:bg-gold-light"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                )}
              >
                Skicka bokning
              </button>
            </form>
          )}
        </div>

        <div className="max-w-3xl mx-auto mt-12 grid sm:grid-cols-3 gap-6">
          <a href="tel:+46761865882" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors font-body text-sm">
            <Phone className="w-5 h-5 text-primary" /> 076-186 58 82
          </a>
          <a href="mailto:info@glanzio.se" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors font-body text-sm">
            <Mail className="w-5 h-5 text-primary" /> info@glanzio.se
          </a>
          <div className="flex items-center gap-3 text-muted-foreground font-body text-sm">
            <MapPin className="w-5 h-5 text-primary" /> Stockholm & Storstockholm
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
