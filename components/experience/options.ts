import type { SelectOption } from "@/components/ui/Select";
import type { CtaGoal, Emotion, Intensity, OfferType, Tone } from "@/types";

export const offerTypeOptions: SelectOption<OfferType>[] = [
  { value: "course", label: "Course" },
  { value: "coaching", label: "Coaching" },
  { value: "ecommerce", label: "Ecommerce" },
  { value: "saas", label: "SaaS" },
  { value: "community", label: "Community" },
  { value: "service", label: "Service" },
];

export const emotionOptions: SelectOption<Emotion>[] = [
  { value: "desire", label: "Desire" },
  { value: "curiosity", label: "Curiosity" },
  { value: "urgency", label: "Urgency" },
  { value: "aspiration", label: "Aspiration" },
  { value: "trust", label: "Trust" },
  { value: "transformation", label: "Transformation" },
];

export const toneOptions: SelectOption<Tone>[] = [
  { value: "cinematic", label: "Cinematic" },
  { value: "confident", label: "Confident" },
  { value: "playful", label: "Playful" },
  { value: "intimate", label: "Intimate" },
  { value: "luxury", label: "Luxury" },
];

export const intensityOptions: SelectOption<`${Intensity}`>[] = [
  { value: "1", label: "Understated" },
  { value: "2", label: "Measured" },
  { value: "3", label: "Direct" },
  { value: "4", label: "Heightened" },
  { value: "5", label: "Unmistakable" },
];

export const ctaGoalOptions: SelectOption<CtaGoal>[] = [
  { value: "book", label: "Book" },
  { value: "buy", label: "Buy" },
  { value: "subscribe", label: "Subscribe" },
  { value: "apply", label: "Apply" },
  { value: "waitlist", label: "Waitlist" },
];

export const stepTypeCopy: Record<
  "hook" | "pattern_interrupt" | "reality_shift" | "identity_trigger" | "offer_reveal" | "cta",
  { label: string; eyebrow: string }
> = {
  hook: { label: "Hook", eyebrow: "01 · First contact" },
  pattern_interrupt: { label: "Pattern Interrupt", eyebrow: "02 · Disarm" },
  reality_shift: { label: "Reality Shift", eyebrow: "03 · Reframe" },
  identity_trigger: { label: "Identity Trigger", eyebrow: "04 · Mirror" },
  offer_reveal: { label: "Offer Reveal", eyebrow: "05 · Name it" },
  cta: { label: "Call to Action", eyebrow: "06 · One step" },
};
