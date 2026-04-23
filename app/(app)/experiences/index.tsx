import { useEffect, useState } from "react";
import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { Plus, Sparkles } from "lucide-react-native";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Skeleton } from "@/components/ui/Skeleton";
import { Tabs } from "@/components/ui/Tabs";
import { PageContainer } from "@/components/shell/PageContainer";
import { PageHeader } from "@/components/shell/PageHeader";
import { experiencesRepo } from "@/lib/data";
import { formatRelative } from "@/lib/utils/formatters";
import type { Experience, ExperienceStatus } from "@/types";

type Filter = "all" | ExperienceStatus;

export default function ExperiencesIndex() {
  const [all, setAll] = useState<Experience[] | null>(null);
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    (async () => {
      setAll(await experiencesRepo.list());
    })();
  }, []);

  const filtered = all
    ? all.filter((e) => (filter === "all" ? true : e.status === filter))
    : null;

  const counts = {
    all: all?.length ?? 0,
    published: all?.filter((e) => e.status === "published").length ?? 0,
    draft: all?.filter((e) => e.status === "draft").length ?? 0,
    archived: all?.filter((e) => e.status === "archived").length ?? 0,
  };

  return (
    <PageContainer>
      <PageHeader
        eyebrow="Library"
        title="Experiences"
        description="Every sequence you've drafted, refined, or shipped."
        actions={
          <Link href="/experiences/new" asChild>
            <Button
              label="Create experience"
              variant="primary"
              size="md"
              leading={<Plus size={16} color="#0A0F1C" strokeWidth={2.5} />}
            />
          </Link>
        }
      />

      <Tabs<Filter>
        variant="underline"
        value={filter}
        onChange={setFilter}
        items={[
          { value: "all", label: "All", count: counts.all },
          { value: "published", label: "Published", count: counts.published },
          { value: "draft", label: "Drafts", count: counts.draft },
          { value: "archived", label: "Archived", count: counts.archived },
        ]}
      />

      <View className="gap-3">
        {!filtered
          ? Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} padding="md">
                <Skeleton height={18} />
                <View className="h-2" />
                <Skeleton width={220} height={12} />
              </Card>
            ))
          : filtered.length === 0
            ? (
              <EmptyState
                icon={Sparkles}
                title="Nothing here yet"
                description="Create your first experience to start building your workspace."
                actionLabel="Create experience"
              />
            )
            : filtered.map((e) => (
                <Link
                  key={e.id}
                  href={{ pathname: "/experiences/[id]", params: { id: e.id } }}
                  asChild
                >
                  <Pressable accessibilityRole="link">
                    <Card padding="md" className="gap-2">
                      <View className="flex-row items-center justify-between gap-2">
                        <Text className="font-display text-text text-[16px]">{e.name}</Text>
                        <Badge
                          label={e.status}
                          tone={
                            e.status === "published"
                              ? "success"
                              : e.status === "draft"
                                ? "warning"
                                : "neutral"
                          }
                          dot
                        />
                      </View>
                      <Text className="font-sans text-muted text-[12.5px]">
                        {e.niche} · {e.emotion} · {e.tone} · {e.cta_goal}
                      </Text>
                      <Text className="font-sans text-subtle text-[12px]">
                        Updated {formatRelative(e.updated_at)}
                      </Text>
                    </Card>
                  </Pressable>
                </Link>
              ))}
      </View>
    </PageContainer>
  );
}
