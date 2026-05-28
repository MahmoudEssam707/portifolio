import { FormEvent, useEffect, useRef, useState } from "react";
import portfolioData from "../data/portfolio.json";
import SectionHeader from "../components/SectionHeader";
import ContactLink from "../components/ContactLink";
import useReveal from "../components/hooks/useReveal";

const EMPTY_FORM = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function Contact() {
  useReveal();

  const [formData, setFormData] = useState(EMPTY_FORM);
  const [sent, setSent] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setSent(true);
    setFormData(EMPTY_FORM);

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => setSent(false), 3000);
  };

  return (
    <section className="section page" id="contact">
      <div className="container">
        <SectionHeader
          eyebrow="03 - Contact"
          title="Let's Collaborate"
          subtitle={portfolioData.contact.subheading}
        />

        <div className="contact-grid">
          <div className="reveal">
            <p className="contact-intro">{portfolioData.contact.subheading}</p>
            {portfolioData.Data.contactLinks.map((link) => (
              <ContactLink
                key={link.label}
                label={link.label}
                value={link.value}
                url={link.url}
                // variant={link.variant}
                tag={link.tag}
              />
            ))}
          </div>

          <form className="card contact-form reveal" onSubmit={handleSubmit}>
            <h3>{portfolioData.contact.formTitle}</h3>
            <div className="form-row">
              <input
                type="text"
                name="name"
                placeholder="Name"
                required
                value={formData.name}
                onChange={(event) =>
                  setFormData({ ...formData, name: event.target.value })
                }
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={(event) =>
                  setFormData({ ...formData, email: event.target.value })
                }
              />
            </div>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              required
              value={formData.subject}
              onChange={(event) =>
                setFormData({ ...formData, subject: event.target.value })
              }
            />
            <div style={{ marginTop: "var(--space-sm)" }}>
              <textarea
                name="message"
                placeholder="Message"
                required
                value={formData.message}
                onChange={(event) =>
                  setFormData({ ...formData, message: event.target.value })
                }
              ></textarea>
            </div>
            <button
              type="submit"
              className={`btn primary${sent ? " sent" : ""}`}
            >
              {sent ? "Sent!" : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
