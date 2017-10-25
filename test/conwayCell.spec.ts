import 'mocha';
import { expect } from 'chai';

import Cell from '../src/conwayCell';
import { CONWAY_STATE, Conway } from '../src/conway';

describe('A Conway cell upon initialization', () => {
  const neighbors: number[] = [0, 1, 2, 3, 4, 5, 6, 7];
  const node: Conway = {
    state: CONWAY_STATE.ALIVE,
    neighbors: neighbors
  };
  const cell: Cell = new Cell(1, node);

  it('should provide the same neighbors', () => {
    expect(cell.getNeighbors()).to.equal(neighbors);
  });

  it('should provide the same state', () => {
    expect(cell.getState()).to.equal(CONWAY_STATE.ALIVE);
  });

  it('should toggle the state', () => {
    cell.update();
    expect(cell.getState()).to.equal(CONWAY_STATE.DEAD);
    cell.update();
    expect(cell.getState()).to.equal(CONWAY_STATE.ALIVE);
  });

});