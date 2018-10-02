import curry from 'lodash/fp/curry';
import * as Core from '../../internal/Core';
import * as InternalEntity from '../../internal/Entity';

export default curry((entity, otherEntity) => {
  if (Core.isPhysicsEnabled()) {
    console.warn('Entity.isColliding is for non-physics based collision detection. If using physics use Physics.addCollision instead');
  }
  return InternalEntity.isColliding(entity, otherEntity);
});
