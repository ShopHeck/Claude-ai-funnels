import type { AnalyticsSeriesPoint, AnalyticsSummary, FunnelDropoff } from "@/types";
import {
  analyticsSummaries,
  engagementSeries,
  funnelDropoff,
  workspaceSummary,
} from "./seed/analytics";

export const analyticsRepo = {
  async workspace(): Promise<AnalyticsSummary> {
    return { ...workspaceSummary };
  },
  async forExperience(experienceId: string): Promise<AnalyticsSummary | null> {
    const match = analyticsSummaries[experienceId];
    return match ? { ...match } : null;
  },
  async engagementSeries(): Promise<AnalyticsSeriesPoint[]> {
    return engagementSeries.map((p) => ({ ...p }));
  },
  async funnelDropoff(): Promise<FunnelDropoff[]> {
    return funnelDropoff.map((p) => ({ ...p }));
  },
  async topExperiences(limit = 4): Promise<AnalyticsSummary[]> {
    return Object.values(analyticsSummaries)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, limit)
      .map((s) => ({ ...s }));
  },
};
