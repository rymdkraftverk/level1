export function getRandomInRange(from, to) {
  return Math.floor((Math.random() * (to - from)) + from);
}

export function flipSprite(sprite) {
  sprite.scale.x *= -1;
}
