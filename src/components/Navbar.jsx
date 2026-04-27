import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaHome, FaSortAmountDown, FaRoute, FaInfoCircle, FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";

const Navbar = ({ theme, toggleTheme }) => { // ✅ USE PROPS
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  const navLinks = [
    { path: "/", label: "Home", icon: <FaHome /> },
    { path: "/sorting", label: "Sorting", icon: <FaSortAmountDown /> },
    { path: "/pathfinding", label: "Pathfinding", icon: <FaRoute /> },
    { path: "/about", label: "About", icon: <FaInfoCircle /> },
  ];

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  // ❌ REMOVE the local toggleTheme function

  // Handle window resize for mobile menu
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 50,
    background: theme === "dark" ? "rgba(17, 25, 40, 0.75)" : "rgba(255,255,255,0.75)",
    backdropFilter: "blur(16px) saturate(180%)",
    borderBottom: "1px solid rgba(255, 255, 255, 0.125)",
    boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
    color: theme === "dark" ? "white" : "#111",
    fontFamily: "system-ui, sans-serif",
  };

  const containerStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.75rem 1.5rem",
  };

  const logoStyle = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    textDecoration: "none",
    background: "linear-gradient(90deg, #3b82f6, #06b6d4, #22d3ee)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  };

  const linkBaseStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    textDecoration: "none",
    padding: "0.75rem 1.25rem",
    borderRadius: "10px",
    fontWeight: 500,
    transition: "all 0.3s ease",
    backgroundClip: "text",
  };

  const activeLinkStyle = {
    background: "linear-gradient(90deg, #3b82f6, #06b6d4, #22d3ee)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };

  const hoverLinkStyle = {
    transform: "translateY(-2px)",
    opacity: 0.85,
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={navStyle}
    >
      <div style={containerStyle}>
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/" style={logoStyle}>
            🧠 AlgoNavigator
          </Link>
        </motion.div>

        {/* Desktop Menu */}
        {!isMobile && (
          <ul style={{ display: "flex", gap: "1rem", listStyle: "none", margin: 0, padding: 0 }}>
            {navLinks.map(({ path, label, icon }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  style={({ isActive }) => ({
                    ...linkBaseStyle,
                    ...(isActive ? activeLinkStyle : {}),
                    ...(hoveredLink === path && !isActive ? hoverLinkStyle : {}),
                    color: theme === "dark" ? "white" : "#111",
                  })}
                  onMouseEnter={() => setHoveredLink(path)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  <span>{icon}</span>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        )}

        {/* Right Buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            style={{ background: "none", border: "none", color: theme === "dark" ? "white" : "#111", fontSize: "1.3rem", cursor: "pointer" }}
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>

          {/* Mobile Menu Toggle */}
          {isMobile && (
            <button
              onClick={toggleMenu}
              style={{ background: "none", border: "none", fontSize: "1.5rem", color: theme === "dark" ? "white" : "#111", cursor: "pointer" }}
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              width: "100%",
              background: theme === "dark" ? "rgba(17,25,40,0.95)" : "rgba(255,255,255,0.95)",
              backdropFilter: "blur(16px)",
              borderTop: "1px solid rgba(255,255,255,0.1)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "1rem 0",
              zIndex: 40,
            }}
          >
            {navLinks.map(({ path, label, icon }) => (
              <NavLink
                key={path}
                to={path}
                style={({ isActive }) => ({
                  ...linkBaseStyle,
                  ...(isActive ? activeLinkStyle : {}),
                  color: theme === "dark" ? "white" : "#111",
                  padding: "0.5rem 1rem",
                })}
                onClick={() => setMenuOpen(false)}
              >
                <span>{icon}</span>
                {label}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;