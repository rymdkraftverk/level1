import curry from 'lodash/fp/curry';

export default curry((type, entity) => {
  entity.types = entity.types.concat(type);
  return entity;
});
