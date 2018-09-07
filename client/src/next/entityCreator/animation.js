import * as Render from '../../internal/Render';
import * as Core from '../../internal/Core';
import getX from '../entityUtil/getX';
import getY from '../entityUtil/getY';
import getNewEntity from './getNewEntity';

export default (options) => {
  const {
    textures,
    speed = 0.05,
    zIndex = 0,
  } = options;

  if (!textures) {
    throw new Error('Animation created without "textures".');
  }

  const {
    id,
  } = options;

  if (id && Core.exists(id)) {
    throw new Error(`Animation created using an already existing id: ${id}`);
  }

  const animation = Render.getNewPIXIAnimatedSprite(textures, speed);

  const entity = getNewEntity(options);

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
