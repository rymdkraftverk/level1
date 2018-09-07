import curry from 'lodash/fp/curry';
import getBehavior from './getBehavior';

export default curry((id, entity) => {
  const behavior = getBehavior(entity, id);
  behavior.reset({ behavior });
});
