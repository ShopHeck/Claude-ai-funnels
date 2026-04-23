import { Link, usePathname } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { CircleUserRound, Sparkles } from "lucide-react-native";
import { cn } from "@/lib/utils/cn";
import { primaryNav, secondaryNav } from "./nav-items";

interface SidebarProps {
  userEmail?: string;
  planLabel?: string;
  onUpgrade?: () => void;
}

export function Sidebar({ userEmail, planLabel = "Free", onUpgrade }: SidebarProps) {
  const pathname = usePathname();

  return (
    <View className="hidden h-full w-[248px] shrink-0 border-r border-border bg-panel-alt px-4 py-5 lg:flex">
      <View className="flex-row items-center gap-2.5 px-2 py-3">
        <View className="h-8 w-8 items-center justify-center rounded-lg border border-accent-cyan/40 bg-accent-cyan/10">
          <Sparkles size={16} color="#00D4FF" />
        </View>
        <Text className="font-display text-text text-[16px]">NeuroFunnel</Text>
      </View>

      <View className="mt-6 gap-1">
        <Text className="px-3 pb-1 font-sans-medium text-subtle text-[10.5px] tracking-[1.6px] uppercase">
          Workspace
        </Text>
        {primaryNav.map((item) => {
          const active = pathname?.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} asChild>
              <Pressable
                accessibilityRole="link"
                className={cn(
                  "flex-row items-center gap-2.5 rounded-xl px-3 py-2",
                  active
                    ? "bg-panel border border-border-strong"
                    : "hover:bg-panel/50",
                )}
              >
                <Icon
                  size={17}
                  color={active ? "#00D4FF" : "#AAB3C5"}
                  strokeWidth={active ? 2.4 : 2}
                />
                <Text
                  className={cn(
                    "font-sans-medium text-[13.5px]",
                    active ? "text-text" : "text-muted",
                  )}
                >
                  {item.label}
                </Text>
              </Pressable>
            </Link>
          );
        })}
      </View>

      <View className="mt-6 gap-1">
        <Text className="px-3 pb-1 font-sans-medium text-subtle text-[10.5px] tracking-[1.6px] uppercase">
          Account
        </Text>
        {secondaryNav.map((item) => {
          const active = pathname?.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} asChild>
              <Pressable
                accessibilityRole="link"
                className={cn(
                  "flex-row items-center gap-2.5 rounded-xl px-3 py-2",
                  active
                    ? "bg-panel border border-border-strong"
                    : "hover:bg-panel/50",
                )}
              >
                <Icon
                  size={17}
                  color={active ? "#00D4FF" : "#AAB3C5"}
                  strokeWidth={active ? 2.4 : 2}
                />
                <Text
                  className={cn(
                    "font-sans-medium text-[13.5px]",
                    active ? "text-text" : "text-muted",
                  )}
                >
                  {item.label}
                </Text>
              </Pressable>
            </Link>
          );
        })}
      </View>

      <View className="mt-auto gap-3">
        <Pressable
          accessibilityRole="button"
          onPress={onUpgrade}
          className="rounded-2xl border border-accent-violet/40 bg-panel p-4"
        >
          <Text className="font-display text-text text-[14px]">Unlock perception insights</Text>
          <Text className="mt-1 font-sans text-muted text-[12px] leading-4">
            Pro unlocks drop-off diagnostics and the Perception Score explanation.
          </Text>
          <Text className="mt-2 font-sans-semibold text-accent-cyan text-[12px]">
            Upgrade from {planLabel} →
          </Text>
        </Pressable>
        <View className="flex-row items-center gap-2 rounded-xl border border-border bg-panel px-3 py-2.5">
          <CircleUserRound size={18} color="#AAB3C5" strokeWidth={1.8} />
          <Text numberOfLines={1} className="flex-1 font-sans text-text text-[12.5px]">
            {userEmail ?? "Signed out"}
          </Text>
        </View>
      </View>
    </View>
  );
}
