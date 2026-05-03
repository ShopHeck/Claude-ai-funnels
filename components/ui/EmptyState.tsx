import { Text, View } from "react-native";
import type { LucideIcon } from "lucide-react-native";
import { Button } from "./Button";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <View className="items-center gap-4 rounded-2xl border border-dashed border-border-strong bg-panel-alt/60 px-6 py-14">
      {Icon ? (
        <View className="h-12 w-12 items-center justify-center rounded-2xl border border-border-strong bg-panel">
          <Icon size={20} color="#AAB3C5" strokeWidth={1.8} />
        </View>
      ) : null}
      <Text className="text-center font-display text-text text-[18px]">{title}</Text>
      {description ? (
        <Text className="max-w-[440px] text-center font-sans text-muted text-[13px] leading-5">
          {description}
        </Text>
      ) : null}
      {actionLabel && onAction ? (
        <Button label={actionLabel} variant="secondary" size="md" onPress={onAction} />
      ) : null}
    </View>
  );
}
