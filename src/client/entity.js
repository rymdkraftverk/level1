export function create(id){
  if (!id) throw new Error('Entity.create(id) takes a unique id as an argument');
  const behaviours = {};
  return {
    id,
    behaviours,
    run: (entity) => {
      Object.keys(behaviours).forEach((b) => {
        const behaviour = behaviours[b];
        behaviour.run(behaviour, entity);
      });
    }
  }
}
