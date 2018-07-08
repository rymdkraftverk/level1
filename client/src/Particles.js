import * as Render from './internal/Render';
import { assetTypes } from './Entity';

/*
The following properties are required by PIXI Particles when it's created.
They will be ignored and then overwritten once emitEmitter is used.
*/
const defaultParticleEmitterConfig = {
  lifetime: {
    min: 0,
    max: 0,
  },
  pos: {
    x: -999,
    y: -999,
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
    ...config,
    emit: true,
  });

  emitter.type = assetTypes.PARTICLES;
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
