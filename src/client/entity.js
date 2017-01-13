let id = 0;

export function create(){
  const behaviours = {};
  return {
    id: id++,
    behaviours,
    run: (entity) => {
      Object.keys(behaviours).forEach((b) => {
        const behaviour = behaviours[b];
        // if (behaviour.init) {
        //   behaviour.init(behaviour, entity);
        //   delete behaviour.init;
        // }
        behaviour.run(behaviour, entity);
      });
    }
  }
}
