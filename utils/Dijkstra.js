class Dijkstra {
  constructor(maze, start, goal) {
    this.maze = maze;
    this.start = start;
    this.goal = goal;

    this.height = maze.length;
    this.width = maze[0].length;
    this.costs = this.createGrid(this.height, this.width, Infinity);
    this.searched = this.createGrid(this.height, this.width, false);
  }

  calcMinCost() {
    const maze = this.maze;
    const searched = this.searched;
    const costs = this.costs;
    const start = this.start;
    const goal = this.goal;

    searched[start.i][start.j] = true;
    costs[start.i][start.j] = maze[start.i][start.j];

    const queue = new PriorityQueue();

    let currentPlace = this.start;
    let isGoal = false;
    while (!isGoal) {
      const currentCost = costs[currentPlace.i][currentPlace.j];
      const adjs = this.getUnsearchedAdjs(currentPlace);

      adjs.forEach((adj) => {
        const adjCost = currentCost + maze[adj.i][adj.j];
        if (adjCost >= costs[adj.i][adj.j]) return;

        queue.enqueue(adj, -1 * (currentCost + maze[adj.i][adj.j]));
      });

      let closestPlace = {};
      let closetPlaceCost = 0;
      let isFound = false;
      while (!isFound) {
        const dequeue = queue.dequeue();
        closestPlace = dequeue.item;
        closetPlaceCost = -1 * dequeue.priority;

        const tmpI = closestPlace.i;
        const tmpJ = closestPlace.j;

        isFound = !searched[tmpI][tmpJ] && closetPlaceCost < costs[tmpI][tmpJ];
      }

      costs[closestPlace.i][closestPlace.j] = closetPlaceCost;
      searched[closestPlace.i][closestPlace.j] = true;
      currentPlace = closestPlace;

      isGoal = this.isSamePlace(currentPlace, goal);
    }

    const minCost = this.costs[goal.i][goal.j];
    return minCost;
  }

  createGrid(height, width, value) {
    return new Array(height).fill().map((_) => new Array(width).fill(value));
  }

  isValidPlace(place) {
    return (
      0 <= place.i &&
      place.i < this.height &&
      0 <= place.j &&
      place.j < this.width
    );
  }

  isSamePlace(a, b) {
    return a.i === b.i && a.j === b.j;
  }

  getUnsearchedAdjs(place) {
    const north = createPlace(place.i - 1, place.j);
    const east = createPlace(place.i, place.j + 1);
    const west = createPlace(place.i, place.j - 1);
    const south = createPlace(place.i + 1, place.j);

    const places = [east, south, north, west];

    return places.filter(
      (p) => this.isValidPlace(p) && !this.searched[p.i][p.j]
    );
  }
}
