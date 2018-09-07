import * as Core from '../../internal/Core';
import getNewEntityInstance from './getNewEntityInstance';

export default (options) => {
  const {
    id,
  } = options;
  if (id && Core.exists(id)) {
    throw new Error(`Entity.create(id) using an already existing id: ${id}`);
  }

  const entityInstance = getNewEntityInstance(options);

  return Core.addEntity(entityInstance);
};
