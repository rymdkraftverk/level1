import curry from 'lodash/fp/curry';
import * as InternalEntity from '../../internal/Entity';

export default curry((entity, otherEntity) => InternalEntity
  .getOverlappingArea(entity, otherEntity));
