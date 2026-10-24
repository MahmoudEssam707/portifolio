import type { ReactNode } from "react";
import "./Section.css";

type SectionProps = {
  id?: string;
  /** Small kicker above the title, e.g. "Selected work" */
  eyebrow?: string;
  /** Visible heading; also labels the section. */
  title?: ReactNode;
  /** Use h1 for the page's main section (project pages). */
  as?: "h1" | "h2";
  lead?: ReactNode;
  className?: string;
  children?: ReactNode;
};

/** A page section: eyebrow, heading and lead, then the content. */
export default function Section({ id, eyebrow, title, as: Heading = "h2", lead, className, children }: SectionProps) {
  const headingId = id ? `${id}-title` : undefined;

  return (
    <section
      id={id}
      className={["section", className].filter(Boolean).join(" ")}
      aria-labelledby={title ? headingId : undefined}
    >
      <div className="container">
        {eyebrow || title || lead ? (
          <header className="section__head reveal-up">
            {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
            {title ? (
              <Heading id={headingId} className="section__title">
                {title}
              </Heading>
            ) : null}
            {lead ? <div className="section__lead">{lead}</div> : null}
          </header>
        ) : null}
        {children}
      </div>
    </section>
  );
}
