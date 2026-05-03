import { Text, View } from "react-native";
import { MotiView } from "moti";
import { Card } from "@/components/ui/Card";
import { fadeUp } from "@/lib/theme/motion";
import type { ExperienceStep } from "@/types";
import { stepTypeCopy } from "./options";

interface StepBlockProps {
  step: ExperienceStep;
  delay?: number;
}

export function StepBlock({ step, delay = 0 }: StepBlockProps) {
  const copy = stepTypeCopy[step.type];
  return (
    <MotiView {...fadeUp(delay)}>
      <Card padding="md" className="gap-3">
        <Text className="font-sans-medium text-accent-cyan text-[11px] uppercase tracking-[1.8px]">
          {copy.eyebrow}
        </Text>
        <Text className="font-display text-text text-[20px] leading-[26px]">{step.title}</Text>
        {step.content ? (
          <Text className="font-sans text-muted text-[14px] leading-[22px]">{step.content}</Text>
        ) : null}
        <View className="mt-1 flex-row items-center gap-2">
          <View className="h-1 w-8 rounded-full bg-accent-cyan/60" />
          <Text className="font-sans text-subtle text-[11px] uppercase tracking-[1.4px]">
            {copy.label}
          </Text>
        </View>
      </Card>
    </MotiView>
  );
}
