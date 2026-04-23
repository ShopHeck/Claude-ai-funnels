import { Pressable, Text, View } from "react-native";
import { Card } from "@/components/ui/Card";
import { useHaptics } from "@/lib/hooks/useHaptics";
import type { BlockType } from "@/types";
import { blockLibrary } from "./blocks";

interface BlockLibraryProps {
  onAdd: (type: BlockType) => void;
}

export function BlockLibrary({ onAdd }: BlockLibraryProps) {
  const haptic = useHaptics();
  return (
    <Card variant="subtle" padding="md" className="gap-3">
      <Text className="font-display text-text text-[14px]">Block library</Text>
      <View className="gap-2">
        {blockLibrary.map((b) => {
          const Icon = b.icon;
          return (
            <Pressable
              key={b.type}
              accessibilityRole="button"
              accessibilityLabel={`Add ${b.label}`}
              onPress={() => {
                haptic("medium");
                onAdd(b.type);
              }}
              className="flex-row items-center gap-3 rounded-xl border border-border bg-panel p-3 hover:border-accent-cyan/60"
            >
              <View className="h-9 w-9 items-center justify-center rounded-lg border border-border-strong bg-panel-alt">
                <Icon size={16} color="#00D4FF" strokeWidth={2} />
              </View>
              <View className="flex-1">
                <Text className="font-sans-semibold text-text text-[13px]">{b.label}</Text>
                <Text className="font-sans text-muted text-[11px] leading-4">{b.description}</Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </Card>
  );
}
