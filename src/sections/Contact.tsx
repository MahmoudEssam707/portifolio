import { data } from "../data";
import CopyEmail from "../components/ui/CopyEmail";
import Icon from "../components/ui/Icon";
import "../components/ui/Section.css";
import "./Contact.css";

export default function Contact() {
  const { person, contact } = data;

  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="container">
        <div className="contact__panel reveal-up">
          <span className="glow-orb contact__orb" aria-hidden="true" />
          <p className="eyebrow">Contact</p>
          <h2 id="contact-title" className="contact__title">
            Let's build something <span className="gradient-text">intelligent.</span>
          </h2>
          <p className="contact__blurb">{contact.blurb}</p>

          <div className="contact__actions">
            <a className="btn btn--primary" href={`mailto:${person.email}`}>
              <Icon name="mail" size={16} /> {person.email}
            </a>
            <CopyEmail email={person.email} />
          </div>
        </div>

        <ul className="contact__links">
          {contact.socials.map((social) => (
            <li key={social.label} className="reveal-up">
              <a className="contact__link card" href={social.url} target="_blank" rel="noreferrer">
                <span className="contact__icon">
                  <Icon name={social.icon} size={20} />
                </span>
                <span className="contact__text">
                  <span className="contact__label">{social.label}</span>
                  <span className="contact__handle">{social.handle}</span>
                </span>
                <Icon name="arrowUpRight" size={16} className="contact__arrow" />
              </a>
            </li>
          ))}
          <li className="reveal-up">
            <a className="contact__link card" href={person.cv} target="_blank" rel="noreferrer">
              <span className="contact__icon">
                <Icon name="download" size={20} />
              </span>
              <span className="contact__text">
                <span className="contact__label">Resume</span>
                <span className="contact__handle">PDF</span>
              </span>
              <Icon name="arrowUpRight" size={16} className="contact__arrow" />
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
