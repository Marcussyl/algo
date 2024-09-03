// this implementation is not in-place, cause the implementation creates two additional arrays, left and right
// and the final return statement uses the spread operator (...) to concatenate arrays, which also involves creating new arrays in memory
function quickSort(arr) {
  const rec = (arr) => {
    if (arr.length <= 1) {
      return arr;
    }
    const left = [];
    const right = [];
    const mid = arr[0]; // 基准元素
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < mid) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }
    return [...rec(left), mid, ...rec(right)];
  };
  return res(arr);
}

// ===========================================================================

// in-place version of quicksort
function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pivotIndex = partition(arr, low, high);
    quickSort(arr, low, pivotIndex - 1); // Recursively sort left part
    quickSort(arr, pivotIndex + 1, high); // Recursively sort right part
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high]; // Choosing the last element as the pivot
  let i = low - 1; // Index of smaller element

  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++; // Increment index of smaller element
      [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]; // Swap pivot
  return i + 1; // Return the pivot index
}

// Example usage
const array = [3, 6, 8, 10, 1, 2, 1];
console.log(quickSort(array)); // Outputs: [1, 1, 2, 3, 6, 8, 10]
