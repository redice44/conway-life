import 'mocha';
import { expect } from 'chai';

import Environment from '../src/environment/conwayEnvironment';
import Cell from '../src/cell/conwayCell';
import { CONWAY_STATE } from '../src/conway';

describe('A Conway Environment upon initialization', () => {
  const env: Environment = new Environment(4, 4, 0.3);
  const cellsState: CONWAY_STATE[] = env.initialize();
  const cells: Cell[] = env.getCells();

  it('should return an array of Conway Cells', () => {
    expect(cells.length).to.equal(16);
    expect(cellsState.length).to.equal(16);
  });

  it('should calculate neighbors for cells correctly', () => {
    // 0  1  2  3
    // 4  5  6  7
    // 8  9  10 11
    // 12 13 14 15

    expect(cells[0].getNeighbors()).to.deep.equal([15, 12, 13, 3, 1, 7, 4, 5]);
    expect(cells[1].getNeighbors()).to.deep.equal([12, 13, 14, 0, 2, 4, 5, 6]);
    expect(cells[3].getNeighbors()).to.deep.equal([14, 15, 12, 2, 0, 6, 7, 4]);
    expect(cells[5].getNeighbors()).to.deep.equal([0, 1, 2, 4, 6, 8, 9, 10]);
    expect(cells[12].getNeighbors()).to.deep.equal([11, 8, 9, 15, 13, 3, 0, 1]);
    expect(cells[15].getNeighbors()).to.deep.equal([10, 11, 8, 14, 12, 2, 3, 0]);
  });
});

describe('A Conway Environment', () => {
  const env: Environment = new Environment(16, 16, 0.3);
  let cellsState: CONWAY_STATE[] = env.initialize();
  const cells: Cell[] = env.getCells();
  let getCellState = cell => cell.getState();
  let currentState = cells.map(getCellState);

  it('should have the intial state be accurate', () => {
    expect(currentState).to.deep.equal(cellsState);
  });

  it('should step accurately forward', () => {
    for (let i = 0; i < 50; i++) {
      let update = env.next();
      let updatedStates = update[0];
      let updatedIndices = update[1];
      currentState = cells.map(getCellState);
      for (let j = 0; j < updatedIndices.length; j++) {
        expect(currentState[updatedIndices[j]]).to.deep.equal(updatedStates[j]);
      }
    }
  });
});