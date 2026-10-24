import type { CSSProperties } from "react";
import { allTools } from "../data";
import "./Marquee.css";

/** Scroll speed in characters per second. Lower = slower. */
const CHARS_PER_SECOND = 5;

// Duration scales with the strip's length, so adding tools never speeds it up.
// Each chip is roughly its label plus 6 characters of padding and gap.
const loopChars = allTools.reduce((sum, tool) => sum + tool.length + 6, 0);
const duration = `${Math.round(loopChars / CHARS_PER_SECOND)}s`;

/** The tech stack as an endless ribbon of chips. */
export default function Marquee() {
  return (
    <section className="marquee" aria-label="Tools I use">
      <ul className="sr-only">
        {allTools.map((tool) => (
          <li key={tool}>{tool}</li>
        ))}
      </ul>
      <div className="marquee__viewport" aria-hidden="true">
        {/* Two identical groups → translate -50% loops seamlessly */}
        <div className="marquee__track" style={{ "--duration": duration } as CSSProperties}>
          {[0, 1].map((copy) => (
            <div key={copy} className="marquee__group">
              {allTools.map((tool) => (
                <span key={tool} className="marquee__item">
                  {tool}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
