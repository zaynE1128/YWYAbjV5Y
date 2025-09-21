// 代码生成时间: 2025-09-21 22:14:07
const { performance } = require('perf_hooks');

/**
 * A simple implementation of the bubble sort algorithm in JavaScript.
 * @param {number[]} arr - The array of numbers to be sorted.
 * @returns {number[]} - The sorted array.
 */
function bubbleSort(arr) {
  if (!Array.isArray(arr)) {
    throw new Error('Input must be an array.');
  }
  
  let len = arr.length;
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < len - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        const temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        swapped = true;
      }
    }
  } while (swapped);
  return arr;
}

/**
 * A simple implementation of the quick sort algorithm in JavaScript.
 * @param {number[]} arr - The array of numbers to be sorted.
 * @returns {number[]} - The sorted array.
 */
function quickSort(arr) {
  if (!Array.isArray(arr)) {
    throw new Error('Input must be an array.');
  }
  
  if (arr.length <= 1) {
    return arr;
  }
  
  const pivot = arr[arr.length - 1];
  const left = [];
  const right = [];
  
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  
  return [...quickSort(left), pivot, ...quickSort(right)];
}

/**
 * Measures the time taken to sort an array using a specified sorting function.
 * @param {Function} sortFunc - The sorting function to use.
 * @param {number[]} arr - The array to sort.
 */
function sortBenchmark(sortFunc, arr) {
  const start = performance.now();
  sortFunc(arr);
  const end = performance.now();
  console.log(`Sorting time: ${end - start} milliseconds`);
}

// Example usage
const unsortedArray = [23, 1, 45, 6, 78, 34, 12];

try {
  console.log('Sorted array using Bubble Sort:', bubbleSort([...unsortedArray]));
  console.log('Sorted array using Quick Sort:', quickSort([...unsortedArray]));
  // Benchmark the sorting functions
  sortBenchmark(bubbleSort, unsortedArray);
  sortBenchmark(quickSort, unsortedArray);
} catch (error) {
  console.error('An error occurred:', error.message);
}