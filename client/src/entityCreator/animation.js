import * as PIXI from 'pixi.js';
import * as Core from '../internal/Core';
import * as Render from '../internal/Render';
import createNewEntity from './createNewEntity';

export default (options) => {
  const {
    id,
    textures,
  } = options;

  if (id && Core.exists(id)) {
    throw new Error(`level1: l1.animation created using an already existing id: ${id}`);
  }

  if (!textures) {
    throw new Error('level1: l1.animation created without "textures"');
  }

  const entity = createNewEntity(
    options,
    new PIXI.extras.AnimatedSprite(textures.map(Render.getTexture)),
  );

  entity.asset.play();

  return entity;
};
