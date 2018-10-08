import curry from 'lodash/fp/curry';
import * as Render from '../internal/Render';
import getGlobalPosition from '../internal/getGlobalPosition';
import * as InternalEntity from '../internal/Entity';

const getWidth = (entity) => (entity.asset.hitArea && entity.asset.hitArea.width)
  || entity.asset.width;
const getHeight = (entity) => (entity.asset.hitArea && entity.asset.hitArea.height)
  || entity.asset.height;

export default curry((entity, otherEntity) => {
  const {
    x: entityX,
    y: entityY,
  } = getGlobalPosition(entity, Render.getRatio());

  const entityWidth = getWidth(entity);
  const entityHeight = getHeight(entity);

  const {
    x: otherEntityX,
    y: otherEntityY,
  } = getGlobalPosition(otherEntity, Render.getRatio());

  const otherEntityWidth = getWidth(otherEntity);
  const otherEntityHeight = getHeight(otherEntity);

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
