import { Link, useParams } from "react-router-dom";
import { adjacentProjects, getProject, hasUrl, indexLabel, projects } from "../data";
import Section from "../components/ui/Section";
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

  return (
    <article className="project-page">
      <header className="project-hero">
        <span className="glow-orb project-hero__orb" aria-hidden="true" />
        <div className="container">
          <nav className="project-hero__crumbs" aria-label="Breadcrumb">
            <Link to="/#work" className="project-hero__back">
              <Icon name="arrowLeft" size={16} /> All projects
            </Link>
          </nav>

          <p className="eyebrow reveal-up">
            Project {indexLabel(index)} / {indexLabel(projects.length - 1)}
          </p>
          <h1 className="project-hero__title reveal-up">{project.name}</h1>
          <p className="project-hero__sub gradient-text reveal-up">{project.subtitle}</p>
          <p className="project-hero__desc reveal-up">{project.description}</p>

          <div className="project-hero__links reveal-up">
            {hasUrl(project.live) ? (
              <a className="btn btn--primary" href={project.live} target="_blank" rel="noreferrer">
                Live demo <Icon name="arrowUpRight" size={16} />
              </a>
            ) : null}
            <a className="btn" href={project.repo} target="_blank" rel="noreferrer">
              <Icon name="github" size={16} /> View code
            </a>
          </div>
        </div>
      </header>

      <Section id="results" eyebrow="Results" title="What it achieved" className="project-results">
        <div className="reveal-up">
          <Metrics metrics={project.metrics} large />
        </div>
        <div className="project-results__stack reveal-up">
          <h3 className="project-results__stack-title">Built with</h3>
          <Tags items={project.stack} />
        </div>
      </Section>

      <nav className="project-pager container" aria-label="More projects">
        <Link to={`/projects/${prev.slug}`} className="pager-link card">
          <span className="pager-link__dir">
            <Icon name="arrowLeft" size={14} /> Previous
          </span>
          <span className="pager-link__name">{prev.name}</span>
        </Link>
        <Link to={`/projects/${next.slug}`} className="pager-link pager-link--next card">
          <span className="pager-link__dir">
            Next <Icon name="arrowRight" size={14} />
          </span>
          <span className="pager-link__name">{next.name}</span>
        </Link>
      </nav>
    </article>
  );
}
