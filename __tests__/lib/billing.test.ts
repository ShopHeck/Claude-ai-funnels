import { billing, plans } from "@/lib/billing";

describe("billing", () => {
  it("exposes the four canonical plans in price-ascending order", async () => {
    const list = await billing.listPlans();
    expect(list.map((p) => p.id)).toEqual(["free", "starter", "pro", "agency"]);
    for (let i = 1; i < list.length; i++) {
      const prev = list[i - 1];
      const curr = list[i];
      if (!prev || !curr) continue;
      expect(curr.price_monthly_cents).toBeGreaterThanOrEqual(prev.price_monthly_cents);
    }
  });

  it("configures yearly pricing at roughly 10x monthly (two months free)", () => {
    plans
      .filter((p) => p.id !== "free")
      .forEach((plan) => {
        expect(plan.price_yearly_cents).toBe(plan.price_monthly_cents * 10);
      });
  });

  it("records the active plan after a purchase", async () => {
    const before = await billing.getEntitlement();
    expect(before.plan).toBe("free");
    const result = await billing.startPurchase("pro", "monthly");
    expect(result.ok).toBe(true);
    const after = await billing.getEntitlement();
    expect(after.plan).toBe("pro");
    expect(after.active).toBe(true);
  });
});
