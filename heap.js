//https://vue3js.cn/interview/algorithm/Heap.html#%E4%B8%80%E3%80%81%E6%98%AF%E4%BB%80%E4%B9%88
class MinHeap {
  constructor() {
    // 存储堆元素
    this.heap = [];
  }
  // 获取父元素坐标
  getParentIndex(i) {
    return (i - 1) >> 1;
  }

  // 获取左节点元素坐标
  getLeftIndex(i) {
    return i * 2 + 1;
  }

  // 获取右节点元素坐标
  getRightIndex(i) {
    return i * 2 + 2;
  }

  // 交换元素
  swap(i1, i2) {
    const temp = this.heap[i1];
    this.heap[i1] = this.heap[i2];
    this.heap[i2] = temp;
  }

  // 查看堆顶元素
  peek() {
    return this.heap[0];
  }

  // 获取堆元素的大小
  size() {
    return this.heap.length;
  }

  // 插入元素
  insert(value) {
    this.heap.push(value);
    this.shifUp(this.heap.length - 1);
  }

  // 上移操作
  shiftUp(index) {
    if (index === 0) {
      return;
    }
    const parentIndex = this.getParentIndex(index);
    if (this.heap[parentIndex] > this.heap[index]) {
      this.swap(parentIndex, index);
      this.shiftUp(parentIndex);
    }
  }

  pop() {
    this.heap[0] = this.heap.pop();
    this.shiftDown(0);
  }

  // 下移操作
  shiftDown(index) {
    const leftIndex = this.getLeftIndex(index);
    const rightIndex = this.getRightIndex(index);
    if (this.heap[leftIndex] < this.heap[index]) {
      this.swap(leftIndex, index);
      this.shiftDown(leftIndex);
    }
    if (this.heap[rightIndex] < this.heap[index]) {
      this.swap(rightIndex, index);
      this.shiftDown(rightIndex);
    }
  }
}
