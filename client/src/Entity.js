import * as Core from './internal/Core';
import * as Render from './internal/Render';
import * as InternalEntity from './internal/Entity';
import * as Physics from './Physics';

export { assetTypes } from './internal/Entity';

export function setX(entity, x) {
  entity.x = x;
}

export function setY(entity, y) {
  entity.y = y;
}

export function addType(entity, type) {
  entity.types = entity.types.concat(type);
}

export function removeType(entity, type) {
  entity.types = entity.types.filter((t) => t !== type);
}

// TODO: This should not be a part of the public API
export const destroyAsset = (asset) => {
  if (asset.type === InternalEntity.assetTypes.PARTICLES) {
    asset.destroy();
    Render.remove(asset.particleContainer);
  } else if (asset.type === InternalEntity.assetTypes.SOUND) {
    asset.unload();
  } else {
    Render.remove(asset);
  }
};

// TODO: This should not be a part of the public API
export const destroyChild = (child) => {
  Core.remove(child);
  const {
    asset,
    body,
    hasBody,
  } = child;
  if (asset) {
    destroyAsset(asset);
    child.asset = null;
  }
  if (hasBody) {
    Physics.removeBody(body);
    child.body = null;
    child.hasBody = false;
  }
  child.behaviors = child.behaviors.forEach((behavior) => {
    behavior.remove({ data: behavior.data, entity: child, behavior });
  });
};

export function destroy(entity) {
  if (typeof entity === 'string') {
    entity = Core.get(entity);
    if (!entity) {
      console.warn(`Tried to remove non-existant Entity: ${entity}`);
      return;
    }
  }

  entity.parent.children = entity
    .parent
    .children
    .filter(child => child.id !== entity.id);

  destroyChild(entity);
  entity.children.forEach(destroy);
}

// TODO: Keep?
// export function add(entity) {
//   Core.add(entity);
//   const { sprite } = entity;
//   if (sprite) {
//     Render.add(sprite);
//   }
//   return entity;
// }

export function getAll() {
  return Core.getEntities();
}

export function getById(id) {
  return Core.getById(id);
}

export function get(id) {
  return Core.getById(id);
}

export function getByType(type) {
  return Core.getByType(type);
}

export function isColliding(entity, otherEntity) {
  if (Core.isPhysicsEnabled()) {
    console.warn('Entity.isColliding is for non-physics based collision detection. If using physics use Physics.addCollision instead');
  }
  return InternalEntity.isColliding(entity, otherEntity);
}

export function getOverlappingArea(entity, otherEntity) {
  return InternalEntity.getOverlappingArea(entity, otherEntity);
}
