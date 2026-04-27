import React, { useState, useEffect } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const HeroSection = ({ theme }) => {
  const [engineReady, setEngineReady] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [ripple, setRipple] = useState({ active: false, x: 0, y: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const initEngine = async () => {
      await initParticlesEngine(async (engine) => {
        await loadSlim(engine);
      });
      setEngineReady(true);
    };
    initEngine();
  }, []);

  const handleRipple = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRipple({ active: true, x, y });
    setTimeout(() => setRipple({ active: false, x: 0, y: 0 }), 500);
  };

  const rippleStyle = {
    position: "absolute",
    width: "20px",
    height: "20px",
    background: "rgba(255, 255, 255, 0.5)",
    borderRadius: "50%",
    transform: "scale(0)",
    animation: ripple.active ? "ripple 0.5s linear" : "none",
    left: ripple.x,
    top: ripple.y,
    pointerEvents: "none",
  };

  const particlesOptions = {
    background: {
      color: { value: theme === "dark" ? "#0d1117" : "#f8fafc" },
    },
    fpsLimit: 120,
    interactivity: {
      events: { onHover: { enable: true, mode: "repulse" }, resize: true },
      modes: { repulse: { distance: 100, duration: 0.4 } },
    },
    particles: {
      color: { value: theme === "dark" ? "#ffffff" : "#374151" },
      links: {
        color: theme === "dark" ? "#ffffff" : "#374151",
        distance: 150,
        enable: true,
        opacity: 0.3,
        width: 1,
      },
      move: { enable: true, speed: 1.5, outModes: "bounce" },
      number: { value: 70, density: { enable: true, area: 800 } },
      opacity: { value: 0.4 },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 4 } },
    },
    detectRetina: true,
  };

  if (!engineReady) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          color: "white",
          background: theme === "dark" ? "#0d1117" : "#f8fafc",
        }}
      >
        Loading visualizer...
      </div>
    );
  }

  const baseButton = {
    padding: "0.75rem 1.5rem",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "600",
    transition: "all 0.3s ease",
    position: "relative",
    overflow: "hidden",
    outline: "none",
  };

  const sortingButton = {
    ...baseButton,
    background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
    color: "white",
    boxShadow: "0 4px 15px rgba(59, 130, 246, 0.4)",
  };

  const pathfindingButton = {
    ...baseButton,
    background: "linear-gradient(135deg, #10b981, #047857)",
    color: "white",
    boxShadow: "0 4px 15px rgba(16, 185, 129, 0.4)",
  };

  const hoverEffect = {
    transform: "translateY(-3px)",
    boxShadow: "0 8px 25px rgba(255,255,255,0.35)",
    border: "2px solid rgba(255,255,255,0.2)",
  };

  return (
    <section
      style={{
        position: "relative",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: theme === "dark" ? "white" : "#1a202c",
        background: theme === "dark" ? "#0d1117" : "#f8fafc",
        overflow: "hidden",
      }}
    >
      <Particles
        id="tsparticles"
        options={particlesOptions}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{ zIndex: 10 }}
      >
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            marginBottom: "1rem",
            background: "linear-gradient(90deg, #3b82f6, #06b6d4, #22d3ee)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 0 30px rgba(59, 130, 246, 0.3)",
          }}
        >
          AlgoNavigator
        </h1>
        <p
          style={{
            fontSize: "1.125rem",
            marginBottom: "2rem",
            opacity: 0.8,
          }}
        >
          Visualize Sorting & Pathfinding Algorithms like never before!
        </p>

        <div
          style={{ display: "flex", gap: "1rem", justifyContent: "center" }}
        >
          {/* 🧮 Sorting Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              handleRipple(e);
              navigate("/sorting");
            }}
            onMouseEnter={() => setHovered("sorting")}
            onMouseLeave={() => setHovered(null)}
            style={{
              ...(hovered === "sorting"
                ? { ...sortingButton, ...hoverEffect }
                : sortingButton),
            }}
          >
            🧮 Explore Sorting
            {ripple.active && <span style={rippleStyle} />}
          </motion.button>

          {/* 🗺️ Pathfinding Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              handleRipple(e);
              navigate("/pathfinding");
            }}
            onMouseEnter={() => setHovered("pathfinding")}
            onMouseLeave={() => setHovered(null)}
            style={{
              ...(hovered === "pathfinding"
                ? { ...pathfindingButton, ...hoverEffect }
                : pathfindingButton),
            }}
          >
            🗺️ Explore Pathfinding
            {ripple.active && <span style={rippleStyle} />}
          </motion.button>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          color:
            theme === "dark"
              ? "rgba(255,255,255,0.6)"
              : "rgba(0,0,0,0.6)",
          fontSize: "0.9rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          zIndex: 10,
        }}
      >
        <span>Scroll to explore features</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{
            width: "2px",
            height: "20px",
            background:
              theme === "dark"
                ? "rgba(255,255,255,0.6)"
                : "rgba(0,0,0,0.6)",
            borderRadius: "1px",
          }}
        />
      </motion.div>

      {/* Ripple Animation */}
      <style>{`
        @keyframes ripple {
          to {
            transform: scale(15);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
