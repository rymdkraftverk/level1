export function isColliding(entity, otherEntity) {
  const {
    x: entityX,
    y: entityY,
    width: entityWidth,
    height: entityHeight,
  } = entity;

  const {
    x: otherEntityX,
    y: otherEntityY,
    width: otherEntityWidth,
    height: otherEntityHeight,
  } = otherEntity;

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
    x: entityX,
    y: entityY,
    width: entityWidth,
    height: entityHeight,
  } = entity;

  const {
    x: otherEntityX,
    y: otherEntityY,
    width: otherEntityWidth,
    height: otherEntityHeight,
  } = otherEntity;

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
