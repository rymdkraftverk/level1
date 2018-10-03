import * as Render from '../internal/Render';
import * as Core from '../internal/Core';
import getNewEntity from './getNewEntity';
import getDisplayObject from './getDisplayObject';

export default (options) => {
  const {
    textures,
    parent,
    zIndex = 0,
  } = options;

  if (!textures) {
    throw new Error('level1: l1.animation created without "textures".');
  }

  const {
    id,
  } = options;

  if (id && Core.exists(id)) {
    throw new Error(`level1: l1.animation created using an already existing id: ${id}`);
  }

  const entity = getNewEntity(options);

  const animation = Render.getNewPIXIAnimatedSprite(textures);

  animation.zIndex = zIndex;
  animation.filters = [];

  Render.add(getDisplayObject(parent), animation);

  animation.play();

  entity.asset = animation;

  return Core.addEntity(entity);
};
