import { Link, useParams } from "react-router-dom";
import { adjacentProjects, getProject, hasUrl, indexLabel, projects } from "../data";
import Cell from "../components/ui/Cell";
import Icon from "../components/ui/Icon";
import Metrics from "../components/ui/Metrics";
import Tags from "../components/ui/Tags";
import NotFound from "./NotFound";
import "./ProjectPage.css";

export default function ProjectPage() {
  const { slug } = useParams();
  const project = getProject(slug);

  if (!project) {
    return <NotFound />;
  }

  const index = projects.indexOf(project);
  const { prev, next } = adjacentProjects(project.slug);
  const ref = `projects["${project.slug}"]`;

  return (
    <article className="project-page">
      <div className="container project-page__bar mono-label">
        <Link to="/#work" className="project-page__back">
          <Icon name="arrowLeft" size={16} /> all projects
        </Link>
        <span>
          {indexLabel(index)} / {indexLabel(projects.length - 1)}
        </span>
      </div>

      <Cell n={1} code={ref} title={project.name} as="h1" lead={project.subtitle} className="project-page__main">
        <p className="project-page__desc">{project.description}</p>
        <div className="project-page__links">
          <a className="btn" href={project.repo} target="_blank" rel="noreferrer">
            <Icon name="github" size={16} /> Code
          </a>
          {hasUrl(project.live) ? (
            <a className="btn btn--primary" href={project.live} target="_blank" rel="noreferrer">
              Live demo <Icon name="arrowUpRight" size={16} />
            </a>
          ) : null}
        </div>
      </Cell>

      <Cell n={2} id="results" code={`${ref}.evaluate()`} title="Results">
        <Metrics metrics={project.metrics} large />
        <h3 className="project-page__stack-title mono-label">stack</h3>
        <Tags items={project.stack} />
      </Cell>

      <nav className="project-page__pager container" aria-label="More projects">
        <Link to={`/projects/${prev.slug}`} className="pager-link">
          <span className="mono-label">
            <Icon name="arrowLeft" size={14} /> previous
          </span>
          <span className="pager-link__name">{prev.name}</span>
        </Link>
        <Link to={`/projects/${next.slug}`} className="pager-link pager-link--next">
          <span className="mono-label">
            next <Icon name="arrowRight" size={14} />
          </span>
          <span className="pager-link__name">{next.name}</span>
        </Link>
      </nav>
    </article>
  );
}
