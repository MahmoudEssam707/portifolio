import type { CSSProperties } from "react";
import TagRow from "./TagRow";

type ProjectCardProps = {
  title: string;
  description: string;
  metric?: string;
  technologies: string[];
  githubLink: string;
  liveLink?: string;
  accent?: "blue" | "orange" | "teal";
};

const accentMap: Record<string, string> = {
  blue: "var(--blue)",
  orange: "var(--orange)",
  teal: "var(--teal)",
};

export default function ProjectCard({
  title,
  description,
  metric,
  technologies,
  githubLink,
  liveLink,
  accent = "blue",
}: ProjectCardProps) {
  const style = {
    "--accent": accentMap[accent] || "var(--blue)",
  } as CSSProperties;

  return (
    <article className="card project-card reveal" style={style}>
      <div className="project-header">
        <div className="project-links">
          <a
            href={githubLink}
            target="_blank"
            rel="noreferrer"
            aria-label={`View ${title} on GitHub`}
          >
            GitHub
          </a>
        </div>
        {liveLink && liveLink !== "#" ? (
          <div className="project-links">
            <a
              href={liveLink}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${title} live site`}
            >
              Live
            </a>
          </div>
        ) : null}
      </div>
      <h3 className="project-title">{title}</h3>
      {metric ? <div className="project-metric">{metric}</div> : null}
      <p className="project-desc">{description}</p>
      <TagRow tags={technologies} />
    </article>
  );
}
