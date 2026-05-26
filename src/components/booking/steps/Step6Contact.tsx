import { useState } from "react";
import { cn } from "@/lib/utils";
import { validateEmail, validatePhone, validateName } from "../validators";
import { StepHeader, NavButtons, StepContainer } from "../WizardUI";
import { SectionLabel } from "../BookingUI";

interface Props {
  name: string;
  phone: string;
  email: string;
  comments: string;
  onChange: (field: "name" | "phone" | "email" | "comments", value: string) => void;
  onBack: () => void;
  onNext: () => void;
  totalSteps: number;
}

type Field = "name" | "phone" | "email";

export default function Step6Contact({
  name,
  phone,
  email,
  comments,
  onChange,
  onBack,
  onNext,
  totalSteps,
}: Props) {
  const [touched, setTouched] = useState<Record<Field, boolean>>({
    name: false,
    phone: false,
    email: false,
  });

  const errors = {
    name: !validateName(name) ? "Ange ditt fullständiga namn." : null,
    phone: !validatePhone(phone) ? "Ogiltigt telefonnummer." : null,
    email: !validateEmail(email) ? "Ogiltig e-postadress." : null,
  };

  const isValid = !errors.name && !errors.phone && !errors.email;

  const handleBlur = (field: Field) => setTouched((p) => ({ ...p, [field]: true }));

  const handleNext = () => {
    setTouched({ name: true, phone: true, email: true });
    if (isValid) onNext();
  };

  const inputCls = (field: Field) =>
    cn(
      "w-full border px-4 py-3.5 bg-secondary text-sm font-body placeholder:text-muted-foreground focus:outline-none transition-colors",
      touched[field] && errors[field]
        ? "border-destructive focus:border-destructive"
        : "border-border focus:border-primary"
    );

  return (
    <StepContainer stepKey="step6">
      <StepHeader
        step={6}
        totalSteps={totalSteps}
        title="Dina kontaktuppgifter"
        subtitle="Vi använder dessa för att bekräfta bokningen och kontakta dig vid behov."
      />

      <div className="space-y-5">
        <div>
          <SectionLabel>Namn</SectionLabel>
          <input
            type="text"
            placeholder="För- och efternamn"
            value={name}
            onChange={(e) => onChange("name", e.target.value)}
            onBlur={() => handleBlur("name")}
            autoComplete="name"
            className={inputCls("name")}
          />
          {touched.name && errors.name && (
            <p className="text-xs text-destructive mt-1.5 font-body">{errors.name}</p>
          )}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <SectionLabel>Telefon</SectionLabel>
            <input
              type="tel"
              placeholder="070-123 45 67"
              value={phone}
              onChange={(e) => onChange("phone", e.target.value)}
              onBlur={() => handleBlur("phone")}
              autoComplete="tel"
              className={inputCls("phone")}
            />
            {touched.phone && errors.phone && (
              <p className="text-xs text-destructive mt-1.5 font-body">{errors.phone}</p>
            )}
          </div>

          <div>
            <SectionLabel>E-post</SectionLabel>
            <input
              type="email"
              placeholder="din@email.se"
              value={email}
              onChange={(e) => onChange("email", e.target.value)}
              onBlur={() => handleBlur("email")}
              autoComplete="email"
              className={inputCls("email")}
            />
            {touched.email && errors.email && (
              <p className="text-xs text-destructive mt-1.5 font-body">{errors.email}</p>
            )}
          </div>
        </div>

        <div>
          <SectionLabel>Kommentarer (valfritt)</SectionLabel>
          <textarea
            placeholder="T.ex. parkeringsinstruktioner, portkod eller särskilda önskemål..."
            rows={3}
            value={comments}
            onChange={(e) => onChange("comments", e.target.value)}
            className="w-full border border-border px-4 py-3.5 bg-secondary text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
          />
        </div>
      </div>

      <NavButtons onBack={onBack} onNext={handleNext} nextDisabled={!isValid} />
    </StepContainer>
  );
}