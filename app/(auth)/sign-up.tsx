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

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleContinue = async () => {
    if (!email || !email.includes("@")) {
      setError("Enter the email you'll use to sign in.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await auth.exchangeEmailLink(email, "000000");
      telemetry.capture("auth_signed_up", { provider: "email" });
      router.replace("/dashboard");
    } catch {
      setError("We couldn't create your account. Try again in a moment.");
    } finally {
      setLoading(false);
    }
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
        <Text className="font-display-bold text-text text-[30px] leading-[34px]">Create your workspace.</Text>
        <Text className="font-sans text-muted text-[14px] leading-[20px]">
          Free to start. Ship your first immersive funnel in under ten minutes.
        </Text>
      </View>

      <Card padding="lg" className="gap-4">
        <AppleSignInButton
          onSuccess={() => router.replace("/dashboard")}
          onError={() => setError("Apple sign-up cancelled.")}
        />
        <View className="flex-row items-center gap-3">
          <View className="h-px flex-1 bg-border" />
          <Text className="font-sans text-subtle text-[11px] uppercase tracking-[1.4px]">or email</Text>
          <View className="h-px flex-1 bg-border" />
        </View>
        <Input
          label="Full name"
          placeholder="Ava Hart"
          autoCapitalize="words"
          value={fullName}
          onChangeText={setFullName}
        />
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
          label="Create account"
          variant="primary"
          size="md"
          fullWidth
          loading={loading}
          onPress={handleContinue}
          hapticKind="success"
        />
        <Text className="text-center font-sans text-subtle text-[12px] leading-4">
          By continuing you agree to our Terms and Privacy Policy.
        </Text>
      </Card>

      <Text className="text-center font-sans text-muted text-[13px]">
        Already have an account?{" "}
        <Link href="/(auth)/sign-in" className="text-accent-cyan font-sans-semibold">
          Sign in
        </Link>
      </Text>
    </View>
  );
}
