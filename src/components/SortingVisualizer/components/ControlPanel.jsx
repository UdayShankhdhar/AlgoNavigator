import React, { useState, useEffect } from 'react';

const ControlPanel = ({
  algorithm,
  setAlgorithm,
  arraySize,
  setArraySize,
  speed,
  setSpeed,
  speedMultiplier,
  isSorting,
  isPaused,
  visualizationMode,
  setVisualizationMode,
  onGenerateArray,
  onStartSorting,
  onPauseResume,
  onReset
}) => {
  const [localArraySize, setLocalArraySize] = useState(arraySize);

  // Debounced array size update
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localArraySize !== arraySize) {
        setArraySize(localArraySize);
      }
    }, 150);
    
    return () => clearTimeout(timer);
  }, [localArraySize, arraySize, setArraySize]);

  // Sync with parent arraySize
  useEffect(() => {
    setLocalArraySize(arraySize);
  }, [arraySize]);

  const handleArraySizeChange = (value) => {
    setLocalArraySize(parseInt(value));
  };

  return (
    <div className="control-panel">
      <div className="control-section">
        <h3>Algorithm Selection</h3>
        <select 
          value={algorithm} 
          onChange={(e) => setAlgorithm(e.target.value)}
          disabled={isSorting}
          className="algorithm-select"
        >
          <option value="bubbleSort">Bubble Sort</option>
          <option value="selectionSort">Selection Sort</option>
          <option value="insertionSort">Insertion Sort</option>
          <option value="mergeSort">Merge Sort</option>
          <option value="quickSort">Quick Sort</option>
          <option value="heapSort">Heap Sort</option>
        </select>
      </div>

      <div className="control-section">
        <h3>Playback Controls</h3>
        <div className="button-group">
          <button 
            onClick={onGenerateArray}
            disabled={isSorting}
            className="btn btn-generate"
            title="Generate new random array"
          >
            🔄 Generate New Array
          </button>
          <button 
            onClick={onStartSorting}
            disabled={isSorting}
            className="btn btn-start"
            title="Start sorting visualization"
          >
            ▶️ Start Sorting
          </button>
          <button 
            onClick={onPauseResume}
            disabled={!isSorting}
            className="btn btn-pause"
            title={isPaused ? 'Resume sorting' : 'Pause sorting'}
          >
            {isPaused ? '⏸️ Resume' : '⏸️ Pause'}
          </button>
          <button 
            onClick={onReset}
            className="btn btn-reset"
            title="Reset to initial state"
          >
            ⏹️ Reset
          </button>
        </div>
      </div>

      <div className="control-section">
        <h3>Visualization Mode</h3>
        <div className="toggle-group">
          <button
            className={`toggle-btn ${visualizationMode === 'bars' ? 'active' : ''}`}
            onClick={() => setVisualizationMode('bars')}
            disabled={isSorting}
            title="Bar visualization mode"
          >
            📊 Bars
          </button>
          <button
            className={`toggle-btn ${visualizationMode === 'grid' ? 'active' : ''}`}
            onClick={() => setVisualizationMode('grid')}
            disabled={isSorting}
            title="Grid visualization mode"
          >
            🔲 Grid
          </button>
        </div>
      </div>

      <div className="control-section">
        <h3>Array Size: {localArraySize} elements</h3>
        <input
          type="range"
          min="5"
          max="50"
          value={localArraySize}
          onChange={(e) => handleArraySizeChange(e.target.value)}
          disabled={isSorting}
          className="slider"
        />
        <div className="slider-labels">
          <span>5</span>
          <span>25</span>
          <span>50</span>
        </div>
        <div className="size-description">
          {localArraySize <= 15 && 'Small - Fast visualization'}
          {localArraySize > 15 && localArraySize <= 30 && 'Medium - Balanced detail'}
          {localArraySize > 30 && 'Large - Detailed process'}
        </div>
      </div>

      <div className="control-section">
        <h3>Speed: {speedMultiplier.toFixed(1)}x</h3>
        <input
          type="range"
          min="1"
          max="100"
          value={speed}
          onChange={(e) => setSpeed(parseInt(e.target.value))}
          className="slider speed-slider"
        />
        <div className="slider-labels">
          <span>0.1x</span>
          <span>2.5x</span>
          <span>5.0x</span>
        </div>
        <div className="speed-description">
          {speed <= 25 && 'Slow - Step by step'}
          {speed > 25 && speed <= 75 && 'Medium - Smooth animation'}
          {speed > 75 && 'Fast - Quick overview'}
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;