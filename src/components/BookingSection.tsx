import { createBooking } from "../lib/bookings";
import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

import { useBookingState } from "./booking/useBookingState";
import ServiceConfigurator from "./booking/ServiceConfigurator";

const timeSlots = [
  "06:00","07:00","08:00","09:00","10:00","11:00",
  "12:00","13:00","14:00","15:00","16:00","17:00",
  "18:00","19:00","20:00","21:00","22:00",
];

type FieldErrors = Partial<Record<
  "name" | "phone" | "email" | "address" | "date" | "time",
  string
>>;

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone: string) {
  return /^[0-9\s\-\+]{7,15}$/.test(phone);
}

const BookingSection = () => {
  const { state, set, reset, price, hasAnyService, detailingPrice } = useBookingState();
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedDate = state.date ? new Date(state.date) : undefined;

  function validate(): FieldErrors {
    const e: FieldErrors = {};
    if (!state.name.trim()) e.name = "Namn krävs.";
    if (!state.phone.trim()) e.phone = "Telefonnummer krävs.";
    else if (!validatePhone(state.phone)) e.phone = "Ogiltigt telefonnummer.";
    if (!state.email.trim()) e.email = "E-post krävs.";
    else if (!validateEmail(state.email)) e.email = "Ogiltig e-postadress.";
    if (!state.address.trim()) e.address = "Adress krävs.";
    if (!state.date) e.date = "Datum krävs.";
    if (!state.time) e.time = "Tid krävs.";
    return e;
  }

  const handleBook = async () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setIsSubmitting(true);
    try {
      await createBooking({
        name: state.name,
        phone: state.phone,
        email: state.email,
        address: state.address,
        date: state.date,
        time: state.time,
        price,
        comments: state.comments,
        serviceArea: state.serviceArea,
        isPremium: state.isPremium,
        carSize: state.carSize,
      });
      toast.success("Bokning skickad! 🎉");
      reset();
      setErrors({});
    } catch (error) {
      console.error(error);
      toast.error("Kunde inte skicka bokning. Försök igen.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormComplete = Object.keys(validate()).length === 0;

  return (
    <section id="bokning" className="py-24 bg-card">
      <div className="container mx-auto px-4">

        {/* HEADER */}
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.3em] uppercase text-primary mb-3">Bokning</p>
          <h2 className="text-3xl md:text-5xl font-bold">
            Konfigurera din <span className="text-gold-gradient">tjänst</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
            Välj tjänst, se pris direkt och boka.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">

          {/* SERVICE CONFIGURATOR */}
          <ServiceConfigurator
            state={state}
            set={set}
            price={price}
            detailingPrice={detailingPrice}
            hasAnyService={hasAnyService}
            onBook={handleBook}
          />

          {/* CONTACT FIELDS */}
          <div className="space-y-4">
            <p className="font-body text-xs tracking-[0.2em] uppercase text-primary mb-2">Dina uppgifter</p>

            <div className="grid sm:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <input
                  type="text"
                  placeholder="Namn *"
                  value={state.name}
                  onChange={(e) => { set("name", e.target.value); setErrors((prev) => ({ ...prev, name: undefined })); }}
                  className={cn(
                    "w-full border px-4 py-3 bg-secondary text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors",
                    errors.name ? "border-destructive" : "border-border"
                  )}
                />
                {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
              </div>

              {/* Phone */}
              <div>
                <input
                  type="tel"
                  placeholder="Telefonnummer *"
                  value={state.phone}
                  onChange={(e) => { set("phone", e.target.value); setErrors((prev) => ({ ...prev, phone: undefined })); }}
                  className={cn(
                    "w-full border px-4 py-3 bg-secondary text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors",
                    errors.phone ? "border-destructive" : "border-border"
                  )}
                />
                {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
              </div>
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="E-post *"
                value={state.email}
                onChange={(e) => { set("email", e.target.value); setErrors((prev) => ({ ...prev, email: undefined })); }}
                className={cn(
                  "w-full border px-4 py-3 bg-secondary text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors",
                  errors.email ? "border-destructive" : "border-border"
                )}
              />
              {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
            </div>

            {/* Address */}
            <div>
              <input
                type="text"
                placeholder="Adress *"
                value={state.address}
                onChange={(e) => { set("address", e.target.value); setErrors((prev) => ({ ...prev, address: undefined })); }}
                className={cn(
                  "w-full border px-4 py-3 bg-secondary text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors",
                  errors.address ? "border-destructive" : "border-border"
                )}
              />
              {errors.address && <p className="text-xs text-destructive mt-1">{errors.address}</p>}
            </div>
          </div>

          {/* DATE + TIME */}
          <div className="grid sm:grid-cols-2 gap-5">

            {/* DATE */}
            <div>
              <p className="text-xs uppercase text-primary mb-2">Datum</p>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    className={cn(
                      "w-full border px-4 py-3 text-left flex gap-2 text-sm bg-secondary transition-colors",
                      errors.date ? "border-destructive" : "border-border"
                    )}
                  >
                    <CalendarIcon className="w-4 h-4" />
                    {selectedDate ? format(selectedDate, "d MMMM yyyy") : "Välj datum"}
                  </button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(d) => {
                      set("date", d ? format(d, "yyyy-MM-dd") : "");
                      setErrors((prev) => ({ ...prev, date: undefined }));
                    }}
                    disabled={{ before: new Date() }}
                  />
                </PopoverContent>
              </Popover>
              {errors.date && <p className="text-xs text-destructive mt-1">{errors.date}</p>}
            </div>

            {/* TIME */}
            <div>
              <p className="text-xs uppercase text-primary mb-2">Tid</p>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => { set("time", slot); setErrors((prev) => ({ ...prev, time: undefined })); }}
                    className={cn(
                      "border px-2 py-2 text-sm transition-colors",
                      state.time === slot
                        ? "border-primary bg-primary/10"
                        : "border-border"
                    )}
                  >
                    {slot}
                  </button>
                ))}
              </div>
              {errors.time && <p className="text-xs text-destructive mt-1">{errors.time}</p>}
            </div>
          </div>

          {/* COMMENTS */}
          <div>
            <textarea
              className="w-full border border-border px-4 py-3 bg-secondary text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              placeholder="Kommentarer (valfritt)..."
              rows={3}
              value={state.comments}
              onChange={(e) => set("comments", e.target.value)}
            />
          </div>

          {/* SUBMIT */}
          <div>
            <button
              disabled={isSubmitting}
              onClick={handleBook}
              className={cn(
                "w-full py-4 font-semibold uppercase tracking-[0.2em] text-sm font-body transition-colors",
                isSubmitting
                  ? "bg-muted text-muted-foreground cursor-not-allowed"
                  : "bg-primary text-primary-foreground hover:bg-gold-light"
              )}
            >
              {isSubmitting ? "Skickar..." : "Skicka bokning"}
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BookingSection;