import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: "#0A0F1C",
        panel: "#12182A",
        "panel-alt": "#0F1526",
        border: "#1C2440",
        "border-strong": "#2A355A",
        "accent-cyan": "#00D4FF",
        "accent-violet": "#7B61FF",
        "accent-glow": "#5FB8FF",
        text: "#FFFFFF",
        muted: "#AAB3C5",
        subtle: "#6A7492",
        success: "#3EE49A",
        danger: "#FF5C7C",
        warning: "#FFB547",
      },
      fontFamily: {
        display: ["SpaceGrotesk_600SemiBold", "SpaceGrotesk_500Medium", "system-ui"],
        "display-bold": ["SpaceGrotesk_700Bold", "system-ui"],
        sans: ["Inter_400Regular", "Inter_500Medium", "system-ui"],
        "sans-medium": ["Inter_500Medium", "system-ui"],
        "sans-semibold": ["Inter_600SemiBold", "system-ui"],
        mono: ["JetBrainsMono_400Regular", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-xl": ["56px", { lineHeight: "60px", letterSpacing: "-1.5px" }],
        "display-lg": ["44px", { lineHeight: "48px", letterSpacing: "-1px" }],
        "display-md": ["32px", { lineHeight: "36px", letterSpacing: "-0.5px" }],
        "display-sm": ["24px", { lineHeight: "28px", letterSpacing: "-0.3px" }],
      },
      borderRadius: {
        xs: "6px",
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "20px",
        "2xl": "28px",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(0, 212, 255, 0.25), 0 10px 40px rgba(0, 212, 255, 0.12)",
        violet: "0 0 0 1px rgba(123, 97, 255, 0.28), 0 10px 40px rgba(123, 97, 255, 0.12)",
        panel: "0 1px 0 rgba(255,255,255,0.04) inset, 0 20px 60px rgba(0,0,0,0.45)",
      },
    },
  },
  plugins: [],
};

export default config;
