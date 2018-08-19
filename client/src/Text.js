import * as Render from './internal/Render';
import * as Entity from './Entity';
import * as Game from './Game';

export function show(entity, { text, style, zIndex = 0 }) {
  /*
    This is done to scale text up and down depending on if the canvas has been resized.
  */
  // TODO: Handle fontSize being string
  const updatedStyle = {
    ...style,
    fontSize: style.fontSize * Game.getRatio(),
  };

  const textObject = Render.getText(text, updatedStyle);

  textObject.zIndex = zIndex;
  textObject.position.set(
    Entity.getX(entity),
    Entity.getY(entity),

  );

  /*
    This is done to counteract the scale change on the canvas. Since changing the scale
    of a text object will make it blurry.

    This can be removed when Pixi makes it possible to scale text objects.
  */
  textObject.scale.set(1 / Game.getRatio());
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
