export function getRandomInRange(from, to) {
  return Math.floor((Math.random() * (to - from)) + from);
}

/**
 * Flip Sprite horizontally
 * @param {PIXI.Srite|PIXI.AnimatedSprite|PIXI.Text} sprite 
 */
export function flipSprite(sprite) {
  sprite.anchor.x = 1;
  sprite.scale.x *= -1;
  sprite.flipped = !sprite.flipped;
}

export const grid = (startX, startY, width, height, itemsPerRow) => (index) => {
  const row = Math.floor(index / itemsPerRow);
  const column = index % itemsPerRow;
  return {
    x: startX + (column * width),
    y: startY + (row * height),
  };
};

export const getDistance = (startX, startY, endX, endY) =>
  Math.hypot(Math.abs(endX - startX), Math.abs(endY - startY));

export const getAngle = (startX, startY, goalX, goalY) => {
  const xDistance = goalX - startX;
  const yDistance = goalY - startY;
  let angle = Math.atan(yDistance / xDistance);
  if (startX - goalX < 0) {
    angle += Math.PI;
  }
  return angle;
};
