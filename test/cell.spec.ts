import 'mocha';
import { expect } from 'chai';

import Cell from '../src/cell';

describe('A cell upon initialization', () => {
  it('should return the same index that was given', () => {
    const cell: Cell<number> = new Cell(1, 1);
    expect(cell.getIndex()).to.equal(1);
  });

  it('should require an override to update()', () => {
    const cell: Cell<number> = new Cell(1, 1);
    expect(() => { cell.update() }).to.throw('Override Me');
  });
});