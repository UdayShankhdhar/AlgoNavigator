import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaSortAmountDown, FaRoute, FaSlidersH } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const FeatureCards = ({ theme }) => {
  const navigate = useNavigate();
  const [flipped, setFlipped] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const cards = [
    {
      id: 1,
      title: "Sorting Visualizer",
      icon: <FaSortAmountDown size={38} />,
      desc: "Visualize Bubble Sort, Quick Sort, Merge Sort with real-time animations and step-by-step explanations.",
      btn: "Explore Sorting",
      link: "/sorting",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      glowColor: "rgba(102, 126, 234, 0.6)",
      micro: (
        <div style={{ display: "flex", gap: "4px", alignItems: "flex-end", height: "40px" }}>
          {[10, 20, 30, 15, 25].map((h, i) => (
            <motion.div
              key={i}
              style={{
                width: "6px",
                height: `${h}px`,
                background: "white",
                borderRadius: "3px",
              }}
              animate={{ height: [h, Math.random() * 35 + 10, h] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </div>
      ),
    },
    {
      id: 2,
      title: "Pathfinding Visualizer",
      icon: <FaRoute size={38} />,
      desc: "Explore Dijkstra, A*, BFS algorithms with interactive grids, obstacles, and shortest path visualization.",
      btn: "Explore Pathfinding",
      link: "/pathfinding",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      glowColor: "rgba(240, 147, 251, 0.6)",
      micro: (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 10px)", gap: "5px" }}>
          {[...Array(9)].map((_, i) => (
            <motion.div
              key={i}
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "2px",
                background: "white",
                opacity: 0.3,
              }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </div>
      ),
    },
    {
      id: 3,
      title: "Interactive Controls",
      icon: <FaSlidersH size={38} />,
      desc: "Full control over animations with play/pause, speed adjustment, and custom data input capabilities.",
      btn: "Try Now",
      link: "/sorting",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      glowColor: "rgba(79, 172, 254, 0.6)",
      micro: (
        <motion.div
          style={{
            width: "80%",
            height: "6px",
            borderRadius: "3px",
            background: "rgba(255,255,255,0.4)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <motion.div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: "30%",
              background: "white",
              borderRadius: "3px",
            }}
            animate={{ x: ["0%", "70%", "0%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      ),
    },
  ];

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "2rem",
    justifyItems: "center",
  };

  return (
    <section style={{ 
      background: "transparent", 
      textAlign: "center",
      padding: "4rem 1.5rem 6rem" // bottom padding to lift above footer
    }}>
      
      {/* MAIN HEADING WITH CENTER-TO-ENDS UNDERLINE */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "3rem",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div style={{ position: "relative", display: "inline-block" }}>
          <h2
            style={{
              fontSize: "2.8rem",
              fontWeight: "800",
              background: "linear-gradient(90deg, #60a5fa, #a78bfa, #f472b6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "1.5rem",
              letterSpacing: "-0.5px",
              textShadow: "0 2px 10px rgba(0,0,0,0.3)",
            }}
          >
            Discover Algorithm Magic
          </h2>
          
          {/* DRAMATIC CENTER-TO-ENDS UNDERLINE */}
          <div style={{
            position: "absolute",
            bottom: "-8px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "80%", // underline width limited to text
            overflow: "hidden",
          }}>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              style={{
                height: "4px",
                background: "linear-gradient(90deg, #60a5fa, #a78bfa)",
                borderRadius: "2px",
                boxShadow: "0 2px 8px rgba(96, 165, 250, 0.4)",
                transformOrigin: "center",
              }}
            />
          </div>
        </div>
      </motion.div>

      {/* SUBTITLE */}
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        style={{
          fontSize: "1.2rem",
          color: theme === "dark" ? "rgba(255,255,255,0.75)" : "rgba(0,0,0,0.65)",
          maxWidth: "600px",
          margin: "2rem auto 4rem auto", // more bottom margin
          lineHeight: "1.6",
          position: "relative",
          zIndex: 10,
        }}
      >
        Interactive visualizations that bring algorithms to life. 
        Explore, learn, and master sorting and pathfinding techniques.
      </motion.p>

      {/* CARDS GRID */}
      <div style={gridStyle}>
        {cards.map((card) => (
          <motion.div
            key={card.id}
            onMouseEnter={() => {
              setFlipped(card.id);
              setHoveredCard(card.id);
            }}
            onMouseLeave={() => {
              setFlipped(null);
              setHoveredCard(null);
            }}
            style={{
              perspective: "1000px",
              width: "100%",
              maxWidth: "320px",
              position: "relative",
            }}
          >
            {/* GLOW EFFECT */}
            <motion.div
              animate={{
                opacity: hoveredCard === card.id ? 1 : 0,
                scale: hoveredCard === card.id ? 1.1 : 1,
              }}
              transition={{ duration: 0.3 }}
              style={{
                position: "absolute",
                top: "-10px",
                left: "-10px",
                right: "-10px",
                bottom: "-10px",
                background: card.glowColor,
                borderRadius: "30px",
                filter: "blur(20px)",
                zIndex: -1,
              }}
            />

            {/* PARTICLE EFFECTS */}
            {hoveredCard === card.id && (
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: "20px",
                overflow: "hidden",
                zIndex: 0,
              }}>
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    style={{
                      position: "absolute",
                      width: "4px",
                      height: "4px",
                      background: "white",
                      borderRadius: "50%",
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      opacity: [0, 0.8, 0],
                      scale: [0, 1.5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </div>
            )}

            <motion.div
              animate={{ rotateY: flipped === card.id ? 180 : 0 }}
              transition={{ duration: 0.7 }}
              style={{
                position: "relative",
                transformStyle: "preserve-3d",
                width: "100%",
                height: "280px",
                zIndex: 1,
              }}
            >
              {/* FRONT SIDE */}
              <motion.div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: card.gradient,
                  color: "white",
                  borderRadius: "20px",
                  boxShadow: hoveredCard === card.id 
                    ? `0 8px 30px rgba(0,0,0,0.4), 0 0 30px ${card.glowColor}`
                    : "0 4px 20px rgba(0,0,0,0.3), 0 0 20px rgba(255,255,255,0.1)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "1rem",
                  backfaceVisibility: "hidden",
                  backdropFilter: "blur(12px)",
                  border: hoveredCard === card.id 
                    ? `2px solid ${card.glowColor}`
                    : "2px solid rgba(255,255,255,0.1)",
                  transition: "all 0.3s ease",
                }}
              >
                {card.icon}
                <h3 style={{ fontSize: "1.4rem", fontWeight: "600" }}>{card.title}</h3>
                {card.micro}
              </motion.div>

              {/* BACK SIDE */}
              <motion.div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: card.gradient,
                  color: "white",
                  borderRadius: "20px",
                  boxShadow: hoveredCard === card.id 
                    ? `0 12px 40px rgba(0,0,0,0.5), 0 0 40px ${card.glowColor}`
                    : "0 8px 25px rgba(0,0,0,0.4), 0 0 25px rgba(255,255,255,0.15)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "1rem",
                  textAlign: "center",
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  border: hoveredCard === card.id 
                    ? `2px solid ${card.glowColor}`
                    : "2px solid rgba(255,255,255,0.1)",
                  transition: "all 0.3s ease",
                }}
              >
                <p style={{ fontSize: "0.9rem", opacity: 0.9 }}>{card.desc}</p>
                <motion.button
                  onClick={() => navigate(card.link)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    marginTop: "1rem",
                    padding: "0.6rem 1.2rem",
                    borderRadius: "10px",
                    border: "none",
                    background: "rgba(255,255,255,0.9)",
                    color: "#111",
                    cursor: "pointer",
                    fontWeight: "600",
                    boxShadow: hoveredCard === card.id 
                      ? `0 0 20px ${card.glowColor}`
                      : "0 0 12px rgba(255,255,255,0.3)",
                    transition: "all 0.3s ease",
                  }}
                >
                  {card.btn}
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeatureCards;
