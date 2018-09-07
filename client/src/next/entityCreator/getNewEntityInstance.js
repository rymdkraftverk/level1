import uuid from 'uuid/v4';
import * as Core from '../../internal/Core';

export default ({
  id = uuid(),
  x = 0,
  y = 0,
  width = 0,
  height = 0,
  parent = Core.getRootEntity(),
  types = [],
}) => ({
  id,
  x,
  y,
  width,
  height,
  parent,
  types,
  children: [],
  asset: null,
  hasBody: false,
  behaviors: [],
});
