import type { CSSProperties } from "react";
import { data } from "../data";
import { formatSpan, parseMonth } from "../lib/dates";
import Cell from "../components/ui/Cell";
import Tags from "../components/ui/Tags";
import "./Experience.css";

/** Months of runway drawn after the latest date, so "present" has room to fade out. */
const RUNWAY = 6;

function useTimeline() {
  const rows = data.experience.map((item) => ({
    item,
    start: parseMonth(item.start) ?? 0,
    end: item.end ? parseMonth(item.end) : null,
  }));
  const min = Math.min(...rows.map((row) => row.start));
  const latest = Math.max(...rows.map((row) => row.end ?? row.start));
  const max = latest + RUNWAY;
  const span = max - min + 1;
  const pct = (month: number) => ((month - min) / span) * 100;

  const years: { label: string; left: number }[] = [];
  for (let year = Math.ceil(min / 12); year * 12 <= max; year++) {
    years.push({ label: String(year), left: pct(year * 12) });
  }

  return {
    years,
    bars: rows.map(({ item, start, end }) => ({
      item,
      left: pct(start),
      // Inclusive months; current roles run to the end of the axis.
      width: pct((end ?? max) + 1) - pct(start),
      current: end === null,
    })),
  };
}

export default function Experience() {
  const { years, bars } = useTimeline();

  return (
    <Cell
      n={3}
      id="experience"
      code={'experience.plot(kind="timeline")'}
      title="Experience"
      lead="From medical-imaging research to agentic automation in production."
    >
      <figure className="timeline" aria-label="Timeline of roles">
        <div className="timeline__axis" aria-hidden="true">
          {years.map((year) => (
            <span key={year.label} className="timeline__year" style={{ left: `${year.left}%` }}>
              {year.label}
            </span>
          ))}
        </div>
        <ol className="timeline__rows">
          {bars.map(({ item, left, width, current }, i) => (
            <li key={`${item.company}-${item.role}`} className="timeline__row">
              <a className="timeline__label" href={`#role-${i + 1}`}>
                {item.role}
                <span className="timeline__company">{item.company}</span>
              </a>
              <div className="timeline__track">
                <span
                  className={`timeline__bar${current ? " is-current" : ""}`}
                  style={{ "--left": `${left}%`, "--width": `${width}%`, "--i": i } as CSSProperties}
                />
              </div>
            </li>
          ))}
        </ol>
      </figure>

      <ol className="roles">
        {data.experience.map((item, i) => (
          <li key={`${item.company}-${item.role}`} id={`role-${i + 1}`} className="role reveal-up">
            <p className="role__when mono-label">
              {item.start} → {item.end ?? "present"}
              <span className="role__span">{item.end ? formatSpan(item.start, item.end) : "current"}</span>
            </p>
            <div className="role__main">
              <h3 className="role__title">
                {item.role} <span className="role__at">at {item.company}</span>
              </h3>
              <p className="role__summary">{item.summary}</p>
              {item.highlights?.length ? (
                <ul className="role__highlights">
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              ) : null}
              <Tags items={item.tags} label={`${item.role} stack`} />
            </div>
          </li>
        ))}
      </ol>
    </Cell>
  );
}
