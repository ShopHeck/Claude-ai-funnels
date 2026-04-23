type Level = "debug" | "info" | "warn" | "error";

const order: Record<Level, number> = { debug: 0, info: 1, warn: 2, error: 3 };
const enabled: Level = __DEV__ ? "debug" : "info";

function should(level: Level) {
  return order[level] >= order[enabled];
}

function emit(level: Level, scope: string, message: string, meta?: unknown) {
  if (!should(level)) return;
  const tag = `[${scope}]`;
  switch (level) {
    case "debug":
    case "info":
      // eslint-disable-next-line no-console
      console.log(tag, message, meta ?? "");
      break;
    case "warn":
      // eslint-disable-next-line no-console
      console.warn(tag, message, meta ?? "");
      break;
    case "error":
      // eslint-disable-next-line no-console
      console.error(tag, message, meta ?? "");
      break;
  }
}

export function createLogger(scope: string) {
  return {
    debug: (message: string, meta?: unknown) => emit("debug", scope, message, meta),
    info: (message: string, meta?: unknown) => emit("info", scope, message, meta),
    warn: (message: string, meta?: unknown) => emit("warn", scope, message, meta),
    error: (message: string, meta?: unknown) => emit("error", scope, message, meta),
  };
}
