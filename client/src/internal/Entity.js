export function isColliding(entity, otherEntity) {
  // hit will determine whether there's a collision
  let hit = false;

  // Find the half-widths and half-heights of each sprite
  entity.halfWidth = (entity.width / 2);
  entity.halfHeight = (entity.height / 2);
  otherEntity.halfWidth = (otherEntity.width / 2);
  otherEntity.halfHeight = (otherEntity.height / 2);

  // Find the center points of each sprite
  entity.centerX = entity.x + entity.halfWidth;
  entity.centerY = entity.y + entity.halfHeight;
  otherEntity.centerX = otherEntity.x + otherEntity.halfWidth;
  otherEntity.centerY = otherEntity.y + otherEntity.halfHeight;

  // Calculate the distance vector between the entitys
  const vx = entity.centerX - otherEntity.centerX;
  const vy = entity.centerY - otherEntity.centerY;

  // Figure out the combined half-widths and half-heights
  const combinedHalfWidths = entity.halfWidth + otherEntity.halfWidth;
  const combinedHalfHeights = entity.halfHeight + otherEntity.halfHeight;

  // Check for a collision on the x and y axis
  if (Math.abs(vx) < combinedHalfWidths && Math.abs(vy) < combinedHalfHeights) {
    hit = true;
  }

  return hit;
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