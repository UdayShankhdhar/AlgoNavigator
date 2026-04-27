const bubbleSort = (array) => {
  const animations = [];
  const counters = { comparisons: 0, swaps: 0 };
  const arr = [...array];
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Comparison
      animations.push({
        type: 'compare',
        indices: [j, j + 1]
      });
      counters.comparisons++;

      if (arr[j] > arr[j + 1]) {
        // Swap
        animations.push({
          type: 'swap', 
          indices: [j, j + 1]
        });
        counters.swaps++;
        
        // Perform the swap
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        
        // Update visualization
        animations.push({
          type: 'overwrite',
          indices: [j, j + 1],
          values: [arr[j], arr[j + 1]]
        });
      }
      
      // Reset highlights
      animations.push({
        type: 'reset',
        indices: [j, j + 1]
      });
    }
    
    // Mark last element as sorted
    animations.push({
      type: 'markSorted',
      indices: [n - i - 1]
    });
  }

  // Mark first element as sorted
  animations.push({
    type: 'markSorted',
    indices: [0]
  });

  return { animations, counters };
};

export default bubbleSort;