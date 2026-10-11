import { useEffect } from "react";
import { prefersReducedMotion } from "../lib/motion";

const REVEAL = ".reveal-up:not(.is-visible), .reveal-lines:not(.is-visible)";
const CELL = ".cell";
const RUN_MS = 420;

/**
 * Scroll-driven page motion. Re-runs whenever `key` changes (pass the path).
 * - `.reveal-up` / `.reveal-lines` get `.is-visible` when they enter view.
 * - `.cell`s "execute": `.is-running` briefly, then `.is-run` (shows output).
 * - The cell crossing the middle of the viewport gets `.is-active`.
 */
export default function useReveal(key: string) {
  useEffect(() => {
    const reveals = Array.from(document.querySelectorAll<HTMLElement>(REVEAL));
    const cells = Array.from(document.querySelectorAll<HTMLElement>(CELL));

    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      reveals.forEach((el) => el.classList.add("is-visible"));
      cells.forEach((el) => el.classList.add("is-run"));
      return;
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
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
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
      { rootMargin: "0px 0px -15% 0px", threshold: 0 }
    );

    const activeObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.classList.toggle("is-active", entry.isIntersecting);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    reveals.forEach((el) => revealObserver.observe(el));
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
