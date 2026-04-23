import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { Bell, Search, Sparkles } from "lucide-react-native";
import { Badge } from "@/components/ui/Badge";
import { useEntitlement } from "@/lib/hooks/useEntitlement";

interface TopbarProps {
  title?: string;
  onSearch?: () => void;
}

const planLabels: Record<string, string> = {
  free: "Free",
  starter: "Starter",
  pro: "Pro",
  agency: "Agency",
};

export function Topbar({ title, onSearch }: TopbarProps) {
  const { plan } = useEntitlement();
  return (
    <View className="flex-row items-center justify-between gap-3 border-b border-border bg-bg/90 px-4 py-3 lg:px-6">
      <View className="flex-row items-center gap-2.5 lg:hidden">
        <View className="h-7 w-7 items-center justify-center rounded-lg border border-accent-cyan/40 bg-accent-cyan/10">
          <Sparkles size={14} color="#00D4FF" />
        </View>
        <Text className="font-display text-text text-[14px]">NeuroFunnel</Text>
      </View>
      {title ? (
        <Text className="hidden font-display text-text text-[15px] lg:flex">{title}</Text>
      ) : null}
      <View className="flex-1" />
      <View className="flex-row items-center gap-2">
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Search"
          onPress={onSearch}
          className="hidden h-9 w-9 items-center justify-center rounded-xl border border-border bg-panel sm:flex"
        >
          <Search size={16} color="#AAB3C5" />
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Notifications"
          className="h-9 w-9 items-center justify-center rounded-xl border border-border bg-panel"
        >
          <Bell size={16} color="#AAB3C5" />
        </Pressable>
        <Link href="/billing" asChild>
          <Pressable accessibilityRole="link" accessibilityLabel={`Plan: ${planLabels[plan] ?? plan}`}>
            <Badge label={planLabels[plan] ?? plan} tone={plan === "free" ? "neutral" : "cyan"} dot />
          </Pressable>
        </Link>
      </View>
    </View>
  );
}
