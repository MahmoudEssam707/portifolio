import { data } from "../data";
import Cell from "../components/ui/Cell";
import Icon from "../components/ui/Icon";
import "./Papers.css";

export default function Papers() {
  return (
    <Cell n={6} id="papers" code={'papers.cite(style="plain")'} title="Papers">
      <ol className="refs">
        {data.papers.map((paper, i) => (
          <li key={paper.title} className="ref reveal-up">
            <span className="ref__n" aria-hidden="true">
              [{i + 1}]
            </span>
            <div className="ref__body">
              <h3 className="ref__title">
                {paper.url ? (
                  <a className="ref__link" href={paper.url} target="_blank" rel="noreferrer">
                    {paper.title}
                    <Icon name="arrowUpRight" size={18} className="ref__arrow" />
                  </a>
                ) : (
                  paper.title
                )}
              </h3>
              <p className="ref__venue mono-label">
                {paper.venue}, {paper.year}
              </p>
              <p className="ref__abstract">{paper.abstract}</p>
              <p className="ref__highlight mono-label">→ {paper.highlight}</p>
            </div>
          </li>
        ))}
      </ol>
    </Cell>
  );
}
