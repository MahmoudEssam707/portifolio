import { data } from "../data";
import Cell from "../components/ui/Cell";
import "./About.css";

export default function About() {
  const { about } = data;

  return (
    <Cell n={2} id="about" code="about.describe()" title="About">
      <div className="about">
        <div className="about__text">
          {about.paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <table className="df">
          <caption className="sr-only">Quick facts</caption>
          <thead>
            <tr>
              <th scope="col">
                <span className="sr-only">field</span>
              </th>
              <th scope="col">value</th>
            </tr>
          </thead>
          <tbody>
            {about.facts.map((fact) => (
              <tr key={fact.key}>
                <th scope="row">{fact.key}</th>
                <td>{fact.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Cell>
  );
}
