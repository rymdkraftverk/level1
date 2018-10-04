import curry from 'lodash/fp/curry';
import getBehavior from './getBehavior';

export default curry((entity, id) => {
  const behavior = getBehavior(entity, id);

  if (!behavior) {
    console.warn(`level1: tried to reset non-existant behavior "${id}" for entity: "${entity.id}"`);
  } else {
    behavior.counter = 0;
    behavior.finished = false;
  }

  return entity;
});
