import { Howl } from 'howler';
import uuid from 'uuid/v4';
import { assetTypes } from '../internal/Entity';
import * as Core from '../internal/Core';

/*
  Check Howler docs for available options
*/
const getSound = (filePath, options) => new Howl({
  src: [filePath],
  ...options,
});

export default (options) => {
  const {
    id = uuid(),
    types = [],
    behaviors = [],
    src,
    volume,
    loop,
  } = options;

  if (id && Core.exists(id)) {
    throw new Error(`level1: l1.sound created using an already existing id: ${id}`);
  }

  const entity = {
    id,
    types,
    behaviors,
  };

  const sound = getSound(src, { volume, loop });

  sound.play();

  entity.asset = sound;
  entity.asset.type = assetTypes.SOUND;

  return Core.addEntity(entity);
};
