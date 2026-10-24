import { useEffect } from "react";
import { hasFinePointer, prefersReducedMotion } from "../lib/motion";

/**
 * Feeds the pointer position into the hovered `.card` as `--mx` / `--my`, which
 * its spotlight and border glow follow (utilities.css). One delegated listener
 * for the whole page; mouse/trackpad only.
 */
export default function useSpotlight() {
  useEffect(() => {
    if (!hasFinePointer() || prefersReducedMotion()) {
      return;
    }

    let frame = 0;
    const onMove = (event: PointerEvent) => {
      const card = (event.target as Element | null)?.closest?.<HTMLElement>(".card");
      if (!card) {
        return;
      }
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        card.style.setProperty("--my", `${event.clientY - rect.top}px`);
      });
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onMove);
    };
  }, []);
}
