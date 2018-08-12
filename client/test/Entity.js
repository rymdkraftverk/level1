
import { getOverlappingArea, getX, getY } from '../src/internal/Entity';

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

const grandParent = {
  x: 20,
  y: 20,
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
  parent,
};

describe('getX', () => {
  it('returns absolute position', () => {
    expect(getX(entity)).to.equal(35);
  });
});

describe('getY', () => {
  it('returns absolute position', () => {
    expect(getY(entity)).to.equal(35);
  });
});
