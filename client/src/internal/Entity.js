import getGlobalPosition from './getGlobalPosition';
import * as Render from './Render';

export function isColliding(entity, otherEntity) {
  const {
    entityWidth,
    entityHeight,
  } = entity.asset;

  const {
    x: entityX,
    y: entityY,
  } = getGlobalPosition(entity, Render.getRatio());

  const {
    otherEntityWidth,
    otherEntityHeight,
  } = otherEntity.asset;

  const {
    x: otherEntityX,
    y: otherEntityY,
  } = getGlobalPosition(otherEntity, Render.getRatio());

  return (entityX + entityWidth >= otherEntityX
    && otherEntityX + otherEntityWidth >= entityX
    && entityY + entityHeight >= otherEntityY
    && otherEntityY + otherEntityHeight >= entityY);
}

export function getOverlappingArea(entity, otherEntity) {
  if (!isColliding(entity, otherEntity)) {
    return 0;
  }

  const {
    entityWidth,
    entityHeight,
  } = entity.asset;

  const {
    x: entityX,
    y: entityY,
  } = getGlobalPosition(entity, Render.getRatio());

  const {
    otherEntityWidth,
    otherEntityHeight,
  } = otherEntity.asset;

  const {
    x: otherEntityX,
    y: otherEntityY,
  } = getGlobalPosition(otherEntity, Render.getRatio());

  const minX = Math.max(entityX, otherEntityX);
  const maxX = Math.min(entityX + entityWidth, otherEntityX + otherEntityWidth);
  const dX = maxX - minX;

  const minY = Math.max(entityY, otherEntityY);
  const maxY = Math.min(entityY + entityHeight, otherEntityY + otherEntityHeight);
  const dY = maxY - minY;

  return dX * dY;
}

export const assetTypes = {
  SPRITE: 'sprite',
  ANIMATION: 'animation',
  PARTICLES: 'particles',
  SOUND: 'sound',
  GRAPHICS: 'graphics',
};
