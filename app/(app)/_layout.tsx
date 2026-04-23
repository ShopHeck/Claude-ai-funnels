import { useEffect, useState } from "react";
import { Slot, useRouter } from "expo-router";
import { AppShell } from "@/components/shell/AppShell";
import { auth } from "@/lib/auth";
import { useEntitlement } from "@/lib/hooks/useEntitlement";

export default function AppLayout() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | undefined>(undefined);
  const [ready, setReady] = useState(false);
  const { plan } = useEntitlement();

  useEffect(() => {
    let mounted = true;
    (async () => {
      const session = await auth.getSession();
      if (!mounted) return;
      if (!session) {
        router.replace("/(auth)/sign-in");
        return;
      }
      setUserEmail(session.user.email);
      setReady(true);
    })();
    return () => {
      mounted = false;
    };
  }, [router]);

  if (!ready) return null;

  return (
    <AppShell
      userEmail={userEmail}
      planLabel={plan.charAt(0).toUpperCase() + plan.slice(1)}
      onUpgrade={() => router.push("/billing")}
    >
      <Slot />
    </AppShell>
  );
}
