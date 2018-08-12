
import {
  getOverlappingArea, getX, getY, isColliding,
} from '../src/internal/Entity';

describe('getOverlappingArea', () => {
  context('non overlapping', () => {
    it('(0, 0) (5, 5)', () => {
      const entity1 = {
        x: 0,
        y: 0,
        width: 2,
        height: 2,
      };

      const entity2 = {
        x: 5,
        y: 5,
        width: 2,
        height: 2,
      };

      const overlappingArea = getOverlappingArea(entity1, entity2);
      expect(overlappingArea).to.equal(0);
    });
  });

  context('overlapping', () => {
    it('(1,0) (0,1)', () => {
      const entity1 = {
        x: 1,
        y: 0,
        width: 2,
        height: 2,
      };

      const entity2 = {
        x: 0,
        y: 1,
        width: 2,
        height: 2,
      };

      const overlappingArea = getOverlappingArea(entity1, entity2);
      expect(overlappingArea).to.equal(1);
    });

    it('(1,0) (1,1)', () => {
      const entity1 = {
        x: 1,
        y: 0,
        width: 2,
        height: 2,
      };

      const entity2 = {
        x: 1,
        y: 1,
        width: 2,
        height: 2,
      };

      const overlappingArea = getOverlappingArea(entity1, entity2);
      expect(overlappingArea).to.equal(2);
    });
  });
});

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
