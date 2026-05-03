type ClassValue = string | number | null | undefined | false | Record<string, boolean> | ClassValue[];

export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];
  const walk = (value: ClassValue): void => {
    if (!value) return;
    if (typeof value === "string") {
      out.push(value);
    } else if (typeof value === "number") {
      out.push(String(value));
    } else if (Array.isArray(value)) {
      for (const v of value) walk(v);
    } else if (typeof value === "object") {
      for (const [key, enabled] of Object.entries(value)) {
        if (enabled) out.push(key);
      }
    }
  };
  for (const input of inputs) walk(input);
  return out.join(" ");
}
