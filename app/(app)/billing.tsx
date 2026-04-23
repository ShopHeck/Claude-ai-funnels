import { useEffect, useState } from "react";
import { Platform, Text, View } from "react-native";
import { RefreshCcw } from "lucide-react-native";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PlanCard } from "@/components/ui/PlanCard";
import { Tabs } from "@/components/ui/Tabs";
import { CurrentPlanBanner } from "@/components/billing/CurrentPlanBanner";
import { PageContainer } from "@/components/shell/PageContainer";
import { PageHeader } from "@/components/shell/PageHeader";
import { billing } from "@/lib/billing";
import type { BillingPeriod, EntitlementState, Plan, PlanId } from "@/lib/billing/types";
import { useEntitlement } from "@/lib/hooks/useEntitlement";
import { useHaptics } from "@/lib/hooks/useHaptics";
import { telemetry } from "@/lib/telemetry/posthog";

export default function Billing() {
  const { state, refresh } = useEntitlement();
  const haptic = useHaptics();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [period, setPeriod] = useState<BillingPeriod>("monthly");
  const [purchasing, setPurchasing] = useState<PlanId | null>(null);
  const [currentEntitlement, setCurrentEntitlement] = useState<EntitlementState>(state);

  useEffect(() => {
    (async () => setPlans(await billing.listPlans()))();
  }, []);

  useEffect(() => {
    setCurrentEntitlement(state);
  }, [state]);

  const handleSelect = async (plan: Plan) => {
    if (plan.id === "free" || plan.id === currentEntitlement.plan) return;
    setPurchasing(plan.id);
    haptic("medium");
    try {
      const result = await billing.startPurchase(plan.id, period);
      telemetry.capture("purchase_started", {
        plan: plan.id,
        platform: result.platform,
        period,
      });
      await refresh();
      haptic("success");
    } catch {
      haptic("error");
    } finally {
      setPurchasing(null);
    }
  };

  const restore = async () => {
    haptic("medium");
    await billing.restore();
    await refresh();
  };

  const currentPlan = plans.find((p) => p.id === currentEntitlement.plan);
  const billingProvider =
    Platform.OS === "ios" ? "Apple In-App Purchase" : "Stripe (secure checkout)";

  return (
    <PageContainer>
      <PageHeader
        eyebrow="Billing"
        title="Plan & billing"
        description={`Payments on this device are handled by ${billingProvider}. Your entitlement follows you across devices.`}
        actions={
          <Button
            label="Restore purchases"
            variant="secondary"
            size="md"
            leading={<RefreshCcw size={15} color="#FFFFFF" />}
            onPress={restore}
          />
        }
      />

      <CurrentPlanBanner plan={currentPlan} entitlement={currentEntitlement} />

      <View className="flex-row items-center justify-between gap-3">
        <Text className="font-display text-text text-[18px]">Upgrade</Text>
        <Tabs<BillingPeriod>
          variant="pill"
          value={period}
          onChange={setPeriod}
          items={[
            { value: "monthly", label: "Monthly" },
            { value: "yearly", label: "Yearly · 2 months free" },
          ]}
        />
      </View>

      <View className="flex-row flex-wrap gap-4">
        {plans.map((plan, i) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            period={period}
            currentPlan={currentEntitlement.plan}
            onSelect={handleSelect}
            loading={purchasing === plan.id}
            delay={i * 80}
          />
        ))}
      </View>

      <Card padding="md" variant="subtle">
        <Text className="font-sans text-subtle text-[12px] leading-[18px]">
          On iOS, subscriptions are managed in your Apple ID settings and auto-renew unless
          cancelled at least 24 hours before the renewal date. Web subscriptions are managed via
          Stripe — we never hold your card details.
        </Text>
      </Card>
    </PageContainer>
  );
}
