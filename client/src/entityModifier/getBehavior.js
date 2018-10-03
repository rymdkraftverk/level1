import curry from 'lodash/fp/curry';

export default curry((entity, id) => entity.behaviors.find((behavior) => behavior.id === id));
