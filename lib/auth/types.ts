import type { User } from "@/types";

export type AuthProviderId = "apple" | "email" | "mock";

export interface AuthSession {
  user: User;
  provider: AuthProviderId;
  issued_at: string;
}

export interface AuthPort {
  getSession(): Promise<AuthSession | null>;
  signInWithApple(): Promise<AuthSession>;
  signInWithEmailLink(email: string): Promise<{ sent: true }>;
  exchangeEmailLink(email: string, code: string): Promise<AuthSession>;
  signOut(): Promise<void>;
  deleteAccount(): Promise<void>;
}
