import * as Render from '../internal/Render';
import * as Core from '../internal/Core';
import getNewEntity from './getNewEntity';
import getDisplayObject from './getDisplayObject';

export default (options = {}) => {
  const {
    id,
    zIndex = 0,
    parent,
  } = options;

  if (id && Core.exists(id)) {
    throw new Error(`level1: Graphics created using an already existing id: ${id}`);
  }

  const entity = getNewEntity(options);

  const graphics = Render.getNewPIXIGraphics();

  graphics.zIndex = zIndex;
  graphics.filters = [];

  Render.add(getDisplayObject(parent), graphics);

  entity.asset = graphics;

  return Core.addEntity(entity);
};
