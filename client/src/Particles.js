import * as Render from './internal/Render';
import * as Entity from './Entity';

/*
The following properties are required by PIXI Particles when it's created.
They will be ignored and then overwritten once emitEmitter is used.
*/
const defaultParticleEmitterConfig = {
  lifetime: {
    min: 0,
    max: 0,
  },
};

export function emit(entity, {
  textures, config,
}) {
  if (!textures || !config) {
    throw new Error('level1: Particles.emit(entity, { textures, config}): Incorrect arguments');
  }

  const emitter = Render.addEmitter(textures, {
    ...defaultParticleEmitterConfig,
    pos: {
      x: Entity.getX(entity),
      y: Entity.getY(entity),
    },
    ...config,
    emit: true,
  });

  emitter.type = Entity.assetTypes.PARTICLES;
  entity.asset = emitter;

  return emitter;
}

export function stop(entity) {
  const {
    asset,
  } = entity;

  if (asset) {
    asset.destroy();
  }

  entity.asset = null;
}
