import * as PIXI from 'pixi.js';
import * as Render from '../internal/Render';
import * as Entity from '../internal/Entity';
import * as Core from '../internal/Core';
import createNewEntity from './createNewEntity';

/*
The following properties are required by PIXI Particles when it's created.
This is used as a safety net if these properties are not provided in the user config.
*/
const defaultParticleEmitterConfig = {
  lifetime: {
    min: 0,
    max: 0,
  },
  pos: {
    x: 0,
    y: 0,
  },
};

export default (options) => {
  const {
    id,
    textures,
    config,
  } = options;

  if (id && Core.exists(id)) {
    throw new Error(`level1: l1.particles created using an already existing id: ${id}`);
  }

  if (!textures) {
    throw new Error('level1: l1.particles created without "textures"');
  }

  if (!config) {
    throw new Error('level1: l1.particles created without "config"');
  }

  const particleContainer = new PIXI.Container();

  const entity = createNewEntity(
    options,
    particleContainer,
  );

  const emitter = new PIXI.particles.Emitter(
    particleContainer,
    textures.map(Render.getTexture),
    {
      ...defaultParticleEmitterConfig,
      ...config,
      emit: true,
    },
  );

  entity.asset = emitter;
  entity.asset.particleContainer = particleContainer;
  entity.asset.type = Entity.assetTypes.PARTICLES;

  return entity;
};
