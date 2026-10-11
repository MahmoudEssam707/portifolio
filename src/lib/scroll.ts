import type Lenis from "lenis";

/** The active Lenis instance, or null when native scrolling is in use. */
let lenis: Lenis | null = null;

export const setLenis = (instance: Lenis | null) => {
  lenis = instance;
};

export const getLenis = () => lenis;

/** Scroll to an element (honouring the fixed nav) or to the top. */
export function scrollToTarget(target: HTMLElement | null, { immediate = false } = {}) {
  if (lenis) {
    lenis.scrollTo(target ?? 0, {
      offset: target ? -navOffset() : 0,
      immediate,
      duration: 1.2,
    });
    return;
  }
  const top = target ? target.getBoundingClientRect().top + window.scrollY - navOffset() : 0;
  window.scrollTo({ top, behavior: immediate ? "instant" : "smooth" });
}

function navOffset() {
  const value = getComputedStyle(document.documentElement).getPropertyValue("--nav-h");
  return (parseFloat(value) || 64) + 16;
}
