let id = 0;

export function create(){
  const behaviours = {};
  return {
    id: id++,
    behaviours,
    run: (entity) => {
      Object.keys(behaviours).forEach((b) => {
        const behaviour = behaviours[b];
        behaviour.run(behaviour, entity);
      });
    }
  }
}
