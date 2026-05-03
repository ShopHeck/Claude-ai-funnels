import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { LogOut, ShieldCheck, Trash2 } from "lucide-react-native";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Dialog } from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { PageContainer } from "@/components/shell/PageContainer";
import { PageHeader } from "@/components/shell/PageHeader";
import { auth } from "@/lib/auth";
import { userRepo } from "@/lib/data/user";
import type { User } from "@/types";
import { telemetry } from "@/lib/telemetry/posthog";

export default function Settings() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [fullName, setFullName] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  useEffect(() => {
    (async () => {
      const me = await userRepo.me();
      setUser(me);
      setFullName(me?.full_name ?? "");
    })();
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      const updated = await userRepo.update({ full_name: fullName });
      setUser(updated);
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    await auth.deleteAccount();
    telemetry.capture("account_deleted");
    setDeleteOpen(false);
    router.replace("/(auth)/sign-in");
  };

  const signOut = async () => {
    await auth.signOut();
    router.replace("/(auth)/sign-in");
  };

  return (
    <PageContainer>
      <PageHeader
        eyebrow="Account"
        title="Settings"
        description="Your profile, privacy, and the boundaries of this workspace."
      />

      <Card padding="lg" className="gap-4">
        <Text className="font-display text-text text-[16px]">Profile</Text>
        <Input label="Full name" value={fullName} onChangeText={setFullName} />
        <Input
          label="Email"
          value={user?.email ?? ""}
          editable={false}
          hint="Email changes require a verification flow (coming soon)."
        />
        <View className="self-start">
          <Button label="Save changes" onPress={save} loading={saving} hapticKind="success" />
        </View>
      </Card>

      <Card padding="lg" className="gap-4">
        <View className="flex-row items-center gap-2">
          <ShieldCheck size={16} color="#3EE49A" />
          <Text className="font-display text-text text-[16px]">Privacy</Text>
          <View className="ml-auto">
            <Badge label="App Tracking off" tone="success" dot />
          </View>
        </View>
        <Text className="font-sans text-muted text-[13px] leading-5">
          We don't request App Tracking Transparency unless you opt into personalized performance
          insights. Analytics we collect is aggregated and never sold.
        </Text>
        <Text className="font-sans text-subtle text-[12px]">
          Read our privacy policy at neurofunnel.ai/privacy.
        </Text>
      </Card>

      <Card padding="lg" className="gap-4">
        <Text className="font-display text-text text-[16px]">Session</Text>
        <View className="flex-row flex-wrap gap-2">
          <Button
            label="Sign out"
            variant="secondary"
            leading={<LogOut size={15} color="#FFFFFF" />}
            onPress={signOut}
            hapticKind="medium"
          />
        </View>
      </Card>

      <Card padding="lg" className="gap-4" variant="default">
        <View className="flex-row items-center gap-2">
          <Trash2 size={16} color="#FF5C7C" />
          <Text className="font-display text-text text-[16px]">Delete account</Text>
        </View>
        <Text className="font-sans text-muted text-[13px] leading-5">
          Deletes your profile, workspaces, experiences, and analytics. This is irreversible and
          required by the App Store — we honor it fully.
        </Text>
        <View className="self-start">
          <Button
            label="Delete my account"
            variant="danger"
            onPress={() => setDeleteOpen(true)}
            hapticKind="warning"
          />
        </View>
      </Card>

      <Dialog
        visible={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        title="Delete your account?"
        description="Type DELETE to confirm. This immediately removes your profile, workspaces, experiences, and analytics."
        tone="danger"
        actions={
          <>
            <Button
              label="Cancel"
              variant="secondary"
              onPress={() => setDeleteOpen(false)}
            />
            <Button
              label="Delete forever"
              variant="danger"
              disabled={confirmText !== "DELETE"}
              onPress={confirmDelete}
            />
          </>
        }
      >
        <Input
          value={confirmText}
          onChangeText={setConfirmText}
          placeholder="Type DELETE"
          autoCapitalize="characters"
        />
      </Dialog>
    </PageContainer>
  );
}
