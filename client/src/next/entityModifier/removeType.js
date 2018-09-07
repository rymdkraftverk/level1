import curry from 'lodash/fp/curry';

export default curry((type, entity) => {
  entity.types = entity.types.filter((t) => t !== type);
});
