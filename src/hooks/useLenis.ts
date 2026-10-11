import { useEffect } from "react";
import Lenis from "lenis";
import { hasFinePointer, prefersReducedMotion } from "../lib/motion";
import { setLenis } from "../lib/scroll";

/** Smooth wheel scrolling on mouse/trackpad devices only; touch keeps native scroll. */
export default function useLenis() {
  useEffect(() => {
    if (!hasFinePointer() || prefersReducedMotion()) {
      return;
    }

    const lenis = new Lenis({ autoRaf: true, lerp: 0.1, wheelMultiplier: 1 });
    setLenis(lenis);

    return () => {
      setLenis(null);
      lenis.destroy();
    };
  }, []);
}
