import curry from 'lodash/fp/curry';

export default curry((id, entity) => entity.behaviors.find((behavior) => behavior.id === id));
