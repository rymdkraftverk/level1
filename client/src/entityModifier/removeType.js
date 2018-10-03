import curry from 'lodash/fp/curry';

export default curry((entity, type) => {
  entity.types = entity.types.filter((t) => t !== type);
  return entity;
});
