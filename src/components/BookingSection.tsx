import { createBooking } from "../lib/bookings";
import { useState } from "react";
import { Phone, Mail, MapPin, CalendarIcon, MessageSquare } from "lucide-react";
import { format } from "date-fns";

import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

import { calculatePrice } from "@/lib/priceEngine";
import { carPackages } from "@/components/booking/pricingData";

const timeSlots = [
  "06:00","07:00","08:00","09:00","10:00","11:00",
  "12:00","13:00","14:00","15:00","16:00","17:00",
  "18:00","19:00","20:00","21:00","22:00",
];

type ServiceArea =
  | "ext-int"
  | "exterior-only"
  | "interior-only";

const BookingSection = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState("");
  const [comments, setComments] = useState("");

  const [serviceArea, setServiceArea] =
    useState<ServiceArea>("ext-int");

  const [isPremium, setIsPremium] = useState(false);

  const isFormComplete = !!(serviceArea && selectedDate && selectedTime);

  const unavailableTimes: string[] = [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;

    try {
      await createBooking({
        date: format(selectedDate, "yyyy-MM-dd"),
        time: selectedTime,

        price: calculatePrice(serviceArea, isPremium),

        comments, serviceArea, isPremium,
      });

      toast.success("Bokning skickad! 🎉");

      setSelectedDate(undefined);
      setSelectedTime("");
      setComments("");
    } catch (error) {
      console.error(error);
      toast.error("Kunde inte skicka bokning");
    }
  };

  return (
    <section id="bokning" className="py-24 bg-card">
      <div className="container mx-auto px-4">

        {/* HEADER */}
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.3em] uppercase text-primary mb-3">
            Bokning
          </p>

          <h2 className="text-3xl md:text-5xl font-bold">
            Konfigurera din <span className="text-gold-gradient">tjänst</span>
          </h2>

          <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
            Välj tjänst, se pris direkt och boka.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">

  {/* PREMIUM TOGGLE */}
  <div className="grid grid-cols-2 gap-4">

    <button
      type="button"
      onClick={() => setIsPremium(false)}
      className={cn(
        "border p-6 text-left transition",
        !isPremium
          ? "border-primary bg-primary/10"
          : "border-border"
      )}
    >
      <p className="text-xl font-bold mb-2">
        Standard
      </p>

      <p className="text-sm text-muted-foreground">
        Klassisk rekond för vardagsbil.
      </p>
    </button>

    <button
      type="button"
      onClick={() => setIsPremium(true)}
      className={cn(
        "border p-6 text-left transition",
        isPremium
          ? "border-primary bg-primary/10"
          : "border-border"
      )}
    >
      <p className="text-xl font-bold mb-2 text-primary">
        Premium
      </p>

      <p className="text-sm text-muted-foreground">
        Djupgående detailing + skydd.
      </p>
    </button>

  </div>

  {/* SERVICE AREA */}
  <div className="grid sm:grid-cols-3 gap-4">

    <button
      type="button"
      onClick={() => setServiceArea("exterior-only")}
      className={cn(
        "border p-5 text-left transition",
        serviceArea === "exterior-only"
          ? "border-primary bg-primary/10"
          : "border-border"
      )}
    >
      <p className="font-semibold">
        Endast Exteriör
      </p>

      <p className="text-sm text-muted-foreground mt-2">
        {calculatePrice("exterior-only", isPremium)} kr
      </p>
    </button>

    <button
      type="button"
      onClick={() => setServiceArea("interior-only")}
      className={cn(
        "border p-5 text-left transition",
        serviceArea === "interior-only"
          ? "border-primary bg-primary/10"
          : "border-border"
      )}
    >
      <p className="font-semibold">
        Endast Interiör
      </p>

      <p className="text-sm text-muted-foreground mt-2">
        {calculatePrice("interior-only", isPremium)} kr
      </p>
    </button>

    <button
      type="button"
      onClick={() => setServiceArea("ext-int")}
      className={cn(
        "border p-5 text-left transition",
        serviceArea === "ext-int"
          ? "border-primary bg-primary/10"
          : "border-border"
      )}
    >
      <p className="font-semibold">
        Full Rekond
      </p>

      <p className="text-sm text-muted-foreground mt-2">
        {calculatePrice("ext-int", isPremium)} kr
      </p>
    </button>

  </div>

</div>

        {/* DATE + TIME */}
        <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-5">

          {/* DATE */}
          <div>
            <p className="text-xs uppercase text-prnpmimary mb-2">Datum</p>

            <Popover>
              <PopoverTrigger asChild>
                <button className="w-full border px-4 py-3 text-left flex gap-2">
                  <CalendarIcon className="w-4 h-4" />
                  {selectedDate
                    ? format(selectedDate, "d MMMM yyyy")
                    : "Välj datum"}
                </button>
              </PopoverTrigger>

              <PopoverContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* TIME */}
          <div>
            <p className="text-xs uppercase text-primary mb-2">Tid</p>

            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedTime(slot)}
                  className={cn(
                    "border px-2 py-2 text-sm",
                    selectedTime === slot
                      ? "border-primary bg-primary/10"
                      : "border-border"
                  )}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* COMMENTS */}
        <div className="max-w-3xl mx-auto mt-6">
          <textarea
            className="w-full border px-4 py-3"
            placeholder="Kommentarer..."
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
        </div>

        {/* SUBMIT */}
        <div className="max-w-3xl mx-auto mt-8">
          <button
            disabled={!isFormComplete}
            onClick={handleSubmit}
            className={cn(
              "w-full py-4 font-semibold uppercase",
              isFormComplete
                ? "bg-primary text-black"
                : "bg-muted text-muted-foreground"
            )}
          >
            Skicka bokning
          </button>
        </div>

      </div>
    </section>
  );
};

export default BookingSection;