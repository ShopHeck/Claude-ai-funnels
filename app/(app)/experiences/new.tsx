import { useCallback, useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, View } from "react-native";
import { Dialog } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ConfigRail } from "@/components/experience/ConfigRail";
import type { ConfigDraft } from "@/components/experience/ConfigRail";
import { ExperienceCanvas } from "@/components/experience/ExperienceCanvas";
import type { CanvasState } from "@/components/experience/ExperienceCanvas";
import { ActionBar } from "@/components/experience/ActionBar";
import { PageContainer } from "@/components/shell/PageContainer";
import { PageHeader } from "@/components/shell/PageHeader";
import { experiencesRepo, templatesRepo } from "@/lib/data";
import { generateExperience } from "@/lib/ai/generateExperience";
import type { Experience, ExperienceStep } from "@/types";
import { useHaptics } from "@/lib/hooks/useHaptics";
import { telemetry } from "@/lib/telemetry/posthog";

const defaultDraft: ConfigDraft = {
  niche: "High-ticket coaching for solo founders",
  offer_type: "coaching",
  emotion: "aspiration",
  tone: "luxury",
  intensity: 4,
  cta_goal: "apply",
};

export default function NewExperience() {
  const router = useRouter();
  const params = useLocalSearchParams<{ template?: string }>();
  const haptic = useHaptics();

  const [draft, setDraft] = useState<ConfigDraft>(defaultDraft);
  const [state, setState] = useState<CanvasState>("empty");
  const [steps, setSteps] = useState<ExperienceStep[]>([]);
  const [pendingExperience, setPendingExperience] = useState<Experience | null>(null);
  const [saving, setSaving] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  useEffect(() => {
    (async () => {
      if (!params.template) return;
      const t = await templatesRepo.byId(params.template);
      if (!t) return;
      setDraft((d) => ({
        ...d,
        emotion: t.recommended_emotion,
        tone: t.recommended_tone,
      }));
    })();
  }, [params.template]);

  const handleGenerate = useCallback(async () => {
    setState("generating");
    haptic("medium");
    telemetry.capture("experience_generate_requested", draft);
    await new Promise((r) => setTimeout(r, 900));
    try {
      const result = generateExperience({ ...draft, user_id: "user_mock_01" });
      setPendingExperience(result.experience);
      setSteps(result.steps);
      setState("generated");
      haptic("success");
    } catch {
      setState("error");
      haptic("error");
    }
  }, [draft, haptic]);

  const handleSave = useCallback(async () => {
    if (!pendingExperience) return;
    setSaving(true);
    try {
      await experiencesRepo.create(pendingExperience, steps);
      telemetry.capture("experience_saved", { id: pendingExperience.id });
      setSuccessOpen(true);
    } finally {
      setSaving(false);
    }
  }, [pendingExperience, steps]);

  const handlePreview = useCallback(() => {
    if (!pendingExperience) return;
    router.push({ pathname: "/preview/[id]", params: { id: pendingExperience.id } });
  }, [pendingExperience, router]);

  return (
    <PageContainer>
      <PageHeader
        eyebrow="Create"
        title="New experience"
        description="Set the intent. NeuroFunnel drafts the six-step sequence you can save, preview, and ship."
      />

      <View className="flex-col gap-6 lg:flex-row">
        <View className="w-full lg:w-[360px] lg:shrink-0">
          <ConfigRail draft={draft} onChange={(patch) => setDraft((d) => ({ ...d, ...patch }))} />
        </View>
        <View className="flex-1 gap-4">
          {state === "empty" ? (
            <Card padding="md" variant="subtle" className="gap-3">
              <Text className="font-display text-text text-[15px]">Ready when you are.</Text>
              <Text className="font-sans text-muted text-[13px] leading-5">
                Configure the intent on the left, then generate the sequence. You can regenerate
                as many times as you like — each run is seeded by your inputs.
              </Text>
              <View className="self-start">
                <Button label="Generate sequence" variant="primary" onPress={handleGenerate} />
              </View>
            </Card>
          ) : null}
          <ExperienceCanvas
            state={state}
            steps={steps}
            onGenerate={handleGenerate}
            onRetry={handleGenerate}
          />
        </View>
      </View>

      <ActionBar
        canSave={state === "generated"}
        isGenerating={state === "generating"}
        isSaving={saving}
        onRegenerate={handleGenerate}
        onPreview={handlePreview}
        onSave={handleSave}
      />

      <Dialog
        visible={successOpen}
        onClose={() => setSuccessOpen(false)}
        title="Experience saved."
        description="Open it in the builder to add blocks, or preview the immersive sequence right now."
        actions={
          <>
            <Button
              label="Preview"
              variant="secondary"
              onPress={() => {
                setSuccessOpen(false);
                handlePreview();
              }}
            />
            <Button
              label="Open in builder"
              variant="primary"
              onPress={() => {
                setSuccessOpen(false);
                if (pendingExperience) {
                  router.push({ pathname: "/builder/[id]", params: { id: pendingExperience.id } });
                }
              }}
            />
          </>
        }
      />
    </PageContainer>
  );
}
