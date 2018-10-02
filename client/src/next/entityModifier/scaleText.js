import curry from 'lodash/fp/curry';
import * as Render from '../../internal/Render';

/*
  This is required to be used for any scale change of Text
*/
export default curry((entity, fontSize) => {
  entity.originalSize = fontSize;
  entity.asset.style.fontSize = fontSize * Render.getRatio();
  return entity;
});
