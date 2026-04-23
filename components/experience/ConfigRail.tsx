import { View } from "react-native";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import type { CtaGoal, Emotion, Intensity, OfferType, Tone } from "@/types";
import {
  ctaGoalOptions,
  emotionOptions,
  intensityOptions,
  offerTypeOptions,
  toneOptions,
} from "./options";

export interface ConfigDraft {
  niche: string;
  offer_type: OfferType;
  emotion: Emotion;
  tone: Tone;
  intensity: Intensity;
  cta_goal: CtaGoal;
}

interface ConfigRailProps {
  draft: ConfigDraft;
  onChange: (patch: Partial<ConfigDraft>) => void;
}

export function ConfigRail({ draft, onChange }: ConfigRailProps) {
  return (
    <Card variant="subtle" padding="md" className="gap-6">
      <Input
        label="Niche"
        placeholder="e.g. High-ticket coaching for solo founders"
        value={draft.niche}
        onChangeText={(niche) => onChange({ niche })}
      />
      <Select<OfferType>
        label="Offer type"
        value={draft.offer_type}
        options={offerTypeOptions}
        onChange={(offer_type) => onChange({ offer_type })}
      />
      <Select<Emotion>
        label="Emotional trigger"
        value={draft.emotion}
        options={emotionOptions}
        onChange={(emotion) => onChange({ emotion })}
      />
      <Select<Tone>
        label="Tone"
        value={draft.tone}
        options={toneOptions}
        onChange={(tone) => onChange({ tone })}
      />
      <Select<`${Intensity}`>
        label="Intensity"
        value={`${draft.intensity}` as `${Intensity}`}
        options={intensityOptions}
        onChange={(value) => onChange({ intensity: Number(value) as Intensity })}
      />
      <Select<CtaGoal>
        label="CTA goal"
        value={draft.cta_goal}
        options={ctaGoalOptions}
        onChange={(cta_goal) => onChange({ cta_goal })}
      />
      <View className="h-1" />
    </Card>
  );
}
