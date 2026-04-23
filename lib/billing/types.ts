export type PlanId = "free" | "starter" | "pro" | "agency";

export type BillingPeriod = "monthly" | "yearly";

export interface Plan {
  id: PlanId;
  name: string;
  tagline: string;
  price_monthly_cents: number;
  price_yearly_cents: number;
  features: string[];
  highlight?: boolean;
  cta_label: string;
  ios_product_id: string;
  stripe_price_id_monthly: string;
  stripe_price_id_yearly: string;
}

export interface EntitlementState {
  plan: PlanId;
  active: boolean;
  renews_at?: string;
  platform?: "ios" | "web";
}

export interface PurchaseResult {
  ok: true;
  plan: PlanId;
  platform: "ios" | "web";
}

export interface BillingPort {
  listPlans(): Promise<Plan[]>;
  getEntitlement(): Promise<EntitlementState>;
  startPurchase(plan: PlanId, period: BillingPeriod): Promise<PurchaseResult>;
  restore(): Promise<EntitlementState>;
  openCustomerPortal(): Promise<void>;
}
