import uuid from 'uuid/v4';

function exists(entity, id) {
  return entity.behaviors.some((behavior) => behavior.id === id);
}

export function add(entity, {
  id = uuid(),
  endTime = 0,
  loop = false,
  removeOnComplete = true,
  onUpdate = null,
  onTimerEnd = null,
  onInit = null,
  onRemove = null,
  enabled = true,
  data = null,
  // TODO: Implement
  // memoize = false,
} = {}) {
  if (exists(entity, id)) {
    throw new Error(`Behavior with id ${id} already exists on entity ${entity.id}`);
  }

  const newBehaviorObject = {
    id,
    data,
    removed: false,
    finished: false,
    counter: 0,
    initHasBeenCalled: false,
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
      if (behavior.counter === endTime && !behavior.finished) {
        behavior.finished = true;
        if (onTimerEnd) {
          onTimerEnd({ data, entity });
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
}

export function remove(entity, id) {
  const behavior = get(entity, id);
  behavior.remove({ entity, data: behavior.data, behavior });
}

export function get(entity, id) {
  return entity.behaviors.find((behavior) => behavior.id === id);
}

export function reset(entity, id) {
  const behavior = get(entity, id);
  behavior.reset({ behavior });
}
