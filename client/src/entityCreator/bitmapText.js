import * as PIXI from 'pixi.js';
import * as Core from '../internal/Core';
import * as Render from '../internal/Render';
import createNewEntity from './createNewEntity';

export default (options) => {
  const {
    id,
    text,
    style,
  } = options;

  if (id && Core.exists(id)) {
    throw new Error(`level1: l1.bitmapText created using an already existing id: ${id}`);
  }

  if (text === null || text === undefined) {
    throw new Error('level1: l1.bitmapText created without "text"');
  }

  if (!style) {
    throw new Error('level1: l1.bitmapText created without "style"');
  }

  /*
    This is done to scale text up and down depending on if the canvas has been resized.
  */
  const updatedStyle = {
    ...style,
    fontSize: style.fontSize * Render.getRatio(),
  };

  const entity = createNewEntity(
    options,
    new PIXI.extras.BitmapText(text, updatedStyle),
  );

  /*
  This is done to counteract the scale change on the canvas. Since changing the scale
  of a text object will make it blurry.

  This can be removed when Pixi makes it possible to scale text objects.
*/
  entity.asset.scale.set(1 / Render.getRatio());
  entity.originalSize = style.fontSize;

  return entity;
};
