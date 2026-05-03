import type { AnalyticsSeriesPoint, AnalyticsSummary, FunnelDropoff } from "@/types";

export const analyticsSummaries: Record<string, AnalyticsSummary> = {
  exp_quiet_luxury: {
    experience_id: "exp_quiet_luxury",
    views: 18420,
    clicks: 4930,
    conversions: 312,
    revenue: 187200,
    avg_engagement_time: 112000,
    perception_score: 92,
  },
  exp_founder_story: {
    experience_id: "exp_founder_story",
    views: 32140,
    clicks: 9820,
    conversions: 1140,
    revenue: 0,
    avg_engagement_time: 78000,
    perception_score: 88,
  },
  exp_creator_stack: {
    experience_id: "exp_creator_stack",
    views: 9840,
    clicks: 3120,
    conversions: 421,
    revenue: 42100,
    avg_engagement_time: 96000,
    perception_score: 85,
  },
  exp_urgent_restock: {
    experience_id: "exp_urgent_restock",
    views: 57420,
    clicks: 22180,
    conversions: 3120,
    revenue: 218400,
    avg_engagement_time: 42000,
    perception_score: 81,
  },
  exp_inner_circle: {
    experience_id: "exp_inner_circle",
    views: 2410,
    clicks: 612,
    conversions: 38,
    revenue: 228000,
    avg_engagement_time: 148000,
    perception_score: 95,
  },
};

export const workspaceSummary: AnalyticsSummary = {
  experience_id: "workspace",
  views: 120230,
  clicks: 40662,
  conversions: 5031,
  revenue: 675700,
  avg_engagement_time: 95200,
  perception_score: 88,
};

export const engagementSeries: AnalyticsSeriesPoint[] = Array.from({ length: 14 }, (_, i) => {
  const base = 4200 + i * 180;
  const jitter = Math.sin(i / 2) * 800;
  const views = Math.round(base + jitter + 900);
  const conversions = Math.round(views * (0.038 + Math.cos(i / 3) * 0.008));
  const revenue = conversions * 190;
  const day = new Date();
  day.setDate(day.getDate() - (13 - i));
  return {
    date: day.toISOString().slice(0, 10),
    views,
    conversions,
    revenue,
  };
});

export const funnelDropoff: FunnelDropoff[] = [
  { step: "hook", rate: 1 },
  { step: "pattern_interrupt", rate: 0.78 },
  { step: "reality_shift", rate: 0.61 },
  { step: "identity_trigger", rate: 0.48 },
  { step: "offer_reveal", rate: 0.34 },
  { step: "cta", rate: 0.22 },
];
