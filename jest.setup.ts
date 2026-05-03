process.env.EXPO_OS = "ios";

jest.mock("expo-haptics", () => ({
  impactAsync: jest.fn(),
  notificationAsync: jest.fn(),
  selectionAsync: jest.fn(),
  ImpactFeedbackStyle: { Light: "light", Medium: "medium", Heavy: "heavy" },
  NotificationFeedbackType: { Success: "success", Warning: "warning", Error: "error" },
}));

jest.mock("expo-apple-authentication", () => ({
  isAvailableAsync: jest.fn(async () => true),
  signInAsync: jest.fn(async () => ({
    user: "mock-apple-user",
    email: "mock@privaterelay.appleid.com",
    fullName: { givenName: "Mock", familyName: "User" },
    identityToken: "mock-identity-token",
  })),
  AppleAuthenticationScope: { FULL_NAME: 0, EMAIL: 1 },
}));

jest.mock("expo-local-authentication", () => ({
  hasHardwareAsync: jest.fn(async () => true),
  isEnrolledAsync: jest.fn(async () => true),
  authenticateAsync: jest.fn(async () => ({ success: true })),
}));

jest.mock("expo-tracking-transparency", () => ({
  requestTrackingPermissionsAsync: jest.fn(async () => ({ status: "denied" })),
  getTrackingPermissionsAsync: jest.fn(async () => ({ status: "denied" })),
}));

jest.mock("expo-font", () => ({
  useFonts: () => [true, null],
  loadAsync: jest.fn(async () => {}),
}));

jest.mock("expo-splash-screen", () => ({
  preventAutoHideAsync: jest.fn(async () => {}),
  hideAsync: jest.fn(async () => {}),
}));

type Children = { children?: unknown };

jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  useLocalSearchParams: () => ({}),
  useSegments: () => [],
  usePathname: () => "/",
  Link: ({ children }: Children) => children ?? null,
  Stack: { Screen: () => null },
  Slot: ({ children }: Children) => children ?? null,
  Redirect: () => null,
}));
