import { useEffect, useState } from "react";
import { View } from "react-native";
import { ChartCard } from "@/components/ui/ChartCard";
import { MetricCard } from "@/components/ui/MetricCard";
import { PageContainer } from "@/components/shell/PageContainer";
import { PageHeader } from "@/components/shell/PageHeader";
import { EngagementTrend } from "@/components/analytics/EngagementTrend";
import { ConversionChart } from "@/components/analytics/ConversionChart";
import { FunnelDropoff } from "@/components/analytics/FunnelDropoff";
import { TopExperiences } from "@/components/analytics/TopExperiences";
import { analyticsRepo, experiencesRepo } from "@/lib/data";
import { formatCount, formatCurrency, formatDuration } from "@/lib/utils/formatters";
import type {
  AnalyticsSeriesPoint,
  AnalyticsSummary,
  FunnelDropoff as FunnelPoint,
  Experience,
} from "@/types";

export default function Analytics() {
  const [workspace, setWorkspace] = useState<AnalyticsSummary | null>(null);
  const [series, setSeries] = useState<AnalyticsSeriesPoint[]>([]);
  const [drop, setDrop] = useState<FunnelPoint[]>([]);
  const [top, setTop] = useState<Array<AnalyticsSummary & { name: string }>>([]);

  useEffect(() => {
    (async () => {
      const [w, s, d, t, experiences] = await Promise.all([
        analyticsRepo.workspace(),
        analyticsRepo.engagementSeries(),
        analyticsRepo.funnelDropoff(),
        analyticsRepo.topExperiences(5),
        experiencesRepo.list(),
      ]);
      setWorkspace(w);
      setSeries(s);
      setDrop(d);
      const byId: Record<string, Experience> = {};
      experiences.forEach((e) => (byId[e.id] = e));
      setTop(
        t.map((row) => ({ ...row, name: byId[row.experience_id]?.name ?? row.experience_id })),
      );
    })();
  }, []);

  return (
    <PageContainer>
      <PageHeader
        eyebrow="Insights"
        title="Analytics"
        description="The signals that actually change your next move — not another dashboard to stare at."
      />

      {workspace ? (
        <View className="flex-row flex-wrap gap-3">
          <MetricCard label="Views" value={formatCount(workspace.views)} delta={12.4} accent="cyan" />
          <MetricCard
            label="Clicks"
            value={formatCount(workspace.clicks)}
            delta={6.1}
            accent="cyan"
            delay={80}
          />
          <MetricCard
            label="Conversions"
            value={formatCount(workspace.conversions)}
            delta={3.9}
            accent="violet"
            delay={160}
          />
          <MetricCard
            label="Revenue"
            value={formatCurrency(workspace.revenue)}
            delta={8.7}
            accent="violet"
            delay={240}
          />
          <MetricCard
            label="Avg engagement"
            value={formatDuration(workspace.avg_engagement_time)}
            delta={2.1}
            delay={320}
          />
          <MetricCard
            label="Perception"
            value={`${workspace.perception_score}`}
            delta={1.4}
            delay={400}
          />
        </View>
      ) : null}

      <ChartCard
        title="Engagement trend"
        subtitle="14 days · views"
        delay={0}
      >
        <EngagementTrend data={series} />
      </ChartCard>

      <ChartCard
        title="Conversions"
        subtitle="14 days · unique conversions"
        delay={80}
      >
        <ConversionChart data={series} />
      </ChartCard>

      <ChartCard
        title="Funnel drop-off"
        subtitle="Where narrative energy leaks"
        delay={160}
      >
        <FunnelDropoff data={drop} />
      </ChartCard>

      <ChartCard
        title="Top performers"
        subtitle="Revenue-weighted, last 30 days"
        delay={240}
      >
        <TopExperiences items={top} />
      </ChartCard>
    </PageContainer>
  );
}
