import * as PIXI from 'pixi.js';

export default (entity, ratio) => {
  const global = entity.asset.toGlobal(new PIXI.Point(0, 0));

  return {
    x: global.x / ratio,
    y: global.y / ratio,
  };
};
