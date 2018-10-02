import * as Render from '../../internal/Render';
import * as Core from '../../internal/Core';
import getNewEntity from './getNewEntity';
import getDisplayObject from './getDisplayObject';

export default (options) => {
  const {
    text,
    style,
    zIndex = 0,
    parent,
  } = options;

  if (text === null || text === undefined) {
    throw new Error('level1: l1.text created without "text"');
  }

  if (!style) {
    throw new Error('level1: l1.text created without "style"');
  }

  const {
    id,
  } = options;

  if (id && Core.exists(id)) {
    throw new Error(`level1: l1.text created using an already existing id: ${id}`);
  }

  /*
    This is done to scale text up and down depending on if the canvas has been resized.
  */
  const updatedStyle = {
    ...style,
    fontSize: style.fontSize * Render.getRatio(),
  };

  const entity = getNewEntity(options);

  const textObject = Render.getNewPIXIText(text, updatedStyle);

  textObject.zIndex = zIndex;

  /*
    This is done to counteract the scale change on the canvas. Since changing the scale
    of a text object will make it blurry.

    This can be removed when Pixi makes it possible to scale text objects.
  */
  textObject.scale.set(1 / Render.getRatio());
  entity.originalSize = style.fontSize;

  Render.add(getDisplayObject(parent), textObject);

  entity.asset = textObject;

  return Core.addEntity(entity);
};
