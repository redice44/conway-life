import Cell from './cell';
import { CONWAY_STATE, Conway } from './conway';

export default class ConwayCell extends Cell<Conway> {
  constructor(index: number, node: Conway) {
    super(index, node);
  }

  public getState(): CONWAY_STATE {
    return this.node.state;
  }

  public getNeighbors(): number[] {
    return this.node.neighbors;
  }

  public update(state: CONWAY_STATE): void {
    this.node.state = state;
  }

  public next(neighborStates: CONWAY_STATE[]): CONWAY_STATE {
    let total = 0;
    neighborStates.forEach((neighbor) => {
      total += neighbor === CONWAY_STATE.ALIVE ? 1 : 0;
    });

    switch(this.node.state) {
      case CONWAY_STATE.ALIVE:
        return total === 2 || total === 3 ? CONWAY_STATE.ALIVE : CONWAY_STATE.DEAD;
      case CONWAY_STATE.DEAD:
        return total === 3 ? CONWAY_STATE.ALIVE : CONWAY_STATE.DEAD;
    }
  }
}