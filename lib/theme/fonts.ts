import { useFonts } from "expo-font";

export function useAppFonts(): [boolean, Error | null] {
  return useFonts({});
}

export const fontRecipe = {
  display: "SpaceGrotesk_600SemiBold",
  displayBold: "SpaceGrotesk_700Bold",
  body: "Inter_400Regular",
  bodyMedium: "Inter_500Medium",
  bodySemibold: "Inter_600SemiBold",
} as const;
