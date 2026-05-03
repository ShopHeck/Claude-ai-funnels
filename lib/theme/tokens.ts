export const colors = {
  bg: "#0A0F1C",
  panel: "#12182A",
  panelAlt: "#0F1526",
  border: "#1C2440",
  borderStrong: "#2A355A",
  accentCyan: "#00D4FF",
  accentViolet: "#7B61FF",
  accentGlow: "#5FB8FF",
  text: "#FFFFFF",
  muted: "#AAB3C5",
  subtle: "#6A7492",
  success: "#3EE49A",
  danger: "#FF5C7C",
  warning: "#FFB547",
} as const;

export type ColorKey = keyof typeof colors;

export const radii = {
  xs: 6,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
} as const;

export const spacing = {
  px: 1,
  "0.5": 2,
  "1": 4,
  "2": 8,
  "3": 12,
  "4": 16,
  "5": 20,
  "6": 24,
  "8": 32,
  "10": 40,
  "12": 48,
  "16": 64,
  "20": 80,
} as const;

export const elevation = {
  panel: {
    shadowColor: "#000",
    shadowOpacity: 0.45,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 20 },
    elevation: 12,
  },
  glow: {
    shadowColor: colors.accentCyan,
    shadowOpacity: 0.35,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
} as const;

export const appearance = {
  scheme: "dark" as const,
  background: colors.bg,
  accentPair: [colors.accentCyan, colors.accentViolet] as const,
};
