import portfolioData from '../data/portfolio.json';

export default function Skills() {
  return (
    <section className="py-5" style={{ marginTop: '70px', background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}>
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="section-title" style={{ color: '#1a1a2e' }}>
            My Skills Arsenal
          </h1>
          <p className="lead" style={{ color: '#4a5568' }}>
            Powerful technologies and expertise I bring to every project
          </p>
        </div>

        <div className="row mb-5">
          {portfolioData.skills.map((skillGroup, index) => (
            <div key={index} className="col-lg-4 col-md-6 mb-4">
              <div className="skill-card-modern h-100">
                <div
                  className="skill-card-header"
                  style={{ background: skillGroup.gradient }}
                >
                  <i className={`bi bi-${skillGroup.icon} skill-icon-modern`}></i>
                  <h4 className="skill-category-title">{skillGroup.category}</h4>
                </div>
                <div className="skill-card-body">
                  <div className="skills-grid">
                    {skillGroup.skills.map((skill, idx) => (
                      <span key={idx} className="skill-badge">
                        <i className="bi bi-check-circle-fill me-1"></i>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row mt-5">
          <div className="col-lg-10 mx-auto">
            <h3 className="text-center mb-4">Core Competencies</h3>
            <div className="row g-3">
              {portfolioData.additionalSkills.map((skill, index) => (
                <div key={index} className="col-md-3 col-sm-6">
                  <div className="competency-card">
                    <i className={`bi bi-${skill.icon} fs-2 text-${skill.color}`}></i>
                    <p className="mb-0 mt-2 fw-semibold">{skill.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
