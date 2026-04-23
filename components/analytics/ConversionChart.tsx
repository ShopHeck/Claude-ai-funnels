import { useMemo } from "react";
import { View } from "react-native";
import Svg, { Rect } from "react-native-svg";
import type { AnalyticsSeriesPoint } from "@/types";
import { useBreakpoint } from "@/lib/hooks/useBreakpoint";

interface ConversionChartProps {
  data: AnalyticsSeriesPoint[];
  height?: number;
}

export function ConversionChart({ data, height = 180 }: ConversionChartProps) {
  const { width: windowWidth } = useBreakpoint();
  const width = Math.min(Math.max(windowWidth - 80, 320), 920);

  const bars = useMemo(() => {
    if (data.length === 0) return [];
    const max = Math.max(...data.map((d) => d.conversions));
    const barSlot = width / data.length;
    const barWidth = Math.max(barSlot * 0.55, 6);
    return data.map((d, i) => {
      const h = (d.conversions / (max || 1)) * (height - 24);
      return {
        x: i * barSlot + (barSlot - barWidth) / 2,
        y: height - h - 8,
        w: barWidth,
        h,
        key: d.date,
      };
    });
  }, [data, height, width]);

  return (
    <View style={{ height, width: "100%", alignItems: "center" }}>
      <Svg width={width} height={height}>
        {bars.map((b) => (
          <Rect
            key={b.key}
            x={b.x}
            y={b.y}
            width={b.w}
            height={b.h}
            rx={6}
            fill="#7B61FF"
            opacity={0.85}
          />
        ))}
      </Svg>
    </View>
  );
}
