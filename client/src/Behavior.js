import uuid from 'uuid/v4';
import * as Timer from './Timer';

function exists(entity, id) {
  return entity.behaviors.some((behavior) => behavior.id === id);
}

export function add(entity, {
  id = uuid(),
  timer,
  loop,
  removeOnComplete,
  run,
  onTimerEnd,
  onInit,
  onRemove,
  enabled = true,
  data,
  // TODO: Implement
  // memoize = false,
}) {
  if (exists(entity, id)) {
    throw new Error(`Behavior with id ${id} already exists on entity ${entity.id}`);
  }

  const newBehaviorObject = {
    id,
    data,
    timer: Timer.create({ duration: timer }),
    // eslint-disable-next-line no-shadow
    init: ({ behavior, entity }) => {
      if (onInit) {
        onInit({ behavior, entity });
      }
    },
    // eslint-disable-next-line no-shadow
    run: ({ behavior, entity }) => {
      if (!enabled) {
        return;
      }
      if (run) {
        run({
          counter: behavior.timer.counter,
          behavior,
          entity,
        });
      }
      if (Timer.run(behavior.timer)) {
        if (onTimerEnd) {
          onTimerEnd({ behavior, entity });
        }
        if (loop) {
          Timer.reset(behavior.timer);
        } else if (removeOnComplete) {
          behavior.remove({ behavior, entity });
        }
      }
    },
    // eslint-disable-next-line no-shadow
    remove: ({ behavior, entity }) => {
      if (onRemove) {
        onRemove({ behavior, entity });
      }
    },
  };

  entity.behaviors = entity.behaviors.concat(newBehaviorObject);
}

export function remove(entity, id) {
  entity.behaviors = entity.behaviors.filter((behavior) => behavior.id !== id);
}

export function get(entity, id) {
  return entity.behaviors.find((behavior) => behavior.id === id);
}

export function reset(entity, id) {
  const behavior = get(entity, id);
  Timer.reset(behavior.timer);
}
