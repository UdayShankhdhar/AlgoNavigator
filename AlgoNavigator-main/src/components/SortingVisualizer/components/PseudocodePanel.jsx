import React from 'react';
import './PseudocodePanel.css';

const PseudocodePanel = ({ algorithm }) => {
  // Simple pseudocode for each algorithm
  const getPseudocode = () => {
    const pseudocodes = {
      bubbleSort: [
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
      selectionSort: [
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
      insertionSort: [
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
      mergeSort: [
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
        "    leftArr = A[left..mid]",
        "    rightArr = A[mid+1..right]",
        "    i = j = 0, k = left",
        "    while i < length(leftArr) and j < length(rightArr):",
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
        "    while i < length(leftArr):",
        "        A[k] = leftArr[i]",
        "        i++, k++",
        "    end while",
        "    while j < length(rightArr):",
        "        A[k] = rightArr[j]",
        "        j++, k++",
        "    end while",
        "end procedure"
      ],
      quickSort: [
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
      heapSort: [
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
      ]
    };
    
    return pseudocodes[algorithm] || ["// Select an algorithm to view pseudocode"];
  };

  const pseudocodeLines = getPseudocode();

  return (
    <div className="pseudocode-panel">
      <div className="panel-header">
        <h3>📝 {algorithm.replace('Sort', '')} Sort Pseudocode</h3>
      </div>
      
      <div className="pseudocode-content">
        <div className="code-container">
          <div className="code-lines">
            {pseudocodeLines.map((line, index) => (
              <div
                key={index}
                className={`code-line ${line.trim() === '' ? 'empty-line' : ''}`}
              >
                <span className="line-number">{index + 1}</span>
                <span className="code-text">{line}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="educational-tips">
          <h4>💡 Algorithm Overview</h4>
          <div className="tips-content">
            {algorithm === 'bubbleSort' && (
              <p>Repeatedly compares adjacent elements and swaps them if they are in the wrong order. Simple but inefficient for large datasets.</p>
            )}
            {algorithm === 'selectionSort' && (
              <p>Finds the minimum element and places it at the beginning. Continues with the remaining elements. Makes few swaps but many comparisons.</p>
            )}
            {algorithm === 'insertionSort' && (
              <p>Builds the final sorted array one item at a time. Efficient for small data sets and mostly sorted arrays.</p>
            )}
            {algorithm === 'mergeSort' && (
              <p>Divide and conquer algorithm. Recursively divides the array and merges sorted halves. Stable and predictable performance.</p>
            )}
            {algorithm === 'quickSort' && (
              <p>Divide and conquer algorithm that selects a pivot and partitions the array. Very efficient for average cases.</p>
            )}
            {algorithm === 'heapSort' && (
              <p>Uses a binary heap data structure. Builds a max heap and repeatedly extracts the maximum element. In-place with guaranteed O(n log n) performance.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PseudocodePanel;