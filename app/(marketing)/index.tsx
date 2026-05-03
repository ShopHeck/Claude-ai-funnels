import { Link, Redirect } from "expo-router";
import { Platform, ScrollView, Text, View } from "react-native";
import { MotiView } from "moti";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowRight, Gauge, LayoutTemplate, Sparkles } from "lucide-react-native";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { fadeUp } from "@/lib/theme/motion";

const capabilities = [
  {
    icon: Sparkles,
    title: "Narrative generation",
    body: "Six-step immersive sequences drafted for your niche, offer, and emotional intent.",
  },
  {
    icon: LayoutTemplate,
    title: "Composable builder",
    body: "Click-to-add blocks, inline editing, and reliable reordering — no dragging edge cases.",
  },
  {
    icon: Gauge,
    title: "Perception score",
    body: "Analytics that explain the decision — not another dashboard to stare at.",
  },
];

export default function MarketingHome() {
  if (Platform.OS !== "web") {
    return <Redirect href="/(auth)/sign-in" />;
  }
  return (
    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      <View className="relative overflow-hidden">
        <LinearGradient
          colors={["rgba(0,212,255,0.10)", "rgba(123,97,255,0.05)", "rgba(10,15,28,0)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }}
        />
        <View className="mx-auto w-full max-w-[1040px] items-center gap-8 px-4 py-20 lg:py-28">
          <MotiView {...fadeUp(0)}>
            <Badge label="NeuroFunnel AI · v1" tone="cyan" dot />
          </MotiView>
          <MotiView {...fadeUp(80)}>
            <Text className="text-center font-display-bold text-text text-[40px] leading-[44px] sm:text-[56px] sm:leading-[60px]">
              Immersive funnels that make
              {"\n"}
              <Text className="text-accent-cyan">attention feel inevitable.</Text>
            </Text>
          </MotiView>
          <MotiView {...fadeUp(160)}>
            <Text className="max-w-[680px] text-center font-sans text-muted text-[16px] leading-[24px] sm:text-[18px] sm:leading-[28px]">
              NeuroFunnel writes the six-step emotional sequence, assembles the funnel, and
              tells you what to ship next — in the voice of a studio, not a template.
            </Text>
          </MotiView>
          <MotiView {...fadeUp(220)} style={{ flexDirection: "row", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <Link href="/(auth)/sign-up" asChild>
              <Button
                label="Start for free"
                variant="primary"
                size="lg"
                trailing={<ArrowRight size={18} color="#0A0F1C" />}
              />
            </Link>
            <Link href="/(marketing)/demo" asChild>
              <Button label="Watch the 90-sec demo" variant="secondary" size="lg" />
            </Link>
          </MotiView>
        </View>
      </View>

      <View className="mx-auto w-full max-w-[1120px] gap-4 px-4 py-16 sm:flex-row sm:flex-wrap">
        {capabilities.map((c, i) => {
          const Icon = c.icon;
          return (
            <MotiView key={c.title} {...fadeUp(i * 100)} style={{ flex: 1, minWidth: 260 }}>
              <Card padding="lg" className="gap-3">
                <View className="h-10 w-10 items-center justify-center rounded-xl border border-accent-cyan/30 bg-accent-cyan/10">
                  <Icon size={18} color="#00D4FF" />
                </View>
                <Text className="font-display text-text text-[18px]">{c.title}</Text>
                <Text className="font-sans text-muted text-[13px] leading-5">{c.body}</Text>
              </Card>
            </MotiView>
          );
        })}
      </View>

      <View className="mx-auto w-full max-w-[1120px] px-4 pb-20">
        <Card padding="lg" variant="glow" className="gap-4">
          <Badge label="Ship this week" tone="cyan" />
          <Text className="font-display-bold text-text text-[24px] leading-7 sm:text-[28px] sm:leading-8">
            Go from niche to live funnel in under ten minutes.
          </Text>
          <Text className="font-sans text-muted text-[14px] leading-5">
            One screen to configure intent. One to generate the sequence. One to publish. The
            rest is polish.
          </Text>
          <View className="flex-row flex-wrap gap-2">
            <Link href="/(auth)/sign-up" asChild>
              <Button label="Create your first experience" variant="primary" size="md" />
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
