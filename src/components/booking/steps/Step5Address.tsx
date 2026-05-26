import { useState } from "react";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { validateAddress } from "../validators";
import { StepHeader, NavButtons, StepContainer } from "../WizardUI";
import { SectionLabel } from "../BookingUI";

interface Props {
  address: string;
  onChange: (address: string) => void;
  onBack: () => void;
  onNext: () => void;
  totalSteps: number;
}

export default function Step5Address({
  address,
  onChange,
  onBack,
  onNext,
  totalSteps,
}: Props) {
  const [touched, setTouched] = useState(false);
  const isValid = validateAddress(address);
  const showError = touched && !isValid;

  const handleNext = () => {
    setTouched(true);
    if (isValid) onNext();
  };

  return (
    <StepContainer stepKey="step5">
      <StepHeader
        step={5}
        totalSteps={totalSteps}
        title="Var ska vi möta dig?"
        subtitle="Ange adressen där bilen ska tas om hand. Vi kommer på utsatt tid."
      />

      <div>
        <SectionLabel>Adress</SectionLabel>
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary pointer-events-none" />
          <input
            type="text"
            placeholder="Gatuadress, postnummer, ort"
            value={address}
            onChange={(e) => onChange(e.target.value)}
            onBlur={() => setTouched(true)}
            className={cn(
              "w-full border pl-11 pr-4 py-3.5 bg-secondary text-sm font-body placeholder:text-muted-foreground focus:outline-none transition-colors",
              showError
                ? "border-destructive focus:border-destructive"
                : "border-border focus:border-primary"
            )}
          />
        </div>
        {showError && (
          <p className="text-xs text-destructive mt-2 font-body">
            Ange en fullständig adress (minst 5 tecken).
          </p>
        )}
        {!showError && (
          <p className="text-xs text-muted-foreground mt-2 font-body">
            Vi arbetar i Stockholm & Storstockholm.
          </p>
        )}
      </div>

      <NavButtons onBack={onBack} onNext={handleNext} nextDisabled={!isValid} />
    </StepContainer>
  );
}