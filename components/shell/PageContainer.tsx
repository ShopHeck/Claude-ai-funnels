import { ScrollView, View } from "react-native";
import { cn } from "@/lib/utils/cn";

interface PageContainerProps {
  children: React.ReactNode;
  scroll?: boolean;
  maxWidth?: "full" | "lg" | "xl";
  className?: string;
}

const widths: Record<NonNullable<PageContainerProps["maxWidth"]>, string> = {
  full: "w-full",
  lg: "w-full max-w-[960px]",
  xl: "w-full max-w-[1200px]",
};

export function PageContainer({
  children,
  scroll = true,
  maxWidth = "xl",
  className,
}: PageContainerProps) {
  const Inner = (
    <View className="flex-1 px-4 py-6 lg:px-10 lg:py-8">
      <View className={cn("mx-auto gap-8", widths[maxWidth], className)}>{children}</View>
    </View>
  );

  if (!scroll) return Inner;

  return (
    <ScrollView
      className="flex-1"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 80 }}
    >
      {Inner}
    </ScrollView>
  );
}
