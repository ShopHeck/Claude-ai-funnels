import type { User } from "@/types";
import { userRepo } from "@/lib/data/user";
import { createLogger } from "@/lib/utils/logger";
import type { AuthPort, AuthSession } from "./types";

const log = createLogger("auth.mock");

let session: AuthSession | null = null;

function makeSession(user: User, provider: AuthSession["provider"]): AuthSession {
  return { user, provider, issued_at: new Date().toISOString() };
}

async function hydrateFromExisting(): Promise<AuthSession | null> {
  const user = await userRepo.me();
  if (!user) return null;
  session = makeSession(user, "mock");
  return session;
}

export const mockAuth: AuthPort = {
  async getSession() {
    if (session) return session;
    return hydrateFromExisting();
  },
  async signInWithApple() {
    const user = await userRepo.me();
    if (!user) throw new Error("No mock user available");
    session = makeSession(user, "apple");
    log.info("signed in with apple");
    return session;
  },
  async signInWithEmailLink(email: string) {
    log.info(`email link requested for ${email}`);
    return { sent: true };
  },
  async exchangeEmailLink(email: string, _code: string) {
    const user = await userRepo.me();
    const effective = user ?? (await userRepo.signIn({
      id: `user_${Date.now()}`,
      email,
      full_name: email.split("@")[0] ?? "Member",
      avatar_url: null,
      created_at: new Date().toISOString(),
    }));
    session = makeSession(effective, "email");
    return session;
  },
  async signOut() {
    session = null;
    log.info("signed out");
  },
  async deleteAccount() {
    session = null;
    await userRepo.deleteAccount();
    log.info("account deleted");
  },
};
