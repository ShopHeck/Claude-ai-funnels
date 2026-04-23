import { experiencesRepo, analyticsRepo, templatesRepo } from "@/lib/data";

describe("experiencesRepo", () => {
  it("lists experiences sorted newest first via recent()", async () => {
    const recent = await experiencesRepo.recent(3);
    expect(recent.length).toBeLessThanOrEqual(3);
    for (let i = 1; i < recent.length; i++) {
      const prev = recent[i - 1];
      const curr = recent[i];
      if (!prev || !curr) continue;
      expect(prev.updated_at.localeCompare(curr.updated_at)).toBeGreaterThanOrEqual(0);
    }
  });

  it("returns null for unknown experience", async () => {
    const match = await experiencesRepo.byId("does_not_exist");
    expect(match).toBeNull();
  });

  it("returns ordered steps for a known experience", async () => {
    const steps = await experiencesRepo.stepsFor("exp_quiet_luxury");
    expect(steps).toHaveLength(6);
    steps.forEach((step, i) => expect(step.order_index).toBe(i));
  });
});

describe("analyticsRepo", () => {
  it("returns a 14-day engagement series", async () => {
    const series = await analyticsRepo.engagementSeries();
    expect(series).toHaveLength(14);
    series.forEach((point) => {
      expect(point.views).toBeGreaterThan(0);
      expect(point.conversions).toBeGreaterThanOrEqual(0);
    });
  });

  it("returns monotonically non-increasing funnel dropoff rates", async () => {
    const drop = await analyticsRepo.funnelDropoff();
    for (let i = 1; i < drop.length; i++) {
      const prev = drop[i - 1];
      const curr = drop[i];
      if (!prev || !curr) continue;
      expect(curr.rate).toBeLessThanOrEqual(prev.rate);
    }
  });
});

describe("templatesRepo", () => {
  it("filters templates by category", async () => {
    const leadgen = await templatesRepo.list("lead_gen");
    expect(leadgen.length).toBeGreaterThan(0);
    leadgen.forEach((t) => expect(t.category).toBe("lead_gen"));
  });
});
