import portfolioData from '../data/portfolio.json';

export default function Projects() {
  return (
    <section
      className="py-5"
      style={{
        marginTop: '70px',
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
        minHeight: '100vh',
      }}
    >
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="section-title" style={{ color: '#1a1a2e' }}>
            My Projects
          </h1>
          <p className="lead" style={{ color: '#4a5568' }}>
            A collection of my recent work and accomplishments
          </p>
        </div>

        <div className="row">
          {portfolioData.projects.map((project) => (
            <div key={project.id} className="col-lg-4 col-md-6 mb-4">
              <div className="card project-card h-100">
                <img
                  src={project.image}
                  className="card-img-top"
                  alt={project.title}
                />
                <div className="card-body">
                  <h5 className="card-title fw-bold">{project.title}</h5>
                  <p className="card-text text-muted">{project.description}</p>
                  <div className="mb-3">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="badge bg-primary me-1">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="d-flex gap-2">
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-outline-primary"
                    >
                      <i className="bi bi-github me-1"></i>Code
                    </a>
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-primary"
                    >
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-5">
          <a
            href="https://github.com/MahmoudEssam707"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-lg"
            style={{
              background: 'linear-gradient(135deg, #4299e1 0%, #3182ce 100%)',
              color: 'white',
              borderRadius: '50px',
              padding: '12px 40px',
              fontWeight: 600,
              transition: 'all 0.3s ease',
            }}
          >
            <i className="bi bi-github me-2"></i>View More on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
