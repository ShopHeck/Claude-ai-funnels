import type { Experience, ExperienceStep, FunnelBlock } from "@/types";
import {
  experiences as seedExperiences,
  experienceSteps as seedSteps,
  funnelBlocks as seedBlocks,
} from "./seed/experiences";

const store = {
  experiences: [...seedExperiences],
  steps: { ...seedSteps } as Record<string, ExperienceStep[]>,
  blocks: { ...seedBlocks } as Record<string, FunnelBlock[]>,
};

function cloneExperience(e: Experience): Experience {
  return { ...e };
}

export const experiencesRepo = {
  async list(): Promise<Experience[]> {
    return store.experiences.map(cloneExperience);
  },
  async recent(limit = 5): Promise<Experience[]> {
    return [...store.experiences]
      .sort((a, b) => b.updated_at.localeCompare(a.updated_at))
      .slice(0, limit)
      .map(cloneExperience);
  },
  async byId(id: string): Promise<Experience | null> {
    const match = store.experiences.find((e) => e.id === id);
    return match ? cloneExperience(match) : null;
  },
  async stepsFor(experienceId: string): Promise<ExperienceStep[]> {
    const list = store.steps[experienceId] ?? [];
    return [...list].sort((a, b) => a.order_index - b.order_index).map((s) => ({ ...s }));
  },
  async blocksFor(experienceId: string): Promise<FunnelBlock[]> {
    const list = store.blocks[experienceId] ?? [];
    return [...list].sort((a, b) => a.order_index - b.order_index).map((b) => ({ ...b }));
  },
  async create(experience: Experience, steps: ExperienceStep[]): Promise<Experience> {
    store.experiences.unshift(experience);
    store.steps[experience.id] = steps;
    return cloneExperience(experience);
  },
  async update(id: string, patch: Partial<Experience>): Promise<Experience | null> {
    const index = store.experiences.findIndex((e) => e.id === id);
    if (index < 0) return null;
    const existing = store.experiences[index];
    if (!existing) return null;
    const next: Experience = {
      ...existing,
      ...patch,
      id: existing.id,
      updated_at: new Date().toISOString(),
    };
    store.experiences[index] = next;
    return cloneExperience(next);
  },
  async saveSteps(experienceId: string, steps: ExperienceStep[]): Promise<void> {
    store.steps[experienceId] = steps.map((s) => ({ ...s }));
  },
  async saveBlocks(experienceId: string, blocks: FunnelBlock[]): Promise<void> {
    store.blocks[experienceId] = blocks.map((b) => ({ ...b }));
  },
  async delete(id: string): Promise<void> {
    store.experiences = store.experiences.filter((e) => e.id !== id);
    delete store.steps[id];
    delete store.blocks[id];
  },
};
