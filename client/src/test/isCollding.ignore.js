import { isColliding } from '..';

describe('isColliding', () => {
  const entity = {
    x: 25,
    y: 25,
    width: 10,
    height: 10,
  };

  it('colliding', () => {
    const otherEntity = {
      x: 30,
      y: 30,
      width: 10,
      height: 10,
    };

    expect(isColliding(entity, otherEntity)).to.equal(true);
  });

  it('not colliding', () => {
    const otherEntity = {
      x: 100,
      y: 100,
      width: 10,
      height: 10,
    };

    expect(isColliding(entity, otherEntity)).to.equal(false);
  });
});
