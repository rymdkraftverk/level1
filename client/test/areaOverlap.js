
import { overlappingRectangleArea } from '../src/collision-internal.js';

describe('overlappingRectangleArea', () => {
  context('non overlapping', () => {
    it('(0, 0) (5, 5)', () => {
      const sprite1 = {
        x: 0,
        y: 0,
        width: 2,
        height: 2,
      };

      const sprite2 = {
        x: 5,
        y: 5,
        width: 2,
        height: 2,
      };

      const overlappingArea = overlappingRectangleArea({sprite: sprite1}, {sprite: sprite2});
      expect(overlappingArea).to.equal(0);
    })
  })

  context('overlapping', () => {
    it('(1,0) (0,1)', () => {
      const sprite1 = {
        x: 1,
        y: 0,
        width: 2,
        height: 2,
      };

      const sprite2 = {
        x: 0,
        y: 1,
        width: 2,
        height: 2,
      };

      const overlappingArea = overlappingRectangleArea({sprite: sprite1}, {sprite: sprite2});
      expect(overlappingArea).to.equal(1);
    });

    it('(1,0) (1,1)', () => {
      const sprite1 = {
        x: 1,
        y: 0,
        width: 2,
        height: 2,
      };

      const sprite2 = {
        x: 1,
        y: 1,
        width: 2,
        height: 2,
      };

      const overlappingArea = overlappingRectangleArea({sprite: sprite1}, {sprite: sprite2});
      expect(overlappingArea).to.equal(2);
    });
  });
});
