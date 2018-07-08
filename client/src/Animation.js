import * as Render from './internal/Render';

export function play(entity, { textures, speed = 0.05, zIndex = 0 }) {
  const animation = Render.getAnimation(textures, speed);

  animation.zIndex = zIndex;

  Render.add(animation);

  animation.play();

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
