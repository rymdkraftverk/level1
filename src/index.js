const behaviors = [];
let behaviorsToAdd = [];
let behaviorsToRemove = [];
let lastTimeStamp = null;
let _logging = false;

const BehaviorType = {
  ONCE: 'once',
  REPEAT: 'repeat',
};

const log = (text) => {
  if (_logging) {
    // eslint-disable-next-line no-console
    console.warn(text);
  }
};

export const getLoopDuration = () => lastTimeStamp;

export const update = ({ onError = () => {}, logging = false }) => {
  _logging = logging;
  return (deltaTime) => {
    try {
      const before = performance.now();
      behaviors.forEach((behavior) => {
        behavior.counter += 1;
        if (behavior.type === BehaviorType.ONCE) {
          if (behavior.counter === behavior.delay) {
            behavior.callback();
            behaviorsToRemove.push(behavior);
          }
        } else if (behavior.type === BehaviorType.REPEAT) {
          if (behavior.counter % behavior.interval === 0) {
            behavior.callback(behavior.counter, deltaTime);
          }
        }
      });

      behaviorsToRemove.forEach((behaviorToRemove) => {
      // Mutate original array for performance reasons
        const indexToRemove = behaviors.indexOf(behaviorToRemove);
        if (indexToRemove >= 0) {
          behaviors.splice(indexToRemove, 1);
        }
      });

      behaviorsToRemove = [];

      behaviorsToAdd.forEach((behaviorToAdd) => {
        behaviors.push(behaviorToAdd);
      });

      behaviorsToAdd = [];

      const after = performance.now();
      lastTimeStamp = after - before;
    } catch (error) {
    // eslint-disable-next-line no-console
      console.error('l1: Error running behaviors:', error);
      onError(error);
    }
  };
};

const commonBehaviorProperties = {
  id: null,
  labels: [],
  counter: 0,
};

export const once = (callback, delay = 1) => {
  if (!callback || typeof callback !== 'function') {
    throw new Error('The fist argument to l1.once needs to be a function');
  }
  const behavior = {
    callback,
    delay,
    type: BehaviorType.ONCE,
    ...commonBehaviorProperties,
  };
  behaviorsToAdd.push(behavior);
  return behavior;
};

export const repeat = (callback, interval = 1) => {
  if (!callback || typeof callback !== 'function') {
    throw new Error('The fist argument to l1.repeat needs to be a function');
  }
  const behavior = {
    callback,
    interval,
    type: BehaviorType.REPEAT,
    ...commonBehaviorProperties,
  };
  behaviorsToAdd.push(behavior);
  return behavior;
};

export const remove = (behavior) => {
  let behaviorObject;
  if (typeof behavior === 'string') {
    behaviorObject = get(behavior);
  } else {
    behaviorObject = behavior;
  }
  if (!behaviorObject) {
    log(`level1: Tried to remove non-existent behavior: ${behavior}`);
  } else {
    behaviorsToRemove.push(behaviorObject);
  }
};

export const get = (id) => behaviors.find((behavior) => behavior.id === id);

export const getAll = () => behaviors;

export const getByLabel = (label) => behaviors
  .filter((behavior) => behavior.labels.includes(label));

export const reset = (behavior) => {
  if (typeof behavior === 'string') {
    behavior = get(behavior);
  }
  if (!behavior) {
    log(`level1: Tried to reset non-existent behavior: ${behavior}`);
  } else {
    behavior.counter = 0;
  }
};

export const exists = (id) => behaviors.some((behavior) => behavior.id === id);
