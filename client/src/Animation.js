import * as Render from './internal/Render';
import * as Entity from './Entity';

export function play(entity, { textures, speed = 0.05, zIndex = 0 }) {
  const animation = Render.getAnimation(textures, speed);

  animation.position.set(Entity.getX(entity), Entity.getY(entity));

  animation.zIndex = zIndex;

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
