import { useState } from "react";
import { toast } from "sonner";

import { createBooking } from "@/lib/bookings";
import { sendBookingEmails } from "@/lib/resend";

import { useBookingState } from "./useBookingState";
import { StickyPriceBar } from "./WizardUI";

import Step1ServiceArea from "./steps/Step1ServiceArea";
import Step2Package from "./steps/Step2Package";
import Step3CarSize from "./steps/Step3CarSize";
import Step4DateTime from "./steps/Step4DateTime";
import Step5Address from "./steps/Step5Address";
import Step6Contact from "./steps/Step6Contact";
import StepUpsell from "./steps/StepUpsell";
import Step7Confirm from "./steps/Step7Confirm";

/**
 * Step routing:
 *  1 → Service area
 *  2 → Package (Standard/Premium)
 *  3 → Car size
 *  4 → Date & time
 *  5 → Address
 *  6 → Contact
 *  7 → Upsell (skipped if already Premium, total visible-steps drop to 7)
 *  8 → Confirmation
 *
 * The visible step number shown in the UI ("Steg X av Y") adapts based on whether
 * the upsell is part of the user's flow.
 */

const STEP_SERVICE_AREA = 1;
const STEP_PACKAGE = 2;
const STEP_CAR_SIZE = 3;
const STEP_DATE_TIME = 4;
const STEP_ADDRESS = 5;
const STEP_CONTACT = 6;
const STEP_UPSELL = 7;
const STEP_CONFIRM = 8;

export default function BookingWizard() {
  const {
    state,
    set,
    reset,
    price,
    detailingPrice,
    currentStep,
    setCurrentStep,
  } = useBookingState();

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Upsell is offered to users who picked Standard.
  // If user is already Premium, the upsell step is skipped entirely.
  const showUpsell = !state.isPremium;
  const totalVisibleSteps = showUpsell ? 8 : 7;

  // Map internal step → visible step number for the UI
  const visibleStepNumber = (step: number): number => {
    if (step < STEP_UPSELL) return step;
    if (step === STEP_UPSELL) return STEP_UPSELL;
    // STEP_CONFIRM: visible number depends on whether upsell exists in flow
    return showUpsell ? 8 : 7;
  };

  const goNext = () => {
    setCurrentStep((s) => {
      // Skip upsell when going forward if user is already Premium
      if (s === STEP_CONTACT && !showUpsell) return STEP_CONFIRM;
      return s + 1;
    });
  };

  const goBack = () => {
    setCurrentStep((s) => {
      // Skip upsell when going back if user is already Premium
      if (s === STEP_CONFIRM && !showUpsell) return STEP_CONTACT;
      return Math.max(1, s - 1);
    });
  };

  const handleUpsellAccept = () => {
    set("isPremium", true);
    setCurrentStep(STEP_CONFIRM);
  };

  const handleUpsellDecline = () => {
    setCurrentStep(STEP_CONFIRM);
  };

  const handleSubmit = async () => {
    if (!state.acceptedTerms) return;

    setIsSubmitting(true);
    try {
      const payload = {
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
      };

      await createBooking(payload);

      // Email sending is best-effort — booking is already saved.
      try {
        await sendBookingEmails(payload);
      } catch (emailError) {
        console.error("Email send failed:", emailError);
      }

      toast.success("Bokning skickad! 🎉 Du får en bekräftelse via e-post.");
      reset();
    } catch (error) {
      console.error(error);
      toast.error("Kunde inte skicka bokning. Försök igen.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Sticky price bar appears from car size step onward
  const showStickyPrice = currentStep >= STEP_CAR_SIZE && currentStep < STEP_CONFIRM;

  return (
    <section id="bokning" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        {/* Section heading */}
        <div className="text-center mb-12">
          <p className="font-body text-sm tracking-[0.3em] uppercase text-primary mb-3">
            Bokning
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            Boka din <span className="text-gold-gradient">tjänst</span>
          </h2>
          <p className="mt-4 text-muted-foreground font-body max-w-lg mx-auto">
            Sju enkla steg — vi kommer till dig.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <StickyPriceBar price={detailingPrice} visible={showStickyPrice} />

          {currentStep === STEP_SERVICE_AREA && (
            <Step1ServiceArea
              selected={state.serviceArea}
              onSelect={(area) => set("serviceArea", area)}
              onNext={goNext}
              totalSteps={totalVisibleSteps}
            />
          )}

          {currentStep === STEP_PACKAGE && (
            <Step2Package
              serviceArea={state.serviceArea}
              isPremium={state.isPremium}
              onSelect={(premium) => set("isPremium", premium)}
              onBack={goBack}
              onNext={goNext}
              totalSteps={totalVisibleSteps}
            />
          )}

          {currentStep === STEP_CAR_SIZE && (
            <Step3CarSize
              serviceArea={state.serviceArea}
              isPremium={state.isPremium}
              carSize={state.carSize}
              onSelect={(size) => set("carSize", size)}
              onBack={goBack}
              onNext={goNext}
              totalSteps={totalVisibleSteps}
            />
          )}

          {currentStep === STEP_DATE_TIME && (
            <Step4DateTime
              date={state.date}
              time={state.time}
              onDateChange={(d) => set("date", d)}
              onTimeChange={(t) => set("time", t)}
              onBack={goBack}
              onNext={goNext}
              totalSteps={totalVisibleSteps}
            />
          )}

          {currentStep === STEP_ADDRESS && (
            <Step5Address
              address={state.address}
              onChange={(v) => set("address", v)}
              onBack={goBack}
              onNext={goNext}
              totalSteps={totalVisibleSteps}
            />
          )}

          {currentStep === STEP_CONTACT && (
            <Step6Contact
              name={state.name}
              phone={state.phone}
              email={state.email}
              comments={state.comments}
              onChange={(field, value) => set(field, value)}
              onBack={goBack}
              onNext={goNext}
              totalSteps={totalVisibleSteps}
            />
          )}

          {currentStep === STEP_UPSELL && showUpsell && (
            <StepUpsell
              serviceArea={state.serviceArea}
              carSize={state.carSize}
              onAccept={handleUpsellAccept}
              onDecline={handleUpsellDecline}
              onBack={goBack}
              totalSteps={totalVisibleSteps}
              stepNumber={STEP_UPSELL}
            />
          )}

          {currentStep === STEP_CONFIRM && (
            <Step7Confirm
              state={state}
              price={price}
              isSubmitting={isSubmitting}
              onToggleTerms={() => set("acceptedTerms", !state.acceptedTerms)}
              onBack={goBack}
              onSubmit={handleSubmit}
              totalSteps={totalVisibleSteps}
              stepNumber={visibleStepNumber(STEP_CONFIRM)}
            />
          )}
        </div>
      </div>
    </section>
  );
}