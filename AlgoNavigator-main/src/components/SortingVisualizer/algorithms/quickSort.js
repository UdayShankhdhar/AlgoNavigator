// src/algorithms/quickSort.js
export default function quickSort(array) {
  const animations = [];
  const arr = [...array];
  let comparisons = 0, swaps = 0;

  const partition = (low, high) => {
    const pivot = arr[high];
    animations.push({ type: 'pivot', indices: [high] });
    let i = low - 1;

    for (let j = low; j < high; j++) {
      animations.push({ type: 'compare', indices: [j, high] });
      comparisons++;
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        swaps++;
        animations.push({
          type: 'swap',
          indices: [i, j],
          values: [arr[i], arr[j]]
        });
      }
      animations.push({ type: 'reset', indices: [j] });
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    swaps++;
    animations.push({
      type: 'swap',
      indices: [i + 1, high],
      values: [arr[i + 1], arr[high]]
    });

    animations.push({ type: 'reset', indices: [high] });
    animations.push({ type: 'markSorted', indices: [i + 1] });

    return i + 1;
  };

  const quickSortRecursive = (low, high) => {
    if (low < high) {
      const pi = partition(low, high);
      quickSortRecursive(low, pi - 1);
      quickSortRecursive(pi + 1, high);
    }
  };

  quickSortRecursive(0, arr.length - 1);
  animations.push({
    type: 'markSorted',
    indices: Array.from({ length: arr.length }, (_, i) => i)
  });

  return { animations, counters: { comparisons, swaps } };
}
