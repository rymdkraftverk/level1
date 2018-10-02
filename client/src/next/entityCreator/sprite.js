import * as Render from '../../internal/Render';
import * as Core from '../../internal/Core';
import getNewEntity from './getNewEntity';
import getDisplayObject from './getDisplayObject';

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
    id,
    texture,
    // flipX = false,
    // flipY = false,
    zIndex = 0,
    parent,
  } = options;

  if (!texture) {
    throw new Error('level1: l1.sprite created without "texture"');
  }

  if (id && Core.exists(id)) {
    throw new Error(`level1: l1.sprite created using an already existing id: ${id}`);
  }

  const entity = getNewEntity(options);

  const sprite = Render.getNewPIXISprite(texture);

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

  sprite.zIndex = zIndex;
  sprite.filters = [];

  Render.add(getDisplayObject(parent), sprite);

  entity.asset = sprite;

  return Core.addEntity(entity);
};
