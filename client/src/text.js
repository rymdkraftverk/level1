import { getText, add, remove as renderRemove } from './render-internal';

/*
  Check PIXI.Text docs for available style options
*/
export function create(text, style = undefined) {
  const textObject = getText(text, style);
  add(textObject);
  return textObject;
}

export function remove(textObject) {
  renderRemove(textObject);
}
