
export function create({ duration, autoRestart }) {
  if (!Number.isInteger(duration)) {
    throw new Error('TypeError, Timer.create(duration) = duration has to be integer');
  }
  if (duration === 0) {
    throw new Error('level1: Timer.create(duration) = duration has to be greater than 0');
  }
  return {
    counter: 0,
    duration,
    finished: false,
    autoRestart,
  };
}

export function run(timer) {
  if (timer.finished) {
    if (timer.autoRestart) {
      reset(timer);
      timer.counter += 1;
    }
    return false;
  }
  if (timer.counter < timer.duration) {
    timer.counter += 1;
    return false;
  }
  timer.finished = true;
  return true;
}

export function reset(timer) {
  timer.counter = 0;
  timer.finished = false;
}
