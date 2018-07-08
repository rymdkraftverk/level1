import * as Render from './internal/Render';

export function show(entity, { text, style, zIndex = 0 }) {
  const textObject = Render.getBitmapText(text, style);

  textObject.zIndex = zIndex;

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
