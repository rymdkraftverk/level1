
export function remove(entity, id) {
  const behavior = get(entity, id);
  behavior.remove({ entity, data: behavior.data, behavior });
}

export function get(entity, id) {
  return entity.behaviors.find((behavior) => behavior.id === id);
}

export function reset(entity, id) {
  const behavior = get(entity, id);
  behavior.reset({ behavior });
}
