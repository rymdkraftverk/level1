import * as Render from '../internal/Render';
import * as Core from '../internal/Core';
import getNewEntity from './getNewEntity';
import getDisplayObject from './getDisplayObject';

export default (options) => {
  const {
    text,
    style,
    parent,
    zIndex = 0,
  } = options;

  if (!text) {
    throw new Error('level1: l1.bitmapText created without "text"');
  }

  if (!style) {
    throw new Error('level1: l1.bitmapText created without "style"');
  }

  const {
    id,
  } = options;

  if (id && Core.exists(id)) {
    throw new Error(`level1: l1.bitmapText created using an already existing id: ${id}`);
  }

  const entity = getNewEntity(options);

  const textObject = Render.getNewPIXIBitmapText(text, style);

  textObject.zIndex = zIndex;

  Render.add(getDisplayObject(parent), textObject);

  entity.asset = textObject;

  return Core.addEntity(entity);
};
