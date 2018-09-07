import * as Core from '../../internal/Core';
import * as Render from '../../internal/Render';
import * as InternalEntity from '../../internal/Entity';
import removeBody from '../entityModifier/removeBody';

const destroyAsset = (asset) => {
  if (asset.type === InternalEntity.assetTypes.PARTICLES) {
    asset.destroy();
    Render.remove(asset.particleContainer);
  } else if (asset.type === InternalEntity.assetTypes.SOUND) {
    asset.unload();
  } else {
    Render.remove(asset);
  }
};

const destroyChild = (child) => {
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
    removeBody(body);
    child.body = null;
    child.hasBody = false;
  }
  child.behaviors = child.behaviors.forEach((behavior) => {
    behavior.remove({ data: behavior.data, entity: child, behavior });
  });
};

const destroy = (entity) => {
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
};

export default destroy;
