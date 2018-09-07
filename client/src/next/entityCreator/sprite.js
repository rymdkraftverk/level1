import * as Render from '../../internal/Render';
import * as Core from '../../internal/Core';
import getX from '../entityUtil/getX';
import getY from '../entityUtil/getY';
import getNewEntityInstance from './getNewEntityInstance';

/**
 * Flip Sprite horizontally
 * @param {PIXI.Srite|PIXI.AnimatedSprite|PIXI.Text} sprite
 */
// export function flipSprite(sprite) {
//   sprite.anchor.x = 1;
//   sprite.scale.x *= -1;
//   sprite.flipped = !sprite.flipped;
// }

export default (options) => {
  const {
    texture,
    // flipX = false,
    // flipY = false,
    zIndex = 0,
  } = options;
  const spriteInstance = Render.getNewPIXISprite(texture);

  // TODO: Handle flipping
  // if (flipX) {
  //   sprite.anchor.x = 1;
  //   sprite.scale.x *= -1;
  //   sprite.flipX = flipX;
  // }

  // if (flipY) {
  //   sprite.anchor.y = 1;
  //   sprite.scale.y *= -1;
  //   sprite.flipY = flipY;
  // }

  const entityInstance = getNewEntityInstance(options);

  spriteInstance.zIndex = zIndex;
  spriteInstance.filters = [];
  spriteInstance.position.set(
    getX(entityInstance),
    getY(entityInstance),
  );

  Render.add(spriteInstance);

  entityInstance.asset = spriteInstance;

  return Core.addEntity(entityInstance);
};
