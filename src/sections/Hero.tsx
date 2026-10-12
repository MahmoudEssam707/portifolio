import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { data } from "../data";
import useLocalTime from "../hooks/useLocalTime";
import Code from "../components/ui/Code";
import Icon from "../components/ui/Icon";
import Lines from "../components/ui/Lines";
import "../components/ui/Cell.css";
import "./Hero.css";

const delay = (seconds: number) => ({ "--delay": `${seconds}s` }) as CSSProperties;

export default function Hero() {
  const { person, hero } = data;
  const time = useLocalTime(person.timeZone);

  return (
    <section className="hero" aria-label="Introduction">
      <div className="container hero__grid">
        <div className="hero__text">
          <div className="hero__in">
            <span className="cell__prompt" aria-hidden="true">
              In [1]:
            </span>
            <pre className="cell__code">
              <Code>who_is_mahmoud_essam()</Code>
            </pre>
          </div>

          <h1 className="hero__name reveal-lines">
            <Lines lines={person.name.split(" ")} />
          </h1>

          <p className="hero__meta mono-label reveal-up" style={delay(0.1)}>
            <span className="accent">{person.role}</span>
            <span>{person.location}</span>
            <span>
              <time>{time ?? "--:--"}</time> local
            </span>
          </p>

          <p className="hero__intro reveal-up" style={delay(0.15)}>
            {hero.intro}
          </p>

          <div className="hero__actions reveal-up" style={delay(0.2)}>
            <Link className="btn btn--primary" to="/#work">
              See projects <Icon name="arrowRight" size={16} />
            </Link>
            <a className="btn" href={person.cv} target="_blank" rel="noreferrer">
              Resume <Icon name="arrowUpRight" size={16} />
            </a>
          </div>
        </div>

        <figure className="hero__photo reveal-up" style={delay(0.25)}>
          <img
            src={person.photo.src}
            alt={`Portrait of ${person.name}`}
            width={person.photo.size}
            height={person.photo.size}
            decoding="async"
          />
          <figcaption className="mono-label">
            <span className="accent">Out[1]:</span> &lt;Image {person.photo.size}×{person.photo.size}&gt;
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
