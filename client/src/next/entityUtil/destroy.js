import * as Core from '../../internal/Core';
import * as Render from '../../internal/Render';
import * as InternalEntity from '../../internal/Entity';
import removeBody from '../entityModifier/removeBody';
import removeBehavior from '../entityModifier/removeBehavior';

const destroyAsset = (asset) => {
  if (asset.type === InternalEntity.assetTypes.PARTICLES) {
    asset.destroy();
    Render.remove(asset.parent, asset.particleContainer);
  } else if (asset.type === InternalEntity.assetTypes.SOUND) {
    asset.unload();
  } else {
    Render.remove(asset.parent, asset);
  }
};

const destroy = (entity) => {
  if (typeof entity === 'string') {
    entity = Core.get(entity);
  }
  if (!entity) {
    console.warn(`Tried to remove non-existant Entity: ${entity}`);
    return;
  }

  Core.remove(entity);

  const {
    asset,
    body,
    hasBody,
  } = entity;

  if (asset) {
    destroyAsset(asset);
    entity.asset = null;
  }

  if (hasBody) {
    entity.hasBody = false;
    entity.body = null;
    removeBody(body);
  }

  entity.behaviors.forEach((behavior) => {
    removeBehavior(entity, behavior.id);
  });
};

export default destroy;
