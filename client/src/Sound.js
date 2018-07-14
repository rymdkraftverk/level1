import { Howl } from 'howler';
import { assetTypes } from './Entity';

/*
 Check Howler docs for available options
*/
const getSound = (filePath, options) => new Howl({
  src: [filePath],
  ...options,
});

export function play(entity, { src, volume, loop }) {
  const sound = getSound(src, { volume, loop });

  sound.play();

  entity.asset = sound;

  entity.asset.type = assetTypes.SOUND;

  return sound;
}

export function stop(entity) {
  const {
    asset,
  } = entity;

  if (asset && asset.type === assetTypes.SOUND) {
    asset.stop();
  }

  entity.asset = null;
}
