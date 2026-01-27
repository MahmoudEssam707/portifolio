import { Link, useLocation, Outlet } from 'react-router-dom';
import portfolioData from '../data/portfolio.json';

export default function Layout() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="app-container">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">
            {portfolioData.personal.name}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link
                  className={`nav-link ${isActive('/') ? 'active' : ''}`}
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isActive('/skills') ? 'active' : ''}`}
                  to="/skills"
                >
                  Skills
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isActive('/projects') ? 'active' : ''}`}
                  to="/projects"
                >
                  Projects
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
                  to="/contact"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main>
        <Outlet />
      </main>

      <footer className="footer-modern">
        <div className="container">
          <div className="row align-items-center py-4">
            <div className="col-md-4 text-center text-md-start mb-3 mb-md-0">
              <Link to="/" className="footer-brand">
                {portfolioData.personal.name}
              </Link>
              <p className="footer-tagline mb-0">{portfolioData.personal.title}</p>
            </div>
            <div className="col-md-4 text-center mb-3 mb-md-0">
              <div className="footer-social">
                {portfolioData.contact.socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-link"
                    title={social.name}
                  >
                    <i className={`bi bi-${social.icon}`}></i>
                  </a>
                ))}
              </div>
            </div>
            <div className="col-md-4 text-center text-md-end">
              <p className="footer-copyright mb-0">
                &copy; {portfolioData.siteMeta.year} {portfolioData.siteMeta.copyright}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
