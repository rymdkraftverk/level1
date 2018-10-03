import curry from 'lodash/fp/curry';
import * as Render from '../internal/Render';
import getGlobalPosition from '../internal/getGlobalPosition';
import * as InternalEntity from '../internal/Entity';

export default curry((entity, otherEntity) => {
  const {
    x: entityX,
    y: entityY,
  } = getGlobalPosition(entity, Render.getRatio());

  const {
    width: entityWidth,
    height: entityHeight,
  } = entity.asset;

  const {
    x: otherEntityX,
    y: otherEntityY,
  } = getGlobalPosition(otherEntity, Render.getRatio());

  const {
    width: otherEntityWidth,
    height: otherEntityHeight,
  } = otherEntity.asset;

  return InternalEntity
    .getOverlappingArea(
      {
        x: entityX,
        y: entityY,
        width: entityWidth,
        height: entityHeight,
      },
      {
        x: otherEntityX,
        y: otherEntityY,
        width: otherEntityWidth,
        height: otherEntityHeight,
      },
    );
});
