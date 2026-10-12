import { useEffect, useRef } from "react";
import "./Loader.css";

const COUNT_MS = 550;
const MIN_MS = 450;
const MAX_MS = 900;
const FADE_MS = 300; // keep in sync with Loader.css
const CELLS = 24;

/**
 * First-visit "Starting kernel" progress bar. It overlays the already-rendered
 * page, so it never delays content. Visibility is decided pre-paint by
 * index.html via html[data-loader]; without that attribute this does nothing.
 */
export default function Loader() {
  const barRef = useRef<HTMLSpanElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    if (!html.hasAttribute("data-loader")) {
      return;
    }

    let frame = 0;
    let finished = false;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / COUNT_MS);
      const progress = 1 - Math.pow(1 - t, 3);
      const filled = Math.round(progress * CELLS);
      if (barRef.current) {
        barRef.current.textContent = "█".repeat(filled) + "░".repeat(CELLS - filled);
      }
      if (pctRef.current) {
        pctRef.current.textContent = `${String(Math.round(progress * 100)).padStart(3, " ")}%`;
      }
      if (t < 1) {
        frame = requestAnimationFrame(tick);
      }
    };
    frame = requestAnimationFrame(tick);

    const finish = () => {
      if (finished) {
        return;
      }
      finished = true;
      cancelAnimationFrame(frame);
      rootRef.current?.classList.add("is-done");
      try {
        sessionStorage.setItem("intro-seen", "1");
      } catch {
        // Ignore: the intro will simply replay next visit.
      }
      // "done" releases the hero reveal while the overlay fades; then unmount it.
      html.setAttribute("data-loader", "done");
      window.setTimeout(() => html.removeAttribute("data-loader"), FADE_MS);
    };

    const fontsReady = document.fonts?.ready ?? Promise.resolve();
    const minDelay = new Promise((resolve) => window.setTimeout(resolve, MIN_MS));
    Promise.all([fontsReady, minDelay]).then(() =>
      window.setTimeout(finish, Math.max(0, COUNT_MS - (performance.now() - start)))
    );
    const cap = window.setTimeout(finish, MAX_MS);

    const skip = (event: Event) => {
      if (event instanceof KeyboardEvent && event.key !== "Escape") {
        return;
      }
      finish();
    };
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(cap);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, []);

  return (
    <div ref={rootRef} className="loader" aria-hidden="true">
      <div className="loader__box">
        <p className="loader__line">
          <span className="loader__prompt">$</span> jupyter kernel --name python3
        </p>
        <p className="loader__line loader__dim">Starting kernel…</p>
        <p className="loader__line">
          <span ref={barRef} className="loader__bar">
            {"░".repeat(CELLS)}
          </span>
          <span ref={pctRef} className="loader__pct">
            {"  0%"}
          </span>
        </p>
      </div>
    </div>
  );
}
