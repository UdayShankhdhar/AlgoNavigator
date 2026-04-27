import React from 'react';
import algorithmData from '../utils/algorithmData.js'; // ← FIXED PATH
import './AlgorithmInfoPanel.css';

const AlgorithmInfoPanel = ({ algorithm }) => {
  const data = algorithmData[algorithm];

  if (!data) {
    return (
      <div className="algorithm-info-panel">
        <div className="panel-header">
          <h3>ℹ️ Algorithm Information</h3>
        </div>
        <div className="no-algorithm">
          <p>No information available for: <strong>{algorithm}</strong></p>
          <p className="error-help">Please check the algorithm data configuration.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="algorithm-info-panel">
      <div className="panel-header">
        <div className="algorithm-title">
          <span className="algorithm-icon">{data.icon}</span>
          <h3>{data.name}</h3>
        </div>
        <div className={`stability-badge ${data.stability.toLowerCase()}`}>
          {data.stability}
        </div>
      </div>

      <div className="algorithm-content">
        {/* Description */}
        <div className="info-section">
          <h4>Description</h4>
          <p>{data.description}</p>
        </div>

        {/* Complexity */}
        <div className="info-section">
          <h4>Time Complexity</h4>
          <div className="complexity-grid">
            <div className="complexity-item">
              <span className="complexity-label">Best Case:</span>
              <span className="complexity-value best">{data.timeComplexity.best}</span>
            </div>
            <div className="complexity-item">
              <span className="complexity-label">Average Case:</span>
              <span className="complexity-value average">{data.timeComplexity.average}</span>
            </div>
            <div className="complexity-item">
              <span className="complexity-label">Worst Case:</span>
              <span className="complexity-value worst">{data.timeComplexity.worst}</span>
            </div>
          </div>
        </div>

        <div className="info-section">
          <h4>Space Complexity</h4>
          <div className="space-complexity">
            <span className="complexity-value">{data.spaceComplexity}</span>
            <span className={`in-place-tag ${data.inPlace ? 'yes' : 'no'}`}>
              {data.inPlace ? 'In-place' : 'Not in-place'}
            </span>
          </div>
        </div>

        {/* Use Cases */}
        <div className="info-section">
          <h4>Use Cases</h4>
          <ul className="use-cases-list">
            {data.useCases.map((useCase, index) => (
              <li key={index}>{useCase}</li>
            ))}
          </ul>
        </div>

        {/* Best/Worst Case */}
        <div className="info-section">
          <h4>Performance Characteristics</h4>
          <div className="performance-grid">
            <div className="performance-item">
              <span className="performance-label">Best Case Scenario:</span>
              <span className="performance-value">{data.bestCase}</span>
            </div>
            <div className="performance-item">
              <span className="performance-label">Worst Case Scenario:</span>
              <span className="performance-value">{data.worstCase}</span>
            </div>
          </div>
        </div>

        {/* Algorithm Properties */}
        <div className="info-section">
          <h4>Properties</h4>
          <div className="properties-grid">
            <div className="property-item">
              <span className="property-label">Stability:</span>
              <span className={`property-value ${data.stability.toLowerCase()}`}>
                {data.stability}
              </span>
            </div>
            <div className="property-item">
              <span className="property-label">In-place:</span>
              <span className={`property-value ${data.inPlace ? 'yes' : 'no'}`}>
                {data.inPlace ? 'Yes' : 'No'}
              </span>
            </div>
            <div className="property-item">
              <span className="property-label">Category:</span>
              <span className="property-value">
                {algorithm.includes('Sort') ? 'Comparison Sort' : 'Specialized Sort'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmInfoPanel;