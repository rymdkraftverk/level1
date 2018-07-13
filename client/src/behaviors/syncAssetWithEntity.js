import * as Entity from '../Entity';

export default () => ({
  run: (_, entity) => {
    if (entity.hasBody) {
      entity.x = entity.body.position.x;
      entity.y = entity.body.position.y;
    }

    if (entity.asset && entity.asset.position) {
      entity.asset.position.set(Entity.getX(entity), Entity.getY(entity));
    }
  },
});
