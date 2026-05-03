import type { Template, TemplateCategory } from "@/types";
import { templates as seed } from "./seed/templates";

export const templatesRepo = {
  async list(category?: TemplateCategory): Promise<Template[]> {
    if (!category) return seed.map((t) => ({ ...t }));
    return seed.filter((t) => t.category === category).map((t) => ({ ...t }));
  },
  async byId(id: string): Promise<Template | null> {
    const match = seed.find((t) => t.id === id);
    return match ? { ...match } : null;
  },
};
