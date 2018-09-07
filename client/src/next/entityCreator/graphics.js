import * as Render from '../../internal/Render';
import * as Core from '../../internal/Core';
import getNewEntity from './getNewEntity';

export default (options) => {
  const {
    zIndex = 0,
  } = options;

  const {
    id,
  } = options;

  if (id && Core.exists(id)) {
    throw new Error(`Graphics created using an already existing id: ${id}`);
  }

  const entity = getNewEntity(options);

  const graphics = Render.getNewPIXIGraphics();

  graphics.zIndex = zIndex;
  graphics.filters = [];

  Render.add(graphics);

  entity.asset = graphics;

  return Core.addEntity(entity);
};
