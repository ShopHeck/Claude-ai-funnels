import * as Haptics from "expo-haptics";
import { Platform } from "react-native";

type Kind = "light" | "medium" | "heavy" | "success" | "warning" | "error" | "select";

export function useHaptics() {
  return (kind: Kind = "light") => {
    if (Platform.OS === "web") return;
    switch (kind) {
      case "light":
        void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        return;
      case "medium":
        void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        return;
      case "heavy":
        void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        return;
      case "success":
        void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        return;
      case "warning":
        void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        return;
      case "error":
        void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        return;
      case "select":
        void Haptics.selectionAsync();
        return;
    }
  };
}
