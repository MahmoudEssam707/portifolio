import { data } from "../data";
import Section from "../components/ui/Section";
import Icon from "../components/ui/Icon";
import "./Papers.css";

export default function Papers() {
  return (
    <Section id="papers" eyebrow="Research" title="Publications">
      <ol className="papers">
        {data.papers.map((paper) => {
          const body = (
            <>
              <div className="paper__meta">
                <span className="badge">{paper.venue}</span>
                <span className="paper__year">{paper.year}</span>
                {paper.url ? (
                  <span className="paper__arrow" aria-hidden="true">
                    <Icon name="arrowUpRight" size={18} />
                  </span>
                ) : null}
              </div>
              <h3 className="paper__title">{paper.title}</h3>
              <p className="paper__abstract">{paper.abstract}</p>
              <p className="paper__highlight">
                <span className="paper__highlight-label">Result</span>
                {paper.highlight}
              </p>
            </>
          );
          return (
            <li key={paper.title} className="paper reveal-up">
              {paper.url ? (
                <a className="paper__card card" href={paper.url} target="_blank" rel="noreferrer">
                  {body}
                </a>
              ) : (
                <div className="paper__card card">{body}</div>
              )}
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
