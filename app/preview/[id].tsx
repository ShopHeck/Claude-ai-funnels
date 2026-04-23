import { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { X } from "lucide-react-native";
import { ImmersiveStage } from "@/components/preview/ImmersiveStage";
import { StaggeredReveal } from "@/components/preview/StaggeredReveal";
import type { RevealLine } from "@/components/preview/StaggeredReveal";
import { auth } from "@/lib/auth";
import { experiencesRepo } from "@/lib/data";
import type { ExperienceStep } from "@/types";

export default function Preview() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [steps, setSteps] = useState<ExperienceStep[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const session = await auth.getSession();
      if (!session) {
        router.replace("/(auth)/sign-in");
        return;
      }
      if (!id) return;
      setSteps(await experiencesRepo.stepsFor(id));
      setReady(true);
    })();
  }, [id, router]);

  if (!ready || !id) return null;

  const ctaStep = steps.find((s) => s.type === "cta");
  const narrativeLines = steps
    .filter((s) => s.type !== "cta")
    .slice(0, 3)
    .map<RevealLine>((step, index) => ({
      text: step.title,
      tone: index === 2 ? "accent" : "primary",
    }));
  const ctaLabel = ctaStep?.title ?? "Continue";

  return (
    <>
      <Stack.Screen options={{ headerShown: false, animation: "fade" }} />
      <StatusBar style="light" />
      <View className="flex-1 bg-bg">
        <ImmersiveStage>
          <SafeAreaView edges={["top", "bottom"]} style={{ flex: 1, justifyContent: "center" }}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Exit preview"
              onPress={() => router.back()}
              className="absolute right-5 top-5 h-10 w-10 items-center justify-center rounded-full border border-border bg-panel/70"
            >
              <X size={18} color="#FFFFFF" />
            </Pressable>
            {narrativeLines.length === 0 ? (
              <Text className="text-center font-sans text-muted text-[14px]">
                This experience has no sequence yet. Generate one first.
              </Text>
            ) : (
              <StaggeredReveal
                lines={narrativeLines}
                ctaLabel={ctaLabel}
                onCta={() => router.back()}
              />
            )}
          </SafeAreaView>
        </ImmersiveStage>
      </View>
    </>
  );
}
