import Environment from './environment';
import Cell from '../cell/conwayCell';
import { CONWAY_STATE, Conway } from '../conway';

export default class ConwayEnvironment extends Environment<Cell> {
  private initRate: number;
  private nextCellStates: CONWAY_STATE[];

  constructor(width: number, height: number, initRate: number) {
    super(width, height);
    this.initRate = initRate;
    this.nextCellStates = [];
  }

  public initialize(): CONWAY_STATE[] {
    this.initializeCells();
    return this.nextCellStates;
  }

  public next(): [CONWAY_STATE[], number[]] {
    this.nextCellStates = this.nextState();

    let updatedIndices = [];
    this.cells.forEach((cell, i) => {
      if (cell.getState() != this.nextCellStates[i]) {
        updatedIndices.push(i);
      }
    });

    return [this.updateState(updatedIndices), updatedIndices];
  }

  public getCells(): Cell[] {
    return this.cells;
  }

  private nextState(): CONWAY_STATE[] {
    return this.cells.map(cell => 
      cell.next(cell.getNeighbors().map(index => this.cells[index].getState()))
    );
  }

  private updateState(indices: number[]): CONWAY_STATE[] {
    let update: CONWAY_STATE[] = [];
    indices.forEach(i => {
      this.cells[i].update(this.nextCellStates[i]);
      update.push(this.nextCellStates[i]);
    });

    return update;
  }

  protected initializeCells() {
    for (let i = 0; i < this.size; i++) {
      this.cells.push(this.initializeCell(i));
    }
  }

  private initializeCell(index: number): Cell {
    const conway: Conway = {
      state: Math.random() < this.initRate ? CONWAY_STATE.ALIVE : CONWAY_STATE.DEAD,
      neighbors: this.getNeighbors(index)
    }
    this.nextCellStates.push(conway.state);
    return new Cell(index, conway);
  }

  private getNeighbors(index: number): number[] {
    const top = this.getTop(index);
    const bottom = this.getBottom(index);
    const left = this.getLeft(index);
    const right = this.getRight(index);
    const topLeft = this.getLeft(top);
    const topRight = this.getRight(top);
    const bottomLeft = this.getLeft(bottom);
    const bottomRight = this.getRight(bottom);

    return [
      topLeft,    top,    topRight,
      left,               right,
      bottomLeft, bottom, bottomRight
    ];
  }

  private getTop(index: number): number {
    return index < this.width ? index + this.width * (this.height-1) : index - this.width;
  }

  private getBottom(index: number): number {
    return index + this.width >= this.size ? index % this.width : index + this.width;
  }

  private getLeft(index: number): number {
    return index % this.width === 0 ? index + this.width - 1 : index - 1;
  }

  private getRight(index: number): number {
    return (index + 1) % this.width === 0 ? index - (index % this.width) : index + 1;
  }
}