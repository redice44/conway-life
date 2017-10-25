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

  public update(): void {
    this.node.state = this.node.state === CONWAY_STATE.ALIVE ? CONWAY_STATE.DEAD : CONWAY_STATE.ALIVE;
  }
}