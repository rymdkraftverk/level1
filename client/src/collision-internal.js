// Sprite collision
export function isColliding(entity, otherEntity) {
  const { sprite } = entity;
  const { sprite: otherSprite } = otherEntity;
  // hit will determine whether there's a collision
  let hit = false;

  // Find the half-widths and half-heights of each sprite
  sprite.halfWidth = (sprite.width / 2);
  sprite.halfHeight = (sprite.height / 2);
  otherSprite.halfWidth = (otherSprite.width / 2);
  otherSprite.halfHeight = (otherSprite.height / 2);

  // Find the center points of each sprite
  sprite.centerX = sprite.x + sprite.halfWidth;
  sprite.centerY = sprite.y + sprite.halfHeight;
  otherSprite.centerX = otherSprite.x + otherSprite.halfWidth;
  otherSprite.centerY = otherSprite.y + otherSprite.halfHeight;

  // Calculate the distance vector between the sprites
  const vx = sprite.centerX - otherSprite.centerX;
  const vy = sprite.centerY - otherSprite.centerY;

  // Figure out the combined half-widths and half-heights
  const combinedHalfWidths = sprite.halfWidth + otherSprite.halfWidth;
  const combinedHalfHeights = sprite.halfHeight + otherSprite.halfHeight;

  // Check for a collision on the x and y axis
  if (Math.abs(vx) < combinedHalfWidths && Math.abs(vy) < combinedHalfHeights) {
    hit = true;
  }

  return hit;
}

export function overlappingRectangleArea(entity1, entity2) {

  if(!isColliding(entity1, entity2)) {
    return 0;
  }

  const sprite1 = entity1.sprite
  const sprite2 = entity2.sprite

  const minX = Math.max(sprite1.x, sprite2.x);
  const maxX = Math.min(sprite1.x + sprite1.width, sprite2.x + sprite2.width)
  const dX = maxX - minX;

  const minY = Math.max(sprite1.y, sprite2.y);
  const maxY = Math.min(sprite1.y + sprite1.height, sprite2.y + sprite2.height);
  const dY = maxY - minY;

  return dX * dY;
}
