interface IPriorityQueue<T> {
  enqueue: (element: IPriorityQueueElement<T>) => void;
  dequeue: () => IPriorityQueueElement<T> | null;
  size: () => number;
  top: () => IPriorityQueueElement<T> | null;
}

interface IPriorityQueueElement<T> {
  item: T;
  priority: number;
}

export class PriorityQueue<T> implements IPriorityQueue<T> {
  private heap: IPriorityQueueElement<T>[] = [];

  enqueue(element: IPriorityQueueElement<T>) {
    const newNode = element;
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

  dequeue() {
    const root = this.heap[0];
    const lastNode = this.heap.pop();

    if (!lastNode) return null;

    this.heap[0] = lastNode;
    if (this.heap.length < 3) return root;

    let currentNodeIdx = 0;
    let leftIdx = 2 * currentNodeIdx + 1;
    let rightIdx = 2 * currentNodeIdx + 2;

    let currentChildNodeIdx =
      rightIdx < this.size() &&
      this.heap[rightIdx].priority > this.heap[leftIdx].priority
        ? rightIdx
        : leftIdx;

    while (
      currentChildNodeIdx < this.size() &&
      this.heap[currentNodeIdx].priority <=
        this.heap[currentChildNodeIdx].priority
    ) {
      const currentNode = this.heap[currentNodeIdx];
      const currentChildNode = this.heap[currentChildNodeIdx];
      this.heap[currentChildNodeIdx] = currentNode;
      this.heap[currentNodeIdx] = currentChildNode;

      currentNodeIdx = currentChildNodeIdx;
      leftIdx = 2 * currentNodeIdx + 1;
      rightIdx = 2 * currentNodeIdx + 2;

      currentChildNodeIdx =
        rightIdx < this.size() &&
        this.heap[rightIdx].priority > this.heap[leftIdx].priority
          ? rightIdx
          : leftIdx;
    }

    return root;
  }

  size() {
    return this.heap.length;
  }

  top() {
    const top = this.heap[0] ?? null;
    return top;
  }
}
