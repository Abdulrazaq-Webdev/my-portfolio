"use client";

import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";

// Loading Screen Component
const LoadingScreen = ({ progress, text }) => (
  <div className="loading-screen">
    <div className="loading-content">
      <div className="logo-loading">
        <span className="bracket">{"<"}</span>
        <span className="name">AbdulrazaqDev</span>
        <span className="bracket">{"/>"}</span>
      </div>
      <div className="loading-bar-container">
        <div className="loading-bar">
          <div
            className="loading-progress"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <span className="loading-percentage">{progress}%</span>
      </div>
      <p className="loading-text">{text}</p>
      <div className="loading-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </div>
);

// Header Component
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      setIsMenuOpen(false);
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const navItems = [
    { href: "#home", label: "01. Home" },
    { href: "#about", label: "02. About" },
    { href: "#skills", label: "03. Skills" },
    { href: "#projects", label: "04. Projects" },
    { href: "#contact", label: "05. Contact" },
  ];

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <span className="logo-bracket">{"<"}</span>
            <span className="logo-text">AbdulrazaqDev</span>
            <span className="logo-bracket">{"/>"}</span>
          </div>
          <nav className="nav">
            <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div
              className={`burger ${isMenuOpen ? "active" : ""}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

// Hero Component
const Hero = () => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const words = ["Frontend Developer", "Code Artist", "Problem Solver"];

  useEffect(() => {
    const handleType = () => {
      const current = loopNum % words.length;
      const fullText = words[current];
      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );
      setTypingSpeed(isDeleting ? 30 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 500);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, words]);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-left">
            <div className="hero-intro">
              <span className="greeting">Hello World! I'm</span>
              <h1 className="hero-name">
                Abdulrazaq<span className="underscore">_</span>WebDev
              </h1>
              <div className="hero-title">
                <span className="title-prefix">I'm a </span>
                <span className="typewriter">{text}</span>
                <span className="cursor">|</span>
              </div>
              <p className="hero-description">
                I craft digital experiences with clean code and creative design.
                Specializing in modern web technologies to bring ideas to life.
              </p>
              <div className="hero-buttons">
                <button
                  className="btn btn-primary"
                  onClick={(e) => handleNavClick(e, "#projects")}
                >
                  <span>View Projects</span>
                  <i className="fas fa-arrow-right"></i>
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={(e) => handleNavClick(e, "#contact")}
                >
                  <span>Get In Touch</span>
                </button>
              </div>
            </div>
          </div>
          <div className="hero-right">
            <div className="code-window">
              <div className="window-header">
                <div className="window-controls">
                  <span className="control close"></span>
                  <span className="control minimize"></span>
                  <span className="control maximize"></span>
                </div>
                <span className="window-title">portfolio.js</span>
              </div>
              <div className="code-content">
                <pre>
                  <code>
                    {`const developer = {
  name: "Abdulrazaq",
  skills: ["HTML", "CSS", "JS", "React"],
  passion: "Creating amazing UX",
  status: "Available for hire",
  
  createMagic() {
    return "Beautiful websites ✨";
  }
};

console.log(developer.createMagic());`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="floating-elements">
        {["<>", "{ }", "[ ]", "( )"].map((symbol, index) => (
          <div
            key={symbol}
            className="floating-element"
            style={{ "--delay": `${index}s` }}
          >
            {symbol}
          </div>
        ))}
      </div>
    </section>
  );
};

// About Component
const About = () => {
  const technologies = [
    "HTML5 & CSS3",
    "JavaScript (ES6+)",
    "React.js",
    "SQL Database",
    "Git & GitHub",
    "Responsive Design",
  ];
  const stats = [
    { number: "2+", label: "Years Experience" },
    { number: "4", label: "Projects Completed" },
    { number: "100%", label: "Client Satisfaction" },
    { number: "24/7", label: "Available Support" },
  ];

  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">
          <span className="section-number">01.</span> About Me
        </h2>
        <div className="about-content">
          <div className="about-text">
            <div className="text-block">
              <p>
                Hello! I'm Abdulrazaq, a passionate frontend developer who loves
                creating digital experiences that live on the internet. My
                journey into web development started 2 years ago, and I've been
                hooked ever since.
              </p>
              <p>
                I enjoy turning complex problems into simple, beautiful and
                intuitive designs. When I'm not coding, you'll find me exploring
                new technologies, contributing to open source projects, or
                sharing knowledge with the developer community.
              </p>
              <p>
                Here are a few technologies I've been working with recently:
              </p>
            </div>
            <div className="tech-list">
              <ul>
                {technologies.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="about-image">
            <div className="image-container">
              <div className="image-placeholder">
                <div className="avatar-icon">
                  <i className="fas fa-user-astronaut"></i>
                </div>
              </div>
              <div className="image-border"></div>
            </div>
          </div>
        </div>
        <div className="stats-grid">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-card">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Skills Component
const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const skillsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );
    if (skillsRef.current) observer.observe(skillsRef.current);
    return () => observer.disconnect();
  }, []);

  const skills = [
    { name: "HTML5", level: 90, color: "var(--neon-orange)" },
    { name: "CSS3", level: 85, color: "var(--neon-cyan)" },
    { name: "JavaScript", level: 80, color: "var(--neon-yellow)" },
    { name: "React", level: 75, color: "var(--neon-cyan)" },
    { name: "SQL Database", level: 70, color: "var(--neon-green)" },
    { name: "Git", level: 85, color: "var(--neon-pink)" },
  ];

  const tools = [
    { name: "VS Code", icon: "fas fa-code", category: "Editor" },
    { name: "GitHub", icon: "fab fa-github", category: "Version Control" },
    { name: "Terminal", icon: "fas fa-terminal", category: "CLI" },
    { name: "Chrome DevTools", icon: "fab fa-chrome", category: "Debug" },
    { name: "NPM", icon: "fab fa-npm", category: "Package Manager" },
  ];

  return (
    <section id="skills" className="skills" ref={skillsRef}>
      <div className="container">
        <h2 className="section-title">
          <span className="section-number">02.</span> Skills & Tools
        </h2>
        <div className="skills-content">
          <div className="skills-section">
            <h3 className="subsection-title">Technical Skills</h3>
            <div className="skills-grid">
              {skills.map((skill, index) => (
                <div key={skill.name} className="skill-item">
                  <div className="skill-header">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-percentage">{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <div
                      className="skill-progress"
                      style={{
                        width: isVisible ? `${skill.level}%` : "0%",
                        backgroundColor: skill.color,
                        boxShadow: `0 0 10px ${skill.color}`,
                        transition: `width 1.5s ease-in-out ${index * 0.1}s`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="tools-section">
            <h3 className="subsection-title">Tools & Technologies</h3>
            <div className="tools-grid">
              {tools.map((tool) => (
                <div key={tool.name} className="tool-card">
                  <div className="tool-icon">
                    <i className={tool.icon}></i>
                  </div>
                  <div className="tool-info">
                    <h4 className="tool-name">{tool.name}</h4>
                    <span className="tool-category">{tool.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Projects Component
const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const projects = [
    {
      id: 1,
      title: "Portfolio Website",
      description:
        "A modern, responsive portfolio website built with React and featuring dark theme with neon accents.",
      tech: ["React", "Vite", "CSS3", "JavaScript"],
      category: "web",
      github: "https://github.com/Abdulrazaq-Webdev",
      live: "#",
      featured: true,
    },
    // {
    //   id: 2,
    //   title: "E-Commerce Platform",
    //   description:
    //     "Full-stack e-commerce solution with user authentication, payment integration, and admin dashboard.",
    //   tech: ["React", "Node.js", "MongoDB", "Express"],
    //   category: "web",
    //   github: "https://github.com/Abdulrazaq-Webdev",
    //   live: "#",
    //   featured: true,
    // },
    // {
    //   id: 3,
    //   title: "Task Management App",
    //   description:
    //     "Collaborative task management application with real-time updates and team collaboration features.",
    //   tech: ["Vue.js", "Firebase", "CSS3", "JavaScript"],
    //   category: "app",
    //   github: "https://github.com/Abdulrazaq-Webdev",
    //   live: "#",
    //   featured: false,
    // },
    // {
    //   id: 4,
    //   title: "Weather Dashboard",
    //   description:
    //     "Real-time weather application with location-based forecasts and interactive maps.",
    //   tech: ["React", "API Integration", "Chart.js"],
    //   category: "web",
    //   github: "https://github.com/Abdulrazaq-Webdev",
    //   live: "#",
    //   featured: false,
    // },
  ];

  const filters = [
    { id: "all", label: "All Projects" },
    { id: "web", label: "Web Apps" },
    // { id: "app", label: "Mobile Apps" },
    // { id: "ui", label: "UI/UX" },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">
          <span className="section-number">03.</span> Featured Projects
        </h2>
        <div className="project-filters">
          {filters.map((filter) => (
            <button
              key={filter.id}
              className={`filter-btn ${
                activeFilter === filter.id ? "active" : ""
              }`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`project-card ${project.featured ? "featured" : ""}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="project-header">
                <div className="project-links">
                  <a
                    href={project.github}
                    className="project-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-github"></i>
                  </a>
                  <a
                    href={project.live}
                    className="project-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fas fa-external-link-alt"></i>
                  </a>
                </div>
                {project.featured && (
                  <span className="featured-badge">Featured</span>
                )}
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tech">
                  {project.tech.map((tech) => (
                    <span key={tech} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="project-footer">
                <div className="project-number">
                  {String(project.id).padStart(2, "0")}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="projects-cta">
          <p>Want to see more of my work?</p>
          <a
            href="https://github.com/Abdulrazaq-Webdev"
            className="btn btn-ghost"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-github"></i>
            <span>View GitHub</span>
          </a>
        </div>
      </div>
    </section>
  );
};

// Contact Component with EmailJS Integration
const Contact = () => {
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const form = useRef();

  const contactMethods = [
    {
      icon: "fas fa-envelope",
      title: "Email",
      value: "adewunmiabdulrazaq@gmail.com",
      href: "mailto:adewunmiabdulrazaq@gmail.com",
    },
    {
      icon: "fas fa-phone",
      title: "Phone",
      value: "+234 805 827 8385",
      href: "tel:+2348058278385",
    },
    {
      icon: "fas fa-map-marker-alt",
      title: "Location",
      value: "Songo Samonda, Ibadan, Oyo State",
      href: "https://maps.app.goo.gl/4FiDo8aZQPUGYCb7A",
    },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      icon: "fab fa-github",
      url: "https://github.com/Abdulrazaq-Webdev",
    },
    {
      name: "LinkedIn",
      icon: "fab fa-linkedin-in",
      url: "https://www.linkedin.com/in/adewunmi-abdulrazaq-olusegun-8a3078249",
    },
    {
      name: "Twitter",
      icon: "fab fa-twitter",
      url: "https://x.com/abdulrazaq_dev",
    },
  ];

  const sendEmail = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: "", type: "" });

    // Basic form validation
    const formData = new FormData(form.current);
    const name = formData.get("user_name");
    const email = formData.get("user_email");
    const messageText = formData.get("message");

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage({
        text: "Please enter a valid email address.",
        type: "error",
      });
      setIsLoading(false);
      return;
    }

    // Validate required fields
    if (!name.trim() || !email.trim() || !messageText.trim()) {
      setMessage({
        text: "Please fill in all required fields.",
        type: "error",
      });
      setIsLoading(false);
      return;
    }

    // EmailJS Configuration - Replace with your actual credentials
    const SERVICE_ID = "service_u9ktst4";
    const TEMPLATE_ID = "template_eq8ytdo";
    const PUBLIC_KEY = "8D2RFmNpcq5OllNg5";

    // Check if EmailJS credentials are configured
    if (
      SERVICE_ID === "YOUR_SERVICE_ID" ||
      TEMPLATE_ID === "YOUR_TEMPLATE_ID" ||
      PUBLIC_KEY === "YOUR_PUBLIC_KEY"
    ) {
      // Show setup message for development
      setMessage({
        text: "EmailJS not configured yet. Please update your service credentials in the code.",
        type: "error",
      });
      setIsLoading(false);
      return;
    }

    // Send email using EmailJS
    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, form.current, {
        publicKey: PUBLIC_KEY,
      })
      .then(
        () => {
          console.log("SUCCESS!");
          setMessage({
            text: "Message sent successfully! I'll get back to you soon.",
            type: "success",
          });
          form.current.reset();
          setTimeout(() => {
            setShowForm(false);
            setMessage({ text: "", type: "" });
          }, 3000);
        },
        (error) => {
          console.log("FAILED...", error.text);

          // Provide more specific error messages
          let errorMessage = "Failed to send message. ";

          if (error.status === 400) {
            errorMessage +=
              "Please check your internet connection and try again.";
          } else if (error.status === 401) {
            errorMessage +=
              "Service temporarily unavailable. Please try again later or email me directly.";
          } else {
            errorMessage +=
              "Please try again or contact me directly at adewunmiabdulrazaq@gmail.com";
          }

          setMessage({
            text: errorMessage,
            type: "error",
          });
        }
      )
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDirectContact = () => {
    const subject = encodeURIComponent("Contact from Portfolio");
    const body = encodeURIComponent(
      "Hi Abdulrazaq,\n\nI'd like to get in touch with you regarding..."
    );
    window.location.href = `mailto:adewunmiabdulrazaq@gmail.com?subject=${subject}&body=${body}`;
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    setMessage({ text: "", type: "" });
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">
          <span className="section-number">04.</span> Get In Touch
        </h2>
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-text">
              <h3>Let's Build Something Amazing Together</h3>
              <p>
                I'm currently available for freelance work and full time
                opportunities. Whether you have a project in mind or just want
                to chat about tech, I'd love to hear from you!
              </p>
            </div>
            <div className="contact-methods">
              {contactMethods.map((method) => (
                <div key={method.title} className="contact-method">
                  <div className="method-icon">
                    <i className={method.icon}></i>
                  </div>
                  <div className="method-info">
                    <h4>{method.title}</h4>
                    {method.href ? (
                      <a href={method.href}>{method.value}</a>
                    ) : (
                      <span>{method.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="social-links">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className={social.icon}></i>
                  <span>{social.name}</span>
                </a>
              ))}
            </div>
          </div>
          <div className="contact-cta">
            <div className="cta-card">
              <h3>Ready to Start a Project?</h3>
              <p>Let's discuss your ideas and bring them to life!</p>
              <button onClick={toggleForm} className="btn btn-primary">
                <i className="fas fa-paper-plane"></i>
                <span>{showForm ? "Close Form" : "Send Message"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Contact Form Modal with EmailJS */}
        <div className={`contact-form-overlay ${showForm ? "active" : ""}`}>
          <div className="contact-form-modal">
            <div className="form-header">
              <h3>Send Me a Message</h3>
              <button onClick={toggleForm} className="close-btn">
                <i className="fas fa-times"></i>
              </button>
            </div>

            {/* Success/Error Message */}
            {message.text && (
              <div className={`form-message ${message.type}`}>
                <i
                  className={
                    message.type === "success"
                      ? "fas fa-check-circle"
                      : "fas fa-exclamation-circle"
                  }
                ></i>
                <div className="message-content">
                  <span>{message.text}</span>
                  {message.type === "error" && (
                    <button
                      type="button"
                      onClick={handleDirectContact}
                      className="btn btn-ghost btn-small"
                      style={{
                        marginTop: "8px",
                        fontSize: "0.8rem",
                        padding: "4px 12px",
                      }}
                    >
                      <i className="fas fa-envelope"></i>
                      <span>Email Directly</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* EmailJS Contact Form */}
            <form ref={form} onSubmit={sendEmail} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="user_name">Name</label>
                  <input
                    type="text"
                    id="user_name"
                    name="user_name"
                    required
                    placeholder="Your full name"
                    disabled={isLoading}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="user_email">Contact Info</label>
                  <input
                    type="email"
                    id="user_email"
                    name="user_email"
                    required
                    placeholder="Email or Phone number"
                    disabled={isLoading}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="6"
                  placeholder="Tell me about your project, ideas, or just say hello!"
                  disabled={isLoading}
                ></textarea>
              </div>
              <div className="form-actions">
                <button
                  type="button"
                  onClick={toggleForm}
                  className="btn btn-secondary"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane"></i>
                      <span>Send Message</span>
                    </>
                  )} 
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      icon: "fab fa-github",
      url: "https://github.com/Abdulrazaq-Webdev",
    },
    {
      name: "LinkedIn",
      icon: "fab fa-linkedin-in",
      url: "https://www.linkedin.com/in/adewunmi-abdulrazaq-olusegun-8a3078249",
    },
    {
      name: "Twitter",
      icon: "fab fa-twitter",
      url: "https://x.com/abdulrazaq_dev",
    },
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-bracket" mx-auto>{"<"}</span>
              AbdulrazaqDev
              <span className="logo-bracket">{"/>"}</span>
            </div>
          </div>
          <nav className="footer-nav">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="footer-social">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                className="footer-social-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className={social.icon}></i>
              </a>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} AbdulrazaqDev. Built with passion
            and powered by coffee.
          </p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState("");

  const loadingTexts = [
    "Initializing...",
    "Loading components...",
    "Compiling styles...",
    "Almost ready...",
    "Welcome!",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const textIndex = Math.floor((progress / 100) * (loadingTexts.length - 1));
    setText(loadingTexts[textIndex]);
  }, [progress]);

  if (isLoading) {
    return <LoadingScreen progress={progress} text={text} />;
  }

  return (
    <div className="app">
      <div className="grid-background"></div>
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
