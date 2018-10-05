import * as Render from '../internal/Render';

export default (entity) => {
  if (entity) {
    return entity.asset;
  }
  return Render.getStage();
};
