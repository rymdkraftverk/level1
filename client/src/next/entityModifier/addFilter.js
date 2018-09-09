import curry from 'lodash/fp/curry';

export default curry((filter, entity) => {
  if (!entity.asset) {
    throw new Error(`Trying to apply filter to entity "${entity.id}" without asset, use Sprite.show or Animation.play first`);
  }

  entity.asset.filters = entity.asset.filters.concat(filter);

  return entity;
});
