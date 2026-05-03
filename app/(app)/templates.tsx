import { useEffect, useMemo, useState } from "react";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { TemplateCard } from "@/components/ui/TemplateCard";
import { PageContainer } from "@/components/shell/PageContainer";
import { PageHeader } from "@/components/shell/PageHeader";
import { CategoryFilter } from "@/components/templates/CategoryFilter";
import { templatesRepo } from "@/lib/data";
import type { Template, TemplateCategory } from "@/types";

type Filter = TemplateCategory | "all";

export default function Templates() {
  const router = useRouter();
  const [all, setAll] = useState<Template[] | null>(null);
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    (async () => setAll(await templatesRepo.list()))();
  }, []);

  const filtered = useMemo(() => {
    if (!all) return null;
    return filter === "all" ? all : all.filter((t) => t.category === filter);
  }, [all, filter]);

  const counts = useMemo(() => {
    const c: Record<Filter, number> = {
      all: 0,
      lead_gen: 0,
      ecommerce: 0,
      affiliate: 0,
      high_ticket: 0,
    };
    if (!all) return c;
    c.all = all.length;
    for (const t of all) c[t.category] += 1;
    return c;
  }, [all]);

  return (
    <PageContainer>
      <PageHeader
        eyebrow="Library"
        title="Templates"
        description="Starting points engineered for a specific outcome. Pick one and the creator fills in the rest."
      />
      <CategoryFilter value={filter} counts={counts} onChange={setFilter} />
      <View className="flex-row flex-wrap gap-4">
        {filtered?.map((t, i) => (
          <TemplateCard
            key={t.id}
            template={t}
            delay={i * 80}
            onUse={(template) =>
              router.push({ pathname: "/experiences/new", params: { template: template.id } })
            }
          />
        ))}
      </View>
    </PageContainer>
  );
}
