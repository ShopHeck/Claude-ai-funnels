import { Platform, Pressable, Text, View } from "react-native";
import * as AppleAuthentication from "expo-apple-authentication";
import { useHaptics } from "@/lib/hooks/useHaptics";

interface AppleSignInButtonProps {
  onSuccess: () => void;
  onError?: (error: unknown) => void;
}

export function AppleSignInButton({ onSuccess, onError }: AppleSignInButtonProps) {
  const haptic = useHaptics();

  const handlePress = async () => {
    try {
      haptic("medium");
      await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      onSuccess();
    } catch (error) {
      onError?.(error);
    }
  };

  if (Platform.OS === "ios") {
    return (
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.CONTINUE}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.WHITE}
        cornerRadius={12}
        style={{ width: "100%", height: 48 }}
        onPress={() => void handlePress()}
      />
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Continue with Apple"
      onPress={() => void handlePress()}
      className="flex-row items-center justify-center gap-2 rounded-xl border border-border-strong bg-panel px-4 py-3"
    >
      <View className="h-5 w-5 items-center justify-center">
        <Text className="text-text text-[14px]"></Text>
      </View>
      <Text className="font-sans-semibold text-text text-[14px]">Continue with Apple</Text>
    </Pressable>
  );
}
