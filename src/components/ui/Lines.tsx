import type { CSSProperties } from "react";

/**
 * Masked line-by-line reveal for big headings. Screen readers get one clean
 * sentence; the visual lines are aria-hidden. Wrap in an element with
 * `.reveal-lines` to animate.
 */
export default function Lines({ lines, delay = 0 }: { lines: string[]; delay?: number }) {
  return (
    <>
      <span className="sr-only">{lines.join(" ")}</span>
      {lines.map((line, i) => (
        <span
          key={line}
          className="line"
          aria-hidden="true"
          style={{ "--i": i, "--delay": `${delay}s` } as CSSProperties}
        >
          <span>{line}</span>
        </span>
      ))}
    </>
  );
}
