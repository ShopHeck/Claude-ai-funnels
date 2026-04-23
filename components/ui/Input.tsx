import { forwardRef, useState } from "react";
import { Text, TextInput, View } from "react-native";
import type { TextInputProps } from "react-native";
import { cn } from "@/lib/utils/cn";

interface InputProps extends TextInputProps {
  label?: string;
  hint?: string;
  error?: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
}

export const Input = forwardRef<TextInput, InputProps>(function Input(
  { label, hint, error, leading, trailing, className, onFocus, onBlur, ...rest },
  ref,
) {
  const [focused, setFocused] = useState(false);
  return (
    <View className="gap-1.5">
      {label ? (
        <Text className="text-muted text-[12px] font-sans-medium uppercase tracking-wider">
          {label}
        </Text>
      ) : null}
      <View
        className={cn(
          "flex-row items-center gap-2 rounded-xl border bg-panel-alt px-3",
          focused ? "border-accent-cyan" : "border-border",
          error && "border-danger",
        )}
      >
        {leading}
        <TextInput
          ref={ref}
          placeholderTextColor="#6A7492"
          selectionColor="#00D4FF"
          className={cn(
            "flex-1 h-11 text-text font-sans text-[15px] web:outline-none",
            className as string,
          )}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          {...rest}
        />
        {trailing}
      </View>
      {error ? (
        <Text className="text-danger text-[12px] font-sans">{error}</Text>
      ) : hint ? (
        <Text className="text-subtle text-[12px] font-sans">{hint}</Text>
      ) : null}
    </View>
  );
});
