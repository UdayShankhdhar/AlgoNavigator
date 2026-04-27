// src/components/SortingVisualizer/utils/themeManager.js

export const ThemeManager = {
  // Theme configurations
  themes: {
    light: {
      name: 'light',
      colors: {
        primary: '#3b82f6',
        secondary: '#ef4444',
        background: '#ffffff',
        surface: '#f8fafc',
        text: '#1e293b',
        textMuted: '#64748b',
        arrayBar: '#3b82f6',
        compared: '#f59e0b',
        swapping: '#ef4444',
        sorted: '#10b981',
        pivot: '#8b5cf6',
        border: '#e2e8f0',
        shadow: 'rgba(0, 0, 0, 0.1)'
      }
    },
    dark: {
      name: 'dark',
      colors: {
        primary: '#3b82f6',
        secondary: '#ef4444',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        surface: 'rgba(30, 41, 59, 0.8)',
        text: '#f1f5f9',
        textMuted: '#94a3b8',
        arrayBar: '#3b82f6',
        compared: '#f59e0b',
        swapping: '#ef4444',
        sorted: '#10b981',
        pivot: '#8b5cf6',
        border: 'rgba(255, 255, 255, 0.1)',
        shadow: 'rgba(0, 0, 0, 0.3)'
      }
    }
  },

  // Get current theme from localStorage or system preference
  getCurrentTheme() {
    const saved = localStorage.getItem('sorting-visualizer-theme');
    if (saved && this.themes[saved]) {
      return this.themes[saved];
    }
    
    // System preference detection
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return this.themes.light;
    }
    
    return this.themes.dark;
  },

  // Save theme preference
  saveTheme(themeName) {
    if (this.themes[themeName]) {
      localStorage.setItem('sorting-visualizer-theme', themeName);
      return true;
    }
    return false;
  },

  // Apply theme to document
  applyTheme(themeName) {
    const theme = this.themes[themeName];
    if (!theme) return;

    const root = document.documentElement;
    
    // Set CSS custom properties
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });

    // Update meta theme color for mobile browsers
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', 
        themeName === 'light' ? '#ffffff' : '#0f172a'
      );
    }

    this.saveTheme(themeName);
  },

  // Initialize theme on app load
  initialize() {
    const currentTheme = this.getCurrentTheme();
    this.applyTheme(currentTheme.name);
    return currentTheme.name;
  },

  // Toggle between light and dark
  toggleTheme(currentTheme) {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme(newTheme);
    return newTheme;
  },

  // Listen for system theme changes
  watchSystemTheme(callback) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    
    const handleChange = (e) => {
      const newTheme = e.matches ? 'light' : 'dark';
      callback(newTheme);
    };

    mediaQuery.addEventListener('change', handleChange);
    
    // Return cleanup function
    return () => mediaQuery.removeEventListener('change', handleChange);
  }
};