import { useState, useEffect } from "react";
import { format } from "date-fns";
import { sv } from "date-fns/locale";

import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

import { timeSlots } from "../timeSlots";
import { StepHeader, NavButtons, StepContainer } from "../WizardUI";
import { SectionLabel } from "../BookingUI";
import { getBookedTimesForDate } from "@/lib/bookings";

interface Props {
  date: string;
  time: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
  onBack: () => void;
  onNext: () => void;
  totalSteps: number;
}

export default function Step4DateTime({
  date,
  time,
  onDateChange,
  onTimeChange,
  onBack,
  onNext,
  totalSteps,
}: Props) {
  const selectedDate = date ? new Date(date) : undefined;
  const isValid = !!date && !!time;

  const [bookedTimes, setBookedTimes] = useState<string[]>([]);
  const [loadingTimes, setLoadingTimes] = useState(false);

  useEffect(() => {
    if (!date) { setBookedTimes([]); return; }
    setLoadingTimes(true);
    getBookedTimesForDate(date)
      .then((times) => {
        setBookedTimes(times);
        if (times.includes(time)) onTimeChange("");
      })
      .finally(() => setLoadingTimes(false));
  }, [date]);

  return (
    <StepContainer stepKey="step4">
      <StepHeader
        step={4}
        totalSteps={totalSteps}
        title="När passar det?"
        subtitle="Välj datum och starttid — vi kommer till dig."
      />

      <div className="flex flex-col sm:flex-row gap-6 items-start">
        {/* Left: inline calendar */}
        <div>
          <SectionLabel>Datum</SectionLabel>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(d) => onDateChange(d ? format(d, "yyyy-MM-dd") : "")}
            disabled={{ before: new Date() }}
            locale={sv}
            weekStartsOn={1}
          />
        </div>

        {/* Right: time slots */}
        <div className="flex-1">
          <SectionLabel>
            Tid
            {loadingTimes && <span className="text-xs text-muted-foreground ml-2 font-normal">Hämtar...</span>}
          </SectionLabel>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map((slot) => {
              const isBooked = bookedTimes.includes(slot);
              return (
                <button
                  key={slot}
                  type="button"
                  disabled={isBooked}
                  onClick={() => onTimeChange(slot)}
                  className={cn(
                    "border px-2 py-3 font-body text-sm transition-colors flex flex-col items-center",
                    isBooked
                      ? "border-border bg-secondary opacity-40 cursor-not-allowed"
                      : time === slot
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border bg-secondary text-muted-foreground hover:border-primary/40"
                  )}
                >
                  <span>{slot}</span>
                  {isBooked && <span className="text-[10px] leading-tight">Bokad</span>}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <NavButtons onBack={onBack} onNext={onNext} nextDisabled={!isValid} />
    </StepContainer>
  );
}