import { Text, View } from "react-native";
import { MotiView } from "moti";
import { Card } from "./Card";
import { fadeUp } from "@/lib/theme/motion";

interface ChartCardProps {
  title: string;
  subtitle?: string;
  trailing?: React.ReactNode;
  children: React.ReactNode;
  delay?: number;
}

export function ChartCard({ title, subtitle, trailing, children, delay = 0 }: ChartCardProps) {
  return (
    <MotiView {...fadeUp(delay)}>
      <Card padding="md" className="gap-4">
        <View className="flex-row items-start justify-between gap-4">
          <View className="flex-1">
            <Text className="font-display text-text text-[16px]">{title}</Text>
            {subtitle ? (
              <Text className="mt-1 font-sans text-muted text-[12px]">{subtitle}</Text>
            ) : null}
          </View>
          {trailing}
        </View>
        <View>{children}</View>
      </Card>
    </MotiView>
  );
}
