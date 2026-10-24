import { data } from "../data";
import { formatSpan } from "../lib/dates";
import Section from "../components/ui/Section";
import Tags from "../components/ui/Tags";
import "./Experience.css";

export default function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Where I've built things"
      lead="From medical-imaging research to agentic automation in production."
    >
      <ol className="timeline">
        {data.experience.map((item, i) => {
          const current = item.end === null;
          return (
            <li
              key={`${item.company}-${item.role}`}
              id={`role-${i + 1}`}
              className={`timeline__item reveal-up${current ? " is-current" : ""}`}
            >
              <span className="timeline__node" aria-hidden="true" />
              <article className="role card">
                <header className="role__head">
                  <div>
                    <h3 className="role__title">{item.role}</h3>
                    <p className="role__company">{item.company}</p>
                  </div>
                  <p className="role__when">
                    {current ? <span className="badge">Current</span> : null}
                    <span>
                      {item.start} – {item.end ?? "Present"}
                      {item.end ? <span className="role__span"> · {formatSpan(item.start, item.end)}</span> : null}
                    </span>
                  </p>
                </header>
                <p className="role__summary">{item.summary}</p>
                {item.highlights?.length ? (
                  <ul className="role__highlights">
                    {item.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                ) : null}
                <Tags items={item.tags} label={`${item.role} stack`} />
              </article>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
