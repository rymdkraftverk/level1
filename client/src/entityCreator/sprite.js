import * as PIXI from 'pixi.js';
import * as Core from '../internal/Core';
import * as Render from '../internal/Render';
import createNewEntity from './createNewEntity';

export default (options) => {
  const {
    id,
    texture,
  } = options;

  if (id && Core.exists(id)) {
    throw new Error(`level1: l1.sprite created using an already existing id: ${id}`);
  }

  if (!texture) {
    throw new Error('level1: l1.sprite created without "texture"');
  }

  const entity = createNewEntity(options, new PIXI.Sprite(Render.getTexture(texture)));

  return entity;
};
