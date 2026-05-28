import portfolioData from "../data/portfolio.json";
import SectionHeader from "../components/SectionHeader";
import ProjectCard from "../components/ProjectCard";
import useReveal from "../components/hooks/useReveal";

export default function Projects() {
  useReveal();

  return (
    <section className="section page" id="projects">
      <div className="container">
        <SectionHeader
          eyebrow="02 - Projects"
          title="Selected Work"
          subtitle="Systems that balance research depth with production outcomes."
        />

        <div className="project-grid">
          {portfolioData.projects.map((project) => {
            const accent =
              project.accent === "blue" ||
              project.accent === "orange" ||
              project.accent === "teal"
                ? project.accent
                : undefined;

            return (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                metric={project.metric}
                technologies={project.technologies}
                githubLink={project.githubLink}
                liveLink={project.liveLink}
                accent={accent}
              />
            );
          })}
        </div>

        <div className="projects-cta">
          <a
            className="btn ghost"
            href="https://github.com/MahmoudEssam707"
            target="_blank"
            rel="noreferrer"
          >
            View all on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
