import { useRef } from "react";
import { useLocation } from "react-router-dom";
import useIsoLayoutEffect from "../../hooks/useIsoLayoutEffect";
import { scrollToTarget } from "../../lib/scroll";

/**
 * Router-aware scrolling:
 * - new page without hash → jump to top
 * - "#section" on the same page → smooth scroll to it
 * - "#section" on a different page (e.g. /#work from a project) → jump to it
 * The first render is left to the browser, which already handles deep links.
 * Runs before paint so a new page never flashes at the old scroll position.
 */
export default function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  const previousPath = useRef<string | null>(null);

  useIsoLayoutEffect(() => {
    const samePage = previousPath.current === pathname;
    const firstRender = previousPath.current === null;
    previousPath.current = pathname;

    if (firstRender) {
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
      }
      return;
    }

    if (!hash) {
      scrollToTarget(null, { immediate: !samePage });
      return;
    }

    const target = document.getElementById(decodeURIComponent(hash.slice(1)));
    scrollToTarget(target, { immediate: !samePage });
    if (target && !samePage) {
      // Let keyboard and screen-reader users land in the section too.
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    }
  }, [pathname, hash, key]);

  return null;
}
