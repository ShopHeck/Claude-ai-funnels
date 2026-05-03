import {
  formatCount,
  formatCurrency,
  formatCurrencyCents,
  formatDuration,
  formatPercent,
  formatRelative,
} from "@/lib/utils/formatters";

describe("formatters", () => {
  it("compacts large numbers", () => {
    expect(formatCount(1200)).toBe("1.2K");
    expect(formatCount(1_234_567)).toBe("1.2M");
  });

  it("formats currency with no fractional dollars", () => {
    expect(formatCurrency(1000)).toBe("$1,000");
  });

  it("formats cents-based currency with two decimals", () => {
    expect(formatCurrencyCents(3900)).toBe("$39.00");
  });

  it("formats percentages", () => {
    expect(formatPercent(0.1234, 1)).toBe("12.3%");
  });

  it("formats durations above a minute", () => {
    expect(formatDuration(65_000)).toBe("1m 5s");
  });

  it("describes past instants in relative terms", () => {
    const now = new Date("2026-04-23T10:00:00Z");
    const oneHourAgo = new Date(now.getTime() - 3600_000).toISOString();
    expect(formatRelative(oneHourAgo, now)).toBe("1h ago");
  });
});
