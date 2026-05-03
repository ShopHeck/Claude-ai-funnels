import { Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import { MotiView } from "moti";
import { ArrowUpRight } from "lucide-react-native";
import type { Template } from "@/types";
import { fadeUp } from "@/lib/theme/motion";
import { useHaptics } from "@/lib/hooks/useHaptics";
import { Badge } from "./Badge";

const categoryCopy: Record<Template["category"], string> = {
  lead_gen: "Lead Gen",
  ecommerce: "Ecommerce",
  affiliate: "Affiliate",
  high_ticket: "High Ticket",
};

interface TemplateCardProps {
  template: Template;
  onUse: (t: Template) => void;
  delay?: number;
}

export function TemplateCard({ template, onUse, delay = 0 }: TemplateCardProps) {
  const haptic = useHaptics();
  return (
    <MotiView {...fadeUp(delay)} style={{ flex: 1, minWidth: 260 }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Use template ${template.title}`}
        onPress={() => {
          haptic("medium");
          onUse(template);
        }}
        className="overflow-hidden rounded-2xl border border-border-strong bg-panel"
      >
        <View className="aspect-[16/9] w-full overflow-hidden bg-panel-alt">
          <Image
            source={template.thumbnail}
            style={{ flex: 1 }}
            contentFit="cover"
            transition={300}
            accessibilityIgnoresInvertColors
          />
        </View>
        <View className="gap-3 p-5">
          <Badge label={categoryCopy[template.category]} tone="cyan" dot />
          <Text className="font-display text-text text-[20px] leading-6">{template.title}</Text>
          <Text className="font-sans text-muted text-[13px] leading-5">{template.value_prop}</Text>
          <View className="mt-1 flex-row items-center gap-2">
            <Text className="font-sans-semibold text-accent-cyan text-[13px]">Use template</Text>
            <ArrowUpRight size={16} color="#00D4FF" strokeWidth={2.2} />
          </View>
        </View>
      </Pressable>
    </MotiView>
  );
}
