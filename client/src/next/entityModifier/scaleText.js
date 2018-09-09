import curry from 'lodash/fp/curry';
import { getRatio } from '../game/resize';

/*
  This is required to be used for any scale change of Text
*/
export default curry((fontSize, entity) => {
  entity.originalSize = fontSize;
  entity.asset.style.fontSize = fontSize * getRatio();
  return entity;
});
