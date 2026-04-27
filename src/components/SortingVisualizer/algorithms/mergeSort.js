// src/algorithms/mergeSort.js
export default function mergeSort(array) {
  const animations = [];
  const arr = [...array];
  let comparisons = 0, swaps = 0;

  const merge = (left, mid, right) => {
    const n1 = mid - left + 1;
    const n2 = right - mid;

    const L = arr.slice(left, mid + 1);
    const R = arr.slice(mid + 1, right + 1);

    let i = 0, j = 0, k = left;

    while (i < n1 && j < n2) {
      animations.push({ type: 'compare', indices: [left + i, mid + 1 + j] });
      comparisons++;

      if (L[i] <= R[j]) {
        arr[k] = L[i];
        animations.push({
          type: 'overwrite',
          indices: [k],
          values: [L[i]]
        });
        i++;
      } else {
        arr[k] = R[j];
        animations.push({
          type: 'overwrite',
          indices: [k],
          values: [R[j]]
        });
        j++;
      }
      swaps++;
      k++;
    }

    while (i < n1) {
      arr[k] = L[i];
      animations.push({
        type: 'overwrite',
        indices: [k],
        values: [L[i]]
      });
      swaps++;
      i++; k++;
    }

    while (j < n2) {
      arr[k] = R[j];
      animations.push({
        type: 'overwrite',
        indices: [k],
        values: [R[j]]
      });
      swaps++;
      j++; k++;
    }
  };

  const mergeSortRecursive = (left, right) => {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      mergeSortRecursive(left, mid);
      mergeSortRecursive(mid + 1, right);
      merge(left, mid, right);
    }
  };

  mergeSortRecursive(0, arr.length - 1);

  animations.push({
    type: 'markSorted',
    indices: Array.from({ length: arr.length }, (_, i) => i)
  });

  return { animations, counters: { comparisons, swaps } };
}
