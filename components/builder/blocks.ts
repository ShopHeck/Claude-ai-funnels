import {
  CreditCard,
  FileText,
  Layers,
  Mail,
  MessageCircle,
  MousePointerClick,
  Sparkles,
} from "lucide-react-native";
import type { LucideIcon } from "lucide-react-native";
import type { BlockType } from "@/types";

export interface BlockDef {
  type: BlockType;
  label: string;
  description: string;
  icon: LucideIcon;
}

export const blockLibrary: BlockDef[] = [
  {
    type: "hero_hook",
    label: "Hero Hook",
    description: "Top-of-page hero with headline, sub and primary CTA.",
    icon: Sparkles,
  },
  {
    type: "story_section",
    label: "Story Section",
    description: "Narrative copy block for reframes or founder letters.",
    icon: FileText,
  },
  {
    type: "email_capture",
    label: "Email Capture",
    description: "Single-field capture with a reason, not a reward.",
    icon: Mail,
  },
  {
    type: "offer_reveal",
    label: "Offer Reveal",
    description: "Name the offer, scope, and what's excluded.",
    icon: Layers,
  },
  {
    type: "testimonials",
    label: "Testimonials",
    description: "Curated quotes with optional portraits.",
    icon: MessageCircle,
  },
  {
    type: "cta",
    label: "CTA",
    description: "Standalone call-to-action with a single, clear button.",
    icon: MousePointerClick,
  },
  {
    type: "checkout_prompt",
    label: "Checkout Prompt",
    description: "Scarcity-aware purchase reminder for the final step.",
    icon: CreditCard,
  },
];

export function blockDefaults(type: BlockType): { title: string; body: string; cta?: string } {
  switch (type) {
    case "hero_hook":
      return {
        title: "A single, unmistakable promise.",
        body: "One sentence. No adjectives. No hedging.",
        cta: "Continue",
      };
    case "story_section":
      return {
        title: "Why we do this.",
        body: "Say the true thing the rest of your market won't.",
      };
    case "email_capture":
      return {
        title: "Join the list.",
        body: "We only write when there's something worth saying.",
        cta: "Add me to the list",
      };
    case "offer_reveal":
      return {
        title: "What's inside.",
        body: "The scope. The cadence. The seats.",
      };
    case "testimonials":
      return {
        title: "Quietly, from the people inside.",
        body: "Three voices, published with their permission.",
      };
    case "cta":
      return {
        title: "One step, clearly stated.",
        body: "No urgency theatre. Just the next move.",
        cta: "Take the next step",
      };
    case "checkout_prompt":
      return {
        title: "Completing your order.",
        body: "Price, guarantees, and what happens in the next 24 hours.",
        cta: "Complete order",
      };
  }
}
