import { Pressable, Text, View } from "react-native";
import { MotiView } from "moti";
import { ArrowDown, ArrowUp, LayoutGrid, Trash2 } from "lucide-react-native";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { fadeUp } from "@/lib/theme/motion";
import { useHaptics } from "@/lib/hooks/useHaptics";
import { cn } from "@/lib/utils/cn";
import type { FunnelBlock } from "@/types";
import { blockLibrary } from "./blocks";

interface BuilderCanvasProps {
  blocks: FunnelBlock[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onMove: (id: string, direction: "up" | "down") => void;
  onRemove: (id: string) => void;
}

const typeToLabel = Object.fromEntries(blockLibrary.map((b) => [b.type, b.label])) as Record<
  FunnelBlock["type"],
  string
>;

export function BuilderCanvas({
  blocks,
  selectedId,
  onSelect,
  onMove,
  onRemove,
}: BuilderCanvasProps) {
  const haptic = useHaptics();

  if (blocks.length === 0) {
    return (
      <EmptyState
        icon={LayoutGrid}
        title="Compose the funnel"
        description="Pick blocks from the library to assemble this funnel. You can reorder and edit every block after you add it."
      />
    );
  }

  return (
    <View className="gap-3">
      {blocks.map((b, i) => {
        const selected = b.id === selectedId;
        return (
          <MotiView key={b.id} {...fadeUp(i * 40)}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Edit block ${typeToLabel[b.type]}`}
              accessibilityState={{ selected }}
              onPress={() => {
                haptic("select");
                onSelect(b.id);
              }}
            >
              <Card
                padding="md"
                className={cn(
                  "gap-3",
                  selected && "border-accent-cyan shadow-glow",
                )}
              >
                <View className="flex-row items-center justify-between gap-3">
                  <Text className="font-sans-medium text-accent-cyan text-[11px] uppercase tracking-[1.8px]">
                    {typeToLabel[b.type]}
                  </Text>
                  <View className="flex-row items-center gap-1">
                    <Pressable
                      accessibilityRole="button"
                      accessibilityLabel="Move up"
                      disabled={i === 0}
                      onPress={() => {
                        haptic("medium");
                        onMove(b.id, "up");
                      }}
                      className="h-8 w-8 items-center justify-center rounded-lg border border-border bg-panel-alt disabled:opacity-30"
                    >
                      <ArrowUp size={14} color="#AAB3C5" />
                    </Pressable>
                    <Pressable
                      accessibilityRole="button"
                      accessibilityLabel="Move down"
                      disabled={i === blocks.length - 1}
                      onPress={() => {
                        haptic("medium");
                        onMove(b.id, "down");
                      }}
                      className="h-8 w-8 items-center justify-center rounded-lg border border-border bg-panel-alt disabled:opacity-30"
                    >
                      <ArrowDown size={14} color="#AAB3C5" />
                    </Pressable>
                    <Pressable
                      accessibilityRole="button"
                      accessibilityLabel="Remove block"
                      onPress={() => {
                        haptic("warning");
                        onRemove(b.id);
                      }}
                      className="h-8 w-8 items-center justify-center rounded-lg border border-danger/30 bg-danger/5"
                    >
                      <Trash2 size={14} color="#FF5C7C" />
                    </Pressable>
                  </View>
                </View>
                <Text className="font-display text-text text-[18px] leading-[22px]">
                  {b.title}
                </Text>
                <Text className="font-sans text-muted text-[13px] leading-[20px]">{b.body}</Text>
                {b.cta_label ? (
                  <View className="self-start rounded-full border border-accent-cyan/40 bg-accent-cyan/10 px-3 py-1.5">
                    <Text className="font-sans-medium text-accent-cyan text-[12px]">
                      {b.cta_label}
                    </Text>
                  </View>
                ) : null}
              </Card>
            </Pressable>
          </MotiView>
        );
      })}
    </View>
  );
}
