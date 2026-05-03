import type { User } from "@/types";

export const currentUser: User = {
  id: "user_mock_01",
  email: "founder@neurofunnel.ai",
  full_name: "Ava Hart",
  avatar_url: null,
  created_at: new Date(Date.now() - 30 * 24 * 3600_000).toISOString(),
};
