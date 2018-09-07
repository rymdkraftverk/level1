import * as Core from '../../internal/Core';
import getNewEntity from './getNewEntity';

export default (options) => {
  const {
    id,
  } = options;
  if (id && Core.exists(id)) {
    throw new Error(`Entity created using an already existing id: ${id}`);
  }

  const entityInstance = getNewEntity(options);

  return Core.addEntity(entityInstance);
};
