class PriorityQueue {
  constructor() {
    this.heap = [];
  }

  push(item, priority) {
    const newNode = { item, priority };
    this.heap.push(newNode);

    let currentNodeIdx = this.heap.length - 1;
    let currentNodeParentIdx = Math.ceil(currentNodeIdx / 2) - 1;

    while (
      currentNodeParentIdx >= 0 &&
      newNode.priority > this.heap[currentNodeParentIdx].priority
    ) {
      const parent = this.heap[currentNodeParentIdx];
      this.heap[currentNodeParentIdx] = newNode;
      this.heap[currentNodeIdx] = parent;

      currentNodeIdx = currentNodeParentIdx;
      currentNodeParentIdx = Math.ceil(currentNodeIdx / 2) - 1;
    }
  }

  pop() {}

  size() {}

  top() {}
}
