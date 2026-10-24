import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { indexLabel, projects } from "../data";
import Section from "../components/ui/Section";
import Icon from "../components/ui/Icon";
import Metrics from "../components/ui/Metrics";
import "./Work.css";

export default function Work() {
  return (
    <Section
      id="work"
      eyebrow="Selected work"
      title="Projects with measurable results"
      lead="Every number is as reported in the project. Open one for the details and code."
    >
      <ul className="projects">
        {projects.map((project, i) => {
          const [lead, ...rest] = project.metrics;
          return (
            <li
              key={project.slug}
              className={`project reveal-up${i === 0 ? " project--feature" : ""}`}
              style={{ "--delay": `${(i % 3) * 0.06}s` } as CSSProperties}
            >
              <Link to={`/projects/${project.slug}`} className="project__link card">
                <div className="project__top">
                  <span className="project__index">{indexLabel(i)}</span>
                  <span className="project__arrow" aria-hidden="true">
                    <Icon name="arrowUpRight" size={18} />
                  </span>
                </div>

                <div className="project__body">
                  <h3 className="project__name">{project.name}</h3>
                  <p className="project__sub">{project.subtitle}</p>
                  {i === 0 ? <p className="project__desc">{project.description}</p> : null}
                </div>

                {lead ? (
                  <p className="project__lead">
                    <span className="project__lead-value gradient-text">{lead.display}</span>
                    <span className="project__lead-label">{lead.label}</span>
                  </p>
                ) : null}

                {rest.length ? <Metrics metrics={rest} /> : null}

                <ul className="project__stack" aria-label={`${project.name} stack`}>
                  {project.stack.slice(0, 4).map((tool) => (
                    <li key={tool} className="chip">
                      {tool}
                    </li>
                  ))}
                </ul>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="work-more">
        <a className="btn" href="https://github.com/MahmoudEssam707" target="_blank" rel="noreferrer">
          <Icon name="github" size={16} /> More on GitHub <Icon name="arrowUpRight" size={16} />
        </a>
      </div>
    </Section>
  );
}
