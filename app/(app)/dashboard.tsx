import { useEffect, useState } from "react";
import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { MotiView } from "moti";
import { ArrowUpRight, Plus, Wand2 } from "lucide-react-native";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { MetricCard } from "@/components/ui/MetricCard";
import { Skeleton } from "@/components/ui/Skeleton";
import { PageContainer } from "@/components/shell/PageContainer";
import { PageHeader } from "@/components/shell/PageHeader";
import { fadeUp } from "@/lib/theme/motion";
import { analyticsRepo, experiencesRepo, templatesRepo } from "@/lib/data";
import { formatCount, formatCurrency, formatRelative } from "@/lib/utils/formatters";
import type { AnalyticsSummary, Experience, Template } from "@/types";

export default function Dashboard() {
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [recent, setRecent] = useState<Experience[] | null>(null);
  const [quickTemplates, setQuickTemplates] = useState<Template[] | null>(null);

  useEffect(() => {
    (async () => {
      const [workspace, recentExperiences, templates] = await Promise.all([
        analyticsRepo.workspace(),
        experiencesRepo.recent(4),
        templatesRepo.list(),
      ]);
      setSummary(workspace);
      setRecent(recentExperiences);
      setQuickTemplates(templates.slice(0, 3));
    })();
  }, []);

  return (
    <PageContainer>
      <PageHeader
        eyebrow="Workspace"
        title="Good morning, Ava."
        description="Four experiences active. Revenue is trending up 12.4% this week."
        actions={
          <Link href="/experiences/new" asChild>
            <Button
              label="Create new experience"
              variant="primary"
              size="md"
              leading={<Plus size={16} color="#0A0F1C" strokeWidth={2.5} />}
              hapticKind="medium"
            />
          </Link>
        }
      />

      <View className="flex-row flex-wrap gap-3">
        {summary ? (
          <>
            <MetricCard
              label="Views"
              value={formatCount(summary.views)}
              delta={12.4}
              deltaLabel="last 7d"
              accent="cyan"
              delay={0}
            />
            <MetricCard
              label="Conversions"
              value={formatCount(summary.conversions)}
              delta={4.2}
              deltaLabel="last 7d"
              accent="cyan"
              delay={80}
            />
            <MetricCard
              label="Revenue"
              value={formatCurrency(summary.revenue)}
              delta={8.1}
              deltaLabel="last 7d"
              accent="violet"
              delay={160}
            />
            <MetricCard
              label="Perception Score"
              value={`${summary.perception_score}`}
              delta={2.3}
              deltaLabel="baseline"
              accent="violet"
              delay={240}
            />
          </>
        ) : (
          Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} padding="md" style={{ flex: 1, minWidth: 180 }}>
              <Skeleton width={80} height={10} />
              <View className="h-3" />
              <Skeleton height={28} />
              <View className="h-2" />
              <Skeleton width={100} height={12} />
            </Card>
          ))
        )}
      </View>

      <MotiView {...fadeUp(100)}>
        <View className="flex-row items-end justify-between">
          <Text className="font-display text-text text-[18px]">Recent experiences</Text>
          <Link href="/experiences" asChild>
            <Pressable accessibilityRole="link" className="flex-row items-center gap-1">
              <Text className="font-sans-medium text-accent-cyan text-[13px]">View all</Text>
              <ArrowUpRight size={14} color="#00D4FF" />
            </Pressable>
          </Link>
        </View>
      </MotiView>

      <View className="gap-3">
        {recent
          ? recent.map((exp, i) => (
              <MotiView key={exp.id} {...fadeUp(120 + i * 60)}>
                <Link href={{ pathname: "/experiences/[id]", params: { id: exp.id } }} asChild>
                  <Pressable accessibilityRole="link">
                    <Card padding="md" className="flex-row items-center gap-4">
                      <View className="flex-1 gap-1.5">
                        <View className="flex-row items-center gap-2">
                          <Text className="font-display text-text text-[16px]">{exp.name}</Text>
                          <Badge
                            label={exp.status}
                            tone={
                              exp.status === "published"
                                ? "success"
                                : exp.status === "draft"
                                  ? "warning"
                                  : "neutral"
                            }
                            dot
                          />
                        </View>
                        <Text className="font-sans text-muted text-[12.5px]">
                          {exp.niche} · {exp.emotion} · {exp.tone}
                        </Text>
                      </View>
                      <Text className="font-sans text-subtle text-[12px]">
                        Updated {formatRelative(exp.updated_at)}
                      </Text>
                      <ArrowUpRight size={16} color="#AAB3C5" />
                    </Card>
                  </Pressable>
                </Link>
              </MotiView>
            ))
          : Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} padding="md">
                <Skeleton height={18} />
                <View className="h-2" />
                <Skeleton width={200} height={12} />
              </Card>
            ))}
      </View>

      <MotiView {...fadeUp(180)}>
        <Text className="font-display text-text text-[18px]">Quick starts</Text>
      </MotiView>
      <View className="flex-row flex-wrap gap-3">
        {quickTemplates
          ? quickTemplates.map((t, i) => (
              <MotiView key={t.id} {...fadeUp(200 + i * 60)} style={{ flex: 1, minWidth: 260 }}>
                <Link
                  href={{ pathname: "/experiences/new", params: { template: t.id } }}
                  asChild
                >
                  <Pressable accessibilityRole="link">
                    <Card padding="md" className="gap-2">
                      <View className="flex-row items-center gap-2">
                        <Wand2 size={14} color="#00D4FF" />
                        <Text className="font-sans-medium text-accent-cyan text-[11px] uppercase tracking-[1.6px]">
                          Template
                        </Text>
                      </View>
                      <Text className="font-display text-text text-[16px]">{t.title}</Text>
                      <Text className="font-sans text-muted text-[12.5px] leading-4">
                        {t.value_prop}
                      </Text>
                    </Card>
                  </Pressable>
                </Link>
              </MotiView>
            ))
          : null}
      </View>
    </PageContainer>
  );
}
