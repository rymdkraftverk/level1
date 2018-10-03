import { getOverlappingArea } from '../../../internal/Entity';

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
