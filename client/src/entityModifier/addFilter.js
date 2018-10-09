import curry from 'lodash/fp/curry';
import uuid from 'uuid/v4';

export default curry((entity, filter, id = uuid()) => {
  if (!entity.asset) {
    throw new Error(`level1: Trying to apply filter to entity "${entity.id}" without asset, use l1.sprite or l1.animation first`);
  }

  filter.id = id;

  if (!entity.asset.filters) {
    entity.asset.filters = [];
  }

  entity.asset.filters = entity.asset.filters.concat(filter);

  return entity;
});
