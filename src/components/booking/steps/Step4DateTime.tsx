import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { sv } from "date-fns/locale";

import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import { timeSlots } from "../timeSlots";
import { StepHeader, NavButtons, StepContainer } from "../WizardUI";
import { SectionLabel } from "../BookingUI";

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

  return (
    <StepContainer stepKey="step4">
      <StepHeader
        step={4}
        totalSteps={totalSteps}
        title="När passar det?"
        subtitle="Välj datum och starttid — vi kommer till dig."
      />

      <div className="space-y-6">
        {/* Date */}
        <div>
          <SectionLabel>Datum</SectionLabel>
          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="w-full border border-border bg-secondary px-4 py-3.5 text-left flex items-center gap-2 font-body text-sm hover:border-primary/40 transition-colors"
              >
                <CalendarIcon className="w-4 h-4 text-primary" />
                {selectedDate
                  ? format(selectedDate, "EEEE d MMMM yyyy", { locale: sv })
                  : "Välj datum"}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(d) => onDateChange(d ? format(d, "yyyy-MM-dd") : "")}
                disabled={{ before: new Date() }}
                locale={sv}
                weekStartsOn={1}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Time */}
        <div>
          <SectionLabel>Tid</SectionLabel>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => onTimeChange(slot)}
                className={cn(
                  "border px-2 py-3 font-body text-sm transition-colors",
                  time === slot
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border bg-secondary text-muted-foreground hover:border-primary/40"
                )}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      </div>

      <NavButtons onBack={onBack} onNext={onNext} nextDisabled={!isValid} />
    </StepContainer>
  );
}