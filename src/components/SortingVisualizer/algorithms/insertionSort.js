// src/algorithms/insertionSort.js
export default function insertionSort(array) {
  const animations = [];
  const arr = [...array];
  let comparisons = 0, swaps = 0;

  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;

    animations.push({ type: 'compare', indices: [j, i] });
    comparisons++;

    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      swaps++;

      animations.push({
        type: 'overwrite',
        indices: [j + 1],
        values: [arr[j + 1]]
      });

      animations.push({ type: 'compare', indices: [j, i] });
      comparisons++;
      j--;
    }

    arr[j + 1] = key;
    animations.push({
      type: 'overwrite',
      indices: [j + 1],
      values: [key]
    });

    animations.push({ type: 'reset', indices: [i] });
  }

  animations.push({
    type: 'markSorted',
    indices: Array.from({ length: arr.length }, (_, i) => i)
  });

  return { animations, counters: { comparisons, swaps } };
}
