import type { ExpoConfig } from "expo/config";

const APP_NAME = "NeuroFunnel AI";
const BUNDLE_ID = "ai.neurofunnel.app";
const SCHEME = "neurofunnel";

const config: ExpoConfig = {
  name: APP_NAME,
  slug: "neurofunnel-ai",
  version: "0.1.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: SCHEME,
  userInterfaceStyle: "dark",
  backgroundColor: "#0A0F1C",
  newArchEnabled: true,
  splash: {
    image: "./assets/images/splash.png",
    resizeMode: "contain",
    backgroundColor: "#0A0F1C",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    bundleIdentifier: BUNDLE_ID,
    supportsTablet: true,
    buildNumber: "1",
    usesAppleSignIn: true,
    config: {
      usesNonExemptEncryption: false,
    },
    infoPlist: {
      UIBackgroundModes: ["remote-notification"],
      NSCameraUsageDescription:
        "NeuroFunnel uses the camera so you can attach media assets to your funnels.",
      NSPhotoLibraryUsageDescription:
        "NeuroFunnel reads your photo library so you can add imagery to your funnel blocks.",
      NSFaceIDUsageDescription:
        "NeuroFunnel uses Face ID to unlock your workspace quickly and privately.",
      NSUserTrackingUsageDescription:
        "We only request tracking access if you opt in to personalized performance insights.",
      ITSAppUsesNonExemptEncryption: false,
    },
    privacyManifests: {
      NSPrivacyCollectedDataTypes: [
        {
          NSPrivacyCollectedDataType: "NSPrivacyCollectedDataTypeEmailAddress",
          NSPrivacyCollectedDataTypeLinked: true,
          NSPrivacyCollectedDataTypeTracking: false,
          NSPrivacyCollectedDataTypePurposes: [
            "NSPrivacyCollectedDataTypePurposeAppFunctionality",
          ],
        },
        {
          NSPrivacyCollectedDataType: "NSPrivacyCollectedDataTypeProductInteraction",
          NSPrivacyCollectedDataTypeLinked: true,
          NSPrivacyCollectedDataTypeTracking: false,
          NSPrivacyCollectedDataTypePurposes: [
            "NSPrivacyCollectedDataTypePurposeAnalytics",
            "NSPrivacyCollectedDataTypePurposeProductPersonalization",
          ],
        },
      ],
      NSPrivacyAccessedAPITypes: [
        {
          NSPrivacyAccessedAPIType: "NSPrivacyAccessedAPICategoryUserDefaults",
          NSPrivacyAccessedAPITypeReasons: ["CA92.1"],
        },
      ],
    },
  },
  android: {
    package: BUNDLE_ID,
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#0A0F1C",
    },
    edgeToEdgeEnabled: true,
  },
  web: {
    bundler: "metro",
    favicon: "./assets/images/favicon.png",
    output: "static",
  },
  plugins: [
    "expo-router",
    "expo-font",
    [
      "expo-splash-screen",
      {
        backgroundColor: "#0A0F1C",
        image: "./assets/images/splash.png",
        imageWidth: 200,
        resizeMode: "contain",
      },
    ],
    [
      "expo-tracking-transparency",
      {
        userTrackingPermission:
          "We only request tracking access if you opt in to personalized performance insights.",
      },
    ],
    "expo-apple-authentication",
    "expo-local-authentication",
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    router: { origin: false },
    eas: {
      projectId: "00000000-0000-0000-0000-000000000000",
    },
    revenuecat: {
      iosApiKey: process.env.REVENUECAT_IOS_KEY ?? "",
    },
    supabase: {
      url: process.env.EXPO_PUBLIC_SUPABASE_URL ?? "",
      anonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? "",
    },
    stripe: {
      publishableKey: process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "",
    },
    posthog: {
      apiKey: process.env.EXPO_PUBLIC_POSTHOG_KEY ?? "",
      host: process.env.EXPO_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
    },
  },
};

export default config;
