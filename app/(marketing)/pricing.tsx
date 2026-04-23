import { useState } from "react";
import { Link } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PlanCard } from "@/components/ui/PlanCard";
import { Tabs } from "@/components/ui/Tabs";
import { plans } from "@/lib/billing/plans";
import type { BillingPeriod } from "@/lib/billing/types";

export default function Pricing() {
  const [period, setPeriod] = useState<BillingPeriod>("monthly");

  return (
    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      <View className="mx-auto w-full max-w-[1120px] gap-10 px-4 py-16">
        <View className="items-center gap-4">
          <Badge label="Pricing" tone="cyan" dot />
          <Text className="text-center font-display-bold text-text text-[40px] leading-[44px]">
            Start free. Upgrade when revenue is real.
          </Text>
          <Text className="max-w-[640px] text-center font-sans text-muted text-[14px] leading-5">
            Every plan includes the full Experience Creator. Upgrades unlock volume, analytics
            depth, and polish you can charge for.
          </Text>
          <View className="mt-2">
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
        </View>

        <View className="flex-row flex-wrap gap-4">
          {plans.map((plan, i) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              period={period}
              currentPlan="free"
              delay={i * 80}
              onSelect={() => {}}
            />
          ))}
        </View>

        <View className="items-center gap-3">
          <Text className="text-center font-sans text-muted text-[13px]">
            On iOS, purchases are handled by Apple In-App Purchase. On the web, Stripe.
          </Text>
          <Link href="/(auth)/sign-up" asChild>
            <Button label="Create a free account" variant="secondary" size="md" />
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}
