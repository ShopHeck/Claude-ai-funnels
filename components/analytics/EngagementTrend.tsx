import { useMemo } from "react";
import { View } from "react-native";
import Svg, { Defs, LinearGradient, Path, Stop } from "react-native-svg";
import type { AnalyticsSeriesPoint } from "@/types";
import { useBreakpoint } from "@/lib/hooks/useBreakpoint";

interface EngagementTrendProps {
  data: AnalyticsSeriesPoint[];
  height?: number;
}

export function EngagementTrend({ data, height = 180 }: EngagementTrendProps) {
  const { width: windowWidth } = useBreakpoint();
  const width = Math.min(Math.max(windowWidth - 80, 320), 920);

  const { linePath, areaPath } = useMemo(() => {
    if (data.length === 0) return { linePath: "", areaPath: "" };
    const values = data.map((d) => d.views);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;
    const stepX = data.length > 1 ? width / (data.length - 1) : 0;
    const points = data.map((d, i) => {
      const x = i * stepX;
      const y = height - ((d.views - min) / range) * (height - 24) - 12;
      return { x, y };
    });

    const pathFor = (cmd: "M" | "L") =>
      points
        .map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `${cmd} ${p.x} ${p.y}`))
        .join(" ");

    const firstPoint = points[0];
    const lastPoint = points[points.length - 1];
    const line = pathFor("L");
    const area =
      firstPoint && lastPoint
        ? `${line} L ${lastPoint.x} ${height} L ${firstPoint.x} ${height} Z`
        : line;
    return { linePath: line, areaPath: area };
  }, [data, height, width]);

  return (
    <View style={{ height, width: "100%", alignItems: "center" }}>
      <Svg width={width} height={height}>
        <Defs>
          <LinearGradient id="engagementArea" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor="#00D4FF" stopOpacity={0.45} />
            <Stop offset="100%" stopColor="#00D4FF" stopOpacity={0} />
          </LinearGradient>
        </Defs>
        <Path d={areaPath} fill="url(#engagementArea)" />
        <Path d={linePath} stroke="#00D4FF" strokeWidth={2.5} fill="none" />
      </Svg>
    </View>
  );
}
