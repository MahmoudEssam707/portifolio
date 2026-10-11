import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { data } from "../../data";
import { getLenis } from "../../lib/scroll";
import useScrolled from "../../hooks/useScrolled";
import Logo from "../ui/Logo";
import ThemeToggle from "../ui/ThemeToggle";
import "./Nav.css";

const NAV_ITEMS = [
  { id: "about", label: "about" },
  { id: "experience", label: "experience" },
  { id: "work", label: "projects" },
  { id: "skills", label: "skills" },
  { id: "papers", label: "papers" },
  { id: "contact", label: "contact" },
] as const;

/** Highlights the nav item whose section is in the middle band of the viewport. */
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) {
      setActive(null);
      return;
    }
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => el !== null
    );

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [enabled]);

  return active;
}

export default function Nav() {
  const { pathname, key } = useLocation();
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const active = useActiveSection(pathname === "/");
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close on any navigation.
  useEffect(() => setOpen(false), [key]);

  // Scroll lock, Esc to close, focus trap while the mobile menu is open.
  useEffect(() => {
    if (!open) {
      return;
    }
    const root = document.documentElement;
    root.classList.add("menu-open");
    getLenis()?.stop();
    menuRef.current?.querySelector<HTMLElement>("a")?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !menuRef.current || !toggleRef.current) {
        return;
      }
      const focusable = [toggleRef.current, ...menuRef.current.querySelectorAll<HTMLElement>("a, button")];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      root.classList.remove("menu-open");
      getLenis()?.start();
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className={`nav${scrolled ? " is-scrolled" : ""}${open ? " is-open" : ""}`}>
      <div className="nav__inner container">
        <Link to="/" className="nav__logo" aria-label={`${data.person.name}, home`}>
          <Logo size={28} />
          <span className="nav__name">
            {data.person.name}
            <span className="nav__role">{data.person.role}</span>
          </span>
        </Link>

        <nav className="nav__links" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.id}
              to={`/#${item.id}`}
              className="nav__link"
              aria-current={active === item.id ? "true" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="nav__actions">
          <ThemeToggle />
          <button
            ref={toggleRef}
            type="button"
            className="nav__burger icon-btn"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div
        ref={menuRef}
        id="mobile-menu"
        className="mobile-menu"
        hidden={!open}
        aria-label="Menu"
        role="dialog"
        aria-modal="true"
      >
        <nav className="mobile-menu__links container" aria-label="Mobile">
          {NAV_ITEMS.map((item, i) => (
            <Link key={item.id} to={`/#${item.id}`} className="mobile-menu__link">
              <span className="mobile-menu__n">[{i + 2}]</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mobile-menu__foot container mono-label">
          <a href={`mailto:${data.person.email}`}>{data.person.email}</a>
        </div>
      </div>
    </header>
  );
}
