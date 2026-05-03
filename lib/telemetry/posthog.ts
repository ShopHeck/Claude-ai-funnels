import Constants from "expo-constants";
import { createLogger } from "@/lib/utils/logger";

const log = createLogger("telemetry");

type Extras = Record<string, string | number | boolean | null | undefined>;

const config = (Constants.expoConfig?.extra?.posthog ?? {}) as {
  apiKey?: string;
  host?: string;
};

const enabled = Boolean(config.apiKey);

export const telemetry = {
  enabled,
  capture(event: string, extras?: Extras) {
    if (!enabled) {
      log.debug(`capture ${event}`, extras);
      return;
    }
    log.info(`capture ${event}`, extras);
  },
  identify(userId: string, traits?: Extras) {
    if (!enabled) {
      log.debug(`identify ${userId}`, traits);
      return;
    }
    log.info(`identify ${userId}`, traits);
  },
  reset() {
    if (!enabled) return;
    log.info("reset");
  },
};
