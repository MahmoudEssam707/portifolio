import type { CSSProperties } from "react";
import { data } from "../data";
import Section from "../components/ui/Section";
import Tags from "../components/ui/Tags";
import "./Skills.css";

export default function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Toolkit"
      title="The stack I build with"
      lead="From model training to agents, APIs and the infrastructure that keeps them running."
    >
      <ul className="skills">
        {data.skills.map((skill, i) => (
          <li
            key={skill.area}
            className="skill card reveal-up"
            style={{ "--delay": `${(i % 3) * 0.05}s` } as CSSProperties}
          >
            <h3 className="skill__area">
              {skill.area}
              <span className="skill__count">{skill.tools.length}</span>
            </h3>
            {skill.note ? <p className="skill__note">{skill.note}</p> : null}
            <Tags items={skill.tools} label={`${skill.area} tools`} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
