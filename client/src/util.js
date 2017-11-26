export function getRandomInRange(from, to) {
  return Math.floor((Math.random() * (to - from)) + from);
}

/**
 * Flip Sprite horizontally
 * @param {PIXI.Srite|PIXI.AnimatedSprite|PIXI.Text} sprite 
 */
export function flipSprite(sprite) {
  sprite.scale.x *= -1;
}
