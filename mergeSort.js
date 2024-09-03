// the algo is divided into divide part and merge part,
// while divide part has time complexity of O(log n) and merge part has time complexity of O(n), so the overall time complexity is O(nlogn)
// recuesive step utilizes both divide and merge operations
// space complexity: O(nlogn)
function mergeSort(arr) {
  // 采用自上而下的递归方法
  const len = arr.length;
  if (len < 2) {
    return arr;
  }
  let middle = Math.floor(len / 2),
    left = arr.slice(0, middle),
    right = arr.slice(middle);
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  const result = [];

  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }

  while (left.length) result.push(left.shift());

  while (right.length) result.push(right.shift());

  return result;
}
