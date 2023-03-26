class Dijkstra {
  constructor(maze, start, goal) {
    this.maze = maze;
    this.start = start;
    this.goal = goal;

    this.height = maze.length;
    this.width = maze[0].length;

    this.minCostToGoal = null;
    this.way = null;

    this.searchedMap = new Map();
    this.searchedMapGoalKey = '';
    this.unsearchedStates = new PriorityQueue();

    this.solve();
  }

  getMinCostToGoal() {
    return this.searchedMap.get(this.searchedMapGoalKey).cost;
  }

  getWay() {
    if (this.way !== null) return this.way;

    this.way = [];
    const goal = this.searchedMap.get(this.searchedMapGoalKey);
    this.way.push(goal.place);

    let ref = goal.ref;
    while (ref !== null) {
      this.way.push(ref);

      const key = `${ref.i}_${ref.j}`;
      ref = this.searchedMap.get(key)?.ref;
    }

    return this.way;
  }

  solve() {
    const maze = this.maze;
    const start = this.start;
    const goal = this.goal;

    const searchedMap = this.searchedMap;
    const unsearchedStates = this.unsearchedStates;

    const initState = this.createState(start, null, maze[start.i][start.j]);
    unsearchedStates.enqueue(initState, 0);

    while (unsearchedStates.size() > 0) {
      const searched = unsearchedStates.dequeue().item;

      const key = `${searched.place.i}_${searched.place.j}`;
      searchedMap.set(key, searched);
      this.searchedMapGoalKey = key;

      if (this.isSamePlace(searched.place, goal)) return;

      const adjs = this.getAdjs(searched.place);
      adjs.forEach((adj) => {
        const adjCost = searched.cost + maze[adj.i][adj.j];
        const state = this.createState(adj, searched.place, adjCost);

        const adjKey = `${adj.i}_${adj.j}`;
        if (searchedMap.has(adjKey)) return;

        unsearchedStates.enqueue(state, -1 * state.cost);
      });
    }
  }

  createState(place, ref, cost) {
    return { place, ref, cost };
  }

  isSamePlace(a, b) {
    return a.i === b.i && a.j === b.j;
  }

  getAdjs(place) {
    const north = createPlace(place.i - 1, place.j);
    const east = createPlace(place.i, place.j + 1);
    const west = createPlace(place.i, place.j - 1);
    const south = createPlace(place.i + 1, place.j);

    const places = [east, south, north, west];

    return places.filter((p) => this.isValidPlace(p));
  }

  isValidPlace(place) {
    return (
      0 <= place.i &&
      place.i < this.height &&
      0 <= place.j &&
      place.j < this.width
    );
  }
}
