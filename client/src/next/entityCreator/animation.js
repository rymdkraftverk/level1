import * as Render from '../../internal/Render';
import * as Core from '../../internal/Core';
import getX from '../entityUtil/getX';
import getY from '../entityUtil/getY';
import getNewEntity from './getNewEntity';

export default (options) => {
  const {
    textures,
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

  animation.position.set(
    getX(entity),
    getY(entity),
  );

  animation.zIndex = zIndex;
  animation.filters = [];

  Render.add(animation);

  animation.play();

  entity.asset = animation;

  return Core.addEntity(entity);
};
