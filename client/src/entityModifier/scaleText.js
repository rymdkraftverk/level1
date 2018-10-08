import * as Render from '../internal/Render';

/*
  This is required to be used for any scale change of Text
*/
export default (entity, fontSize) => {
  entity.originalSize = fontSize;
  entity.asset.style.fontSize = fontSize * Render.getRatio();
  return entity;
};
