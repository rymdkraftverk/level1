export function create(duration, action){
  const initialDuration = duration;

  return {
    run: (behaviour, entity) => {
      duration--;
      if (duration <= 0){
        action(behaviour, entity);
        return true;
      }
      return false;
    },
    reset: () => {
      duration = initialDuration;
    }
  }
}
