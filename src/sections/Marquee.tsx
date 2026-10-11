import type { CSSProperties } from "react";
import { allTools } from "../data";
import "./Marquee.css";

/** Scroll speed in characters per second. Lower = slower. */
const CHARS_PER_SECOND = 4;

// Duration scales with the strip's length, so adding tools never speeds it up.
// Each item renders as `"Tool", ` → its length plus 4 characters.
const loopChars = allTools.reduce((sum, tool) => sum + tool.length + 4, 0);
const duration = `${Math.round(loopChars / CHARS_PER_SECOND)}s`;

/** The stack as a scrolling Python list literal. */
export default function Marquee() {
  return (
    <section className="marquee" aria-label="Tools I use">
      <ul className="sr-only">
        {allTools.map((tool) => (
          <li key={tool}>{tool}</li>
        ))}
      </ul>
      <div className="marquee__row" aria-hidden="true">
        <span className="marquee__lhs">
          stack <span className="syn-op">=</span> <span className="syn-op">[</span>
        </span>
        <div className="marquee__viewport">
          {/* Two identical groups → translate -50% loops seamlessly */}
          <div className="marquee__track" style={{ "--duration": duration } as CSSProperties}>
            {[0, 1].map((copy) => (
              <div key={copy} className="marquee__group">
                {allTools.map((tool) => (
                  <span key={tool} className="marquee__item">
                    <span className="syn-str">"{tool}"</span>
                    <span className="syn-op">,</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
