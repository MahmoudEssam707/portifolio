import { data } from "../../data";
import { scrollToTarget } from "../../lib/scroll";
import useLocalTime from "../../hooks/useLocalTime";
import Icon from "../ui/Icon";
import "./Footer.css";

export default function Footer() {
  const { person, site, contact } = data;
  const time = useLocalTime(person.timeZone);

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="mono-label">
          © {site.year} · Python 3 kernel · {person.location.split(",")[0]} <time>{time ?? "--:--"}</time>
        </p>

        <ul className="footer__social">
          {contact.socials.map((social) => (
            <li key={social.label}>
              <a href={social.url} target="_blank" rel="noreferrer" aria-label={social.label}>
                <Icon name={social.icon} size={18} />
              </a>
            </li>
          ))}
          <li>
            <a href={`mailto:${person.email}`} aria-label="Email">
              <Icon name="mail" size={18} />
            </a>
          </li>
          <li>
            <button type="button" onClick={() => scrollToTarget(null)} aria-label="Back to top">
              <Icon name="arrowUp" size={18} />
            </button>
          </li>
        </ul>
      </div>
    </footer>
  );
}
