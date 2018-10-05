import * as PIXI from 'pixi.js';
import * as Core from '../internal/Core';
import createNewEntity from './createNewEntity';

export default (options = {}) => {
  const {
    id,
  } = options;

  if (id && Core.exists(id)) {
    throw new Error(`level1: l1.container created using an already existing id: ${id}`);
  }

  const entity = createNewEntity(
    options,
    new PIXI.Container(),
  );

  return entity;
};
