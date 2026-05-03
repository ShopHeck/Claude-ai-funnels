import { forwardRef } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import type { PressableProps } from "react-native";
import { useHaptics } from "@/lib/hooks/useHaptics";
import { cn } from "@/lib/utils/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends Omit<PressableProps, "children"> {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
  hapticKind?: "light" | "medium" | "select" | "success";
}

const base =
  "flex-row items-center justify-center rounded-xl border transition-all active:scale-[0.98]";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-accent-cyan border-accent-cyan shadow-glow",
  secondary:
    "bg-panel border-border-strong hover:border-accent-cyan",
  ghost: "bg-transparent border-transparent",
  danger: "bg-danger/10 border-danger/40",
};

const textVariants: Record<ButtonVariant, string> = {
  primary: "text-bg font-sans-semibold",
  secondary: "text-text font-sans-medium",
  ghost: "text-muted font-sans-medium",
  danger: "text-danger font-sans-semibold",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-3 gap-2",
  md: "h-11 px-4 gap-2",
  lg: "h-14 px-6 gap-3",
};

const textSizes: Record<ButtonSize, string> = {
  sm: "text-[13px]",
  md: "text-[15px]",
  lg: "text-[17px]",
};

export const Button = forwardRef<View, ButtonProps>(function Button(
  {
    label,
    variant = "primary",
    size = "md",
    leading,
    trailing,
    loading = false,
    fullWidth = false,
    disabled,
    hapticKind = "light",
    onPress,
    className,
    ...rest
  },
  ref,
) {
  const haptic = useHaptics();
  const isDisabled = disabled || loading;

  return (
    <Pressable
      ref={ref}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      onPress={(e) => {
        if (isDisabled) return;
        haptic(hapticKind);
        onPress?.(e);
      }}
      className={cn(
        base,
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        isDisabled && "opacity-50",
        className as string,
      )}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator size="small" color={variant === "primary" ? "#0A0F1C" : "#FFFFFF"} />
      ) : (
        <>
          {leading}
          <Text className={cn(textVariants[variant], textSizes[size])}>{label}</Text>
          {trailing}
        </>
      )}
    </Pressable>
  );
});
