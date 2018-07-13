import * as Entity from '../Entity';

export default () => ({
  run: (_, entity) => {
    if (entity.hasBody) {
      entity.x = entity.body.position.x;
      entity.y = entity.body.position.y;
    }

    if (entity.asset) {
      if (entity.asset.type === Entity.assetTypes.SPRITE ||
        entity.asset.type === Entity.assetTypes.ANIMATION ||
        entity.asset.type === Entity.assetTypes.TEXT
      ) {
        entity.asset.position.set(Entity.getX(entity), Entity.getY(entity));
      }
    }
  },
});
