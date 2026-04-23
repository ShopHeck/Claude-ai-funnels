import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, View } from "react-native";
import { Eye, Save } from "lucide-react-native";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { BlockLibrary } from "@/components/builder/BlockLibrary";
import { BuilderCanvas } from "@/components/builder/BuilderCanvas";
import { PropertyEditor } from "@/components/builder/PropertyEditor";
import { blockDefaults } from "@/components/builder/blocks";
import { PageContainer } from "@/components/shell/PageContainer";
import { PageHeader } from "@/components/shell/PageHeader";
import { experiencesRepo } from "@/lib/data";
import { useHaptics } from "@/lib/hooks/useHaptics";
import type { BlockType, Experience, FunnelBlock } from "@/types";
import { telemetry } from "@/lib/telemetry/posthog";

function freshBlock(experienceId: string, type: BlockType, order: number): FunnelBlock {
  const defaults = blockDefaults(type);
  return {
    id: `blk_${experienceId}_${type}_${Date.now()}`,
    experience_id: experienceId,
    type,
    title: defaults.title,
    body: defaults.body,
    cta_label: defaults.cta,
    order_index: order,
  };
}

export default function Builder() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const haptic = useHaptics();

  const [experience, setExperience] = useState<Experience | null>(null);
  const [blocks, setBlocks] = useState<FunnelBlock[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      const [e, b] = await Promise.all([
        experiencesRepo.byId(id),
        experiencesRepo.blocksFor(id),
      ]);
      setExperience(e);
      setBlocks(b);
      setSelectedId(b[0]?.id ?? null);
    })();
  }, [id]);

  const selected = useMemo(
    () => blocks.find((b) => b.id === selectedId) ?? null,
    [blocks, selectedId],
  );

  const handleAdd = useCallback(
    (type: BlockType) => {
      if (!id) return;
      const next = freshBlock(id, type, blocks.length);
      setBlocks((list) => [...list, next]);
      setSelectedId(next.id);
    },
    [id, blocks.length],
  );

  const handleMove = useCallback((blockId: string, direction: "up" | "down") => {
    setBlocks((list) => {
      const index = list.findIndex((b) => b.id === blockId);
      if (index < 0) return list;
      const swap = direction === "up" ? index - 1 : index + 1;
      if (swap < 0 || swap >= list.length) return list;
      const copy = [...list];
      const a = copy[index];
      const b = copy[swap];
      if (!a || !b) return list;
      copy[index] = b;
      copy[swap] = a;
      return copy.map((item, i) => ({ ...item, order_index: i }));
    });
  }, []);

  const handleRemove = useCallback(
    (blockId: string) => {
      setBlocks((list) => list.filter((b) => b.id !== blockId).map((b, i) => ({ ...b, order_index: i })));
      if (selectedId === blockId) setSelectedId(null);
    },
    [selectedId],
  );

  const handleChangeSelected = useCallback(
    (patch: Partial<FunnelBlock>) => {
      setBlocks((list) =>
        list.map((b) => (b.id === selectedId ? { ...b, ...patch } : b)),
      );
    },
    [selectedId],
  );

  const handleSave = useCallback(async () => {
    if (!id) return;
    setSaving(true);
    try {
      await experiencesRepo.saveBlocks(id, blocks);
      await experiencesRepo.update(id, { status: "draft" });
      setSavedAt(new Date().toLocaleTimeString());
      haptic("success");
      telemetry.capture("builder_saved", { id, blocks: blocks.length });
    } finally {
      setSaving(false);
    }
  }, [id, blocks, haptic]);

  if (!id) return null;

  return (
    <PageContainer>
      <PageHeader
        eyebrow="Builder"
        title={experience?.name ?? "Funnel builder"}
        description="Click a block in the library to add it. Tap a block on the canvas to edit it."
        actions={
          <>
            <Button
              label="Preview"
              variant="secondary"
              size="md"
              leading={<Eye size={15} color="#FFFFFF" />}
              onPress={() => router.push({ pathname: "/preview/[id]", params: { id } })}
            />
            <Button
              label="Save funnel"
              variant="primary"
              size="md"
              leading={<Save size={15} color="#0A0F1C" />}
              loading={saving}
              onPress={handleSave}
              hapticKind="success"
            />
          </>
        }
      />
      {savedAt ? (
        <Card padding="sm" variant="subtle">
          <Text className="font-sans text-muted text-[12px]">
            Saved at {savedAt} · autosave keeps your work safe.
          </Text>
        </Card>
      ) : null}

      <View className="flex-col gap-4 lg:flex-row">
        <View className="w-full lg:w-[280px] lg:shrink-0">
          <BlockLibrary onAdd={handleAdd} />
        </View>
        <View className="flex-1">
          <BuilderCanvas
            blocks={blocks}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onMove={handleMove}
            onRemove={handleRemove}
          />
        </View>
        <View className="w-full lg:w-[320px] lg:shrink-0">
          <PropertyEditor block={selected} onChange={handleChangeSelected} />
        </View>
      </View>
    </PageContainer>
  );
}
