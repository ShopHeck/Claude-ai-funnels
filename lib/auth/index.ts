import { mockAuth } from "./mock";
import type { AuthPort } from "./types";

export const auth: AuthPort = mockAuth;
export type { AuthPort, AuthSession, AuthProviderId } from "./types";
