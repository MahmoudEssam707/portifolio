import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { indexLabel, projects } from "../data";
import Cell from "../components/ui/Cell";
import Icon from "../components/ui/Icon";
import Metrics from "../components/ui/Metrics";
import "./Work.css";

export default function Work() {
  return (
    <Cell
      n={4}
      id="work"
      code="projects.evaluate()"
      title="Projects"
      lead="Results as reported in each project. Open one for the details and code."
    >
      <ul className="evals">
        {projects.map((project, i) => (
          <li
            key={project.slug}
            className="eval reveal-up"
            style={{ "--delay": `${(i % 2) * 0.06}s` } as CSSProperties}
          >
            <Link to={`/projects/${project.slug}`} className="eval__link">
              <div className="eval__top">
                <span className="mono-label">#{indexLabel(i)}</span>
                <Icon name="arrowUpRight" size={18} className="eval__arrow" />
              </div>
              <h3 className="eval__name">{project.name}</h3>
              <p className="eval__sub">{project.subtitle}</p>
              <Metrics metrics={project.metrics} />
              <p className="eval__stack mono-label">{project.stack.join(" · ")}</p>
            </Link>
          </li>
        ))}
      </ul>

      <a className="btn work-more" href="https://github.com/MahmoudEssam707" target="_blank" rel="noreferrer">
        <Icon name="github" size={16} /> More on GitHub
      </a>
    </Cell>
  );
}
