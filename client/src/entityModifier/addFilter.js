import curry from 'lodash/fp/curry';

export default curry((entity, filter) => {
  if (!entity.asset) {
    throw new Error(`level1: Trying to apply filter to entity "${entity.id}" without asset, use l1.sprite or l1.animation first`);
  }

  entity.asset.filters = entity.asset.filters.concat(filter);

  return entity;
});
