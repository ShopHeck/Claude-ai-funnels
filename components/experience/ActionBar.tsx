import { View } from "react-native";
import { Eye, RefreshCcw, Save } from "lucide-react-native";
import { Button } from "@/components/ui/Button";

interface ActionBarProps {
  canSave: boolean;
  isGenerating: boolean;
  isSaving: boolean;
  onRegenerate: () => void;
  onSave: () => void;
  onPreview: () => void;
}

export function ActionBar({
  canSave,
  isGenerating,
  isSaving,
  onRegenerate,
  onSave,
  onPreview,
}: ActionBarProps) {
  return (
    <View className="sticky bottom-0 flex-row flex-wrap items-center justify-end gap-2 border-t border-border bg-bg/95 px-4 py-3 lg:px-0">
      <Button
        label="Regenerate"
        variant="secondary"
        size="md"
        leading={<RefreshCcw size={15} color="#FFFFFF" />}
        loading={isGenerating}
        onPress={onRegenerate}
        hapticKind="medium"
      />
      <Button
        label="Preview"
        variant="secondary"
        size="md"
        leading={<Eye size={15} color="#FFFFFF" />}
        disabled={!canSave}
        onPress={onPreview}
        hapticKind="select"
      />
      <Button
        label="Save experience"
        variant="primary"
        size="md"
        leading={<Save size={15} color="#0A0F1C" />}
        loading={isSaving}
        disabled={!canSave}
        onPress={onSave}
        hapticKind="success"
      />
    </View>
  );
}
