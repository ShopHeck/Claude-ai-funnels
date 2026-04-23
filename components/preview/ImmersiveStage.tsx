import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface ImmersiveStageProps {
  children: React.ReactNode;
}

export function ImmersiveStage({ children }: ImmersiveStageProps) {
  return (
    <View className="flex-1 bg-bg">
      <LinearGradient
        colors={["#000812", "#0A0F1C", "#12182A"]}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.9, y: 1 }}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      />
      <View
        pointerEvents="none"
        className="absolute left-[-15%] top-[-10%] h-[420px] w-[420px] rounded-full bg-accent-cyan/10 blur-3xl"
      />
      <View
        pointerEvents="none"
        className="absolute right-[-15%] bottom-[-15%] h-[480px] w-[480px] rounded-full bg-accent-violet/10 blur-3xl"
      />
      <View className="flex-1 items-center justify-center px-6 py-10">
        <View className="w-full max-w-[720px]">{children}</View>
      </View>
    </View>
  );
}
