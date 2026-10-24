import type { CSSProperties } from "react";
import { data } from "../data";
import Section from "../components/ui/Section";
import "./About.css";

export default function About() {
  const { about } = data;

  return (
    <Section id="about" eyebrow="About" title="From research notebooks to production systems.">
      <div className="about">
        <div className="about__text reveal-up">
          {about.paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <dl className="facts">
          {about.facts.map((fact, i) => (
            <div
              key={fact.key}
              className={`fact card reveal-up${fact.value.length > 24 ? " fact--wide" : ""}`}
              style={{ "--delay": `${i * 0.05}s` } as CSSProperties}
            >
              <dt>{fact.key}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
