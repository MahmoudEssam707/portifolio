import type { CSSProperties } from "react";
import type { Metric } from "../../data";
import "./Metrics.css";

/**
 * An evaluation report: one row per metric, with a 0–100 bar when the metric
 * has a value. Bars fill when an ancestor gets `.is-visible` / `.is-run`.
 */
export default function Metrics({ metrics, large = false }: { metrics: Metric[]; large?: boolean }) {
  return (
    <dl className={`metrics${large ? " metrics--large" : ""}`}>
      {metrics.map((metric) => (
        <div key={metric.label} className="metric">
          <dt className="metric__label">{metric.label}</dt>
          <dd className="metric__value">{metric.display}</dd>
          {metric.value !== undefined ? (
            <dd className="metric__bar" aria-hidden="true">
              <span
                className="metric__fill"
                style={{ "--v": Math.max(0, Math.min(100, metric.value)) / 100 } as CSSProperties}
              />
            </dd>
          ) : null}
        </div>
      ))}
    </dl>
  );
}
