import * as Render from '../../internal/Render';
import * as Entity from '../../internal/Entity';
import * as Core from '../../internal/Core';
import getX from '../entityUtil/getX';
import getY from '../entityUtil/getY';
import getNewEntity from './getNewEntity';

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

export default (options) => {
  const {
    textures,
    config,
    zIndex = 0,
  } = options;

  if (!textures || !config) {
    throw new Error('level1: l1.particles({ textures, config}): Incorrect arguments');
  }

  const entity = getNewEntity(options);

  const { emitter, particleContainer } = Render.addNewPixiParticleEmitter(
    textures, {
      ...defaultParticleEmitterConfig,
      pos: {
        x: getX(entity),
        y: getY(entity),
      },
      ...config,
      emit: true,
    },
    zIndex,
  );

  entity.asset = emitter;
  entity.asset.particleContainer = particleContainer;
  entity.asset.type = Entity.assetTypes.PARTICLES;

  return Core.addEntity(entity);
};
