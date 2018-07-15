// TODO

// Behavior.add(player1, {
//   id: 'running',
//   behavior: running,
//   memoize: true,
// });
// // add() enables us to check for duplicate id's when adding

// Behavior.get();
// Behavior.remove();

// function sort() {

// }

function exists(entity, id) {
  return entity.behaviors.some((behavior) => behavior.id === id);
}

export function add(entity, {
  id, behavior,
}) {
  if (exists(entity, id)) {
    throw new Error(`Behavior with id ${id} already exists on entity ${entity.id}`);
  }
  behavior.id = id;
  entity.behaviors = entity.behaviors.concat(behavior);
}

export function remove(entity, id) {
  entity.behaviors = entity.behaviors.filter((behavior) => behavior.id !== id);
}

export function get(entity, id) {
  return entity.behaviors.find((behavior) => behavior.id === id);
}
