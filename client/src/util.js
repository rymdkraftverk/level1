export function getRandomInRange(from, to) {
  return Math.floor((Math.random() * (to - from)) + from);
}

// TODO: Move to Sprite.show: flip=true
/**
 * Flip Sprite horizontally
 * @param {PIXI.Srite|PIXI.AnimatedSprite|PIXI.Text} sprite
 */
export function flipSprite(sprite) {
  sprite.anchor.x = 1;
  sprite.scale.x *= -1;
  sprite.flipped = !sprite.flipped;
}

export const grid = ({
  x, y, marginX, marginY, itemsPerRow,
}) => (index) => {
  const row = Math.floor(index / itemsPerRow);
  const column = index % itemsPerRow;
  return {
    x: x + (column * marginX),
    y: y + (row * marginY),
  };
};

export const distance = ({
  x1, y1, x2, y2,
}) =>
  Math.hypot(Math.abs(x2 - x1), Math.abs(y2 - y1));

/* eslint-disable no-shadow */
export const angle = ({
  x1, y1, x2, y2,
}) => {
  const xDistance = x2 - x1;
  const yDistance = y2 - y1;
  let angle = Math.atan(yDistance / xDistance);
  if (x1 - x2 < 0) {
    angle += Math.PI;
  }
  return angle;
};
/* eslint-enable no-shadow */
