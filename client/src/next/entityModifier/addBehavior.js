import uuid from 'uuid/v4';
import curry from 'lodash/fp/curry';

function exists(entity, id) {
  return entity.behaviors.some((behavior) => behavior.id === id);
}

export default curry(({
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
}, entity) => {
  if (exists(entity, id)) {
    throw new Error(`level1: Behavior with id ${id} already exists on entity ${entity.id}`);
  }

  if (Object.keys(unknownProperties).length > 0) {
    throw new Error(`Unknown properties on behavior "${id}": ${Object.keys(unknownProperties)}`);
  }

  const newBehaviorObject = {
    id,
    data,
    removed: false,
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
