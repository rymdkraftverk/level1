import uuid from 'uuid/v4';

export default ({
  id = uuid(),
  types = [],
}) => ({
  id,
  types,
  asset: null,
  hasBody: false,
  behaviors: [],
});
