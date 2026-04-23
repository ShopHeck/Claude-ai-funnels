import { Text, View } from "react-native";
import type { FunnelDropoff as FunnelDropoffPoint } from "@/types";
import { formatPercent } from "@/lib/utils/formatters";
import { stepTypeCopy } from "@/components/experience/options";

interface FunnelDropoffProps {
  data: FunnelDropoffPoint[];
}

export function FunnelDropoff({ data }: FunnelDropoffProps) {
  return (
    <View className="gap-3">
      {data.map((row, i) => {
        const prev = i === 0 ? 1 : data[i - 1]?.rate ?? row.rate;
        const lost = prev > 0 ? 1 - row.rate / prev : 0;
        return (
          <View key={row.step} className="gap-1.5">
            <View className="flex-row items-center justify-between">
              <Text className="font-sans-medium text-text text-[13px]">
                {stepTypeCopy[row.step].label}
              </Text>
              <Text className="font-sans text-muted text-[12px]">
                {formatPercent(row.rate, 1)} retained · {formatPercent(lost, 1)} lost
              </Text>
            </View>
            <View className="h-2 w-full overflow-hidden rounded-full bg-panel-alt">
              <View
                style={{ width: `${Math.max(Math.min(row.rate, 1), 0) * 100}%` }}
                className="h-full rounded-full bg-accent-cyan"
              />
            </View>
          </View>
        );
      })}
    </View>
  );
}
