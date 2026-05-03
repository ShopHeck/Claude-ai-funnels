import { Text, View } from "react-native";
import { MotiView } from "moti";
import { ArrowDownRight, ArrowUpRight } from "lucide-react-native";
import { Card } from "./Card";
import { fadeUp } from "@/lib/theme/motion";
import { cn } from "@/lib/utils/cn";

interface MetricCardProps {
  label: string;
  value: string;
  delta?: number;
  deltaLabel?: string;
  accent?: "cyan" | "violet" | "neutral";
  delay?: number;
}

export function MetricCard({
  label,
  value,
  delta,
  deltaLabel,
  accent = "neutral",
  delay = 0,
}: MetricCardProps) {
  const positive = (delta ?? 0) >= 0;
  const DeltaIcon = positive ? ArrowUpRight : ArrowDownRight;
  const accentBar =
    accent === "cyan" ? "bg-accent-cyan" : accent === "violet" ? "bg-accent-violet" : "bg-border-strong";

  return (
    <MotiView {...fadeUp(delay)} style={{ flex: 1, minWidth: 180 }}>
      <Card padding="md" className="gap-3">
        <View className="flex-row items-center gap-2">
          <View className={cn("h-2 w-2 rounded-full", accentBar)} />
          <Text className="text-muted font-sans-medium text-[11px] uppercase tracking-[1.4px]">
            {label}
          </Text>
        </View>
        <Text className="font-display-bold text-text text-[32px] leading-[34px]">{value}</Text>
        {delta !== undefined ? (
          <View className="flex-row items-center gap-1.5">
            <DeltaIcon
              size={14}
              color={positive ? "#3EE49A" : "#FF5C7C"}
              strokeWidth={2.5}
            />
            <Text
              className={cn(
                "font-sans-medium text-[12px]",
                positive ? "text-success" : "text-danger",
              )}
            >
              {positive ? "+" : ""}
              {delta.toFixed(1)}%
            </Text>
            {deltaLabel ? (
              <Text className="text-subtle font-sans text-[12px]">vs {deltaLabel}</Text>
            ) : null}
          </View>
        ) : null}
      </Card>
    </MotiView>
  );
}
