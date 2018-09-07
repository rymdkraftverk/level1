import * as Render from './internal/Render';
import getX from './next/entityUtil/getX';
import getY from './next/entityUtil/getY';
import { getRatio } from './next/game/resize';

export function show(entity, { text, style, zIndex = 0 }) {
  /*
    This is done to scale text up and down depending on if the canvas has been resized.
  */
  const updatedStyle = {
    ...style,
    fontSize: style.fontSize * getRatio(),
  };

  const textObject = Render.getText(text, updatedStyle);

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

  return textObject;
}

export function hide(entity) {
  const {
    asset,
  } = entity;

  if (asset) {
    Render.remove(asset);
  }

  entity.asset = null;
}

/*
  This is required to be used for any scale change of Text
*/
export function scale(entity, fontSize) {
  entity.originalSize = fontSize;
  entity.asset.style.fontSize = fontSize * getRatio();
}
