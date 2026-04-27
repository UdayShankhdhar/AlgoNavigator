import React from 'react';

const VisualizationArea = ({ 
  array = [], 
  visualizationMode = 'bars', 
  isSorting = false, 
  arraySize = 0,
  animationState = {}
}) => {
  const {
    comparingIndices = [],
    swappingIndices = [],
    sortedIndices = [],
    pivotIndex = null,
    currentStep = 0,
    totalSteps = 0,
    progress = 0
  } = animationState;

  const maxValue = Math.max(...array, 100);

  // Dynamic width scaling for bars based on array size
  const getBarWidth = () => {
    if (arraySize <= 10) return `calc(90% / ${arraySize})`;
    if (arraySize <= 20) return `calc(80% / ${arraySize})`;
    if (arraySize <= 30) return `calc(70% / ${arraySize})`;
    if (arraySize <= 40) return `calc(60% / ${arraySize})`;
    return `calc(50% / ${arraySize})`;
  };

  // Dynamic grid columns based on array size
  const getGridColumns = () => {
    if (arraySize <= 10) return 'repeat(auto-fill, minmax(80px, 1fr))';
    if (arraySize <= 20) return 'repeat(auto-fill, minmax(70px, 1fr))';
    if (arraySize <= 30) return 'repeat(auto-fill, minmax(60px, 1fr))';
    if (arraySize <= 40) return 'repeat(auto-fill, minmax(50px, 1fr))';
    return 'repeat(auto-fill, minmax(45px, 1fr))';
  };

  // Get element class based on current animation state
  const getElementClass = (index) => {
    const classes = ['array-element'];
    
    if (comparingIndices.includes(index)) classes.push('comparing');
    if (swappingIndices.includes(index)) classes.push('swapping');
    if (sortedIndices.includes(index)) classes.push('sorted');
    if (pivotIndex === index) classes.push('pivot');
    
    return classes.join(' ');
  };

  const barWidth = getBarWidth();
  const gridTemplateColumns = getGridColumns();

  return (
    <div className="visualization-area">
      <div className="visualization-header">
        <h2>
          {visualizationMode === 'bars' ? '📊 Bar Visualization' : '🔲 Grid Visualization'}
          <span className="array-info"> - {array.length} elements</span>
        </h2>
        <div className="visualization-stats">
          <span className="stat">Min: {array.length ? Math.min(...array) : 0}</span>
          <span className="stat">Max: {array.length ? Math.max(...array) : 0}</span>
          <span className="stat">Range: {array.length ? Math.max(...array) - Math.min(...array) : 0}</span>
          <span className="stat">Progress: {progress?.toFixed ? progress.toFixed(1) : 0}%</span>
        </div>
      </div>

      <div className={`visualization-container ${visualizationMode}`}>
        {visualizationMode === 'bars' ? (
          <div className="bars-container">
            {array.map((value, index) => (
              <div
                key={index}
                className={getElementClass(index)}
                style={{
                  height: `${(value / maxValue) * 85}%`,
                  width: barWidth,
                  transition: 'height 0.3s ease, background-color 0.3s ease, transform 0.3s ease'
                }}
                title={`Value: ${value}, Index: ${index}\nState: ${
                  comparingIndices.includes(index) ? 'Comparing' :
                  swappingIndices.includes(index) ? 'Swapping' :
                  sortedIndices.includes(index) ? 'Sorted' :
                  pivotIndex === index ? 'Pivot' : 'Default'
                }`}
              >
                <span className="bar-value">{value}</span>
              </div>
            ))}
          </div>
        ) : (
          <div 
            className="grid-container"
            style={{ gridTemplateColumns }}
          >
            {array.map((value, index) => (
              <div
                key={index}
                className={getElementClass(index)}
                style={{ transition: 'all 0.3s ease' }}
                title={`Value: ${value}, Index: ${index}\nState: ${
                  comparingIndices.includes(index) ? 'Comparing' :
                  swappingIndices.includes(index) ? 'Swapping' :
                  sortedIndices.includes(index) ? 'Sorted' :
                  pivotIndex === index ? 'Pivot' : 'Default'
                }`}
              >
                <span className="cell-value">{value}</span>
                <div className="cell-index">[{index}]</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isSorting && (
        <div className="sorting-indicator">
          <div className="pulsing-dot"></div>
          <span>
            Sorting in progress - Step {currentStep}/{totalSteps} ({progress?.toFixed ? progress.toFixed(1) : 0}%)
            {pivotIndex !== null && ` - Pivot: ${array[pivotIndex]}`}
          </span>
        </div>
      )}

      <div className="visualization-help">
        <p>
          💡 <strong>Tip:</strong> {
            visualizationMode === 'bars' 
              ? 'Bars show relative heights. Colors indicate: Comparing 🟡, Swapping 🔴, Sorted 🟢, Pivot 🟣'
              : 'Cells show exact values with indices. Colors indicate: Comparing 🟡, Swapping 🔴, Sorted 🟢, Pivot 🟣'
          }
        </p>
      </div>
    </div>
  );
};

export default VisualizationArea;
