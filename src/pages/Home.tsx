import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import portfolioData from '../data/portfolio.json';

export default function Home() {
  const [titleText, setTitleText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [titleIndex, setTitleIndex] = useState(0);

  const titles = [
    'Machine Learning Engineer',
    'AI Researcher',
    'MLOps Specialist',
    'Deep Learning Expert',
  ];

  useEffect(() => {
    const typingSpeed = isDeleting ? 50 : 100;
    const currentTitle = titles[titleIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (titleText.length < currentTitle.length) {
          setTitleText(currentTitle.substring(0, titleText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (titleText.length > 0) {
          setTitleText(currentTitle.substring(0, titleText.length - 1));
        } else {
          setIsDeleting(false);
          setTitleIndex((titleIndex + 1) % titles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [titleText, isDeleting, titleIndex]);

  return (
    <>
      <section className="hero-section-enhanced">
        {/* Animated Background */}
        <div className="hero-bg-animation">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
        </div>

        {/* Particle Effect */}
        <div className="particles-container">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="particle"></div>
          ))}
        </div>

        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="row align-items-center min-vh-100">
            <div className="col-lg-10 mx-auto">
              <div className="hero-content-wrapper">

                {/* Animated Name with Gradient */}
                <h1 className="hero-name animate__animated animate__fadeInUp">
                  <span className="name-text">{portfolioData.personal.name}</span>
                  <span className="name-cursor">|</span>
                </h1>

                {/* Rotating Titles */}
                <div className="hero-title-wrapper animate__animated animate__fadeInUp animate__delay-1s">
                  <h2 className="hero-title">
                    <span className="title-prefix">I'm a</span>
                    <span className="rotating-title">{titleText}</span>
                  </h2>
                </div>

                {/* Tagline with Animation */}
                <p className="hero-tagline animate__animated animate__fadeInUp animate__delay-2s">
                  {portfolioData.personal.tagline}
                </p>

                {/* Bio with Typing Effect */}
                <p className="hero-bio animate__animated animate__fadeInUp animate__delay-3s">
                  {portfolioData.personal.bio}
                </p>

                {/* CTA Buttons with Hover Effects */}
                <div className="hero-cta animate__animated animate__fadeInUp animate__delay-4s">
                  <Link to="/projects" className="hero-btn hero-btn-primary">
                    <span>View My Work</span>
                    <i className="bi bi-arrow-right"></i>
                  </Link>
                  <a
                    href={portfolioData.personal['cv-link']}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-btn hero-btn-secondary"
                  >
                    <i className="bi bi-file-earmark-text"></i>
                    <span>Download CV</span>
                  </a>
                  <Link to="/contact" className="hero-btn hero-btn-outline">
                    <span>Get In Touch</span>
                    <i className="bi bi-envelope"></i>
                  </Link>
                </div>

                {/* Scroll Indicator */}
                <div className="scroll-indicator animate__animated animate__fadeInUp animate__delay-5s">
                  <div className="scroll-mouse">
                    <div className="scroll-wheel"></div>
                  </div>
                  <p className="scroll-text">Scroll to explore</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">About Me</h2>
          </div>
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <p className="lead text-center mb-4">{portfolioData.about.summary}</p>
              <div className="row text-center mt-5">
                {portfolioData.about.highlights.map((highlight, index) => (
                  <div key={index} className="col-md-4 mb-4">
                    <div className="p-4">
                      <i className={`bi bi-${highlight.icon} fs-1 text-primary mb-3 d-block`}></i>
                      <h4>{highlight.title}</h4>
                      <p className="text-muted">{highlight.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">Experience</h2>
          </div>
          <div className="row">
            <div className="col-lg-8 mx-auto">
              {portfolioData.experience.map((exp, index) => (
                <div key={index} className="card mb-3 border-0 shadow-sm">
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <h4 className="mb-1">{exp.position}</h4>
                        <h6 className="text-muted">{exp.company}</h6>
                      </div>
                      <span className="badge bg-primary">{exp.duration}</span>
                    </div>
                    <p className="mb-0">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
