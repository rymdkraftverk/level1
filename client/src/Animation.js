import * as Render from './internal/Render';
import * as Entity from './Entity';
import getX from './next/entityUtil/getX';
import getY from './next/entityUtil/getY';

export function play(entity, { textures, speed = 0.05, zIndex = 0 }) {
  const animation = Render.getAnimation(textures, speed);

  animation.position.set(getX(entity), getY(entity));

  animation.zIndex = zIndex;
  animation.filters = [];

  Render.add(animation);

  animation.play();

  if (entity.asset) {
    Entity.destroyAsset(entity.asset);
  }

  entity.asset = animation;

  return animation;
}

export function stop(entity) {
  const {
    asset,
  } = entity;

  if (asset) {
    Render.remove(asset);
  }

  entity.asset = null;
}
