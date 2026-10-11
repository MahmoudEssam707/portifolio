import { data } from "../data";
import Cell from "../components/ui/Cell";
import Tags from "../components/ui/Tags";
import "./About.css";
import "./Skills.css";

export default function Skills() {
  return (
    <Cell n={5} id="skills" code={'skills.groupby("area").tools.apply(list)'} title="Skills">
      <table className="df skills">
        <caption className="sr-only">Skills grouped by area</caption>
        <thead>
          <tr>
            <th scope="col">area</th>
            <th scope="col">tools</th>
          </tr>
        </thead>
        <tbody>
          {data.skills.map((skill) => (
            <tr key={skill.area}>
              <th scope="row">
                {skill.area}
                {skill.note ? <span className="skills__note">{skill.note}</span> : null}
              </th>
              <td>
                <Tags items={skill.tools} label={`${skill.area} tools`} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Cell>
  );
}
