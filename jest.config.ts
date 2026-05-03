import type { Config } from "jest";

const config: Config = {
  preset: "jest-expo",
  setupFiles: ["<rootDir>/jest.setup.ts"],
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg|react-native-reanimated|moti|nativewind|victory-native|@shopify/react-native-skia|lucide-react-native))",
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  collectCoverageFrom: [
    "lib/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
  ],
  coverageThreshold: {
    "lib/data/**/*.ts": { branches: 80, functions: 90, lines: 90, statements: 90 },
    "lib/ai/**/*.ts": { branches: 80, functions: 90, lines: 90, statements: 90 },
    "lib/billing/**/*.ts": { branches: 70, functions: 80, lines: 80, statements: 80 },
  },
  testPathIgnorePatterns: ["/node_modules/", "/ios/", "/android/", "/dist/", "/.expo/"],
};

export default config;
