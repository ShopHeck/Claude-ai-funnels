import { Text, View } from "react-native";
import { AlertTriangle } from "lucide-react-native";
import { Button } from "./Button";

interface ErrorStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function ErrorState({
  title = "Something shifted unexpectedly",
  description = "The system is recovering. Try again in a moment — your work is safe.",
  actionLabel = "Try again",
  onAction,
}: ErrorStateProps) {
  return (
    <View className="items-center gap-4 rounded-2xl border border-danger/40 bg-danger/5 px-6 py-10">
      <View className="h-12 w-12 items-center justify-center rounded-2xl border border-danger/40 bg-panel">
        <AlertTriangle size={22} color="#FF5C7C" strokeWidth={2} />
      </View>
      <Text className="text-center font-display text-text text-[18px]">{title}</Text>
      <Text className="max-w-[420px] text-center font-sans text-muted text-[13px] leading-5">
        {description}
      </Text>
      {onAction ? (
        <Button label={actionLabel} variant="secondary" size="md" onPress={onAction} />
      ) : null}
    </View>
  );
}
