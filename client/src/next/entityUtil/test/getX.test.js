import getX from '../getX';

describe('getX', () => {
  const grandParent = {
    x: 20,
    parent: null,
  };
  const parent = {
    x: 10,
    parent: grandParent,
  };
  const entity = {
    x: 5,
    parent,
  };

  it('returns absolute position', () => {
    expect(getX(entity)).to.equal(35);
  });
});
