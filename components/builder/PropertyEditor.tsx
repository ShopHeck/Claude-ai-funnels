import { Text, View } from "react-native";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { SlidersHorizontal } from "lucide-react-native";
import type { FunnelBlock } from "@/types";
import { blockLibrary } from "./blocks";

const labels = Object.fromEntries(blockLibrary.map((b) => [b.type, b.label])) as Record<
  FunnelBlock["type"],
  string
>;

interface PropertyEditorProps {
  block: FunnelBlock | null;
  onChange: (patch: Partial<FunnelBlock>) => void;
}

export function PropertyEditor({ block, onChange }: PropertyEditorProps) {
  if (!block) {
    return (
      <EmptyState
        icon={SlidersHorizontal}
        title="Select a block to edit"
        description="Every block has its own copy, CTA label, and layout rules. Pick one from the canvas to edit it here."
      />
    );
  }

  return (
    <Card variant="subtle" padding="md" className="gap-5">
      <Text className="font-sans-medium text-accent-cyan text-[11px] uppercase tracking-[1.8px]">
        Editing · {labels[block.type]}
      </Text>
      <Input
        label="Title"
        value={block.title}
        onChangeText={(title) => onChange({ title })}
      />
      <Textarea
        label="Body"
        rows={5}
        value={block.body}
        onChangeText={(body) => onChange({ body })}
      />
      {"cta_label" in block && block.cta_label !== undefined ? (
        <Input
          label="CTA label"
          value={block.cta_label}
          onChangeText={(cta_label) => onChange({ cta_label })}
          hint="Keep it to a short verb phrase."
        />
      ) : null}
      <View className="h-1" />
    </Card>
  );
}
