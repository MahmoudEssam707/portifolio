import { useState, useEffect } from 'react';
import { 
  Code, 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  ChevronDown,
  ExternalLink,
  User,
  Brain
} from 'lucide-react';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMessage, setFormMessage] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'certifications', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#202439] shadow-md' : 'bg-white'
      }`}>
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-center items-center">
            <div className="flex space-x-6">
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About' },
                { id: 'skills', label: 'Skills' },
                { id: 'experience', label: 'Experience' },
                { id: 'projects', label: 'Projects' },
                { id: 'certifications', label: 'Certifications' },
                { id: 'contact', label: 'Contact' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`transition-colors duration-200 hover:text-[#202439] ${
                    isScrolled
                      ? activeSection === item.id
                        ? 'text-white font-medium'
                        : 'text-white'
                      : activeSection === item.id
                        ? 'text-[#394462] font-medium'
                        : 'text-[#394462]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-white flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
            <img src="/profile.jfif" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
            Mahmoud Essam Fathy
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Machine Learning Engineer
          </p>
          <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
            Specializing in computer vision and natural language processing, with experience in MLOps, mathematics, and statistics. Passionate about building intelligent systems and deploying real-world AI solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection('projects')}
              className="bg-gradient-to-r from-[#202439] to-[#394462] text-white px-8 py-3 rounded-lg font-medium hover:from-[#394462] hover:to-[#202439] transition-colors w-full sm:w-48"
              style={{ minWidth: '192px' }}
            >
              View My Work
            </button>
            <a
              href="https://drive.google.com/file/d/1epQFI1O36eSC0BaDiZbNu5IvdpRXHh3q/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-[#202439] to-[#394462] text-white border border-gray-300 px-8 py-3 rounded-lg font-medium hover:from-[#394462] hover:to-[#202439] transition-colors flex items-center justify-center gap-2 w-full sm:w-48"
              style={{ minWidth: '192px' }}
            >
              View CV
            </a>
          </div>
          <div className="mt-16">
            <button 
              onClick={() => scrollToSection('about')}
              className="text-gray-400 hover:text-[#202439] transition-colors"
            >
              <ChevronDown className="w-8 h-8" />
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white flex items-center justify-center min-h-screen">
        <div className="max-w-4xl mx-auto px-6 w-full">
          <div className="text-center mb-16">
            <div className="flex flex-col items-center justify-center mb-4">
              <User className="w-12 h-12 text-[#202439] mb-2" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">About Me</h2>
            </div>
            <div className="w-16 h-1 bg-[#202439] mx-auto rounded-full"></div>
          </div>
          <div className="bg-gray-50 p-8 rounded-lg shadow-md">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <User className="w-6 h-6" color="#202439" />
                  <h3 className="text-xl font-bold text-gray-800">Profile</h3>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Mahmoud Essam Fathy is a Machine Learning Engineer with a background in data science, specializing in computer vision and natural language processing. He has experience in MLOps practices and a solid foundation in mathematics and statistics.
                </p>
              </div>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg min-h-[120px] flex flex-col justify-center">
                  <h4 className="text-lg font-bold text-gray-800 mb-2">Education</h4>
                  <p className="text-gray-600">BSc in Data Science, Alexandria University</p>
                  <p className="text-gray-500">2025 | CGPA: 3.82/4.00</p>
                </div>
                <div className="bg-white p-6 rounded-lg min-h-[120px] flex flex-col justify-center">
                  <h4 className="text-lg font-bold text-gray-800 mb-2">Publications</h4>
                  <p className="text-gray-600">Co-authored papers on Parkinson's Disease Diagnosis (99.9% R²) and detecting unsuitable Tik Tok content (86.7% accuracy).</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-white flex items-center justify-center min-h-screen">
        <div className="max-w-4xl mx-auto px-6 w-full">
          <div className="text-center mb-16">
            <div className="flex flex-col items-center justify-center mb-4">
              <Code className="w-12 h-12 text-[#202439] mb-2" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Experience</h2>
            </div>
            <div className="w-16 h-1 bg-[#202439] mx-auto rounded-full"></div>
          </div>
          <div className="space-y-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Research and Development Engineer</h3>
                  <h4 className="text-lg text-[#202439] font-medium">Smart Technology <span className='text-gray-500 font-normal'>Egypt, Alexandria</span></h4>
                </div>
                <div className="text-gray-500 font-medium">Aug 2024 - Oct 2024</div>
              </div>
              <ul className="text-gray-600 leading-relaxed list-disc ml-6">
                <li>Contributed as both an intern and full-time engineer across projects involving PCB design, embedded systems, and educational tools.</li>
                <li>Designed Arduino Shield and ESP32-based PCBs integrating components such as LCDs, buzzers, RFID, fingerprint readers, and sensors.</li>
                <li>Resolved short circuit issues via PCB redesign, significantly improving system reliability and efficiency.</li>
                <li>Built and programmed a Mini CNC Plotter using stepper motors, LEDs, and ULN2003 drivers for enhanced precision control.</li>
                <li>Led hands-on workshops introducing children to basic logic using push-button circuits.</li>
                <li>Developed a high-precision 4-axis robotic arm using NEMA17 stepper motors and TMC drivers.</li>
                <li>Designed and optimized PCB layouts for IoT and automation applications, increasing system efficiency.</li>
                <li>Delivered training on 3D printer mechanics and assembly, empowering engineers with diagnostic and maintenance skills.</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Machine Learning Engineer Trainee</h3>
                  <h4 className="text-lg text-[#202439] font-medium">Alexandria University - FOE <span className='text-gray-500 font-normal'>Egypt, Alexandria</span></h4>
                </div>
                <div className="text-gray-500 font-medium">Jul 2024 - Sep 2024</div>
              </div>
              <ul className="text-gray-600 leading-relaxed list-disc ml-6">
                <li>Led deep learning research for Alzheimer’s disease detection, analyzing MRI data to classify dementia stages.</li>
                <li>Implemented CNNs, VGG16, Vision Transformers (ViT) in MRI Medical Problem achieving 95.10% accuracy with ViT.</li>
                <li>Applied advanced neural network architectures strengthening expertise in AI-driven medical diagnostics.</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">AI Trainee</h3>
                  <h4 className="text-lg text-[#202439] font-medium">My-Communication <span className='text-gray-500 font-normal'>Egypt, Remote</span></h4>
                </div>
                <div className="text-gray-500 font-medium">Jul 2024 - Sep 2024</div>
              </div>
              <ul className="text-gray-600 leading-relaxed list-disc ml-6">
                <li>Built neural networks and experimented with optimizers (Adam, SGD, RMSProp) for improved training performance.</li>
                <li>Designed and optimized classification models (Logistic Regression, Decision Tree, Random Forest) through hyperparameter tuning.</li>
                <li>Developed expertise in clustering techniques (K-Means, GMM) and dimensionality reduction (PCA).</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">IoT Trainee</h3>
                  <h4 className="text-lg text-[#202439] font-medium">Alexandria University - FCDS <span className='text-gray-500 font-normal'>Egypt, Alexandria</span></h4>
                </div>
                <div className="text-gray-500 font-medium">Jul 2023 - Sep 2023</div>
              </div>
              <ul className="text-gray-600 leading-relaxed list-disc ml-6">
                <li>Developed ESP-based applications for fire, light, and flooding detection, integrating smart systems for enhanced safety.</li>
                <li>Gained proficiency in cloud infrastructure, Flutter app development, and ESP32 integration.</li>
                <li>Built a Smart Home System using ESP32, Flutter, and Firebase, enabling remote home management and automation.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Work Section */}
      <section id="volunteer" className="py-20 bg-gray-50 flex items-center justify-center min-h-screen">
        <div className="max-w-4xl mx-auto px-6 w-full">
          <div className="text-center mb-16">
            <div className="flex flex-col items-center justify-center mb-4">
              <ExternalLink className="w-12 h-12 text-[#202439] mb-2" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Volunteer Work</h2>
            </div>
            <div className="w-16 h-1 bg-[#202439] mx-auto rounded-full"></div>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-800">IoT Instructor</h3>
                <h4 className="text-lg text-[#202439] font-medium"><a href="https://www.alexu.edu.eg/" target="_blank" rel="noopener noreferrer">Alexandria University - FCDS</a> <span className='text-gray-500 font-normal'>Egypt, Alexandria</span></h4>
              </div>
              <div className="text-gray-500 font-medium">Jul 2024 - Sep 2024</div>
            </div>
            <ul className="text-gray-600 leading-relaxed list-disc ml-6 space-y-2">
              <li>Delivered IoT training sessions, enhancing students' problem-solving, collaboration, and communication skills.</li>
              <li>Conducted hands-on workshops on IoT system deployment, DevOps, and Flutter-based system monitoring.</li>
              <li>Evaluated and provided feedback on 40+ graduation projects, offering insights to improve IoT implementations.</li>
              <li>First student to work as a TA.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-50 flex items-center justify-center min-h-screen">
        <div className="max-w-4xl mx-auto px-6 w-full">
          <div className="text-center mb-16">
            <div className="flex flex-col items-center justify-center mb-4">
              <ExternalLink className="w-12 h-12 text-[#202439] mb-2" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Projects</h2>
            </div>
            <div className="w-16 h-1 bg-[#202439] mx-auto rounded-full"></div>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="grid grid-rows-2 gap-8">
              {/* First row: EcoFarm centered */}
              <div className="row-span-1 flex justify-center">
                <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow w-full max-w-xl">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-800">EcoFarm - Smart Agriculture System</h3>
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-[#394462] text-white flex flex-col items-center leading-tight min-w-[56px]">
                        <span>June</span>
                        <span>2025</span>
                      </span>
                    </div>
                    <ul className="text-gray-600 mb-6 leading-relaxed list-disc ml-6">
                      <li>Led a team to build an IoT-based smart farming system (Graduation Project, June 2025).</li>
                      <li>Developed a real-time crop prediction model using machine learning for precision agriculture.</li>
                      <li>Integrated an AI-powered chatbot for user support and farm management queries.</li>
                      <li>Designed and implemented cloud-based data collection, monitoring, and alerting system.</li>
                      <li>Worked with ESP microcontrollers and various sensors for environmental data acquisition.</li>
                      <li>Presented the project at the university's graduation showcase.</li>
                    </ul>
                    <div className="flex justify-center mb-4">
                      <a href="https://github.com/MahmoudEssam707/EcoFarm" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-gradient-to-r from-[#202439] to-[#394462] text-white font-medium transition-colors px-4 py-2 rounded-lg">
                        <Github className="w-4 h-4" color="#fff" />
                        Code
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              {/* Second row: CDIB and EEG Eye State Detection side by side */}
              <div className="row-span-1 grid grid-cols-2 gap-8">
                <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-800">CDIB - Cancer Detection In Blood</h3>
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-[#394462] text-white flex flex-col items-center leading-tight min-w-[56px]">
                        <span>Feb</span>
                        <span>2025</span>
                      </span>
                    </div>
                    <ul className="text-gray-600 mb-6 leading-relaxed list-disc ml-6">
                      <li>Built a CNN model for leukemia detection in blood samples (98.53% accuracy) (Feb 2025).</li>
                      <li>Applied MLOps practices for automated model training, deployment, and monitoring.</li>
                      <li>Automated data preprocessing, augmentation, and validation pipelines.</li>
                      <li>Collaborated with medical professionals for data annotation and clinical validation.</li>
                      <li>Deployed the model as a web service for real-time predictions.</li>
                    </ul>
                    <div className="flex justify-center mb-4">
                      <a href="https://github.com/MahmoudEssam707/portfolio-projects/tree/main/Data-Science/CDB%20-%20Cancer%20Detction%20in%20Blood" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-gradient-to-r from-[#202439] to-[#394462] text-white font-medium transition-colors px-4 py-2 rounded-lg">
                        <Github className="w-4 h-4" color="#fff" />
                        Code
                      </a>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-800">EEG Eye State Detection</h3>
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-[#394462] text-white flex flex-col items-center leading-tight min-w-[56px]">
                        <span>Jan</span>
                        <span>2025</span>
                      </span>
                    </div>
                    <ul className="text-gray-600 mb-6 leading-relaxed list-disc ml-6">
                      <li>Classified eye states using EEG data and machine learning (96.26% accuracy with KNN) (Jan 2025).</li>
                      <li>Deployed the trained model as a REST API using FastAPI for real-time inference.</li>
                      <li>Implemented real-time data streaming and prediction for user applications.</li>
                      <li>Created a user-friendly dashboard for visualization and interaction with predictions.</li>
                      <li>Documented the project and shared results with the research community.</li>
                    </ul>
                    <div className="flex justify-center mb-4">
                      <a href="https://github.com/MahmoudEssam707/portfolio-projects/tree/main/Data-Science/ElectroEncePhalogram" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-gradient-to-r from-[#202439] to-[#394462] text-white font-medium transition-colors px-4 py-2 rounded-lg">
                        <Github className="w-4 h-4" color="#fff" />
                        Code
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-20 bg-white flex items-center justify-center min-h-screen">
        <div className="max-w-4xl mx-auto px-6 w-full">
          <div className="text-center mb-16">
            <div className="flex flex-col items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-[#202439] mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Certifications</h2>
            </div>
            <div className="w-16 h-1 bg-[#202439] mx-auto rounded-full"></div>
          </div>
          <div className="bg-gray-50 p-8 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center">
              {["Machine Learning Specialization and Deep Learning Specialization from Andrew NG - (Founder of DeepLearning.AI)",
                "Applied Data Science Lab from WorldQuant University",
                "Introduction to the Internet of Things, Embedded Systems and Arduino and C Programming from University of California, Irvine",
                "Data Science Track and AI Engineer from IBM",
                "Data Analytics Professional from Google",
                "Data Analysis Challenger Track from Ministry of Communications and Information Technology",
                "Data Scientist Career Track and Intro to LLMs from 365datascience",
                "Database Fundamentals from ITI"
              ].map(cert => (
                <span key={cert} className="flex items-center justify-center text-gray-600 bg-gray-100 rounded-lg px-4 py-3 text-base font-medium min-h-[80px] w-full text-center mx-auto">
                  <span className="w-full text-center">{cert}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-50 flex items-center justify-center min-h-screen">
        <div className="max-w-4xl mx-auto px-6 w-full">
          <div className="text-center mb-16">
            <div className="flex flex-col items-center justify-center mb-4">
              <Brain className="w-12 h-12 text-[#202439] mb-2" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Skills</h2>
            </div>
            <div className="w-16 h-1 bg-[#202439] mx-auto rounded-full"></div>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md space-y-8">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Programming Languages</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {["Python", "R", "Java", "C++", "C", "SQL", "Shell", "NoSQL MongoDB", "MINITAB", "Power BI", "Dart", "Docker", "Git"].map(skill => (
                  <span key={skill} className="text-gray-600 bg-gray-100 rounded-full px-3 py-1 text-base font-medium block text-center">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Mathematical Skills</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {["Statistics", "Probability", "Calculus", "Linear Algebra", "Optimization Problems", "Stochastic", "Baysien"].map(skill => (
                  <span key={skill} className="text-gray-600 bg-gray-100 rounded-full px-3 py-1 text-base font-medium block text-center">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Soft Skills</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {["Team Leading", "Time Management", "Communication Skills", "Problem-solving", "Instruction", "Research"].map(skill => (
                  <span key={skill} className="text-gray-600 bg-gray-100 rounded-full px-3 py-1 text-base font-medium block text-center">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Technical Skills</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {["Cloud Computing (AWS)", "Scikit-learn", "TensorFlow", "River", "ETL", "DVC", "PyTorch", "NLP", "Mlflow", "FastAPI", "Apache Kafka", "Computer Vision", "Mobile App Development"].map(skill => (
                  <span key={skill} className="text-gray-600 bg-gray-100 rounded-full px-3 py-1 text-base font-medium block text-center">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white flex items-center justify-center min-h-screen">
        <div className="max-w-4xl mx-auto px-6 w-full">
          <div className="text-center mb-16">
            <div className="flex flex-col items-center justify-center mb-4">
              <Mail className="w-12 h-12 text-[#202439] mb-2" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Get In Touch</h2>
            </div>
            <div className="w-16 h-1 bg-[#202439] mx-auto rounded-full"></div>
            <p className="text-lg text-gray-600 mt-6">
              Interested in collaborating or have a project in mind? Let's connect!
            </p>
          </div>
          <div className="bg-gray-50 p-8 rounded-lg shadow-md grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="bg-[#394462] p-3 rounded-full">
                  <Mail className="w-5 h-5" color="#fff" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Email</h3>
                  <p className="text-[#394462]">umahmoudessamu@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="bg-[#394462] p-3 rounded-full">
                  <Phone className="w-5 h-5" color="#fff" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Phone</h3>
                  <p className="text-[#394462]">+201277345866</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="bg-[#394462] p-3 rounded-full">
                  <MapPin className="w-5 h-5" color="#fff" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Location</h3>
                  <p className="text-[#394462]">Alexandria, Egypt</p>
                </div>
              </div>
              <div className="flex gap-4 pt-4 justify-center">
                <a href="https://github.com/MahmoudEssam707" target="_blank" rel="noopener noreferrer" className="bg-[#394462] text-white p-3 rounded-full hover:bg-[#202439] transition-colors">
                  <Github className="w-5 h-5" color="#fff" />
                </a>
                <a href="https://www.linkedin.com/in/mahmoudessam7/" target="_blank" rel="noopener noreferrer" className="bg-[#394462] text-white p-3 rounded-full hover:bg-[#202439] transition-colors">
                  <Linkedin className="w-5 h-5" color="#fff" />
                </a>
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <form className="space-y-4" onSubmit={e => {
  e.preventDefault();
  const subject = encodeURIComponent("Portfolio Contact from " + formName);
  const body = encodeURIComponent(`Name: ${formName}\nEmail: ${formEmail}\n\n${formMessage}`);
  window.open(`mailto:umahmoudessamu@gmail.com?subject=${subject}&body=${body}`);
}}>
  <div>
    <label className="block text-gray-700 font-medium mb-2">Name</label>
    <input
      type="text"
      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none transition-colors"
      placeholder="Your Name"
      value={formName}
      onChange={e => setFormName(e.target.value)}
      required
    />
  </div>
  <div>
    <label className="block text-gray-700 font-medium mb-2">Email</label>
    <input
      type="email"
      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none transition-colors"
      placeholder="your.email@example.com"
      value={formEmail}
      onChange={e => setFormEmail(e.target.value)}
      required
    />
  </div>
  <div>
    <label className="block text-gray-700 font-medium mb-2">Message</label>
    <textarea
      rows={5}
      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none transition-colors resize-none"
      placeholder="Tell me about your project..."
      value={formMessage}
      onChange={e => setFormMessage(e.target.value)}
      required
    ></textarea>
  </div>
  <button
    type="submit"
    className="w-full bg-gradient-to-r from-[#202439] to-[#394462] text-white py-3 rounded-lg font-medium hover:from-[#394462] hover:to-[#202439] transition-colors"
  >
    Send Message
  </button>
</form>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-[#202439] text-white py-8">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-2">Mahmoud Essam Fathy</h3>
            <p className="text-gray-400">Machine Learning Engineer</p>
          </div>
          <div className="border-t border-gray-700 pt-4">
            <p className="text-gray-400">
              © 2025 Mahmoud Essam Fathy. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;