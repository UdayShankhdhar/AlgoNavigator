// Pseudocode data for all algorithms with step mappings

export const pseudocodeData = {
  bubbleSort: {
    lines: [
      "procedure bubbleSort(A : list of sortable items)",
      "    n = length(A)",
      "    for i = 0 to n-1:",
      "        for j = 0 to n-i-2:",
      "            if A[j] > A[j+1]:",
      "                swap(A[j], A[j+1])",
      "            end if",
      "        end for",
      "    end for", 
      "end procedure"
    ],
    explanations: [
      "Initialize bubble sort algorithm with array A",
      "Get the total number of elements in the array",
      "Outer loop: repeat for each element in array",
      "Inner loop: compare adjacent elements in unsorted portion",
      "Check if current element is greater than next element",
      "Swap elements if they are in the wrong order",
      "End of comparison block",
      "End of inner loop - one element bubbled up",
      "End of outer loop - array should be sorted",
      "Algorithm complete - array is now sorted"
    ],
    stepMappings: {
      'compare': [4],     // Line 5: comparison
      'swap': [5],        // Line 6: swap
      'markSorted': [3,8] // Lines 4 & 9: loop boundaries
    }
  },

  selectionSort: {
    lines: [
      "procedure selectionSort(A : list of sortable items)",
      "    n = length(A)", 
      "    for i = 0 to n-2:",
      "        minIndex = i",
      "        for j = i+1 to n-1:",
      "            if A[j] < A[minIndex]:",
      "                minIndex = j",
      "            end if",
      "        end for",
      "        if minIndex != i:",
      "            swap(A[i], A[minIndex])",
      "        end if",
      "    end for",
      "end procedure"
    ],
    explanations: [
      "Initialize selection sort algorithm with array A",
      "Get the total number of elements in the array",
      "Outer loop: from first to second-last element",
      "Assume current position has the minimum value",
      "Inner loop: find actual minimum in remaining array",
      "Compare current element with current minimum",
      "Update minimum index if smaller element found",
      "End of minimum finding loop",
      "Check if we found a new minimum",
      "Swap current element with minimum element",
      "End of swap condition",
      "End of outer loop - one element sorted",
      "Algorithm complete - array is now sorted"
    ],
    stepMappings: {
      'compare': [5],     // Line 6: comparison
      'swap': [9],        // Line 10: swap
      'markSorted': [3,11] // Lines 4 & 12: loop boundaries
    }
  },

  insertionSort: {
    lines: [
      "procedure insertionSort(A : list of sortable items)",
      "    n = length(A)",
      "    for i = 1 to n-1:",
      "        key = A[i]",
      "        j = i - 1",
      "        while j >= 0 and A[j] > key:",
      "            A[j+1] = A[j]",
      "            j = j - 1",
      "        end while",
      "        A[j+1] = key",
      "    end for",
      "end procedure"
    ],
    explanations: [
      "Initialize insertion sort algorithm with array A",
      "Get the total number of elements in the array",
      "Start from second element (first is already sorted)",
      "Store current element to be inserted",
      "Set index to compare with key element",
      "While there are elements greater than key, shift right",
      "Shift element one position to the right",
      "Move to the previous element for comparison",
      "End of shifting while loop",
      "Insert key in its correct position",
      "End of outer loop - one more element sorted",
      "Algorithm complete - array is now sorted"
    ],
    stepMappings: {
      'compare': [5],     // Line 6: comparison
      'overwrite': [6,9], // Lines 7 & 10: shifts and inserts
      'markSorted': [3,10] // Lines 4 & 11: loop boundaries
    }
  },

  mergeSort: {
    lines: [
      "procedure mergeSort(A, left, right)",
      "    if left >= right:",
      "        return",
      "    end if",
      "    mid = floor((left + right) / 2)",
      "    mergeSort(A, left, mid)",
      "    mergeSort(A, mid+1, right)", 
      "    merge(A, left, mid, right)",
      "end procedure",
      "",
      "procedure merge(A, left, mid, right)",
      "    // Create temporary arrays",
      "    leftArr = A[left..mid]",
      "    rightArr = A[mid+1..right]",
      "    i = j = 0, k = left",
      "    while i < len(leftArr) and j < len(rightArr):",
      "        if leftArr[i] <= rightArr[j]:",
      "            A[k] = leftArr[i]",
      "            i = i + 1",
      "        else:",
      "            A[k] = rightArr[j]",
      "            j = j + 1",
      "        end if",
      "        k = k + 1",
      "    end while",
      "    // Copy remaining elements",
      "    while i < len(leftArr):",
      "        A[k] = leftArr[i]",
      "        i++, k++",
      "    end while",
      "    while j < len(rightArr):",
      "        A[k] = rightArr[j]",
      "        j++, k++",
      "    end while",
      "end procedure"
    ],
    explanations: [
      "Main merge sort procedure with array and indices",
      "Base case: check if array has 0 or 1 elements",
      "Return if no sorting needed (base case)",
      "End of base case condition",
      "Calculate middle index to split array",
      "Recursively sort left half of array",
      "Recursively sort right half of array",
      "Merge the two sorted halves together",
      "End of main merge sort procedure",
      "",
      "Merge procedure to combine sorted arrays",
      "Create temporary arrays for left and right halves",
      "Copy left portion to temporary array",
      "Copy right portion to temporary array",
      "Initialize pointers for merging",
      "While both arrays have elements to compare",
      "Compare elements from both arrays",
      "Take element from left array if smaller/equal",
      "Move to next element in left array",
      "Take element from right array if smaller",
      "Move to next element in right array",
      "End of comparison block",
      "Move to next position in main array",
      "End of main merge loop",
      "Copy any remaining elements from left array",
      "Take next element from left array",
      "Update pointers for left array and main array",
      "End of left array cleanup",
      "Copy any remaining elements from right array", 
      "Take next element from right array",
      "Update pointers for right array and main array",
      "End of right array cleanup",
      "End of merge procedure"
    ],
    stepMappings: {
      'compare': [15],    // Line 16: comparison in merge
      'overwrite': [16,19,23,26], // Lines 17,20,24,27: assignments
      'markSorted': [1,8,29] // Base case and procedure ends
    }
  },

  quickSort: {
    lines: [
      "procedure quickSort(A, low, high)",
      "    if low < high:",
      "        pivotIndex = partition(A, low, high)",
      "        quickSort(A, low, pivotIndex-1)",
      "        quickSort(A, pivotIndex+1, high)",
      "    end if",
      "end procedure",
      "",
      "procedure partition(A, low, high)",
      "    pivot = A[high]",
      "    i = low - 1",
      "    for j = low to high-1:",
      "        if A[j] <= pivot:",
      "            i = i + 1",
      "            swap(A[i], A[j])",
      "        end if",
      "    end for",
      "    swap(A[i+1], A[high])",
      "    return i + 1",
      "end procedure"
    ],
    explanations: [
      "Main quick sort procedure with array and range",
      "Check if there are elements to sort in partition",
      "Partition array and get pivot position",
      "Recursively sort left side of pivot",
      "Recursively sort right side of pivot", 
      "End of recursion condition",
      "End of main quick sort procedure",
      "",
      "Partition procedure to arrange elements around pivot",
      "Choose last element as pivot value",
      "Initialize index for smaller elements",
      "Iterate through all elements except pivot",
      "If current element is smaller than or equal to pivot",
      "Increment index of smaller elements",
      "Swap current element with element at boundary",
      "End of comparison and swap condition",
      "End of partition loop",
      "Place pivot in its final sorted position",
      "Return the pivot index for recursion",
      "End of partition procedure"
    ],
    stepMappings: {
      'compare': [12],    // Line 13: comparison
      'swap': [14,17],    // Lines 15 & 18: swaps
      'pivot': [9],       // Line 10: pivot selection
      'markSorted': [1,6,19] // Base cases and procedure ends
    }
  },

  heapSort: {
    lines: [
      "procedure heapSort(A : list of sortable items)",
      "    n = length(A)",
      "    // Build max heap",
      "    for i = floor(n/2)-1 down to 0:",
      "        heapify(A, n, i)",
      "    end for",
      "    // Extract elements from heap",
      "    for i = n-1 down to 1:",
      "        swap(A[0], A[i])",
      "        heapify(A, i, 0)",
      "    end for",
      "end procedure",
      "",
      "procedure heapify(A, n, i)",
      "    largest = i",
      "    left = 2*i + 1", 
      "    right = 2*i + 2",
      "    if left < n and A[left] > A[largest]:",
      "        largest = left",
      "    end if",
      "    if right < n and A[right] > A[largest]:",
      "        largest = right",
      "    end if",
      "    if largest != i:",
      "        swap(A[i], A[largest])",
      "        heapify(A, n, largest)",
      "    end if",
      "end procedure"
    ],
    explanations: [
      "Main heap sort procedure with array A",
      "Get the total number of elements in array",
      "Build a max heap from the input array",
      "Start from last non-leaf node to root",
      "Heapify each node to maintain heap property",
      "End of heap building phase",
      "Extract elements from heap one by one",
      "From last element down to second element",
      "Move current root (max) to end position",
      "Heapify the reduced heap",
      "End of extraction phase - array sorted",
      "End of main heap sort procedure",
      "",
      "Heapify procedure to maintain max heap property",
      "Assume current node is the largest",
      "Calculate index of left child node",
      "Calculate index of right child node",
      "If left child exists and is larger than current",
      "Update largest to be left child",
      "End of left child check",
      "If right child exists and is larger than current",
      "Update largest to be right child", 
      "End of right child check",
      "If largest is not the current node",
      "Swap current node with larger child",
      "Recursively heapify the affected subtree",
      "End of swap and recursion condition",
      "End of heapify procedure"
    ],
    stepMappings: {
      'compare': [14,18], // Lines 15 & 19: comparisons
      'swap': [8,22],     // Lines 9 & 23: swaps  
      'markSorted': [7,10,25] // Loop boundaries and procedure ends
    }
  }
};

export default pseudocodeData;