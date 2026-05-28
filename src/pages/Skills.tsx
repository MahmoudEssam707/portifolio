import { useRef } from "react";
import portfolioData from "../data/portfolio.json";
import SectionHeader from "../components/SectionHeader";
import SkillGroup from "../components/SkillGroup";
import TechChip from "../components/TechChip";
import useReveal from "../components/hooks/useReveal";
import useSkillBars from "../components/hooks/useSkillBars";

export default function Skills() {
  useReveal();

  const skillRef = useRef<HTMLDivElement>(null);
  useSkillBars(skillRef);

  return (
    <section className="section page alt" id="skills">
      <div className="container">
        <SectionHeader
          eyebrow="01 - Skills"
          title="Skills and Stack"
          subtitle="Depth across ML, MLOps, and agentic systems with production-ready tooling."
        />
        <div className="about-grid">
          <div className="reveal" ref={skillRef}>
            {portfolioData.Data.skillsProgress.map((group) => (
              <SkillGroup key={group.group} group={group.group} items={group.items} />
            ))}
          </div>
          <div className="reveal">
            <div className="skill-group-label">Tech Stack</div>
            <div className="stack-grid">
              {portfolioData.Data.techStack.map((chip) => (
                <TechChip key={chip.label} tag={chip.tag} label={chip.label} />
              ))}
            </div>
          </div>
        </div>

        <div className="reveal skills-competencies">
          <div className="skill-group-label">
            Core Competencies
          </div>
          <div className="competency-grid">
            {portfolioData.additionalSkills.map((skill) => (
              <div key={skill.title} className="competency-card">
                {skill.title}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
