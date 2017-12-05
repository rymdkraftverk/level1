import { create } from '../src/timer';

describe('Timer.create(duration)', () => {
  context('when duration is an integer', () => {
    it('returns a timer', () => {
      expect(create.bind(null, 200)).to.not.throw(Error);
    });
  });
  context('when duration is not an integer', () => {
    it('throws an error', () => {
      expect(create.bind(null, 200.1)).to.throw(Error);
    });
  });
});
