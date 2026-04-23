import { Text, View } from "react-native";
import { MotiView } from "moti";
import { Check } from "lucide-react-native";
import { Card } from "./Card";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { fadeUp } from "@/lib/theme/motion";
import { formatCurrencyCents } from "@/lib/utils/formatters";
import type { BillingPeriod, Plan, PlanId } from "@/lib/billing/types";

interface PlanCardProps {
  plan: Plan;
  period: BillingPeriod;
  currentPlan: PlanId;
  onSelect: (plan: Plan) => void;
  delay?: number;
  loading?: boolean;
}

export function PlanCard({
  plan,
  period,
  currentPlan,
  onSelect,
  delay = 0,
  loading,
}: PlanCardProps) {
  const priceCents =
    period === "monthly" ? plan.price_monthly_cents : plan.price_yearly_cents;
  const isCurrent = currentPlan === plan.id;
  const priceLabel =
    plan.id === "free"
      ? "Free"
      : priceCents === 0
        ? "Included"
        : `${formatCurrencyCents(priceCents)}${period === "monthly" ? "/mo" : "/yr"}`;

  return (
    <MotiView {...fadeUp(delay)} style={{ flex: 1, minWidth: 260 }}>
      <Card
        variant={plan.highlight ? "glow" : "default"}
        padding="lg"
        className="gap-5"
      >
        <View className="flex-row items-center justify-between">
          <Text className="font-display text-text text-[20px]">{plan.name}</Text>
          {plan.highlight ? <Badge tone="cyan" label="Most loved" dot /> : null}
          {isCurrent && !plan.highlight ? <Badge tone="violet" label="Current" /> : null}
        </View>
        <Text className="font-sans text-muted text-[13px] leading-5">{plan.tagline}</Text>
        <View className="flex-row items-baseline gap-1.5">
          <Text className="font-display-bold text-text text-[32px] leading-[34px]">
            {priceLabel}
          </Text>
          {period === "yearly" && priceCents > 0 ? (
            <Text className="font-sans text-subtle text-[12px]">billed annually</Text>
          ) : null}
        </View>
        <View className="gap-2">
          {plan.features.map((f) => (
            <View key={f} className="flex-row items-start gap-2">
              <Check size={16} color="#00D4FF" strokeWidth={2.4} />
              <Text className="flex-1 font-sans text-text text-[13px] leading-5">{f}</Text>
            </View>
          ))}
        </View>
        <Button
          label={isCurrent ? "Current plan" : plan.cta_label}
          variant={plan.highlight ? "primary" : "secondary"}
          size="md"
          fullWidth
          disabled={isCurrent}
          loading={loading}
          onPress={() => onSelect(plan)}
          hapticKind="medium"
        />
      </Card>
    </MotiView>
  );
}
