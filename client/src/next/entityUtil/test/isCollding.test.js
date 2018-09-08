import { isColliding } from '../../../internal/Entity';

describe('isCollding', () => {
  const grandParent = {
    y: 20,
    x: 20,
    parent: null,
  };

  const parent = {
    x: 10,
    y: 10,
    parent: grandParent,
  };

  const entity = {
    x: 5,
    y: 5,
    width: 10,
    height: 10,
    parent,
  };
  /*
    Absolute position:
    x: 35
    y: 35
  */

  it('colliding', () => {
    const otherEntity = {
      x: 30,
      y: 30,
      width: 10,
      height: 10,
      parent: null,
    };

    expect(isColliding(entity, otherEntity)).to.equal(true);
  });

  it('not colliding', () => {
    const otherEntity = {
      x: 100,
      y: 100,
      width: 10,
      height: 10,
      parent: null,
    };

    expect(isColliding(entity, otherEntity)).to.equal(false);
  });
});
