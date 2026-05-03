export type ExperienceStatus = "draft" | "published" | "archived";

export type Emotion =
  | "desire"
  | "curiosity"
  | "urgency"
  | "aspiration"
  | "trust"
  | "transformation";

export type Tone = "cinematic" | "confident" | "playful" | "intimate" | "luxury";

export type OfferType =
  | "course"
  | "coaching"
  | "ecommerce"
  | "saas"
  | "community"
  | "service";

export type Intensity = 1 | 2 | 3 | 4 | 5;

export type CtaGoal = "book" | "buy" | "subscribe" | "apply" | "waitlist";

export type StepType =
  | "hook"
  | "pattern_interrupt"
  | "reality_shift"
  | "identity_trigger"
  | "offer_reveal"
  | "cta";

export type BlockType =
  | "hero_hook"
  | "story_section"
  | "email_capture"
  | "offer_reveal"
  | "testimonials"
  | "cta"
  | "checkout_prompt";

export interface Experience {
  id: string;
  user_id: string;
  name: string;
  niche: string;
  offer_type: OfferType;
  emotion: Emotion;
  tone: Tone;
  intensity: Intensity;
  cta_goal: CtaGoal;
  status: ExperienceStatus;
  created_at: string;
  updated_at: string;
}

export interface ExperienceStep {
  id: string;
  experience_id: string;
  type: StepType;
  title: string;
  content: string;
  order_index: number;
}

export interface FunnelBlock {
  id: string;
  experience_id: string;
  type: BlockType;
  title: string;
  body: string;
  cta_label?: string;
  order_index: number;
}

export interface AnalyticsSummary {
  experience_id: string;
  views: number;
  clicks: number;
  conversions: number;
  revenue: number;
  avg_engagement_time: number;
  perception_score: number;
}

export interface AnalyticsSeriesPoint {
  date: string;
  views: number;
  conversions: number;
  revenue: number;
}

export interface FunnelDropoff {
  step: StepType;
  rate: number;
}

export type TemplateCategory = "lead_gen" | "ecommerce" | "affiliate" | "high_ticket";

export interface Template {
  id: string;
  title: string;
  category: TemplateCategory;
  thumbnail: string;
  value_prop: string;
  preview_steps: Pick<ExperienceStep, "type" | "title" | "content">[];
  recommended_emotion: Emotion;
  recommended_tone: Tone;
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string | null;
  created_at: string;
}
