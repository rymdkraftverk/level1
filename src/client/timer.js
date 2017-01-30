export function create(duration){
  if (!Number.isInteger(duration)) throw new Error('TypeError, Timer.create(duration) = duration has to be integer');
  let counter = 0;

  return {
    run: () => {
      if (counter < duration) counter++;
      return (counter === duration);
    },
    reset: () => {
      counter = 0;
    },
    counter: () => {
      return counter;
    },
    duration: () => {
      return duration;
    }
  }
}
