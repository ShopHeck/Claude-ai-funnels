import { Link } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StepBlock } from "@/components/experience/StepBlock";
import { experienceSteps } from "@/lib/data/seed/experiences";

const steps = experienceSteps["exp_quiet_luxury"] ?? [];

export default function Demo() {
  return (
    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      <View className="mx-auto w-full max-w-[860px] gap-10 px-4 py-16">
        <View className="gap-4">
          <Badge label="Sample · Quiet Luxury" tone="violet" dot />
          <Text className="font-display-bold text-text text-[36px] leading-[40px] sm:text-[44px] sm:leading-[48px]">
            A generated sequence, exactly as it arrives.
          </Text>
          <Text className="font-sans text-muted text-[15px] leading-6">
            This is the actual output from the Experience Creator for a high-ticket advisory
            niche. Every line is produced from six config inputs — niche, offer, emotion, tone,
            intensity, and CTA goal.
          </Text>
        </View>

        <View className="gap-3">
          {steps.map((step, i) => (
            <StepBlock key={step.id} step={step} delay={i * 80} />
          ))}
        </View>

        <Card padding="lg" variant="glow" className="gap-3">
          <Text className="font-display text-text text-[22px]">Want one for your offer?</Text>
          <Text className="font-sans text-muted text-[13px] leading-5">
            Sign up free and generate your first experience in under three minutes.
          </Text>
          <View className="flex-row gap-2">
            <Link href="/(auth)/sign-up" asChild>
              <Button label="Start free" variant="primary" size="md" />
            </Link>
            <Link href="/(marketing)/pricing" asChild>
              <Button label="See pricing" variant="secondary" size="md" />
            </Link>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}
