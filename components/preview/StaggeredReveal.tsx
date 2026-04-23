import { Text, View } from "react-native";
import { MotiView } from "moti";
import { Button } from "@/components/ui/Button";
import { revealLine } from "@/lib/theme/motion";
import { useReduceMotion } from "@/lib/hooks/useReduceMotion";
import { useHaptics } from "@/lib/hooks/useHaptics";

export interface RevealLine {
  text: string;
  tone?: "primary" | "muted" | "accent";
}

interface StaggeredRevealProps {
  lines: RevealLine[];
  ctaLabel: string;
  onCta: () => void;
}

export function StaggeredReveal({ lines, ctaLabel, onCta }: StaggeredRevealProps) {
  const reduce = useReduceMotion();
  const haptic = useHaptics();

  return (
    <View className="gap-8">
      <View className="gap-6">
        {lines.map((line, i) => (
          <MotiView
            key={i}
            from={reduce ? { opacity: 1, translateY: 0 } : revealLine(i).from}
            animate={revealLine(i).animate}
            transition={reduce ? { type: "timing", duration: 0 } : revealLine(i).transition}
          >
            <Text
              className={
                line.tone === "accent"
                  ? "font-display-bold text-accent-cyan text-center text-[28px] leading-[36px]"
                  : line.tone === "muted"
                    ? "font-sans text-muted text-center text-[16px] leading-[24px]"
                    : "font-display text-text text-center text-[28px] leading-[36px] sm:text-[34px] sm:leading-[42px]"
              }
            >
              {line.text}
            </Text>
          </MotiView>
        ))}
      </View>
      <MotiView
        from={{ opacity: 0, translateY: 16 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{
          type: "timing",
          duration: reduce ? 0 : 600,
          delay: reduce ? 0 : 200 + lines.length * 450,
        }}
        style={{ alignItems: "center" }}
      >
        <Button
          label={ctaLabel}
          variant="primary"
          size="lg"
          onPress={() => {
            haptic("success");
            onCta();
          }}
        />
      </MotiView>
    </View>
  );
}
