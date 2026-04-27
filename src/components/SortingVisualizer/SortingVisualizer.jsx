import React, { useState, useEffect, useCallback, useRef } from 'react';
import ControlPanel from './components/ControlPanel';
import VisualizationArea from './components/VisualizationArea';
import CustomArrayInput from './components/CustomArrayInput';
import LegendBar from './components/LegendBar';
import StatisticsPanel from './components/StatisticsPanel';
import AlgorithmInfoPanel from './components/AlgorithmInfoPanel';
import PseudocodePanel from './components/PseudocodePanel';
import AnimationEngine from './utils/animationEngine.js';
import { ConfettiAnimation, GreenWaveAnimation } from './utils/confetti';
import bubbleSort from './algorithms/bubbleSort.js';
import selectionSort from './algorithms/selectionSort.js';
import insertionSort from './algorithms/insertionSort.js';
import mergeSort from './algorithms/mergeSort.js';
import quickSort from './algorithms/quickSort.js';
import heapSort from './algorithms/heapSort.js';
import './SortingVisualizer.css';

const SortingVisualizer = () => {
  // Core State
  const [array, setArray] = useState([]);
  const [algorithm, setAlgorithm] = useState('bubbleSort');
  const [arraySize, setArraySize] = useState(20);
  const [speed, setSpeed] = useState(50);
  const [isSorting, setIsSorting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [visualizationMode, setVisualizationMode] = useState('bars');
  const [customInput, setCustomInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isInputValid, setIsInputValid] = useState(false);

  // Animation State
  const [currentAnimation, setCurrentAnimation] = useState(null);
  const [animationState, setAnimationState] = useState({
    comparingIndices: [],
    swappingIndices: [],
    sortedIndices: [],
    pivotIndex: null,
    currentStep: 0,
    totalSteps: 0,
    progress: 0
  });

  // Statistics State
  const [statistics, setStatistics] = useState({
    comparisons: 0,
    swaps: 0,
    steps: 0,
    duration: 0
  });

  // Refs
  const animationEngine = useRef(new AnimationEngine());
  const startTime = useRef(null);
  const algorithmMap = useRef({
    bubbleSort,
    selectionSort,
    insertionSort,
    mergeSort,
    quickSort,
    heapSort
  });

  // Initialize with random array
  useEffect(() => {
    generateRandomArray();
  }, [arraySize]);

  // Initialize animation engine callbacks
  useEffect(() => {
    const engine = animationEngine.current;

    engine.init(
      [], // Empty initial steps
      handleAnimationStep,
      handleAnimationComplete,
      handleAnimationPause
    );

    return () => {
      engine.destroy();
    };
  }, []);

  // Generate random array
  const generateRandomArray = useCallback(() => {
    const newArray = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push(Math.floor(Math.random() * 96) + 5);
    }
    setArray(newArray);
    setErrorMessage('');
    resetUIState();
  }, [arraySize]);

  // Real-time custom input validation
  const validateCustomInput = useCallback((input) => {
    if (!input.trim()) return { isValid: false, error: '', array: null };

    const numbers = input.split(',').map(num => num.trim()).filter(num => num !== '');
    if (numbers.length < 3)
      return { isValid: false, error: `Minimum 3 elements required.`, array: null };
    if (numbers.length > 50)
      return { isValid: false, error: `Maximum 50 elements allowed.`, array: null };

    const parsedArray = [];
    for (let i = 0; i < numbers.length; i++) {
      const num = parseInt(numbers[i]);
      if (isNaN(num)) return { isValid: false, error: `"${numbers[i]}" is not valid.`, array: null };
      if (num < 1 || num > 100)
        return { isValid: false, error: `Numbers must be between 1–100. Found: ${num}`, array: null };
      parsedArray.push(num);
    }

    return { isValid: true, error: '', array: parsedArray, size: parsedArray.length };
  }, []);

  // Custom input handlers
  const handleSetCustomArray = () => {
    const validation = validateCustomInput(customInput);
    if (validation.isValid) {
      setArray(validation.array);
      setArraySize(validation.size);
      setErrorMessage('');
      resetUIState();
    } else setErrorMessage(validation.error);
  };

  const handleCustomInputChange = (value) => {
    setCustomInput(value);
    const validation = validateCustomInput(value);
    setIsInputValid(validation.isValid);
    if (validation.error && value.trim()) setErrorMessage(validation.error);
    else if (errorMessage) setErrorMessage('');
  };

  // Reset UI
  const resetUIState = useCallback(() => {
    setIsSorting(false);
    setIsPaused(false);
    setErrorMessage('');
    setCurrentAnimation(null);
    setAnimationState({
      comparingIndices: [],
      swappingIndices: [],
      sortedIndices: [],
      pivotIndex: null,
      currentStep: 0,
      totalSteps: 0,
      progress: 0
    });
    setStatistics({ comparisons: 0, swaps: 0, steps: 0, duration: 0 });
    animationEngine.current.reset();
    setArray(prevArray => [...prevArray]);
  }, []);

  // ✅ UPDATED: Real-time statistics update inside handleAnimationStep
  const handleAnimationStep = (step, action) => {
    if (!step) return;

    setAnimationState(prev => {
      const newState = { ...prev };
      switch (step.type) {
        case 'compare':
          newState.comparingIndices = step.indices;
          break;
        case 'swap':
          newState.swappingIndices = step.indices;
          break;
        case 'overwrite':
          if (step.values && step.indices) {
            setArray(prevArray => {
              const newArray = [...prevArray];
              step.indices.forEach((index, i) => {
                if (step.values[i] !== undefined) newArray[index] = step.values[i];
              });
              return newArray;
            });
          }
          break;
        case 'markSorted':
          newState.sortedIndices = [...new Set([...prev.sortedIndices, ...step.indices])];
          break;
        case 'pivot':
          newState.pivotIndex = step.indices[0];
          break;
        case 'reset':
          newState.comparingIndices = prev.comparingIndices.filter(i => !step.indices.includes(i));
          newState.swappingIndices = prev.swappingIndices.filter(i => !step.indices.includes(i));
          if (step.indices.includes(prev.pivotIndex)) newState.pivotIndex = null;
          break;
        case 'initial':
          newState.comparingIndices = [];
          newState.swappingIndices = [];
          newState.sortedIndices = [];
          newState.pivotIndex = null;
          break;
        default:
          break;
      }

      const engineState = animationEngine.current.getState();
      newState.currentStep = engineState.currentStep;
      newState.totalSteps = engineState.totalSteps;
      newState.progress = engineState.progress;
      return newState;
    });

    // ✅ Real-time counter updates
    setStatistics(prev => {
      const newStats = { ...prev };
      if (step.type === 'compare') newStats.comparisons += 1;
      if (step.type === 'swap') newStats.swaps += 1;
      newStats.steps += 1;
      newStats.duration = Date.now() - startTime.current;
      return newStats;
    });
  };

  const handleAnimationComplete = () => {
    setIsSorting(false);
    setIsPaused(false);
    setAnimationState(prev => ({
      ...prev,
      comparingIndices: [],
      swappingIndices: [],
      sortedIndices: Array.from({ length: array.length }, (_, i) => i),
      pivotIndex: null,
      progress: 100
    }));

    if (currentAnimation && currentAnimation.counters) {
      setStatistics(prev => ({
        ...prev,
        comparisons: currentAnimation.counters.comparisons,
        swaps: currentAnimation.counters.swaps,
        duration: Date.now() - startTime.current
      }));
    }

    setTimeout(() => {
      const container = document.querySelector('.visualization-container');
      if (container) new GreenWaveAnimation(container).start();
      ConfettiAnimation.celebrate(3000);
    }, 500);
  };

  const handleAnimationPause = () => setIsPaused(true);

  const handleStartSorting = () => {
    if (array.length === 0 || isSorting) return;
    const algorithmFunction = algorithmMap.current[algorithm];
    if (!algorithmFunction) {
      setErrorMessage(`Algorithm "${algorithm}" not found`);
      return;
    }

    try {
      const animationData = algorithmFunction(array);
      if (!animationData || !Array.isArray(animationData.animations))
        throw new Error('Algorithm did not return valid animation data');

      setCurrentAnimation(animationData);
      animationEngine.current.init(
        animationData.animations,
        handleAnimationStep,
        handleAnimationComplete,
        handleAnimationPause
      );

      animationEngine.current.setSpeed(getSpeedMultiplier());
      setIsSorting(true);
      setIsPaused(false);
      startTime.current = Date.now();

      setStatistics({ comparisons: 0, swaps: 0, steps: 0, duration: 0 });
      setAnimationState(prev => ({
        ...prev,
        currentStep: 0,
        totalSteps: animationData.animations.length,
        progress: 0
      }));

      animationEngine.current.start();
    } catch (error) {
      console.error('Error during sorting:', error);
      setErrorMessage(`Algorithm error: ${error.message}`);
      resetUIState();
    }
  };

  const handlePauseResume = () => {
    const engine = animationEngine.current;
    if (isPaused) {
      engine.resume();
      setIsPaused(false);
    } else {
      engine.pause();
      setIsPaused(true);
    }
  };

  const handleReset = () => {
    resetUIState();
    generateRandomArray();
    setCustomInput('');
    setIsInputValid(false);
  };

  const getSpeedMultiplier = () => 0.1 + (speed / 100) * 4.9;

  useEffect(() => {
    if (animationEngine.current) {
      animationEngine.current.setSpeedImmediately(getSpeedMultiplier());
    }
  }, [speed]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (['INPUT', 'SELECT'].includes(e.target.tagName) || e.target.isContentEditable) return;
      switch (e.key) {
        case ' ':
          e.preventDefault();
          if (isSorting) handlePauseResume();
          else handleStartSorting();
          break;
        case 'r':
        case 'R':
          if (!isSorting) {
            e.preventDefault();
            generateRandomArray();
          }
          break;
        case 'Escape':
          e.preventDefault();
          handleReset();
          break;
        default:
          break;
      }
    };
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isSorting, isPaused]);

  const arrayStats = {
    size: array.length,
    min: array.length ? Math.min(...array) : 0,
    max: array.length ? Math.max(...array) : 0,
    sum: array.reduce((a, b) => a + b, 0)
  };

  return (
    <div className="sorting-visualizer">
      <div className="container">
        <div className="header">
          <h1>AlgoNavigator: Sorting Visualizer</h1>
          <p>Visualize how sorting algorithms work in real-time</p>
        </div>

        <ControlPanel
          algorithm={algorithm}
          setAlgorithm={setAlgorithm}
          arraySize={arraySize}
          setArraySize={setArraySize}
          speed={speed}
          setSpeed={setSpeed}
          speedMultiplier={getSpeedMultiplier()}
          isSorting={isSorting}
          isPaused={isPaused}
          visualizationMode={visualizationMode}
          setVisualizationMode={setVisualizationMode}
          onGenerateArray={generateRandomArray}
          onStartSorting={handleStartSorting}
          onPauseResume={handlePauseResume}
          onReset={handleReset}
        />

        <CustomArrayInput
          customInput={customInput}
          setCustomInput={handleCustomInputChange}
          errorMessage={errorMessage}
          isInputValid={isInputValid}
          onSetArray={handleSetCustomArray}
          isSorting={isSorting}
          currentArraySize={arraySize}
        />

        <VisualizationArea
          array={array}
          visualizationMode={visualizationMode}
          isSorting={isSorting}
          arraySize={arraySize}
          animationState={animationState}
        />

        <StatisticsPanel
          statistics={statistics}
          animationState={animationState}
          algorithm={algorithm}
          array={array}
        />

        <LegendBar />

<div className="information-panels">
  <div className="panel-container">
    <h3 className="panel-title">Algorithm Information</h3>
    <div className="panel-content uniform-panel">
      <AlgorithmInfoPanel algorithm={algorithm} />
    </div>
  </div>

  <div className="panel-container">
    <h3 className="panel-title">Pseudocode</h3>
    <div className="panel-content uniform-panel">
      <PseudocodePanel
        algorithm={algorithm}
        animationState={animationState}
        currentStep={animationState.currentStep}
      />
    </div>
  </div>
</div>

      </div>
    </div>
  );
};

export default SortingVisualizer;
