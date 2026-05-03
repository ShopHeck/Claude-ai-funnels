import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <>
      <Stack.Screen options={{ title: "Not found" }} />
      <View className="flex-1 items-center justify-center gap-4 bg-bg px-6">
        <Text className="font-display-bold text-text text-[32px]">Lost signal.</Text>
        <Text className="max-w-sm text-center font-sans text-muted text-[14px] leading-5">
          That screen doesn't exist, or it moved somewhere quieter.
        </Text>
        <Link href="/" asChild>
          <Button label="Return home" variant="secondary" />
        </Link>
      </View>
    </>
  );
}
