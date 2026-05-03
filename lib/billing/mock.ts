import { Platform } from "react-native";
import { createLogger } from "@/lib/utils/logger";
import { plans } from "./plans";
import type {
  BillingPeriod,
  BillingPort,
  EntitlementState,
  Plan,
  PlanId,
  PurchaseResult,
} from "./types";

const log = createLogger("billing.mock");

let state: EntitlementState = {
  plan: "free",
  active: true,
  platform: Platform.OS === "ios" ? "ios" : "web",
};

export const mockBilling: BillingPort = {
  async listPlans(): Promise<Plan[]> {
    return plans.map((p) => ({ ...p }));
  },
  async getEntitlement(): Promise<EntitlementState> {
    return { ...state };
  },
  async startPurchase(plan: PlanId, period: BillingPeriod): Promise<PurchaseResult> {
    const platform = Platform.OS === "ios" ? "ios" : "web";
    log.info(`startPurchase ${plan} / ${period} via ${platform}`);
    state = {
      plan,
      active: true,
      platform,
      renews_at: new Date(
        Date.now() + (period === "yearly" ? 365 : 30) * 24 * 3600_000,
      ).toISOString(),
    };
    return { ok: true, plan, platform };
  },
  async restore(): Promise<EntitlementState> {
    log.info("restore purchases");
    return { ...state };
  },
  async openCustomerPortal(): Promise<void> {
    log.info("open customer portal");
  },
};
