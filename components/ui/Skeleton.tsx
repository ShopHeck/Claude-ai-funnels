import { MotiView } from "moti";
import type { ViewStyle } from "react-native";

interface SkeletonProps {
  width?: number | string;
  height?: number;
  radius?: number;
  style?: ViewStyle;
}

export function Skeleton({ width = "100%", height = 16, radius = 8, style }: SkeletonProps) {
  return (
    <MotiView
      from={{ opacity: 0.35 }}
      animate={{ opacity: 0.7 }}
      transition={{ type: "timing", duration: 900, loop: true, repeatReverse: true }}
      style={[
        {
          width: width as number,
          height,
          borderRadius: radius,
          backgroundColor: "#1C2440",
        },
        style,
      ]}
    />
  );
}
