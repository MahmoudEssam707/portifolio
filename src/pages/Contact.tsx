import { useState, FormEvent } from 'react';
import portfolioData from '../data/portfolio.json';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [alert, setAlert] = useState<{ type: string; message: string } | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (formData.name && formData.email && formData.message) {
      setAlert({
        type: 'success',
        message: portfolioData.contact.successMessage,
      });
      setFormData({ name: '', email: '', message: '' });
    } else {
      setAlert({
        type: 'error',
        message: portfolioData.contact.errorMessage,
      });
    }

    setTimeout(() => setAlert(null), 5000);
  };

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
            {portfolioData.contact.heading}
          </h1>
          <p className="lead" style={{ color: '#4a5568' }}>
            {portfolioData.contact.subheading}
          </p>
        </div>

        {alert && (
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div
                className={`alert alert-${alert.type === 'success' ? 'success' : 'danger'} alert-dismissible fade show`}
                role="alert"
              >
                {alert.message}
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setAlert(null)}
                ></button>
              </div>
            </div>
          </div>
        )}

        <div className="row">
          <div className="col-lg-8 mx-auto">
            <div className="row mb-5">
              <div className="col-md-4 mb-4">
                <div className="text-center">
                  <div
                    className="text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                    style={{
                      width: '60px',
                      height: '60px',
                      background: 'linear-gradient(135deg, #4299e1 0%, #3182ce 100%)',
                    }}
                  >
                    <i className="bi bi-envelope fs-4"></i>
                  </div>
                  <h5 style={{ color: '#1a1a2e' }}>Email</h5>
                  <p style={{ color: '#4a5568' }}>{portfolioData.personal.email}</p>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="text-center">
                  <div
                    className="text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                    style={{
                      width: '60px',
                      height: '60px',
                      background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
                    }}
                  >
                    <i className="bi bi-telephone fs-4"></i>
                  </div>
                  <h5 style={{ color: '#1a1a2e' }}>Phone</h5>
                  <p style={{ color: '#4a5568' }}>{portfolioData.personal.phone}</p>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="text-center">
                  <div
                    className="text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                    style={{
                      width: '60px',
                      height: '60px',
                      background: 'linear-gradient(135deg, #4299e1 0%, #3182ce 100%)',
                    }}
                  >
                    <i className="bi bi-geo-alt fs-4"></i>
                  </div>
                  <h5 style={{ color: '#1a1a2e' }}>Location</h5>
                  <p style={{ color: '#4a5568' }}>{portfolioData.personal.location}</p>
                </div>
              </div>
            </div>

            <div className="card border-0 shadow-lg">
              <div className="card-body p-5">
                <h3 className="text-center mb-4">{portfolioData.contact.formTitle}</h3>
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="mb-4">
                    <label htmlFor="name" className="form-label fw-semibold">
                      Your Name
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="name"
                      name="name"
                      required
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="form-label fw-semibold">
                      Your Email
                    </label>
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      id="email"
                      name="email"
                      required
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="message" className="form-label fw-semibold">
                      Your Message
                    </label>
                    <textarea
                      className="form-control form-control-lg"
                      id="message"
                      name="message"
                      rows={6}
                      required
                      placeholder="Enter your message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-lg px-5"
                      style={{
                        background: 'linear-gradient(135deg, #4299e1 0%, #3182ce 100%)',
                        border: 'none',
                        color: 'white',
                        borderRadius: '50px',
                        fontWeight: 600,
                        padding: '14px 50px',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <i className="bi bi-send me-2"></i>Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="text-center mt-5">
              <h4 className="mb-3" style={{ color: '#1a1a2e' }}>
                Connect With Me
              </h4>
              <div className="d-flex justify-content-center gap-3">
                {portfolioData.contact.socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-lg social-link-btn"
                    style={{
                      border: '2px solid #4299e1',
                      color: '#4299e1',
                      borderRadius: '50px',
                      width: '60px',
                      height: '60px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <i className={`bi bi-${social.icon} fs-5`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
