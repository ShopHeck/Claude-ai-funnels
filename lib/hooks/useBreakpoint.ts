import { useWindowDimensions } from "react-native";

export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl";

const thresholds: Record<Breakpoint, number> = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

export function useBreakpoint(): {
  current: Breakpoint;
  isAtLeast: (bp: Breakpoint) => boolean;
  width: number;
  height: number;
} {
  const { width, height } = useWindowDimensions();
  let current: Breakpoint = "xs";
  (Object.entries(thresholds) as [Breakpoint, number][]).forEach(([name, min]) => {
    if (width >= min) current = name;
  });
  return {
    current,
    width,
    height,
    isAtLeast: (bp) => thresholds[current] >= thresholds[bp],
  };
}
