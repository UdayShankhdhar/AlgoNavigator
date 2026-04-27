// Utility functions for array operations and animations

const arrayUtils = {
  // Create a deep copy of array
  deepCopy: (array) => [...array],
  
  // Swap two elements in array
  swap: (array, i, j) => {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  },
  
  // Generate animation step object
  createStep: (type, indices, values = null, pivotIndex = null) => {
    return {
      type,
      indices: Array.isArray(indices) ? indices : [indices],
      values: values ? (Array.isArray(values) ? values : [values]) : null,
      pivotIndex
    };
  },
  
  // Initialize counters for algorithm tracking
  initializeCounters: () => ({
    comparisons: 0,
    swaps: 0,
    steps: 0,
    animations: []
  })
};

export default arrayUtils;