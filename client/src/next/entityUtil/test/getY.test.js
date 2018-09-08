import getY from '../getY';

describe('getY', () => {
  const grandParent = {
    y: 20,
    parent: null,
  };
  const parent = {
    y: 10,
    parent: grandParent,
  };
  const entity = {
    y: 5,
    parent,
  };

  it('returns absolute position', () => {
    expect(getY(entity)).to.equal(35);
  });
});
