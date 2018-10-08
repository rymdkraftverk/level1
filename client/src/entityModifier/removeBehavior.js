import curry from 'lodash/fp/curry';
import getBehavior from './getBehavior';

export default curry((entity, id) => {
  const behavior = getBehavior(entity, id);
  if (!behavior) {
    console.warn(`level1: tried to remove non-existant behavior "${id}" from entity: "${entity.id}"`);
  } else {
    entity.behaviors = entity.behaviors.filter((b) => b.id !== id);
    behavior.enabled = false;
    if (behavior.onRemove) {
      behavior.onRemove({ data: behavior.data, entity });
    }
  }
  return entity;
});
