import { Slot } from "expo-router";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

export default function AuthLayout() {
  return (
    <View className="flex-1 bg-bg">
      <LinearGradient
        colors={["rgba(0,212,255,0.08)", "rgba(123,97,255,0.04)", "rgba(10,15,28,0)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }}
      />
      <SafeAreaView edges={["top", "bottom"]} style={{ flex: 1 }}>
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="mx-auto w-full max-w-[440px] px-4 py-10">
            <Slot />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
