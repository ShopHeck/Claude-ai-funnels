import { View } from "react-native";
import type { ViewProps } from "react-native";
import { cn } from "@/lib/utils/cn";

interface CardProps extends ViewProps {
  variant?: "default" | "subtle" | "glow" | "violet";
  padding?: "none" | "sm" | "md" | "lg";
}

const variants: Record<NonNullable<CardProps["variant"]>, string> = {
  default: "bg-panel border-border-strong shadow-panel",
  subtle: "bg-panel-alt border-border",
  glow: "bg-panel border-accent-cyan/50 shadow-glow",
  violet: "bg-panel border-accent-violet/40",
};

const paddings: Record<NonNullable<CardProps["padding"]>, string> = {
  none: "",
  sm: "p-3",
  md: "p-5",
  lg: "p-7",
};

export function Card({
  variant = "default",
  padding = "md",
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <View
      className={cn(
        "rounded-2xl border",
        variants[variant],
        paddings[padding],
        className as string,
      )}
      {...rest}
    >
      {children}
    </View>
  );
}
