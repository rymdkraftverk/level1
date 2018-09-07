import * as Render from '../../internal/Render';
import * as Core from '../../internal/Core';
import getX from '../entityUtil/getX';
import getY from '../entityUtil/getY';
import { getRatio } from '../game/resize';
import getNewEntity from './getNewEntity';

export default (options) => {
  const {
    text,
    style,
    zIndex = 0,
  } = options;

  if (!text) {
    throw new Error('Text created without "text"');
  }

  if (!style) {
    throw new Error('Text created without "style"');
  }

  const {
    id,
  } = options;

  if (id && Core.exists(id)) {
    throw new Error(`Sprite created using an already existing id: ${id}`);
  }

  /*
    This is done to scale text up and down depending on if the canvas has been resized.
  */
  const updatedStyle = {
    ...style,
    fontSize: style.fontSize * getRatio(),
  };

  const entity = getNewEntity(options);

  const textObject = Render.getNewPIXIText(text, updatedStyle);

  textObject.zIndex = zIndex;
  textObject.position.set(
    getX(entity),
    getY(entity),
  );

  /*
    This is done to counteract the scale change on the canvas. Since changing the scale
    of a text object will make it blurry.

    This can be removed when Pixi makes it possible to scale text objects.
  */
  textObject.scale.set(1 / getRatio());
  entity.originalSize = style.fontSize;

  Render.add(textObject);

  entity.asset = textObject;

  return Core.addEntity(entity);
};
