import React from 'react';
import './StatisticsPanel.css';

const StatisticsPanel = ({
  statistics = {},
  animationState = {},
  algorithm = '',
  array = []
}) => {
  // ✅ Safely extract all values with defaults
  const {
    comparisons = 0,
    swaps = 0,
    steps = 0,
    duration = 0
  } = statistics;

  const {
    progress = 0,
    currentStep = 0,
    totalSteps = 0
  } = animationState;

  // ✅ Calculate safely — never call .toFixed() on undefined
  const operationsPerSecond = duration > 0
    ? ((steps / (duration / 1000)) || 0).toFixed(1)
    : '0.0';

  const formattedDuration = (duration / 1000).toFixed(2);

  const stats = [
    {
      icon: '📋',
      label: 'Array Size',
      value: array.length || 0,
      description: 'Number of elements'
    },
    {
      icon: '🔍',
      label: 'Comparisons',
      value: comparisons,
      description: 'Element comparisons made'
    },
    {
      icon: '🔄',
      label: 'Swaps',
      value: swaps,
      description: 'Element swaps performed'
    },
    {
      icon: '⏱️',
      label: 'Duration',
      value: `${formattedDuration}s`,
      description: 'Total elapsed time'
    },
    {
      icon: '📈',
      label: 'Steps',
      value: steps,
      description: 'Animation steps executed'
    },
    {
      icon: '📊',
      label: 'Progress',
      value: `${progress.toFixed(1)}%`,
      description: 'Sorting completion'
    },
    {
      icon: '⚡',
      label: 'Speed',
      value: `${operationsPerSecond} ops/s`,
      description: 'Operations per second'
    }
  ];

  return (
    <div className="statistics-panel">
      <div className="panel-header">
        <h3 className="panel-title">
          <span className="panel-icon">📊</span>
          Real-time Statistics
        </h3>
        <div className="algorithm-indicator">
          {algorithm ? algorithm.replace('Sort', '') : 'No Algorithm'}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-container">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <div className="stat-icon-wrapper">
                <span className="stat-icon">{stat.icon}</span>
              </div>
              <div className="stat-content">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
                <div className="stat-description">{stat.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress-section">
        <div className="progress-header">
          <span>Sorting Progress</span>
          <span>{progress.toFixed(1)}%</span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="progress-steps">
          Step {currentStep} of {totalSteps}
        </div>
      </div>
    </div>
  );
};

export default StatisticsPanel;
