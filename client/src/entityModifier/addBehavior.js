import uuid from 'uuid/v4';
import curry from 'lodash/fp/curry';
import removeBehavior from './removeBehavior';

function exists(entity, id) {
  return entity.behaviors.some((behavior) => behavior.id === id);
}

export default curry((
  entity,
  {
    id = uuid(),
    endTime = 0,
    loop = false,
    removeOnComplete = true,
    onUpdate = null,
    onComplete = null,
    onInit = null,
    onRemove = null,
    enabled = true,
    data = {},
    ...unknownProperties
  },
) => {
  if (exists(entity, id)) {
    console.warn(`level1: Behavior with id ${id} already exists on entity ${entity.id}`);
    removeBehavior(entity, id);
  }

  if (Object.keys(unknownProperties).length > 0) {
    console.warn(`level1: Unknown properties on behavior "${id}": ${Object.keys(unknownProperties)}`);
  }

  const newBehaviorObject = {
    id,
    data,
    finished: false,
    counter: 0,
    endTime,
    initHasBeenCalled: false,
    loop,
    removeOnComplete,
    onComplete,
    enabled,
    onInit,
    onUpdate,
    onRemove,
  };

  entity.behaviors = entity.behaviors.concat(newBehaviorObject);

  return entity;
});
