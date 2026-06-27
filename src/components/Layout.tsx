import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import portfolioData from "../data/portfolio.json";
import BackToTop from "./BackToTop";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Skills", to: "/skills" },
  { label: "Projects", to: "/projects" },
  { label: "Contact", to: "/contact", isButton: true },
];

export default function Layout() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="app-shell" id="top">
      <div className="ambient one"></div>
      <div className="ambient two"></div>
      <div className="ambient three"></div>

      <nav className={`site-nav${scrolled ? " scrolled" : ""}`}>
        <div className="container nav-inner">
          <NavLink className="nav-logo" to="/">
            // mahmoud_essam
          </NavLink>
          <div className="nav-links">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  [
                    item.isButton ? "btn ghost" : "",
                    isActive ? "active" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")
                }
              >
                {item.label}
              </NavLink>
            ))}
            <ThemeToggle />
          </div>
          <button
            className={`nav-toggle${menuOpen ? " open" : ""}`}
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        <div className="menu-links">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>

      <main>
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <p>
            {portfolioData.siteMeta.year} {portfolioData.siteMeta.copyright}
          </p>
          <div className="footer-links">
            {portfolioData.contact.socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                aria-label={social.name}
              >
                {social.name.slice(0, 2).toUpperCase()}
              </a>
            ))}
          </div>
        </div>
      </footer>

      <BackToTop />
    </div>
  );
}
