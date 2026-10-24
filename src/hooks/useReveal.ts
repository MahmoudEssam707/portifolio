import { useRef } from "react";
import { prefersReducedMotion } from "../lib/motion";
import useIsoLayoutEffect from "./useIsoLayoutEffect";

const REVEAL = ".reveal-up:not(.is-visible), .reveal-lines:not(.is-visible)";

const inViewport = (el: Element) => {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
};

/**
 * Scroll-driven page motion. Re-runs whenever `key` changes (pass the path).
 * `.reveal-up` / `.reveal-lines` get `.is-visible` when they enter view; fills
 * inside them (metric bars) key off the same class.
 * After a route change, whatever is already on screen is shown before the
 * first paint, so navigating never flashes an empty page.
 */
export default function useReveal(key: string) {
  const previousKey = useRef<string | null>(null);

  useIsoLayoutEffect(() => {
    const routeChanged = previousKey.current !== null && previousKey.current !== key;
    previousKey.current = key;

    const reveals = Array.from(document.querySelectorAll<HTMLElement>(REVEAL));

    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      reveals.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    if (routeChanged) {
      // Measuring already committed the hidden styles, so suppress transitions
      // while the on-screen elements switch to their final state.
      const html = document.documentElement;
      html.classList.add("reveal-instant");
      reveals.filter(inViewport).forEach((el) => el.classList.add("is-visible"));
      void html.offsetHeight;
      html.classList.remove("reveal-instant");
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.01 }
    );

    reveals.forEach((el) => {
      if (!el.classList.contains("is-visible")) {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [key]);
}
