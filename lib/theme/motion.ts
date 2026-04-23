import type { MotiTransitionProp } from "moti";

export const ease = {
  standard: [0.32, 0.72, 0, 1] as const,
  enter: [0.22, 1, 0.36, 1] as const,
  exit: [0.4, 0, 1, 1] as const,
};

export const duration = {
  micro: 140,
  short: 220,
  base: 320,
  slow: 520,
  reveal: 720,
} as const;

export const fadeUp = (delay = 0) => ({
  from: { opacity: 0, translateY: 12 },
  animate: { opacity: 1, translateY: 0 },
  transition: {
    type: "timing",
    duration: duration.base,
    delay,
    easing: ease.enter,
  } satisfies MotiTransitionProp,
});

export const fadeIn = (delay = 0) => ({
  from: { opacity: 0 },
  animate: { opacity: 1 },
  transition: {
    type: "timing",
    duration: duration.short,
    delay,
    easing: ease.enter,
  } satisfies MotiTransitionProp,
});

export const revealLine = (index: number) => ({
  from: { opacity: 0, translateY: 18, scale: 0.985 },
  animate: { opacity: 1, translateY: 0, scale: 1 },
  transition: {
    type: "timing",
    duration: duration.reveal,
    delay: 200 + index * 450,
    easing: ease.enter,
  } satisfies MotiTransitionProp,
});
