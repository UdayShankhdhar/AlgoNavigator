import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so next render shows fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("🛑 Error caught by ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            textAlign: "center",
            padding: "3rem",
            color: "#ff5555",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          <h1>⚠️ Oops! Something went wrong.</h1>
          <p>Try refreshing the page or returning to the Home screen.</p>
          <button
            style={{
              marginTop: "1rem",
              padding: "0.6rem 1.2rem",
              background: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
