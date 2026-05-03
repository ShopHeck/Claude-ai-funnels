import { forwardRef, useState } from "react";
import { Text, TextInput, View } from "react-native";
import type { TextInputProps } from "react-native";
import { cn } from "@/lib/utils/cn";

interface TextareaProps extends TextInputProps {
  label?: string;
  hint?: string;
  error?: string;
  rows?: number;
}

export const Textarea = forwardRef<TextInput, TextareaProps>(function Textarea(
  { label, hint, error, rows = 4, className, onFocus, onBlur, ...rest },
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
          "rounded-xl border bg-panel-alt px-3 py-2",
          focused ? "border-accent-cyan" : "border-border",
          error && "border-danger",
        )}
      >
        <TextInput
          ref={ref}
          multiline
          numberOfLines={rows}
          placeholderTextColor="#6A7492"
          selectionColor="#00D4FF"
          textAlignVertical="top"
          className={cn(
            "text-text font-sans text-[15px] web:outline-none",
            className as string,
          )}
          style={{ minHeight: rows * 22 }}
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
      </View>
      {error ? (
        <Text className="text-danger text-[12px] font-sans">{error}</Text>
      ) : hint ? (
        <Text className="text-subtle text-[12px] font-sans">{hint}</Text>
      ) : null}
    </View>
  );
});
