import { Pressable, Text, View } from "react-native";
import { useHaptics } from "@/lib/hooks/useHaptics";
import { cn } from "@/lib/utils/cn";

export interface SelectOption<T extends string = string> {
  value: T;
  label: string;
  description?: string;
}

interface SelectProps<T extends string> {
  label?: string;
  value: T;
  options: SelectOption<T>[];
  onChange: (next: T) => void;
  hint?: string;
}

export function Select<T extends string>({
  label,
  value,
  options,
  onChange,
  hint,
}: SelectProps<T>) {
  const haptic = useHaptics();
  return (
    <View className="gap-2">
      {label ? (
        <Text className="text-muted text-[12px] font-sans-medium uppercase tracking-wider">
          {label}
        </Text>
      ) : null}
      <View className="flex-row flex-wrap gap-2">
        {options.map((opt) => {
          const selected = opt.value === value;
          return (
            <Pressable
              key={opt.value}
              accessibilityRole="radio"
              accessibilityState={{ selected }}
              onPress={() => {
                haptic("select");
                onChange(opt.value);
              }}
              className={cn(
                "rounded-full border px-3.5 py-2",
                selected
                  ? "bg-accent-cyan/15 border-accent-cyan"
                  : "bg-panel-alt border-border hover:border-accent-cyan/60",
              )}
            >
              <Text
                className={cn(
                  "text-[13px] font-sans-medium",
                  selected ? "text-accent-cyan" : "text-text",
                )}
              >
                {opt.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
      {hint ? <Text className="text-subtle text-[12px] font-sans">{hint}</Text> : null}
    </View>
  );
}
