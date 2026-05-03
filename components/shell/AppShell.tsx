import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { MobileNav } from "./MobileNav";

interface AppShellProps {
  userEmail?: string;
  planLabel?: string;
  onUpgrade?: () => void;
  title?: string;
  children: React.ReactNode;
}

export function AppShell({
  userEmail,
  planLabel,
  onUpgrade,
  title,
  children,
}: AppShellProps) {
  return (
    <View className="flex-1 bg-bg">
      <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
        <View className="flex-1 flex-row">
          <Sidebar userEmail={userEmail} planLabel={planLabel} onUpgrade={onUpgrade} />
          <View className="flex-1 flex-col">
            <Topbar title={title} />
            <View className="flex-1">{children}</View>
            <MobileNav />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
