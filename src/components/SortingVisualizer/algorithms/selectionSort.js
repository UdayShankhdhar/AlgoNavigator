// src/algorithms/selectionSort.js
export default function selectionSort(array) {
  const animations = [];
  const arr = [...array];
  let comparisons = 0, swaps = 0;

  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;

    for (let j = i + 1; j < arr.length; j++) {
      animations.push({ type: 'compare', indices: [minIndex, j] });
      comparisons++;

      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
      animations.push({ type: 'reset', indices: [minIndex, j] });
    }

    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      swaps++;
      animations.push({
        type: 'swap',
        indices: [i, minIndex],
        values: [arr[i], arr[minIndex]]
      });
    }

    animations.push({ type: 'markSorted', indices: [i] });
  }

  animations.push({
    type: 'markSorted',
    indices: Array.from({ length: arr.length }, (_, i) => i)
  });

  return { animations, counters: { comparisons, swaps } };
}
