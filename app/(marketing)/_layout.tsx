import { Link, Slot, usePathname } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Sparkles } from "lucide-react-native";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

const links = [
  { label: "Product", href: "/(marketing)" },
  { label: "Demo", href: "/(marketing)/demo" },
  { label: "Pricing", href: "/(marketing)/pricing" },
] as const;

export default function MarketingLayout() {
  const pathname = usePathname();
  return (
    <View className="flex-1 bg-bg">
      <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
        <View className="z-10 border-b border-border/60 bg-bg/80 backdrop-blur">
          <View className="mx-auto w-full max-w-[1200px] flex-row items-center justify-between px-4 py-4 lg:px-8">
            <Link href="/(marketing)" asChild>
              <Pressable accessibilityRole="link" className="flex-row items-center gap-2.5">
                <View className="h-8 w-8 items-center justify-center rounded-lg border border-accent-cyan/40 bg-accent-cyan/10">
                  <Sparkles size={15} color="#00D4FF" />
                </View>
                <Text className="font-display text-text text-[16px]">NeuroFunnel</Text>
              </Pressable>
            </Link>
            <View className="hidden flex-row items-center gap-1 sm:flex">
              {links.map((link) => {
                const active = pathname === link.href || (link.href === "/(marketing)" && pathname === "/");
                return (
                  <Link key={link.href} href={link.href} asChild>
                    <Pressable
                      accessibilityRole="link"
                      className="rounded-xl px-3 py-2"
                    >
                      <Text
                        className={cn(
                          "font-sans-medium text-[13px]",
                          active ? "text-text" : "text-muted",
                        )}
                      >
                        {link.label}
                      </Text>
                    </Pressable>
                  </Link>
                );
              })}
            </View>
            <View className="flex-row items-center gap-2">
              <Link href="/(auth)/sign-in" asChild>
                <Button label="Sign in" variant="ghost" size="sm" />
              </Link>
              <Link href="/(auth)/sign-up" asChild>
                <Button label="Start free" variant="primary" size="sm" />
              </Link>
            </View>
          </View>
        </View>
        <View className="flex-1">
          <Slot />
        </View>
      </SafeAreaView>
    </View>
  );
}
