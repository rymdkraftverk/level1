import curry from 'lodash/fp/curry';
import getBehavior from './getBehavior';

export default curry((id, entity) => {
  const behavior = getBehavior(id, entity);
  if (!behavior) {
    console.warn(`level1: tried to remove non-existant behavior "${id}" from entity: "${entity.id}"`);
  } else {
    behavior.remove({ entity, data: behavior.data, behavior });
  }
  return entity;
});
