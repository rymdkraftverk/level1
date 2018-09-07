import curry from 'lodash/fp/curry';
import * as InternalEntity from '../../internal/Entity';

export default curry((otherEntity, entity) => InternalEntity
  .getOverlappingArea(entity, otherEntity));
