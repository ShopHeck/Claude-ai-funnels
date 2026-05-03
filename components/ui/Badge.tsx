import { Text, View } from "react-native";
import { cn } from "@/lib/utils/cn";

export type BadgeTone = "neutral" | "cyan" | "violet" | "success" | "danger" | "warning";

interface BadgeProps {
  label: string;
  tone?: BadgeTone;
  dot?: boolean;
}

const tones: Record<BadgeTone, { wrap: string; text: string; dot: string }> = {
  neutral: { wrap: "bg-panel-alt border-border", text: "text-muted", dot: "bg-muted" },
  cyan: { wrap: "bg-accent-cyan/10 border-accent-cyan/40", text: "text-accent-cyan", dot: "bg-accent-cyan" },
  violet: { wrap: "bg-accent-violet/10 border-accent-violet/40", text: "text-accent-violet", dot: "bg-accent-violet" },
  success: { wrap: "bg-success/10 border-success/40", text: "text-success", dot: "bg-success" },
  danger: { wrap: "bg-danger/10 border-danger/40", text: "text-danger", dot: "bg-danger" },
  warning: { wrap: "bg-warning/10 border-warning/40", text: "text-warning", dot: "bg-warning" },
};

export function Badge({ label, tone = "neutral", dot }: BadgeProps) {
  const t = tones[tone];
  return (
    <View className={cn("flex-row items-center gap-1.5 self-start rounded-full border px-2.5 py-1", t.wrap)}>
      {dot ? <View className={cn("h-1.5 w-1.5 rounded-full", t.dot)} /> : null}
      <Text className={cn("text-[11px] font-sans-medium tracking-wider uppercase", t.text)}>
        {label}
      </Text>
    </View>
  );
}
