import { Container } from 'pixi.js';
import * as Render from '../../internal/Render';
import * as Core from '../../internal/Core';
import getNewEntity from './getNewEntity';
import getDisplayObject from './getDisplayObject';

export default (options = {}) => {
  const {
    id,
    zIndex = 0,
    parent,
  } = options;
  if (id && Core.exists(id)) {
    throw new Error(`level1: l1.container created using an already existing id: ${id}`);
  }

  const entity = getNewEntity(options);

  const container = new Container();

  container.zIndex = zIndex;
  container.filters = [];

  Render.add(getDisplayObject(parent), container);

  entity.asset = container;

  return Core.addEntity(entity);
};
