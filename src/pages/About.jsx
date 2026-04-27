import React from "react";
import { motion } from "framer-motion";

const About = ({ theme }) => {
  const isDark = theme === "dark";

  return (
    <section
      style={{
        minHeight: "100vh",
        padding: "6rem 2rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: isDark
          ? "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)"
          : "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
        color: isDark ? "#f1f5f9" : "#111827",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          maxWidth: "850px",
          background: isDark ? "#1e293b" : "#ffffff",
          borderRadius: "1.5rem",
          padding: "3rem 2rem",
          boxShadow: isDark
            ? "0 0 30px rgba(0, 0, 0, 0.6)"
            : "0 0 20px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "2.8rem",
            fontWeight: "800",
            marginBottom: "1.5rem",
            background: "linear-gradient(to right, #3b82f6, #22d3ee)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          About AlgoNavigator
        </h1>

        <p
          style={{
            fontSize: "1.2rem",
            lineHeight: "1.9",
            marginBottom: "1.5rem",
          }}
        >
          <strong>AlgoNavigator</strong> is an advanced visualization platform
          designed to simplify the learning of <b>Sorting</b> and{" "}
          <b>Pathfinding Algorithms</b>. It helps users understand algorithmic
          logic through dynamic animations, synchronized pseudocode, and
          real-time statistics.
        </p>

        <p
          style={{
            fontSize: "1.15rem",
            lineHeight: "1.9",
            marginBottom: "1.2rem",
          }}
        >
          Built with <b>React.js</b> and <b>Framer Motion</b>, AlgoNavigator
          combines intuitive design with smooth performance. The interface adapts
          to both dark and light themes, providing a distraction-free experience.
        </p>

        <p style={{ fontSize: "1.1rem", lineHeight: "1.8" }}>
          Whether you’re a student, developer, or algorithm enthusiast,
          AlgoNavigator helps you <b>visualize, explore, and master</b> the
          fundamental algorithms that power modern computing.
        </p>
      </motion.div>
    </section>
  );
};

export default About;
