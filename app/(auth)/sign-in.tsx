import { useState } from "react";
import { Link, useRouter } from "expo-router";
import { Text, View } from "react-native";
import { Sparkles } from "lucide-react-native";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { AppleSignInButton } from "@/components/auth/AppleSignInButton";
import { auth } from "@/lib/auth";
import { telemetry } from "@/lib/telemetry/posthog";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [signingApple, setSigningApple] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleApple = async () => {
    setSigningApple(true);
    setError(null);
    try {
      await auth.signInWithApple();
      telemetry.capture("auth_signed_in", { provider: "apple" });
      router.replace("/dashboard");
    } catch {
      setError("Apple sign-in cancelled. You can still continue with email.");
    } finally {
      setSigningApple(false);
    }
  };

  const handleEmail = async () => {
    if (!email || !email.includes("@")) {
      setError("Enter a valid email to receive a sign-in link.");
      return;
    }
    setSending(true);
    setError(null);
    try {
      await auth.signInWithEmailLink(email);
      setSent(true);
      telemetry.capture("auth_email_link_sent");
    } catch {
      setError("We couldn't send the link. Try again in a moment.");
    } finally {
      setSending(false);
    }
  };

  const handleDevContinue = async () => {
    await auth.exchangeEmailLink(email || "founder@neurofunnel.ai", "000000");
    router.replace("/dashboard");
  };

  return (
    <View className="gap-6">
      <View className="flex-row items-center gap-2">
        <View className="h-8 w-8 items-center justify-center rounded-lg border border-accent-cyan/40 bg-accent-cyan/10">
          <Sparkles size={15} color="#00D4FF" />
        </View>
        <Text className="font-display text-text text-[18px]">NeuroFunnel</Text>
      </View>

      <View className="gap-2">
        <Text className="font-display-bold text-text text-[30px] leading-[34px]">Welcome back.</Text>
        <Text className="font-sans text-muted text-[14px] leading-[20px]">
          Sign in to continue crafting experiences that convert.
        </Text>
      </View>

      <Card padding="lg" className="gap-4">
        <AppleSignInButton onSuccess={() => router.replace("/dashboard")} onError={() => setError("Apple sign-in cancelled.")} />
        <View className="flex-row items-center gap-3">
          <View className="h-px flex-1 bg-border" />
          <Text className="font-sans text-subtle text-[11px] uppercase tracking-[1.4px]">
            or email
          </Text>
          <View className="h-px flex-1 bg-border" />
        </View>
        <Input
          label="Email"
          placeholder="you@example.com"
          inputMode="email"
          autoCapitalize="none"
          autoComplete="email"
          value={email}
          onChangeText={setEmail}
          error={error ?? undefined}
        />
        <Button
          label={sent ? "Link sent. Check your inbox." : "Send sign-in link"}
          variant="primary"
          size="md"
          fullWidth
          loading={sending || signingApple}
          disabled={sent}
          onPress={handleEmail}
          hapticKind="medium"
        />
        {sent ? (
          <Button
            label="Continue to the app"
            variant="secondary"
            size="md"
            fullWidth
            onPress={handleDevContinue}
          />
        ) : null}
      </Card>

      <Text className="text-center font-sans text-muted text-[13px]">
        New here?{" "}
        <Link href="/(auth)/sign-up" className="text-accent-cyan font-sans-semibold">
          Create an account
        </Link>
      </Text>
    </View>
  );
}
