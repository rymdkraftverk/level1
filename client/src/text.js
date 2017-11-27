import { getText, add } from './render-internal';

/*
  Check PIXI.Text docs for available style options
*/
export function create(text, style = undefined) {
  add(getText(text, style));
}
