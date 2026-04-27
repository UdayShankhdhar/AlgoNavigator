import React from 'react';

const CustomArrayInput = ({ 
  customInput, 
  setCustomInput, 
  errorMessage, 
  isInputValid, 
  onSetArray, 
  isSorting,
  currentArraySize 
}) => {
  const handleInputChange = (e) => {
    // Only allow numbers, commas, and spaces
    const value = e.target.value.replace(/[^\d,\s]/g, '');
    setCustomInput(value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && isInputValid && !isSorting) {
      onSetArray();
    }
  };

  const getInputStatus = () => {
    if (!customInput.trim()) return 'empty';
    if (errorMessage) return 'error';
    if (isInputValid) return 'valid';
    return 'typing';
  };

  const inputStatus = getInputStatus();

  return (
    <div className="custom-array-input">
      <h3>🎯 Custom Array Input</h3>
      
      <div className="input-container">
        <div className="input-group">
          <div className="input-wrapper">
            <input
              type="text"
              value={customInput}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Enter numbers separated by commas (e.g., 34, 67, 23, 89, 12)"
              disabled={isSorting}
              className={`custom-input ${inputStatus}`}
            />
            {inputStatus === 'valid' && (
              <div className="input-status valid">✓ Ready to set</div>
            )}
            {inputStatus === 'typing' && customInput.trim() && (
              <div className="input-status typing">⏳ Validating...</div>
            )}
          </div>
          <button 
            onClick={onSetArray}
            disabled={isSorting || !isInputValid}
            className={`btn btn-set-array ${isInputValid ? 'pulse' : ''}`}
            title={isInputValid ? "Set custom array" : "Please enter valid input"}
          >
            {isInputValid ? '✅ Set Array' : 'Set Array'}
          </button>
        </div>
        
        {errorMessage && (
          <div className="error-message">
            ⚠️ {errorMessage}
          </div>
        )}
      </div>

      <div className="input-guidelines">
        <div className="guideline">
          <span className="guideline-icon">🔢</span>
          <span>Numbers: 1 - 100</span>
        </div>
        <div className="guideline">
          <span className="guideline-icon">📏</span>
          <span>Elements: 3 - 50</span>
        </div>
        <div className="guideline">
          <span className="guideline-icon">💡</span>
          <span>Example: <code>23, 45, 12, 89, 5, 67, 34</code></span>
        </div>
        <div className="guideline">
          <span className="guideline-icon">🔄</span>
          <span>Current size: {currentArraySize} elements</span>
        </div>
      </div>

      {/* Quick Presets */}
      <div className="quick-presets">
        <h4>Quick Presets:</h4>
        <div className="preset-buttons">
          <button
            onClick={() => setCustomInput('10, 20, 30, 40, 50, 60, 70, 80, 90, 100')}
            disabled={isSorting}
            className="preset-btn"
          >
            Sorted
          </button>
          <button
            onClick={() => setCustomInput('100, 90, 80, 70, 60, 50, 40, 30, 20, 10')}
            disabled={isSorting}
            className="preset-btn"
          >
            Reverse
          </button>
          <button
            onClick={() => setCustomInput('5, 85, 15, 95, 25, 75, 35, 65, 45, 55')}
            disabled={isSorting}
            className="preset-btn"
          >
            Random
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomArrayInput;