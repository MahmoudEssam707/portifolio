import type { ReactNode } from "react";
import Code from "./Code";
import "./Cell.css";

type CellProps = {
  /** Execution count shown as In [n]: */
  n: number;
  /** The one-line Python "input" */
  code: string;
  id?: string;
  /** Visible <h2> for the output; also labels the section. */
  title?: string;
  /** Use h1 for the page's main cell (project pages). */
  as?: "h1" | "h2";
  lead?: ReactNode;
  className?: string;
  children?: ReactNode;
};

/**
 * A notebook cell. useReveal "executes" it when it scrolls into view:
 * In [ ] → In [*] → In [n], then the output fades in.
 */
export default function Cell({ n, code, id, title, as: Heading = "h2", lead, className, children }: CellProps) {
  const headingId = id ? `${id}-title` : undefined;

  return (
    <section
      id={id}
      className={["cell", className].filter(Boolean).join(" ")}
      aria-labelledby={title ? headingId : undefined}
    >
      <div className="container cell__inner">
        <div className="cell__in">
          <span className="cell__prompt" aria-hidden="true">
            In&nbsp;[<span className="cell__count" data-n={n} />]:
          </span>
          <pre className="cell__code">
            <Code>{code}</Code>
          </pre>
        </div>

        <div className="cell__out">
          <span className="cell__prompt cell__prompt--out" aria-hidden="true">
            Out[{n}]:
          </span>
          <div className="cell__body">
            {title ? (
              <Heading id={headingId} className="cell__title">
                {title}
              </Heading>
            ) : null}
            {lead ? <div className="cell__lead">{lead}</div> : null}
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
