import 'mocha';
import { expect } from 'chai';

import Environment from '../src/environment/environment';

describe('An environment upon initialization', () => {
  const env: Environment<number> = new Environment(2, 2);

  it('should require an override to next()', () => {
    expect(() => { env.next() }).to.throw('Override Me');
  });
});