/* eslint-disable no-else-return */

export function create(duration) {
  if (!Number.isInteger(duration)) throw new Error('TypeError, Timer.create(duration) = duration has to be integer');
  let counter = 0;
  let finished = false;
  return {
    run: () => {
      if (finished) {
        return false;
      } else if (counter < duration) {
        counter += 1;
        return false;
      } else {
        finished = true;
        return true;
      }
    },
    reset: () => {
      counter = 0;
      finished = false;
    },
    counter: () => counter,
    duration: () => duration,
    finished: () => finished,
  };
}
