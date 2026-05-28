import { Link } from "react-router-dom";
import portfolioData from "../data/portfolio.json";
import SectionHeader from "../components/SectionHeader";
import TimelineItem from "../components/TimelineItem";
import PublicationCard from "../components/PublicationCard";
import useReveal from "../components/hooks/useReveal";
import useTypedRoles from "../components/hooks/useTypedRoles";

export default function Home() {
  useReveal();

  const { hero, about, research} = portfolioData.Data;
  const typedRole = useTypedRoles(hero.roles);

  return (
    <>
      <section className="section hero" id="hero">
        <div className="container hero-content">
          <div className="reveal">
            <div className="hero-eyebrow">{hero.eyebrow}</div>
            <h1>{portfolioData.personal.name}</h1>
            <div className="role-line">
              <strong>Currently:</strong>
              <span aria-live="polite">{typedRole}</span>
              <span className="cursor" aria-hidden="true"></span>
            </div>
            <p className="hero-bio">{hero.bio}</p>
            <div className="stats">
              {hero.stats.map((stat) => (
                <div key={stat.label} className="stat">
                  <div className="stat-num">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
            <div className="cta-row">
              <Link className="btn primary" to="/projects">
                View Work
              </Link>
              <a
                className="btn ghost"
                href={portfolioData.personal["cv-link"]}
                target="_blank"
                rel="noreferrer"
              >
                Download CV
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section alt" id="about">
        <div className="container">
          <SectionHeader
            eyebrow="02 - About"
            title="Who I Am"
            subtitle={about.summary}
          />
          <div className="about-grid">
            <div className="reveal">
              <h3 className="about-title">{about.heading}</h3>
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph} className="about-text">
                  {paragraph}
                </p>
              ))}
              {about.details.map((detail) => (
                <div key={detail.label} className="detail-row">
                  <div className="icon-box">{detail.abbr}</div>
                  <div>
                    <span>{detail.label}</span>
                    <strong>{detail.value}</strong>
                  </div>
                </div>
              ))}
            </div>
            <div className="reveal highlight-grid">
              {portfolioData.about.highlights.map((highlight) => (
                <div key={highlight.title} className="card highlight-card">
                  <div className="highlight-title">{highlight.title}</div>
                  <p className="highlight-text">{highlight.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="experience">
        <div className="container">
          <SectionHeader
            eyebrow="03 - Experience"
            title="Engineering Timeline"
            subtitle="Applied ML roles across research, product, and production systems."
          />
          <div className="timeline">
            <div className="timeline-rail"></div>
            {portfolioData.experience.map((exp) => (
              <TimelineItem
                key={`${exp.company}-${exp.position}`}
                icon={exp.icon || "EX"}
                position={exp.position}
                company={exp.company}
                duration={exp.duration}
                description={exp.description}
                tags={exp.tags}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section alt" id="research">
        <div className="container">
          <SectionHeader
            eyebrow="04 - Research"
            title={research.heading}
            subtitle={research.subtitle}
          />
          <div className="pub-list">
            {research.items.map((item) => {
              const accent =
                item.accent === "blue" ||
                item.accent === "orange" ||
                item.accent === "teal"
                  ? item.accent
                  : undefined;

              return (
                <PublicationCard
                  key={`${item.year}-${item.title}`}
                  year={item.year}
                  title={item.title}
                  venue={item.venue}
                  abstract={item.abstract}
                  highlight={item.highlight}
                  accent={accent}
                />
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
