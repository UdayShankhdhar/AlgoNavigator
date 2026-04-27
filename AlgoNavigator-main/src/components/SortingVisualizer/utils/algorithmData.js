// Algorithm information database

export const algorithmData = {
  bubbleSort: {
    name: "Bubble Sort",
    icon: "🫧",
    description: "Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
    timeComplexity: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)"
    },
    spaceComplexity: "O(1)",
    stability: "Stable",
    inPlace: true,
    useCases: [
      "Educational purposes",
      "Small datasets",
      "When simplicity is more important than efficiency"
    ],
    bestCase: "Already sorted array",
    worstCase: "Reverse sorted array"
  },

  selectionSort: {
    name: "Selection Sort",
    icon: "🎯",
    description: "Divides the input list into two parts: sorted and unsorted. Repeatedly selects the smallest element from unsorted part and moves it to sorted part.",
    timeComplexity: {
      best: "O(n²)",
      average: "O(n²)",
      worst: "O(n²)"
    },
    spaceComplexity: "O(1)",
    stability: "Unstable",
    inPlace: true,
    useCases: [
      "Small datasets",
      "When memory write is a costly operation",
      "When auxiliary memory is limited"
    ],
    bestCase: "O(n²) comparisons",
    worstCase: "O(n²) comparisons"
  },

  insertionSort: {
    name: "Insertion Sort",
    icon: "📥",
    description: "Builds the final sorted array one item at a time by comparisons. Much like sorting playing cards in your hands.",
    timeComplexity: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)"
    },
    spaceComplexity: "O(1)",
    stability: "Stable",
    inPlace: true,
    useCases: [
      "Small datasets",
      "Nearly sorted arrays",
      "As the base case in hybrid algorithms like Timsort"
    ],
    bestCase: "Already sorted array",
    worstCase: "Reverse sorted array"
  },

  mergeSort: {
    name: "Merge Sort",
    icon: "🔄",
    description: "Divide and conquer algorithm that divides the input array into two halves, sorts them recursively, and then merges the sorted halves.",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)"
    },
    spaceComplexity: "O(n)",
    stability: "Stable",
    inPlace: false,
    useCases: [
      "Large datasets",
      "When stable sorting is required",
      "External sorting (sorting data too large for memory)",
      "Linked list sorting"
    ],
    bestCase: "O(n log n) in all cases",
    worstCase: "O(n log n) in all cases"
  },

  quickSort: {
    name: "Quick Sort",
    icon: "⚡",
    description: "Divide and conquer algorithm that picks an element as pivot and partitions the array around the pivot. Recursively sorts the sub-arrays.",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n²)"
    },
    spaceComplexity: "O(log n)",
    stability: "Unstable",
    inPlace: true,
    useCases: [
      "Large datasets",
      "When average-case performance matters more than worst-case",
      "General-purpose sorting",
      "In-memory sorting"
    ],
    bestCase: "Balanced partitions",
    worstCase: "Unbalanced partitions (already sorted)"
  },

  heapSort: {
    name: "Heap Sort",
    icon: "📊",
    description: "Comparison-based sorting algorithm that uses a binary heap data structure. Builds a max heap and repeatedly extracts the maximum element.",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)"
    },
    spaceComplexity: "O(1)",
    stability: "Unstable",
    inPlace: true,
    useCases: [
      "When worst-case O(n log n) is required",
      "When constant space is important",
      "Real-time systems",
      "Embedded systems"
    ],
    bestCase: "O(n log n) in all cases",
    worstCase: "O(n log n) in all cases"
  }
};

export default algorithmData;