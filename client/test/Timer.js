import * as Timer from '../src/Timer';

describe('Timer.create(duration)', () => {
  context('when duration is an integer', () => {
    it('returns a timer', () => {
      expect(Timer.create.bind(null, { duration: 200 })).to.not.throw(Error);
    });
  });
  context('when duration is not an integer', () => {
    it('throws an error', () => {
      expect(Timer.create.bind(null, { duration: 200.1 })).to.throw(Error);
    });
  });
});
