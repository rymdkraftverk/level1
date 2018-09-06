import uuid from 'uuid/v4';
import * as Core from './internal/Core';
import * as Render from './internal/Render';
import * as InternalEntity from './internal/Entity';
import * as Physics from './Physics';

export { assetTypes } from './internal/Entity';

export function addChild(parent, {
  id, x = 0, y = 0, width = 0, height = 0, types = [],
} = {
  id: null, x: 0, y: 0, width: 0, height: 0, types: [],
}) {
  if (!id) {
    id = uuid();
  }
  if (Core.exists(id)) {
    throw new Error(`Entity.create(id) using an already existing id: ${id}`);
  }

  const entity = {
    id,
    x,
    y,
    width,
    height,
    parent,
    types,
    children: [],
    asset: null,
    hasBody: false,
    behaviors: [],
  };

  const defaultBody = {
    entity,
  };
  entity.body = defaultBody;

  parent.children = parent.children.concat(entity);

  Core.add(entity);
  return entity;
}

export function getRoot() {
  return Core.getRootEntity();
}

export function setX(entity, x) {
  entity.x = x;
}

export function setY(entity, y) {
  entity.y = y;
}

export function getX(entity) {
  return InternalEntity.getX(entity);
}

export function getY(entity) {
  return InternalEntity.getY(entity);
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
  child.behaviors = child.behaviors.forEach((b) => {
    b.remove({ data: b.data, entity: child });
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
