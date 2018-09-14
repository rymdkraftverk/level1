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
} = {}, entity) => {
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
    initHasBeenCalled: false,
    // TODO: remove all functions from behavior to behavior runner
    // eslint-disable-next-line no-shadow
    init: ({ behavior, data, entity }) => {
      if (onInit) {
        onInit({ data, entity });
      }
      behavior.initHasBeenCalled = true;
    },
    // eslint-disable-next-line no-shadow
    update: ({ behavior, entity, data }) => {
      if (!enabled) {
        return;
      }
      if (onUpdate) {
        onUpdate({
          counter: behavior.counter,
          entity,
          data,
        });
      }
      if (endTime > 0 && behavior.counter === endTime && !behavior.finished) {
        behavior.finished = true;
        if (onComplete) {
          onComplete({ data, entity });
        }
        if (loop) {
          behavior.reset({ behavior });
        } else if (removeOnComplete) {
          behavior.remove({ data, entity, behavior });
        }
      }
      behavior.counter += 1;
    },
    // eslint-disable-next-line no-shadow
    remove: ({ behavior, data, entity }) => {
      if (behavior.removed) {
        return;
      }
      behavior.removed = true;
      entity.behaviors = entity.behaviors.filter((b) => b.id !== id);
      if (onRemove) {
        onRemove({ data, entity });
      }
    },
    reset: ({ behavior }) => {
      behavior.counter = 0;
      behavior.finished = false;
    },
  };

  entity.behaviors = entity.behaviors.concat(newBehaviorObject);

  return entity;
});
