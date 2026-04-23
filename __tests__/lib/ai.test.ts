import { generateExperience } from "@/lib/ai/generateExperience";

const baseInput = {
  niche: "High-ticket coaching",
  offer_type: "coaching" as const,
  emotion: "aspiration" as const,
  tone: "luxury" as const,
  intensity: 4 as const,
  cta_goal: "apply" as const,
  user_id: "user_test",
};

describe("generateExperience", () => {
  it("produces six ordered steps matching the canonical sequence", () => {
    const { steps } = generateExperience(baseInput);
    expect(steps).toHaveLength(6);
    expect(steps.map((s) => s.type)).toEqual([
      "hook",
      "pattern_interrupt",
      "reality_shift",
      "identity_trigger",
      "offer_reveal",
      "cta",
    ]);
    steps.forEach((step, i) => expect(step.order_index).toBe(i));
  });

  it("is deterministic for a given input seed", () => {
    const first = generateExperience(baseInput);
    const second = generateExperience(baseInput);
    expect(first.steps.map((s) => s.title)).toEqual(second.steps.map((s) => s.title));
    expect(first.steps.map((s) => s.content)).toEqual(second.steps.map((s) => s.content));
  });

  it("varies content when emotion changes", () => {
    const a = generateExperience(baseInput);
    const b = generateExperience({ ...baseInput, emotion: "urgency" });
    expect(a.steps[0]?.title).not.toEqual(b.steps[0]?.title);
  });

  it("produces a draft experience with the supplied inputs preserved", () => {
    const { experience } = generateExperience(baseInput);
    expect(experience.status).toBe("draft");
    expect(experience.niche).toBe(baseInput.niche);
    expect(experience.offer_type).toBe(baseInput.offer_type);
    expect(experience.intensity).toBe(baseInput.intensity);
    expect(experience.user_id).toBe(baseInput.user_id);
  });
});
