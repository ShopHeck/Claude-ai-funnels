import { Modal, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { cn } from "@/lib/utils/cn";

interface DialogProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
  actions?: React.ReactNode;
  tone?: "default" | "danger";
}

export function Dialog({
  visible,
  onClose,
  title,
  description,
  children,
  actions,
  tone = "default",
}: DialogProps) {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <Pressable
        className="flex-1 items-center justify-center bg-black/70 px-4"
        onPress={onClose}
        accessibilityRole="button"
        accessibilityLabel="Close dialog"
      >
        <Pressable
          onPress={(e) => e.stopPropagation()}
          className={cn(
            "w-full max-w-md rounded-2xl border bg-panel p-6",
            tone === "danger" ? "border-danger/50" : "border-border-strong",
          )}
        >
          <SafeAreaView>
            <Text className="font-display text-[20px] text-text">{title}</Text>
            {description ? (
              <Text className="mt-2 font-sans text-[14px] text-muted leading-5">{description}</Text>
            ) : null}
            {children ? <View className="mt-4">{children}</View> : null}
            {actions ? (
              <View className="mt-6 flex-row justify-end gap-2">{actions}</View>
            ) : null}
          </SafeAreaView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
