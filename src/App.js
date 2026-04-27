import React, { Suspense, lazy, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import "./styles/global.css";

// 🧠 Lazy-loaded pages
const Home = lazy(() => import("./pages/Home"));
const SortingVisualizer = lazy(() => import("./pages/SortingVisualizer"));
const PathfindingVisualizer = lazy(() => import("./pages/PathfindingVisualizer"));
const About = lazy(() => import("./pages/About"));

function App() {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === "dark" ? "light" : "dark");
  };

  return (
    <ErrorBoundary>
      <Router>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          minHeight: '100vh',
          background: theme === 'dark' ? '#0a0a0a' : '#f5f5f5'
        }}>
          <Navbar theme={theme} toggleTheme={toggleTheme} />
          <main style={{ 
            flex: 1, 
            paddingTop: '80px' // Space for fixed navbar
          }}>
            <Suspense fallback={<LoadingScreen />}>
              <Routes>
                <Route path="/" element={<Home theme={theme} />} />
                <Route path="/about" element={<About theme={theme} />} />
                <Route path="/sorting" element={<SortingVisualizer theme={theme} />} />
                <Route path="/pathfinding" element={<PathfindingVisualizer theme={theme} />} />
              </Routes>
            </Suspense>
          </main>
          <Footer key={theme} theme={theme} />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;