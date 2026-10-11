const query = (media: string) =>
  typeof window !== "undefined" && window.matchMedia(media).matches;

/** Call only from effects/handlers — always false during SSR. */
export const prefersReducedMotion = () => query("(prefers-reduced-motion: reduce)");

/** Mouse/trackpad devices: where the custom cursor and smooth scroll make sense. */
export const hasFinePointer = () => query("(hover: hover) and (pointer: fine)");
