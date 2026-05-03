import { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, View } from "react-native";
import { Eye, LayoutGrid, Pencil } from "lucide-react-native";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { StepBlock } from "@/components/experience/StepBlock";
import { PageContainer } from "@/components/shell/PageContainer";
import { PageHeader } from "@/components/shell/PageHeader";
import { experiencesRepo, analyticsRepo } from "@/lib/data";
import { formatCount, formatCurrency, formatPercent, formatRelative } from "@/lib/utils/formatters";
import type { AnalyticsSummary, Experience, ExperienceStep } from "@/types";

export default function ExperienceDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [experience, setExperience] = useState<Experience | null>(null);
  const [steps, setSteps] = useState<ExperienceStep[] | null>(null);
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      const [e, s, a] = await Promise.all([
        experiencesRepo.byId(id),
        experiencesRepo.stepsFor(id),
        analyticsRepo.forExperience(id),
      ]);
      setExperience(e);
      setSteps(s);
      setSummary(a);
    })();
  }, [id]);

  if (!id) return null;

  return (
    <PageContainer>
      {experience ? (
        <PageHeader
          eyebrow="Experience"
          title={experience.name}
          description={`${experience.niche} · ${experience.emotion} · ${experience.tone} · Updated ${formatRelative(experience.updated_at)}`}
          actions={
            <>
              <Badge
                label={experience.status}
                tone={
                  experience.status === "published"
                    ? "success"
                    : experience.status === "draft"
                      ? "warning"
                      : "neutral"
                }
                dot
              />
              <Button
                label="Preview"
                variant="secondary"
                size="md"
                leading={<Eye size={15} color="#FFFFFF" />}
                onPress={() => router.push({ pathname: "/preview/[id]", params: { id } })}
              />
              <Button
                label="Open builder"
                variant="primary"
                size="md"
                leading={<LayoutGrid size={15} color="#0A0F1C" />}
                onPress={() => router.push({ pathname: "/builder/[id]", params: { id } })}
              />
            </>
          }
        />
      ) : (
        <Skeleton height={40} />
      )}

      {summary ? (
        <View className="flex-row flex-wrap gap-3">
          <Card padding="md" style={{ flex: 1, minWidth: 160 }}>
            <Text className="font-sans-medium text-subtle text-[11px] uppercase tracking-[1.4px]">
              Views
            </Text>
            <Text className="mt-2 font-display-bold text-text text-[22px]">
              {formatCount(summary.views)}
            </Text>
          </Card>
          <Card padding="md" style={{ flex: 1, minWidth: 160 }}>
            <Text className="font-sans-medium text-subtle text-[11px] uppercase tracking-[1.4px]">
              Conversion rate
            </Text>
            <Text className="mt-2 font-display-bold text-text text-[22px]">
              {formatPercent(summary.conversions / (summary.views || 1), 1)}
            </Text>
          </Card>
          <Card padding="md" style={{ flex: 1, minWidth: 160 }}>
            <Text className="font-sans-medium text-subtle text-[11px] uppercase tracking-[1.4px]">
              Revenue
            </Text>
            <Text className="mt-2 font-display-bold text-text text-[22px]">
              {formatCurrency(summary.revenue)}
            </Text>
          </Card>
          <Card padding="md" style={{ flex: 1, minWidth: 160 }}>
            <Text className="font-sans-medium text-subtle text-[11px] uppercase tracking-[1.4px]">
              Perception Score
            </Text>
            <Text className="mt-2 font-display-bold text-text text-[22px]">
              {summary.perception_score}
            </Text>
          </Card>
        </View>
      ) : null}

      <View className="flex-row items-center justify-between">
        <Text className="font-display text-text text-[18px]">Sequence</Text>
        <Button
          label="Edit sequence"
          variant="ghost"
          size="sm"
          leading={<Pencil size={14} color="#AAB3C5" />}
          onPress={() => router.push({ pathname: "/builder/[id]", params: { id } })}
        />
      </View>

      <View className="gap-3">
        {steps
          ? steps.map((step, i) => <StepBlock key={step.id} step={step} delay={i * 60} />)
          : Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} padding="md">
                <Skeleton width={120} height={10} />
                <View className="h-2" />
                <Skeleton height={22} />
              </Card>
            ))}
      </View>
    </PageContainer>
  );
}
