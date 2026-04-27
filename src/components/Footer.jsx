import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FaGithub, 
  FaLinkedin, 
  FaTwitter, 
  FaHeart, 
  FaCode,
  FaSort,
  FaRoute,
  FaReact,
  FaNodeJs,
  FaFigma
} from "react-icons/fa";
import { SiTypescript, SiTailwindcss } from "react-icons/si";

const Footer = ({ theme }) => {
  const currentYear = new Date().getFullYear();

  // Footer data
  const footerSections = [
    {
      title: "AlgoNavigator",
      links: [
        { name: "About Project", path: "/about" },
        { name: "Features", path: "/#features" },
        { name: "Documentation", path: "/docs" },
      ],
    },
    {
      title: "Algorithms",
      links: [
        { name: "Sorting Algorithms", path: "/sorting" },
        { name: "Pathfinding Algorithms", path: "/pathfinding" },
        { name: "Algorithm Complexity", path: "/complexity" },
      ],
    },
    {
      title: "Developers",
      links: [
        { name: "GitHub Repository", path: "https://github.com/yourusername/algonavigator" },
        { name: "Contribute", path: "/contribute" },
        { name: "Issues", path: "/issues" },
      ],
    },
  ];

  const techStack = [
    { icon: <FaReact />, name: "React", color: "#61DAFB" },
    { icon: <SiTypescript />, name: "TypeScript", color: "#3178C6" },
    { icon: <SiTailwindcss />, name: "Tailwind", color: "#06B6D4" },
    { icon: <FaNodeJs />, name: "Node.js", color: "#339933" },
    { icon: <FaFigma />, name: "Framer Motion", color: "#0055FF" },
  ];

  const socialLinks = [
    { icon: <FaGithub />, name: "GitHub", url: "https://github.com/yourusername", color: "#333" },
    { icon: <FaLinkedin />, name: "LinkedIn", url: "https://linkedin.com/in/yourprofile", color: "#0077B5" },
    { icon: <FaTwitter />, name: "Twitter", url: "https://twitter.com/yourhandle", color: "#1DA1F2" },
  ];

  // Theme-based styles
  const footerStyle = {
    background: theme === "dark" 
      ? "rgba(17, 25, 40, 0.85)" 
      : "rgba(255, 255, 255, 0.85)",
    backdropFilter: "blur(20px) saturate(180%)",
    borderTop: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
    color: theme === "dark" ? "white" : "#1a202c",
    fontFamily: "system-ui, sans-serif",
  };

  const sectionTitleStyle = {
    color: theme === "dark" ? "white" : "#2d3748",
    fontWeight: "600",
    marginBottom: "1rem",
    fontSize: "1.1rem",
  };

  const linkStyle = {
    color: theme === "dark" ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)",
    textDecoration: "none",
    transition: "all 0.3s ease",
    display: "block",
    marginBottom: "0.5rem",
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={footerStyle}
      className="footer-container"
    >
      {/* Main Footer Content */}
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "3rem 1.5rem 2rem",
      }}>
        {/* Top Section - Links Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "2rem",
          marginBottom: "3rem",
        }}>
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "1rem",
              fontSize: "1.5rem",
              fontWeight: "bold",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              <FaCode />
              AlgoNavigator
            </div>
            <p style={{
              color: theme === "dark" ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)",
              lineHeight: "1.6",
              marginBottom: "1.5rem",
            }}>
              Visualize algorithms in action. Understand the logic behind sorting and pathfinding through interactive animations.
            </p>
            
            {/* Tech Stack */}
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  style={{
                    background: theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
                    padding: "0.5rem",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                    fontSize: "0.875rem",
                  }}
                  title={tech.name}
                >
                  <span style={{ color: tech.color }}>{tech.icon}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Links Sections */}
          {footerSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + sectionIndex * 0.1 }}
            >
              <h4 style={sectionTitleStyle}>{section.title}</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {section.links.map((link, linkIndex) => (
                  <motion.div
                    key={link.name}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <Link
                      to={link.path}
                      style={linkStyle}
                      onMouseEnter={(e) => {
                        e.target.style.color = theme === "dark" ? "white" : "#2d3748";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = theme === "dark" ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)";
                      }}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <div style={{
          borderTop: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
          paddingTop: "2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
        }}>
          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{ display: "flex", gap: "1rem" }}
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.2, color: social.color }}
                transition={{ 
                  type: "spring", 
                  stiffness: 400, 
                  damping: 17,
                  delay: 0.5 + index * 0.1 
                }}
                style={{
                  color: theme === "dark" ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)",
                  fontSize: "1.5rem",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                }}
                title={social.name}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            style={{
              textAlign: "center",
              color: theme === "dark" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)",
            }}
          >
            <p style={{ margin: 0, display: "flex", alignItems: "center", gap: "0.5rem", justifyContent: "center" }}>
              © {currentYear} AlgoNavigator. Made with <FaHeart style={{ color: "#e53e3e" }} /> by{" "}
              <span style={{ 
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: "600"
              }}>
                Tanmay Singh
              </span>
            </p>
            <p style={{ margin: "0.5rem 0 0 0", fontSize: "0.875rem" }}>
              Built with React, React Router, Framer Motion & lots of{" "}
              <span style={{ 
                background: "linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                passion
              </span>
            </p>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;