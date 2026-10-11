import { data } from "../data";
import Cell from "../components/ui/Cell";
import CopyEmail from "../components/ui/CopyEmail";
import Icon from "../components/ui/Icon";
import "./Contact.css";

export default function Contact() {
  const { person, contact } = data;

  return (
    <>
      <Cell n={7} id="contact" code="contact()" title="Contact" lead={contact.blurb}>
        <div className="contact__email-row">
          <a className="contact__email" href={`mailto:${person.email}`}>
            {person.email}
          </a>
          <CopyEmail email={person.email} />
        </div>

        <ul className="contact__links">
          {contact.socials.map((social) => (
            <li key={social.label}>
              <a className="contact__link" href={social.url} target="_blank" rel="noreferrer">
                <Icon name={social.icon} size={18} />
                <span className="contact__label">{social.label}</span>
                <span className="contact__handle mono-label">{social.handle}</span>
                <Icon name="arrowUpRight" size={16} className="contact__arrow" />
              </a>
            </li>
          ))}
          <li>
            <a className="contact__link" href={person.cv} target="_blank" rel="noreferrer">
              <Icon name="download" size={18} />
              <span className="contact__label">Resume</span>
              <span className="contact__handle mono-label">PDF</span>
              <Icon name="arrowUpRight" size={16} className="contact__arrow" />
            </a>
          </li>
        </ul>
      </Cell>

      {/* The next, empty cell: the notebook is waiting for input. */}
      <div className="container empty-cell" aria-hidden="true">
        <div className="cell__in">
          <span className="cell__prompt">In&nbsp;[&nbsp;]:</span>
          <pre className="cell__code">
            <span className="empty-cell__caret" />
          </pre>
        </div>
      </div>
    </>
  );
}
