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
});

describe('A Conway Cell update', () => {
  const neighbors: number[] = [0, 1, 2, 3, 4, 5, 6, 7];
  const deadNode: Conway = {
    state: CONWAY_STATE.DEAD,
    neighbors: neighbors
  };
  const deadCell: Cell = new Cell(1, deadNode);
  it('should set the state properly', () => {
    deadCell.update(CONWAY_STATE.ALIVE);
    expect(deadCell.getState()).to.equal(CONWAY_STATE.ALIVE);
    deadCell.update(CONWAY_STATE.DEAD);
    expect(deadCell.getState()).to.equal(CONWAY_STATE.DEAD);
  });
});

describe('A Conway cell next state', () => {
  const neighbors: number[] = [0, 1, 2, 3, 4, 5, 6, 7];
  const deadNode: Conway = {
    state: CONWAY_STATE.DEAD,
    neighbors: neighbors
  };
  const aliveNode: Conway = {
    state: CONWAY_STATE.ALIVE,
    neighbors: neighbors
  };
  const deadCell: Cell = new Cell(1, deadNode);
  const aliveCell: Cell = new Cell(1, aliveNode);

  const aliveNeighbors = [
    [
      CONWAY_STATE.DEAD, CONWAY_STATE.DEAD, CONWAY_STATE.DEAD,
      CONWAY_STATE.DEAD, CONWAY_STATE.DEAD,
      CONWAY_STATE.DEAD, CONWAY_STATE.DEAD, CONWAY_STATE.DEAD
    ],
    [
      CONWAY_STATE.ALIVE, CONWAY_STATE.DEAD, CONWAY_STATE.DEAD,
      CONWAY_STATE.DEAD, CONWAY_STATE.DEAD,
      CONWAY_STATE.DEAD, CONWAY_STATE.DEAD, CONWAY_STATE.DEAD
    ],
    [
      CONWAY_STATE.DEAD, CONWAY_STATE.ALIVE, CONWAY_STATE.ALIVE,
      CONWAY_STATE.DEAD, CONWAY_STATE.DEAD,
      CONWAY_STATE.DEAD, CONWAY_STATE.DEAD, CONWAY_STATE.DEAD
    ],
    [
      CONWAY_STATE.DEAD, CONWAY_STATE.DEAD, CONWAY_STATE.DEAD,
      CONWAY_STATE.ALIVE, CONWAY_STATE.ALIVE,
      CONWAY_STATE.ALIVE, CONWAY_STATE.DEAD, CONWAY_STATE.DEAD
    ],
    [
      CONWAY_STATE.ALIVE, CONWAY_STATE.ALIVE, CONWAY_STATE.ALIVE,
      CONWAY_STATE.ALIVE, CONWAY_STATE.DEAD,
      CONWAY_STATE.DEAD, CONWAY_STATE.DEAD, CONWAY_STATE.DEAD
    ],
    [
      CONWAY_STATE.ALIVE, CONWAY_STATE.ALIVE, CONWAY_STATE.ALIVE,
      CONWAY_STATE.ALIVE, CONWAY_STATE.ALIVE,
      CONWAY_STATE.DEAD, CONWAY_STATE.DEAD, CONWAY_STATE.DEAD
    ],
    [
      CONWAY_STATE.ALIVE, CONWAY_STATE.ALIVE, CONWAY_STATE.ALIVE,
      CONWAY_STATE.DEAD, CONWAY_STATE.DEAD,
      CONWAY_STATE.ALIVE, CONWAY_STATE.ALIVE, CONWAY_STATE.ALIVE
    ],
    [
      CONWAY_STATE.ALIVE, CONWAY_STATE.ALIVE, CONWAY_STATE.ALIVE,
      CONWAY_STATE.DEAD, CONWAY_STATE.ALIVE,
      CONWAY_STATE.ALIVE, CONWAY_STATE.ALIVE, CONWAY_STATE.ALIVE
    ],
    [
      CONWAY_STATE.ALIVE, CONWAY_STATE.ALIVE, CONWAY_STATE.ALIVE,
      CONWAY_STATE.ALIVE, CONWAY_STATE.ALIVE,
      CONWAY_STATE.ALIVE, CONWAY_STATE.ALIVE, CONWAY_STATE.ALIVE
    ]
  ];

  it('should become alive when dead if there are 3 alive neighbors', () => {
    expect(deadCell.next(aliveNeighbors[3])).to.equal(CONWAY_STATE.ALIVE);
  });

  it('should remain dead when dead if there are not 3 alive neighbors', () => {
    expect(deadCell.next(aliveNeighbors[0])).to.equal(CONWAY_STATE.DEAD);
    expect(deadCell.next(aliveNeighbors[2])).to.equal(CONWAY_STATE.DEAD);
    expect(deadCell.next(aliveNeighbors[4])).to.equal(CONWAY_STATE.DEAD);
    expect(deadCell.next(aliveNeighbors[8])).to.equal(CONWAY_STATE.DEAD);
  });

  it('should become dead when alive if there are not 2 or 3 alive neighbors', () => {
    expect(aliveCell.next(aliveNeighbors[0])).to.equal(CONWAY_STATE.DEAD);
    expect(aliveCell.next(aliveNeighbors[1])).to.equal(CONWAY_STATE.DEAD);
    expect(aliveCell.next(aliveNeighbors[4])).to.equal(CONWAY_STATE.DEAD);
    expect(aliveCell.next(aliveNeighbors[8])).to.equal(CONWAY_STATE.DEAD);
  });

  it('should remain alive when alive if there are 2 or 3 alive neighbors', () => {
    expect(aliveCell.next(aliveNeighbors[2])).to.equal(CONWAY_STATE.ALIVE);
    expect(aliveCell.next(aliveNeighbors[3])).to.equal(CONWAY_STATE.ALIVE);
  });
});
