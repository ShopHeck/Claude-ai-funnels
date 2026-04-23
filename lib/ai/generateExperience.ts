import type {
  CtaGoal,
  Emotion,
  Experience,
  ExperienceStep,
  Intensity,
  OfferType,
  StepType,
  Tone,
} from "@/types";

export interface GenerateInput {
  niche: string;
  offer_type: OfferType;
  emotion: Emotion;
  tone: Tone;
  intensity: Intensity;
  cta_goal: CtaGoal;
  user_id: string;
  name?: string;
}

export interface GenerateResult {
  experience: Experience;
  steps: ExperienceStep[];
}

const stepOrder: StepType[] = [
  "hook",
  "pattern_interrupt",
  "reality_shift",
  "identity_trigger",
  "offer_reveal",
  "cta",
];

const hookByEmotion: Record<Emotion, string> = {
  desire: "You already know what you want. You've been editing around it.",
  curiosity: "There's a quieter way to do this — and it's hiding in plain sight.",
  urgency: "This window closes faster than your audience will admit.",
  aspiration: "The people you're measuring yourself against stopped measuring.",
  trust: "Your audience is tired of being sold to by people who never bought.",
  transformation: "The version of you they follow is one decision behind the one you are now.",
};

const interruptByIntensity: Record<Intensity, string> = {
  1: "Stop collecting. Start choosing.",
  2: "The market is loud because everyone is afraid of the quiet offer.",
  3: "You are selling the wrong half of your expertise.",
  4: "Every dashboard you check is a decision you're avoiding.",
  5: "The thing you would never charge for is the thing they want most.",
};

const realityByOffer: Record<OfferType, string> = {
  course: "Imagine a 30-day curriculum that is read once and applied daily.",
  coaching: "Picture a calendar that filters you, not the other way around.",
  ecommerce: "Imagine a product page that sells the ritual, not the SKU.",
  saas: "Picture a dashboard that tells you the next decision, not the next number.",
  community: "Imagine a room where the standards do the sorting.",
  service: "Picture a proposal that arrives as a conclusion, not a question.",
};

const identityByTone: Record<Tone, string> = {
  cinematic: "You are not the narrator. You are the scene they keep rewatching.",
  confident: "You are the voice your market quotes back to itself.",
  playful: "You are the reason this category stopped taking itself so seriously.",
  intimate: "You are the person your audience writes to before they decide.",
  luxury: "You are the standard the rest of the market quietly measures against.",
};

const offerByCta: Record<CtaGoal, (niche: string) => string> = {
  book: (n) => `A private session for operators in ${n}. Two openings per week.`,
  buy: (n) => `A single, unmistakable product for people already in ${n}.`,
  subscribe: (n) => `A monthly cadence built for people who ship in ${n}, not lurk.`,
  apply: (n) => `Application-only admission for ${n}. Four seats per cohort.`,
  waitlist: (n) => `A private waitlist for the next release in ${n}. We open two seats a month.`,
};

const ctaByGoal: Record<CtaGoal, string> = {
  book: "Book your private session.",
  buy: "Claim yours before the window closes.",
  subscribe: "Subscribe for the next drop.",
  apply: "Request your private review.",
  waitlist: "Add your name to the list.",
};

function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hash(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function titleFor(type: StepType, input: GenerateInput): string {
  switch (type) {
    case "hook":
      return hookByEmotion[input.emotion];
    case "pattern_interrupt":
      return interruptByIntensity[input.intensity];
    case "reality_shift":
      return realityByOffer[input.offer_type];
    case "identity_trigger":
      return identityByTone[input.tone];
    case "offer_reveal":
      return offerByCta[input.cta_goal](input.niche);
    case "cta":
      return ctaByGoal[input.cta_goal];
  }
}

const subtitleFragments: Record<StepType, string[]> = {
  hook: [
    "Pause. Read it again.",
    "Notice what happens in your chest.",
    "This is the line they'll quote back.",
  ],
  pattern_interrupt: [
    "Most of your market is avoiding this sentence.",
    "You've been circling this without saying it.",
    "Take the obvious thing and charge for it.",
  ],
  reality_shift: [
    "Not hypothetical. Immediate.",
    "The version of this that already exists in your drafts.",
    "Everything else is decoration.",
  ],
  identity_trigger: [
    "The mirror is the pitch.",
    "They aren't buying the offer. They're buying the reflection.",
    "Make the identity unmistakable.",
  ],
  offer_reveal: [
    "One offer, stated once, without a hedge.",
    "Scarcity that is real, not manufactured.",
    "No bonuses. No stack. Just the thing.",
  ],
  cta: [
    "One clear step.",
    "One sentence, one button.",
    "Speak like you've already decided.",
  ],
};

function contentFor(type: StepType, rand: () => number): string {
  const options = subtitleFragments[type];
  const idx = Math.floor(rand() * options.length);
  return options[idx] ?? options[0] ?? "";
}

export function generateExperience(input: GenerateInput): GenerateResult {
  const seedKey = [
    input.niche,
    input.offer_type,
    input.emotion,
    input.tone,
    input.intensity,
    input.cta_goal,
  ].join("|");
  const rand = mulberry32(hash(seedKey));

  const id = `exp_${hash(seedKey + Date.now()).toString(36)}`;
  const createdAt = new Date().toISOString();

  const experience: Experience = {
    id,
    user_id: input.user_id,
    name: input.name ?? `${input.niche} · ${input.emotion} · ${input.cta_goal}`,
    niche: input.niche,
    offer_type: input.offer_type,
    emotion: input.emotion,
    tone: input.tone,
    intensity: input.intensity,
    cta_goal: input.cta_goal,
    status: "draft",
    created_at: createdAt,
    updated_at: createdAt,
  };

  const steps: ExperienceStep[] = stepOrder.map((type, order_index) => ({
    id: `${id}_${type}`,
    experience_id: id,
    type,
    title: titleFor(type, input),
    content: contentFor(type, rand),
    order_index,
  }));

  return { experience, steps };
}
