export function create(id){
  if (!id) throw new Error('Entity.create(id) takes a unique id as an argument');
  const behaviours = {};
  const entity = {
    id,
    type: "",
    sprite: {},
    behaviours,
    run: (entity) => {
      Object.keys(behaviours).forEach((b) => {
        const behaviour = behaviours[b];
        if (behaviour.init){
          behaviour.init(behaviour, entity);
          delete behaviour.init;
        }
        behaviour.run(behaviour, entity);
      });
    }
  }

  const defaultBody = {
    entity
  }
  entity.body = defaultBody;

  return entity;
}
