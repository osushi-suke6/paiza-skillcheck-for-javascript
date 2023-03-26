import {
  IPriorityQueue,
  IPriorityQueueElement,
  PriorityQueue,
} from './PriorityQueue';

interface IDijkstra {
  getMinCostToGoal: () => number;
  getWay: () => IPlace[];
}

interface IPlace {
  i: number;
  j: number;
}

interface IState {
  place: IPlace;
  ref: IPlace | null;
  cost: number;
}

export class Dijkstra implements IDijkstra {
  constructor(maze: number[][], start: IPlace, goal: IPlace) {
    this.maze = maze;
    this.start = start;
    this.goal = goal;

    this.height = maze.length;
    this.width = maze[0].length;

    this.searchedStates = new Map<string, IState>();
    this.unsearchedStates = new PriorityQueue<IState>();

    this.solve();
  }

  private maze: number[][] = [[0]];
  private start: IPlace = { i: 0, j: 0 };
  private goal: IPlace = { i: 0, j: 0 };
  private height = 1;
  private width = 1;

  private searchedStates: Map<string, IState>;
  private unsearchedStates: IPriorityQueue<IState>;

  private minCostToGoal: number | null = null;
  private way: IPlace[] | null = null;

  getMinCostToGoal() {
    if (this.minCostToGoal !== null) return this.minCostToGoal;

    const goalKey = `${this.goal.i}_${this.goal.j}`;
    this.minCostToGoal = this.searchedStates.get(goalKey)?.cost ?? null;

    if (this.minCostToGoal === null) {
      throw new Error(
        `KeyNotFoundError: The key(${goalKey}) is not found in the Map(searchedStates) ${this.minCostToGoal}`
      );
    }

    return this.minCostToGoal;
  }

  getWay() {
    if (!!this.way) return this.way;

    this.way = [this.goal];

    const goalkey = `${this.goal.i}_${this.goal.j}`;
    let ref: IPlace | null = this.searchedStates.get(goalkey)?.ref ?? null;
    while (!!ref) {
      this.way.push(ref);

      const key = `${ref.i}_${ref.j}`;
      ref = this.searchedStates.get(key)?.ref ?? null;
    }

    return this.way;
  }

  private solve() {
    const maze = this.maze;
    const start = this.start;
    const goal = this.goal;

    const searchedStates = this.searchedStates;
    const unsearchedStates = this.unsearchedStates;

    const initState = this.createState(start, null, maze[start.i][start.j]);
    const initElement: IPriorityQueueElement<IState> = {
      item: initState,
      priority: 0,
    };
    unsearchedStates.enqueue(initElement);

    while (unsearchedStates.size() > 0) {
      const searched = unsearchedStates.dequeue()!.item;

      const key = `${searched.place.i}_${searched.place.j}`;
      searchedStates.set(key, searched);

      if (this.isSamePlace(searched.place, goal)) return;

      const adjs = this.getAdjs(searched.place);
      adjs.forEach((adj) => {
        const adjCost = searched.cost + maze[adj.i][adj.j];
        const state = this.createState(adj, searched.place, adjCost);
        const element = { item: state, priority: -1 * state.cost };

        const adjKey = `${adj.i}_${adj.j}`;
        if (searchedStates.has(adjKey)) return;

        unsearchedStates.enqueue(element);
      });
    }
  }

  private createPlace(i: number, j: number) {
    return { i, j } as IPlace;
  }

  private createState(place: IPlace, ref: IPlace | null, cost: number) {
    return { place, ref, cost } as IState;
  }

  private isSamePlace(a: IPlace, b: IPlace) {
    return a.i === b.i && a.j === b.j;
  }

  private getAdjs(place: IPlace) {
    const north = this.createPlace(place.i - 1, place.j);
    const east = this.createPlace(place.i, place.j + 1);
    const west = this.createPlace(place.i, place.j - 1);
    const south = this.createPlace(place.i + 1, place.j);

    const places = [north, east, west, south];

    return places.filter((p) => this.isValidPlace(p));
  }

  private isValidPlace(place: IPlace) {
    return (
      0 <= place.i &&
      place.i < this.height &&
      0 <= place.j &&
      place.j < this.width
    );
  }
}
