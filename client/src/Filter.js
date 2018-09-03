import * as filters from 'pixi-filters';
import * as PIXI from 'pixi.js';
// import { Filter } from 'pixi.js';

export function add(entity, filter) {
  if (!entity.asset) {
    throw new Error(`Trying to apply filter to entity "${entity.id}" without asset, use Sprite.show or Animation.play first`);
  }

  // eslint-disable-next-line new-cap
  const filterInstance = new filter();

  entity.asset.filters = entity.asset.filters.concat(filterInstance);

  return filterInstance;
}

export function clear(entity) {
  entity.asset.filters = [];
}

export const Filter = {
  ...PIXI.filters,
  ...filters,
};
