import * as Render from './internal/Render';
import * as Entity from './Entity';

export function create(entity, { zIndex = 0 } = { zIndex: 0 }) {
  const graphics = Render.getGraphics();

  graphics.zIndex = zIndex;
  graphics.filters = [];

  Render.add(graphics);

  if (entity.asset) {
    Entity.destroyAsset(entity.asset);
  }

  entity.asset = graphics;

  return graphics;
}

export function destroy(entity) {
  const {
    asset,
  } = entity;

  if (asset) {
    Render.remove(asset);
  }

  entity.asset = null;
}
