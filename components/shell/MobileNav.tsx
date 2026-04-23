import { Link, usePathname } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { cn } from "@/lib/utils/cn";
import { useHaptics } from "@/lib/hooks/useHaptics";
import { mobileNav } from "./nav-items";

export function MobileNav() {
  const pathname = usePathname();
  const haptic = useHaptics();

  return (
    <View className="border-t border-border bg-panel-alt lg:hidden">
      <SafeAreaView edges={["bottom"]}>
        <View className="flex-row items-stretch justify-around px-2 pt-2">
          {mobileNav.map((item) => {
            const active = pathname?.startsWith(item.href);
            const Icon = item.icon;
            if (item.primary) {
              return (
                <Link key={item.href} href={item.href} asChild>
                  <Pressable
                    accessibilityRole="link"
                    accessibilityLabel={item.label}
                    onPress={() => haptic("medium")}
                    className="relative -mt-6 h-14 w-14 items-center justify-center rounded-2xl border border-accent-cyan bg-accent-cyan shadow-glow"
                  >
                    <Icon size={22} color="#0A0F1C" strokeWidth={2.4} />
                  </Pressable>
                </Link>
              );
            }
            return (
              <Link key={item.href} href={item.href} asChild>
                <Pressable
                  accessibilityRole="link"
                  accessibilityLabel={item.label}
                  onPress={() => haptic("select")}
                  className="flex-1 items-center justify-center gap-1 py-1.5"
                >
                  <Icon
                    size={20}
                    color={active ? "#00D4FF" : "#AAB3C5"}
                    strokeWidth={active ? 2.4 : 2}
                  />
                  <Text
                    className={cn(
                      "font-sans-medium text-[10.5px]",
                      active ? "text-accent-cyan" : "text-muted",
                    )}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              </Link>
            );
          })}
        </View>
      </SafeAreaView>
    </View>
  );
}
