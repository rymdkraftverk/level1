import uuid from 'uuid/v4';
import * as Timer from './Timer';

function exists(entity, id) {
  return entity.behaviors.some((behavior) => behavior.id === id);
}

export function add(entity, {
  id = uuid(),
  timer = 0,
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
    initHasBeenCalled: false,
    timer: Timer.create({ duration: timer }),
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
          counter: behavior.timer.counter,
          entity,
          data,
        });
      }
      if (behavior.timer && Timer.run(behavior.timer)) {
        if (onTimerEnd) {
          onTimerEnd({ data, entity });
        }
        if (loop) {
          Timer.reset(behavior.timer);
        } else if (removeOnComplete) {
          behavior.remove({ data, entity });
        }
      }
    },
    // eslint-disable-next-line no-shadow
    remove: ({ data, entity }) => {
      entity.behaviors = entity.behaviors.filter((b) => b.id !== id);
      if (onRemove) {
        onRemove({ data, entity });
      }
    },
  };

  entity.behaviors = entity.behaviors.concat(newBehaviorObject);
}

export function remove(entity, id) {
  const behavior = get(entity, id);
  behavior.remove({ entity, data: behavior.data });
}

export function get(entity, id) {
  return entity.behaviors.find((behavior) => behavior.id === id);
}

export function reset(entity, id) {
  const behavior = get(entity, id);
  Timer.reset(behavior.timer);
}
