// src/algorithms/heapSort.js
export default function heapSort(array) {
  const animations = [];
  const arr = [...array];
  let comparisons = 0, swaps = 0;

  const heapify = (n, i) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n) {
      animations.push({ type: 'compare', indices: [left, largest] });
      comparisons++;
      if (arr[left] > arr[largest]) largest = left;
      animations.push({ type: 'reset', indices: [left] });
    }

    if (right < n) {
      animations.push({ type: 'compare', indices: [right, largest] });
      comparisons++;
      if (arr[right] > arr[largest]) largest = right;
      animations.push({ type: 'reset', indices: [right] });
    }

    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      swaps++;
      animations.push({
        type: 'swap',
        indices: [i, largest],
        values: [arr[i], arr[largest]]
      });
      heapify(n, largest);
    }
  };

  const n = arr.length;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(n, i);

  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    swaps++;
    animations.push({
      type: 'swap',
      indices: [0, i],
      values: [arr[0], arr[i]]
    });
    animations.push({ type: 'markSorted', indices: [i] });
    heapify(i, 0);
  }

  animations.push({
    type: 'markSorted',
    indices: Array.from({ length: n }, (_, i) => i)
  });

  return { animations, counters: { comparisons, swaps } };
}
