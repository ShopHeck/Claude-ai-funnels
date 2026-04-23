import { mockBilling } from "./mock";
import { plans } from "./plans";
import type { BillingPort } from "./types";

export const billing: BillingPort = mockBilling;
export { plans };
export type {
  BillingPort,
  Plan,
  PlanId,
  BillingPeriod,
  EntitlementState,
  PurchaseResult,
} from "./types";
