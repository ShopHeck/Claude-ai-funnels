import { Pressable, Text, View } from "react-native";
import { useHaptics } from "@/lib/hooks/useHaptics";
import { cn } from "@/lib/utils/cn";

export interface TabItem<T extends string = string> {
  value: T;
  label: string;
  count?: number;
}

interface TabsProps<T extends string> {
  items: TabItem<T>[];
  value: T;
  onChange: (value: T) => void;
  variant?: "pill" | "underline";
}

export function Tabs<T extends string>({
  items,
  value,
  onChange,
  variant = "underline",
}: TabsProps<T>) {
  const haptic = useHaptics();
  return (
    <View
      className={cn(
        "flex-row items-center gap-1",
        variant === "underline"
          ? "border-b border-border"
          : "rounded-full bg-panel-alt p-1 self-start",
      )}
    >
      {items.map((item) => {
        const active = item.value === value;
        if (variant === "pill") {
          return (
            <Pressable
              key={item.value}
              accessibilityRole="tab"
              accessibilityState={{ selected: active }}
              onPress={() => {
                haptic("select");
                onChange(item.value);
              }}
              className={cn(
                "rounded-full px-3.5 py-1.5",
                active ? "bg-panel border border-border-strong" : "",
              )}
            >
              <Text
                className={cn(
                  "text-[13px] font-sans-medium",
                  active ? "text-text" : "text-muted",
                )}
              >
                {item.label}
              </Text>
            </Pressable>
          );
        }
        return (
          <Pressable
            key={item.value}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            onPress={() => {
              haptic("select");
              onChange(item.value);
            }}
            className="px-4 py-3"
          >
            <Text
              className={cn(
                "text-[14px] font-sans-medium",
                active ? "text-text" : "text-muted",
              )}
            >
              {item.label}
              {item.count !== undefined ? ` · ${item.count}` : ""}
            </Text>
            <View
              className={cn(
                "mt-2 h-[2px] rounded-full",
                active ? "bg-accent-cyan" : "bg-transparent",
              )}
            />
          </Pressable>
        );
      })}
    </View>
  );
}
