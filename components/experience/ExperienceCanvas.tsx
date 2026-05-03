import { View } from "react-native";
import { Sparkles } from "lucide-react-native";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { Skeleton } from "@/components/ui/Skeleton";
import { Card } from "@/components/ui/Card";
import type { ExperienceStep } from "@/types";
import { StepBlock } from "./StepBlock";

export type CanvasState = "empty" | "generating" | "generated" | "error";

interface ExperienceCanvasProps {
  state: CanvasState;
  steps: ExperienceStep[];
  onGenerate?: () => void;
  onRetry?: () => void;
}

export function ExperienceCanvas({ state, steps, onGenerate, onRetry }: ExperienceCanvasProps) {
  if (state === "empty") {
    return (
      <EmptyState
        icon={Sparkles}
        title="Generate your first immersive sequence"
        description="Fill in the config on the left and NeuroFunnel will draft a six-step narrative tuned to your offer."
        actionLabel="Generate experience"
        onAction={onGenerate}
      />
    );
  }
  if (state === "error") {
    return <ErrorState onAction={onRetry} />;
  }
  if (state === "generating") {
    return (
      <View className="gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} padding="md" className="gap-3">
            <Skeleton width={120} height={10} />
            <Skeleton height={22} />
            <Skeleton width="80%" height={14} />
          </Card>
        ))}
      </View>
    );
  }
  return (
    <View className="gap-3">
      {steps.map((step, i) => (
        <StepBlock key={step.id} step={step} delay={i * 80} />
      ))}
    </View>
  );
}
