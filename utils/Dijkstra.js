class Dijkstra {
  constructor(maze, start, goal) {
    this.maze = maze;
    this.start = start;
    this.goal = goal;

    this.height = maze.length;
    this.width = maze[0].length;
    this.costs = this.createGrid(this.height, this.width, Infinity);
    this.searched = this.createGrid(this.height, this.width, false);
    this.refs = this.createGrid(this.height, this.width, null);
    this.way = null;

    this.solve();
  }

  getMinCosts() {
    return this.costs;
  }

  getMinCostToGoal() {
    return this.costs[this.goal.i][this.goal.j];
  }

  getRefs() {
    return this.refs;
  }

  getWay() {
    if (this.way !== null) return this.way;

    this.way = [this.goal];
    let ref = this.refs[this.goal.i][this.goal.j];
    while (ref !== null) {
      ref = { i: ref.i, j: ref.j };
      this.way.push(ref);
      ref = this.refs[ref.i][ref.j];
    }

    this.way = this.way.reverse();

    return this.way;
  }

  solve() {
    const maze = this.maze;
    const searched = this.searched;
    const costs = this.costs;
    const refs = this.refs;
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

        adj.ref = currentPlace;
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
      refs[closestPlace.i][closestPlace.j] = closestPlace.ref;
      currentPlace = closestPlace;

      isGoal = this.isSamePlace(currentPlace, goal);
    }
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
