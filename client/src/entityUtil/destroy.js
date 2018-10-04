import * as Core from '../internal/Core';
import * as Render from '../internal/Render';
import * as InternalEntity from '../internal/Entity';
import removeBody from '../entityModifier/removeBody';
import removeBehavior from '../entityModifier/removeBehavior';

const destroyAsset = (asset) => {
  if (asset.type === InternalEntity.assetTypes.PARTICLES) {
    Render.remove(asset.parent, asset.particleContainer);
  } else if (asset.type === InternalEntity.assetTypes.SOUND) {
    asset.unload();
  } else {
    Render.remove(asset.parent, asset);
  }
};

const destroyEntity = (entity) => {
  entity._destroyed = true;
  entity.behaviors.forEach((behavior) => {
    removeBehavior(entity, behavior.id);
  });
  if (entity.hasBody) {
    removeBody(entity.body);
    entity.hasBody = false;
    entity.body = null;
  }
  entity.children.forEach(destroyEntity);
};

const destroy = (entity) => {
  if (typeof entity === 'string') {
    entity = Core.get(entity);
  }
  if (!entity) {
    console.warn(`Tried to remove non-existant Entity: ${entity}`);
    return;
  }

  if (entity._destroyed) {
    console.warn(`Entity ${entity} has already been destroyed`);
    return;
  }

  Core.remove(entity);

  if (entity.asset) {
    destroyAsset(entity.asset);
    entity.asset = null;
  }

  destroyEntity(entity);
};

export default destroy;
