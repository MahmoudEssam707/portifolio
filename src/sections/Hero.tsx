import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { data } from "../data";
import useLocalTime from "../hooks/useLocalTime";
import Icon from "../components/ui/Icon";
import Lines from "../components/ui/Lines";
import "./Hero.css";

const delay = (seconds: number) => ({ "--delay": `${seconds}s` }) as CSSProperties;

export default function Hero() {
  const { person, hero } = data;
  const time = useLocalTime(person.timeZone);

  return (
    <section className="hero" aria-label="Introduction">
      <div className="hero__glow" aria-hidden="true">
        <span className="glow-orb hero__orb hero__orb--a" />
        <span className="glow-orb hero__orb hero__orb--b" />
      </div>

      <div className="container hero__grid">
        <div className="hero__text">
          <p className="hero__status reveal-up">
            <span className="live-dot" aria-hidden="true" />
            {hero.status}
          </p>

          <h1 className="hero__name reveal-lines">
            <Lines lines={[person.name]} delay={0.05} />
          </h1>

          <p className="hero__tagline reveal-up" style={delay(0.12)}>
            {hero.tagline.text} <span className="gradient-text">{hero.tagline.highlight}</span>
          </p>

          <p className="hero__intro reveal-up" style={delay(0.18)}>
            {hero.intro}
          </p>

          <div className="hero__actions reveal-up" style={delay(0.24)}>
            <Link className="btn btn--primary" to="/#work">
              View my work <Icon name="arrowRight" size={16} />
            </Link>
            <a className="btn" href={person.cv} target="_blank" rel="noreferrer">
              <Icon name="download" size={16} /> Resume
            </a>
          </div>

          <p className="hero__meta reveal-up" style={delay(0.3)}>
            <span>
              {person.role} @ <strong>{person.company}</strong>
            </span>
            <span aria-hidden="true">·</span>
            <span>{person.location}</span>
            <span aria-hidden="true">·</span>
            <span>
              <time>{time ?? "--:--"}</time> local
            </span>
          </p>
        </div>

        <figure className="hero__portrait reveal-up" style={delay(0.2)}>
          <div className="hero__frame">
            <img
              src={person.photo.src}
              alt={`Portrait of ${person.name}`}
              width={person.photo.size}
              height={person.photo.size}
              decoding="async"
            />
          </div>
          {hero.focus.map((item, i) => (
            <span key={item} className={`hero__chip hero__chip--${i + 1}`} aria-hidden="true">
              <span className="hero__chip-dot" />
              {item}
            </span>
          ))}
        </figure>
      </div>

      <div className="container">
        <dl className="hero__stats">
          {hero.stats.map((stat, i) => (
            <div key={stat.label} className="hero__stat reveal-up" style={delay(0.3 + i * 0.06)}>
              <dt>{stat.label}</dt>
              <dd className="gradient-text">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
