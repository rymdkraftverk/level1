import * as Render from '../../internal/Render';
import * as Core from '../../internal/Core';
import getX from '../entityUtil/getX';
import getY from '../entityUtil/getY';
import getNewEntity from './getNewEntity';

export default (options) => {
  const {
    text,
    style,
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
  textObject.position.set(
    getX(entity),
    getY(entity),
  );

  Render.add(textObject);

  entity.asset = textObject;

  return Core.addEntity(entity);
};
