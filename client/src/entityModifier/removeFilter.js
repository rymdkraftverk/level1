import curry from 'lodash/fp/curry';

export default curry((entity, id) => {
  const filter = entity.asset.filters.find(f => f.id === id);

  if (!filter) {
    console.warn(`level1: tried to remove non-existant filter "${id}" from entity: "${entity.id}"`);
  } else {
    entity.asset.filters = entity.asset.filters.filter(f => f.id !== id);
  }
  return entity;
});
