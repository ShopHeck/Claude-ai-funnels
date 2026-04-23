import { Text, View } from "react-native";
import { MotiView } from "moti";
import { fadeUp } from "@/lib/theme/motion";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export function PageHeader({ eyebrow, title, description, actions }: PageHeaderProps) {
  return (
    <MotiView {...fadeUp(0)}>
      <View className="flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <View className="gap-2">
          {eyebrow ? (
            <Text className="font-sans-medium text-accent-cyan text-[11px] uppercase tracking-[1.8px]">
              {eyebrow}
            </Text>
          ) : null}
          <Text className="font-display-bold text-text text-[28px] leading-[32px] lg:text-[36px] lg:leading-[40px]">
            {title}
          </Text>
          {description ? (
            <Text className="max-w-[640px] font-sans text-muted text-[14px] leading-[20px]">
              {description}
            </Text>
          ) : null}
        </View>
        {actions ? <View className="flex-row flex-wrap items-center gap-2">{actions}</View> : null}
      </View>
    </MotiView>
  );
}
