import React from 'react';

const LegendBar = () => {
  const colorStates = [
    { color: 'default', label: 'Default', description: 'Unsorted elements', emoji: '🔵' },
    { color: 'comparing', label: 'Comparing', description: 'Elements being compared', emoji: '🟡' },
    { color: 'swapping', label: 'Swapping', description: 'Elements being swapped', emoji: '🔴' },
    { color: 'sorted', label: 'Sorted', description: 'Correctly positioned elements', emoji: '🟢' },
    { color: 'pivot', label: 'Pivot', description: 'Quick Sort pivot element', emoji: '🟣' }
  ];

  return (
    <div className="legend-bar">
      <h3>🎨 Color Legend</h3>
      <div className="legend-items">
        {colorStates.map((state, index) => (
          <div key={index} className="legend-item">
            <div className="legend-color">
              <div className={`color-dot ${state.color}`}>
                {state.emoji}
              </div>
            </div>
            <div className="legend-info">
              <div className="legend-label">{state.label}</div>
              <div className="legend-description">{state.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LegendBar;