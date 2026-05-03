import { useEffect, useState } from "react";
import { billing } from "@/lib/billing";
import type { EntitlementState, PlanId } from "@/lib/billing/types";

export function useEntitlement(): {
  state: EntitlementState;
  isLoading: boolean;
  isPro: boolean;
  plan: PlanId;
  refresh: () => Promise<void>;
} {
  const [state, setState] = useState<EntitlementState>({ plan: "free", active: true });
  const [isLoading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const next = await billing.getEntitlement();
    setState(next);
    setLoading(false);
  };

  useEffect(() => {
    void load();
  }, []);

  return {
    state,
    isLoading,
    isPro: state.plan !== "free",
    plan: state.plan,
    refresh: load,
  };
}
