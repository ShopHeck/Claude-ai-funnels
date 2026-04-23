import { Text, View } from "react-native";
import type { AnalyticsSummary } from "@/types";
import { formatCount, formatCurrency, formatPercent } from "@/lib/utils/formatters";

interface TopExperiencesProps {
  items: Array<AnalyticsSummary & { name: string }>;
}

export function TopExperiences({ items }: TopExperiencesProps) {
  return (
    <View className="gap-2">
      <View className="flex-row items-center justify-between px-3 pb-2">
        <Text className="w-[40%] font-sans-medium text-subtle text-[11px] uppercase tracking-[1.4px]">
          Experience
        </Text>
        <Text className="w-[20%] text-right font-sans-medium text-subtle text-[11px] uppercase tracking-[1.4px]">
          Views
        </Text>
        <Text className="w-[20%] text-right font-sans-medium text-subtle text-[11px] uppercase tracking-[1.4px]">
          Conv
        </Text>
        <Text className="w-[20%] text-right font-sans-medium text-subtle text-[11px] uppercase tracking-[1.4px]">
          Revenue
        </Text>
      </View>
      {items.map((row) => {
        const convRate = row.views > 0 ? row.conversions / row.views : 0;
        return (
          <View
            key={row.experience_id}
            className="flex-row items-center justify-between rounded-xl border border-border bg-panel px-3 py-3"
          >
            <Text numberOfLines={1} className="w-[40%] font-sans-semibold text-text text-[13px]">
              {row.name}
            </Text>
            <Text className="w-[20%] text-right font-sans text-muted text-[13px]">
              {formatCount(row.views)}
            </Text>
            <Text className="w-[20%] text-right font-sans text-muted text-[13px]">
              {formatPercent(convRate, 1)}
            </Text>
            <Text className="w-[20%] text-right font-sans-semibold text-text text-[13px]">
              {formatCurrency(row.revenue)}
            </Text>
          </View>
        );
      })}
    </View>
  );
}
