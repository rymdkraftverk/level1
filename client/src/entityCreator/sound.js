import { Howl } from 'howler';
import { assetTypes } from '../internal/Entity';
import * as Core from '../internal/Core';
import getNewEntity from './getNewEntity';

/*
  Check Howler docs for available options
*/
const getSound = (filePath, options) => new Howl({
  src: [filePath],
  ...options,
});

export default (options) => {
  const {
    src,
    volume,
    loop,
  } = options;

  const entity = getNewEntity(options);

  const sound = getSound(src, { volume, loop });

  sound.play();

  entity.asset = sound;
  entity.asset.type = assetTypes.SOUND;

  return Core.addEntity(entity);
};
