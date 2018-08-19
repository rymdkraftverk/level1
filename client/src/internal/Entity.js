export function isColliding(entity, otherEntity) {
  if (getX(entity) + entity.width >= getX(otherEntity)
    && getX(otherEntity) + otherEntity.width >= getX(entity)
    && getY(entity) + entity.width >= getY(otherEntity)
    && getY(otherEntity) + otherEntity.width >= getY(entity)) {
    return true;
  }
  return false;
}

export function getOverlappingArea(entity, otherEntity) {
  if (!isColliding(entity, otherEntity)) {
    return 0;
  }

  const minX = Math.max(entity.x, otherEntity.x);
  const maxX = Math.min(entity.x + entity.width, otherEntity.x + otherEntity.width);
  const dX = maxX - minX;

  const minY = Math.max(entity.y, otherEntity.y);
  const maxY = Math.min(entity.y + entity.height, otherEntity.y + otherEntity.height);
  const dY = maxY - minY;

  return dX * dY;
}

export function getX({ x, parent }) {
  if (parent) {
    return x + getX(parent);
  }
  return x;
}

export function getY({ y, parent }) {
  if (parent) {
    return y + getY(parent);
  }
  return y;
}

export const assetTypes = {
  SPRITE: 'sprite',
  ANIMATION: 'animation',
  PARTICLES: 'particles',
  SOUND: 'sound',
  GRAPHICS: 'graphics',
};
