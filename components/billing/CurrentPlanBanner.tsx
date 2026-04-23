import { Platform, Text, View } from "react-native";
import { Sparkles } from "lucide-react-native";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { EntitlementState, Plan } from "@/lib/billing/types";

interface CurrentPlanBannerProps {
  plan: Plan | undefined;
  entitlement: EntitlementState;
}

export function CurrentPlanBanner({ plan, entitlement }: CurrentPlanBannerProps) {
  if (!plan) return null;
  const platformLabel =
    entitlement.platform === "ios"
      ? "Apple In-App Purchase"
      : entitlement.platform === "web"
        ? "Stripe"
        : Platform.OS === "ios"
          ? "Apple In-App Purchase"
          : "Stripe";

  return (
    <Card variant="violet" padding="md" className="gap-3">
      <View className="flex-row items-center gap-2">
        <View className="h-8 w-8 items-center justify-center rounded-lg border border-accent-violet/40 bg-accent-violet/10">
          <Sparkles size={14} color="#7B61FF" />
        </View>
        <Text className="font-display text-text text-[15px]">Current plan</Text>
        <View className="ml-auto">
          <Badge label={entitlement.active ? "Active" : "Paused"} tone={entitlement.active ? "success" : "warning"} dot />
        </View>
      </View>
      <Text className="font-display-bold text-text text-[24px] leading-7">{plan.name}</Text>
      <Text className="font-sans text-muted text-[13px] leading-5">{plan.tagline}</Text>
      <Text className="font-sans text-subtle text-[12px]">
        Managed by {platformLabel}
        {entitlement.renews_at
          ? ` · renews ${new Date(entitlement.renews_at).toLocaleDateString()}`
          : ""}
      </Text>
    </Card>
  );
}
