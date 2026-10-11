import { useEffect, useRef } from "react";
import { hasFinePointer, prefersReducedMotion } from "../../lib/motion";
import "./Cursor.css";

const INTERACTIVE = "a, button, [role='button'], label, summary";

/** Accent blend-mode dot that trails the pointer and grows over interactive elements. */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !hasFinePointer() || prefersReducedMotion()) {
      return;
    }

    const html = document.documentElement;
    html.classList.add("has-cursor");

    const target = { x: -100, y: -100 };
    const pos = { x: -100, y: -100 };
    let frame = 0;

    const render = () => {
      pos.x += (target.x - pos.x) * 0.22;
      pos.y += (target.y - pos.y) * 0.22;
      el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      if (Math.abs(target.x - pos.x) > 0.1 || Math.abs(target.y - pos.y) > 0.1) {
        frame = requestAnimationFrame(render);
      } else {
        frame = 0;
      }
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") {
        return;
      }
      target.x = event.clientX;
      target.y = event.clientY;
      el.classList.remove("is-hidden");
      if (!frame) {
        frame = requestAnimationFrame(render);
      }
    };
    const onOver = (event: PointerEvent) => {
      const hit = (event.target as Element | null)?.closest?.(INTERACTIVE);
      el.classList.toggle("is-hover", Boolean(hit));
    };
    const onLeave = () => el.classList.add("is-hidden");
    const onDown = () => el.classList.add("is-down");
    const onUp = () => el.classList.remove("is-down");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      html.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <div ref={ref} className="cursor is-hidden" aria-hidden="true">
      <span className="cursor__dot" />
    </div>
  );
}
