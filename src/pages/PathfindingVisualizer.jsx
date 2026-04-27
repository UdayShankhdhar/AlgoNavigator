import React from "react";
// import the visualizer component you created
import PathfindingVisualizerComponent from "../components/PathfindingVisualizer/PathfindingVisualizer";

const PathfindingVisualizer = ({ theme }) => {
  return (
    <div style={{ 
      minHeight: 'calc(100vh - 200px)',
      padding: '2rem',
      background: theme === 'dark' ? '#0a0a0a' : '#f5f5f5',
      color: theme === 'dark' ? 'white' : '#111'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          marginBottom: '1rem',
          background: 'linear-gradient(90deg, #3b82f6, #06b6d4)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Pathfinding Visualizer
        </h1>
        <p style={{ 
          fontSize: '1.2rem',
          color: theme === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)',
          marginBottom: '2rem'
        }}>
          Visualize Dijkstra, A*, BFS, and other pathfinding algorithms
        </p>
        
        <div style={{
          background: theme === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.03)',
          padding: '1rem',
          borderRadius: '12px',
          backdropFilter: 'blur(6px)',
          marginBottom: '1.5rem'
        }}>
        </div>

        {/* Render the actual Pathfinding visualizer component */}
        <div style={{
          background: theme === 'dark' ? 'transparent' : 'transparent',
          padding: '0.5rem',
          borderRadius: '8px'
        }}>
          <PathfindingVisualizerComponent />
        </div>
      </div>
    </div>
  );
};

export default PathfindingVisualizer;
