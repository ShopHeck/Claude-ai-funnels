import type { User } from "@/types";
import { currentUser as seedUser } from "./seed/user";

let current: User | null = { ...seedUser };

export const userRepo = {
  async me(): Promise<User | null> {
    return current ? { ...current } : null;
  },
  async update(patch: Partial<User>): Promise<User> {
    if (!current) throw new Error("No active user");
    current = { ...current, ...patch };
    return { ...current };
  },
  async deleteAccount(): Promise<void> {
    current = null;
  },
  async signIn(user: User): Promise<User> {
    current = { ...user };
    return { ...current };
  },
};
