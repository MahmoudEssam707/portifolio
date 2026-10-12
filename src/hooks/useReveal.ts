import { useRef } from "react";
import { prefersReducedMotion } from "../lib/motion";
import useIsoLayoutEffect from "./useIsoLayoutEffect";

const REVEAL = ".reveal-up:not(.is-visible), .reveal-lines:not(.is-visible)";
const CELL = ".cell";
const RUN_MS = 160;

const inViewport = (el: Element) => {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
};

/**
 * Scroll-driven page motion. Re-runs whenever `key` changes (pass the path).
 * - `.reveal-up` / `.reveal-lines` get `.is-visible` when they enter view.
 * - `.cell`s "execute": `.is-running` briefly, then `.is-run` (shows output).
 * - The cell crossing the middle of the viewport gets `.is-active`.
 * After a route change, whatever is already on screen is shown before the
 * first paint, so navigating never flashes an empty page.
 */
export default function useReveal(key: string) {
  const previousKey = useRef<string | null>(null);

  useIsoLayoutEffect(() => {
    const routeChanged = previousKey.current !== null && previousKey.current !== key;
    previousKey.current = key;

    const reveals = Array.from(document.querySelectorAll<HTMLElement>(REVEAL));
    const cells = Array.from(document.querySelectorAll<HTMLElement>(CELL));

    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      reveals.forEach((el) => el.classList.add("is-visible"));
      cells.forEach((el) => el.classList.add("is-run"));
      return;
    }

    if (routeChanged) {
      // Measuring already committed the hidden styles, so suppress transitions
      // while the on-screen elements switch to their final state.
      const html = document.documentElement;
      html.classList.add("reveal-instant");
      reveals.filter(inViewport).forEach((el) => el.classList.add("is-visible"));
      cells.filter(inViewport).forEach((el) => el.classList.add("is-run"));
      void html.offsetHeight;
      html.classList.remove("reveal-instant");
    }

    const timers: number[] = [];

    const revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -4% 0px", threshold: 0.01 }
    );

    const runObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }
          const cell = entry.target;
          runObserver.unobserve(cell);
          cell.classList.add("is-running");
          timers.push(
            window.setTimeout(() => {
              cell.classList.remove("is-running");
              cell.classList.add("is-run");
            }, RUN_MS)
          );
        }
      },
      { rootMargin: "0px 0px -5% 0px", threshold: 0 }
    );

    const activeObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.classList.toggle("is-active", entry.isIntersecting);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    reveals.forEach((el) => {
      if (!el.classList.contains("is-visible")) {
        revealObserver.observe(el);
      }
    });
    cells.forEach((cell) => {
      if (!cell.classList.contains("is-run")) {
        runObserver.observe(cell);
      }
      activeObserver.observe(cell);
    });

    return () => {
      timers.forEach((id) => window.clearTimeout(id));
      revealObserver.disconnect();
      runObserver.disconnect();
      activeObserver.disconnect();
    };
  }, [key]);
}
